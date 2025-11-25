import { inngest } from "@/lib/Inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT, NEWS_SUMMARY_EMAIL_PROMPT } from "./prompts";
import { sendEmail, sendNewsSummaryEmail } from "@/lib/nodemailer";
import { getAllUsersForNewsEmail } from "../actions/user.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { getNews } from "../actions/finnhub.actions";
import { getFormattedTodayDate } from "../utils";


// the sign-up welcome email function
export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }) => {
        const userProfile = `
           - Country: ${event.data.country}
           - Investment goals: ${event.data.investmentGoals}
           - Risk tolerance: ${event.data.riskTolerance}
           - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }), 
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email', async () => {
            //first 
            const part = response.candidates?.[0]?.content?.parts?.[0];
            //second - introduction text
            const introText = (part && 'text' in part ? part.text : null) || 'Welcome to Silstock! You now have access to tools that let you track markets, monitor trends, and get instant alerts when changes happen.'
            
            //EMAIL SENDING LOGIC:
            const { data: { email, name } } = event;
            return await sendEmail({email, name, intro: introText})
        })

        return {
            success: true,
            message: 'Welcome email sent successfully',
        }
    }
)

// the daily news summary function, which runs every day at noon
type UserForNewsEmail = {
    Id: string;
    email: string;
    name: string;
}
export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [ { event: 'app/send.daily.news'}, { cron: '0 12 * * *'} ],
    async ({ step }) => {
        // Step #1: Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail);

        if (!users || users.length === 0) return { success: false, message: 'No users found'};

        // Step #2: For each user, get their watchlist symbols => fetch news (fallback to general if none)
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
            for (const user of users as UserForNewsEmail[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty, fallback to general
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        // Step #3: Summarize news via AI for each user (placeholder)
        const userNewsSummaries: { user: UserForNewsEmail; newsContent: string | null }[] = [];

        for (const {user, articles} of results ) {
            try {
                const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2))

                // AI Summarization call here
                const response = await step.ai.infer('summarize-daily-news', {
                    model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }), 
                    body: {
                        contents: [{ role: 'user', parts: [{ text: prompt }] }]
                    }
                })
                // Extract summarized content 
                const part = response.candidates?.[0]?.content?.parts?.[0];
                const newsContent = (part && 'text' in part ? part.text : null) || 'No market news available today.';

                userNewsSummaries.push({ user, newsContent });

            } catch (e) {
                console.error('daily-news: error summarizing news for', user.email);
                userNewsSummaries.push({ user, newsContent: null });
            }
        }

        // Step #4: Send the emails (placeholder)
       await step.run('send-news-emails', async () => {
            // integrate email sending logic here, (for each user)
            await Promise.all(
                userNewsSummaries.map(async ({ user, newsContent }) => {
                    if (!newsContent) return false;

                    return await sendNewsSummaryEmail({ 
                        email: user.email, date: getFormattedTodayDate(), newsContent 
                    });
                })
            );
        })

        return { success: true, message: 'Daily news summary processed' };
    }
)