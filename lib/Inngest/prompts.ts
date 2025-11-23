// ✅ Personalized Welcome Email Prompt (Cyan/White/Black theme, with fun emojis)
export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generate highly personalized HTML content for the {{intro}} placeholder.

User profile data:
{{userProfile}}

PERSONALIZATION REQUIREMENTS:

* Reference goals, risk tolerance, sectors, experience level, specific stocks, timeline
* Tailor messaging to investor type (new, experienced, retirement-focused)
* Make the user feel understood and seen
* Include optional fun/laugh emojis (😂🤣😄) in playful context or fun facts

CRITICAL FORMATTING REQUIREMENTS:

* Return ONLY clean HTML
* Use SINGLE paragraph:

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF; background-color: #000000;">content</p>
- Highlight personalized elements in <strong style="color: #06b6d4;">...</strong> (cyan-600)
- Two sentences, 35-50 words
- Second sentence reinforces personalization
- Do NOT start with "Welcome"

Example:

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF; background-color: #000000;">Thanks for joining SilStocks! As someone focused on <strong style="color: #06b6d4;">technology growth stocks</strong>, you'll love our real-time alerts for companies like the ones you're tracking. Quick fun fact: Apple once sold toast-making robots! 😂</p>`

// ✅ News Summary Email Prompt (Cyan/White/Black theme with emojis + fun facts)
export const NEWS_SUMMARY_EMAIL_PROMPT = `Generate HTML content for {{newsContent}} placeholder.

News data:
{{newsData}}

REQUIREMENTS:

* Return ONLY clean HTML
* Section headings with emojis (fun + excitement), e.g., 📊 Market Overview 🌟, 📈 Top Gainers 🚀, 📉 Top Losers ⚠️
* Article container:

<div class="dark-info-box" style="background-color: #000000; padding: 24px; margin: 20px 0; border-radius: 8px;">
- Article title:
<h4 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">Article Title Here</h4>
- Bullets (3 concise insights, cyan bullets):
<ul style="margin: 16px 0 20px 0; padding-left: 0; list-style: none;">
<li style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
<span style="color: #06b6d4; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Insight here.
</li>
<li style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
<span style="color: #06b6d4; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Insight here.
</li>
<li style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #FFFFFF;">
<span style="color: #06b6d4; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Insight here.
</li>
</ul>

* Fun Fact Section (optional, playful, with laugh emojis):

<div style="background-color: #141414; border: 1px solid #06b6d4; padding: 12px; border-radius: 6px; margin: 16px 0;">
<p style="margin: 0; font-size: 14px; color: #FFFFFF; line-height: 1.4;">💡 <strong style="color: #06b6d4;">Fun Fact:</strong> Insert a short, surprising, or playful fact here. Include fun/laugh emojis (😂🤣😄) where relevant.</p>
</div>

* Insight section:

<div style="background-color: #141414; border: 1px solid #06b6d4; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p style="margin: 0; font-size: 14px; color: #FFFFFF; line-height: 1.4;">💡 <strong style="color: #06b6d4;">Bottom Line:</strong> Explain why this matters for regular investors in plain language.</p>
</div>

* Read More button:

<div style="margin: 20px 0 0 0;">
<a href="ARTICLE_URL" style="color: #06b6d4; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>

* Section dividers:

<div style="border-top: 1px solid #06b6d4; margin: 32px 0 24px 0;"></div>

Content Guidelines:

* Always include fun emojis in headings
* Include at least 1 fun/laugh emoji fact per article
* Organize news by logical sections
* Minimum 3 bullet points per article, concise and plain English
* Keep design clean, engaging, and playful`

// ✅ TradingView Symbol Mapping Prompt (unchanged except cleaned style)
export const TRADINGVIEW_SYMBOL_MAPPING_PROMPT = `You are an expert in financial markets and trading platforms. Map a Finnhub stock symbol to the correct TradingView symbol.

Stock info:
Symbol: {{symbol}}
Company: {{company}}
Exchange: {{exchange}}
Currency: {{currency}}
Country: {{country}}

RULES:

* Use correct TradingView format
* US stocks: just symbol (e.g., AAPL)
* International: include exchange prefix (e.g., LSE:BARC)
* ADRs/foreign shares may differ

RESPONSE:
Return ONLY a JSON object:
{
"tradingViewSymbol": "EXCHANGE:SYMBOL",
"confidence": "high|medium|low",
"reasoning": "Brief explanation"
}

EXAMPLES:

* Apple Inc. → {"tradingViewSymbol":"NASDAQ:AAPL","confidence":"high","reasoning":"Apple trades on NASDAQ as AAPL"}
* Microsoft → {"tradingViewSymbol":"NASDAQ:MSFT","confidence":"high","reasoning":"Microsoft trades on NASDAQ as MSFT"}
* Barclays PLC → {"tradingViewSymbol":"LSE:BARC","confidence":"high","reasoning":"Barclays trades on LSE as BARC"}`
