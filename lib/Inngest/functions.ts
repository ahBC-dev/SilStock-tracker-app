import { inngest } from "@/lib/Inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendEmail } from "@/lib/nodemailer";

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