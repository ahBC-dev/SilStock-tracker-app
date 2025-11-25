/* Redesigned SilStocks email templates
   Theme: black cards, cyan headers (#0ea5e9), email-safe inline styles, responsive.
   All original image URLs, links and variables preserved.
*/

export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Welcome to SilStocks</title>
  <style>
    @media only screen and (max-width:600px){
      .mobile-padding{padding:20px!important;}
      .mobile-title{font-size:24px!important;}
      .mobile-text{font-size:14px!important;}
    }
  </style>
</head>
<body style="margin:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0b0c0f;border-radius:14px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:34px 34px 18px 34px;text-align:center;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);">
              <img src="https://ik.imagekit.io/kwzdel31q/logo.png" alt="SilStocks" width="110" style="display:block;margin:0 auto 18px auto;height:auto;">
              <h1 class="mobile-title" style="margin:0;font-size:30px;font-weight:700;color:#0ea5e9;line-height:1.1;">Welcome, {{name}}!</h1>
              <p style="margin:10px 0 0 0;color:#94a3b8;font-size:14px;">Your SilStocks account is ready — let's get you set up.</p>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding:34px;">
              <p class="mobile-text" style="margin:0 0 22px 0;color:#cbd5e1;font-size:16px;line-height:1.6;">
                {{intro}}
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px 0;">
                <tr>
                  <td style="padding:14px;background:#0f1720;border-radius:10px;border:1px solid #11151a;">
                    <div style="font-size:14px;color:#0ea5e9;font-weight:700;margin-bottom:6px;">📈 Watchlists</div>
                    <div style="font-size:14px;color:#cbd5e1;">Track your favorite stocks in real-time</div>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:14px;background:#0f1720;border-radius:10px;border:1px solid #11151a;">
                    <div style="font-size:14px;color:#0ea5e9;font-weight:700;margin-bottom:6px;">🔔 Smart Alerts</div>
                    <div style="font-size:14px;color:#cbd5e1;">Price and volume alerts delivered instantly</div>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:14px;background:#0f1720;border-radius:10px;border:1px solid #11151a;">
                    <div style="font-size:14px;color:#0ea5e9;font-weight:700;margin-bottom:6px;">📰 Market Insights</div>
                    <div style="font-size:14px;color:#cbd5e1;">Latest news and trends at your fingertips</div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="https://sil-stock-tracker-app-c48v.vercel.app/" style="display:inline-block;background:#0ea5e9;color:#000000;text-decoration:none;padding:14px 38px;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 20px rgba(14,165,233,0.18);">
                      Start Exploring →
                    </a>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid #11151a;padding-top:22px;">
                <tr>
                  <td align="center" style="color:#64748b;font-size:12px;line-height:1.5;">
                    SilStocks HQ • 200 Market Street, San Francisco, CA 94105<br>
                    <a href="#" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> • 
                    <a href="https://sil-stock-tracker-app-c48v.vercel.app/" style="color:#64748b;text-decoration:underline;">Visit</a><br>
                    © 2025 SilStocks. All rights reserved.
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;


export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Market News Summary</title>
  <style>
    @media only screen and (max-width:600px){
      .mobile-padding{padding:20px!important;}
      .mobile-title{font-size:20px!important;}
      .mobile-text{font-size:14px!important;}
    }
  </style>
</head>
<body style="margin:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0b0c0f;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:26px 30px;text-align:center;background:#071018;">
              <img src="https://ik.imagekit.io/kwzdel31q/logo.png" alt="SilStocks" width="96" style="display:block;margin:0 auto 12px auto;height:auto;">
              <h2 class="mobile-title" style="margin:0;font-size:22px;color:#0ea5e9;font-weight:700;">Market Digest</h2>
              <p style="margin:8px 0 0 0;color:#94a3b8;font-size:13px;">{{date}}</p>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding:28px;">
              <div style="color:#cbd5e1;font-size:15px;line-height:1.65;">
                {{newsContent}}
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid #11151a;padding-top:20px;">
                <tr>
                  <td align="center" style="color:#64748b;font-size:12px;line-height:1.5;">
                    You're receiving this as a SilStocks subscriber<br>
                    <a href="#" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> • 
                    <a href="https://silStocks.app" style="color:#64748b;text-decoration:underline;">Visit</a><br>
                    © 2025 SilStocks
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;


export const STOCK_ALERT_UPPER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Price Alert: {{symbol}} Hit Upper Target</title>
  <style>
    @media only screen and (max-width:600px){
      .mobile-padding{padding:20px!important;}
      .mobile-title{font-size:20px!important;}
    }
  </style>
</head>
<body style="margin:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0b0c0f;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#071018;padding:26px 30px;text-align:center;">
              <div style="font-size:42px;line-height:1;margin-bottom:6px;">📈</div>
              <h2 style="margin:0;font-size:22px;color:#0ea5e9;font-weight:700;">Price Target Reached</h2>
              <p style="margin:8px 0 0 0;color:#cbd5e1;font-size:13px;">{{timestamp}}</p>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding:28px;text-align:center;">
              <h3 style="margin:0 0 6px 0;font-size:28px;color:#0ea5e9;font-weight:800;">{{symbol}}</h3>
              <p style="margin:0 0 14px 0;color:#94a3b8;font-size:15px;">{{company}}</p>

              <div style="font-size:36px;font-weight:800;color:#0ea5e9;margin-bottom:8px;">{{currentPrice}}</div>
              <p style="margin:0 0 20px 0;color:#94a3b8;font-size:14px;">Target: {{targetPrice}}</p>

              <div style="background:#071017;padding:16px;border-radius:10px;border:1px solid #11151a;margin:20px 0;">
                <h4 style="margin:0 0 8px 0;color:#0ea5e9;font-size:16px;">Opportunity Alert!</h4>
                <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.5;">{{symbol}} has reached your target price. Consider reviewing your position.</p>
              </div>

              <a href="https://sil-stock-tracker-app-c48v.vercel.app/" style="display:inline-block;background:#0ea5e9;color:#000000;padding:12px 32px;border-radius:999px;text-decoration:none;font-weight:700;box-shadow:0 8px 20px rgba(14,165,233,0.18);">View Dashboard</a>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;border-top:1px solid #11151a;padding-top:18px;">
                <tr>
                  <td align="center" style="color:#64748b;font-size:12px;line-height:1.5;">
                    SilStocks Alerts • <a href="#" style="color:#64748b;text-decoration:underline;">Unsubscribe</a><br>© 2025 SilStocks
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;


export const STOCK_ALERT_LOWER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Price Alert: {{symbol}} Hit Lower Target</title>
  <style>
    @media only screen and (max-width:600px){
      .mobile-padding{padding:20px!important;}
      .mobile-title{font-size:20px!important;}
    }
  </style>
</head>
<body style="margin:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0b0c0f;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#071018;padding:26px 30px;text-align:center;">
              <div style="font-size:42px;line-height:1;margin-bottom:6px;">📉</div>
              <h2 style="margin:0;font-size:22px;color:#0ea5e9;font-weight:700;">Price Below Target</h2>
              <p style="margin:8px 0 0 0;color:#cbd5e1;font-size:13px;">{{timestamp}}</p>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding:28px;text-align:center;">
              <h3 style="margin:0 0 6px 0;font-size:28px;color:#ef4444;font-weight:800;">{{symbol}}</h3>
              <p style="margin:0 0 14px 0;color:#94a3b8;font-size:15px;">{{company}}</p>

              <div style="font-size:36px;font-weight:800;color:#ef4444;margin-bottom:8px;">{{currentPrice}}</div>
              <p style="margin:0 0 18px 0;color:#94a3b8;font-size:14px;">Target: {{targetPrice}}</p>

              <div style="background:#071017;padding:16px;border-radius:10px;border:1px solid #11151a;margin:20px 0;">
                <h4 style="margin:0 0 8px 0;color:#0ea5e9;font-size:16px;">Buying Opportunity</h4>
                <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.5;">{{symbol}} dropped below your target price. This might be a good time to buy.</p>
              </div>

              <a href="https://sil-stock-tracker-app-c48v.vercel.app/" style="display:inline-block;background:#0ea5e9;color:#000000;padding:12px 32px;border-radius:999px;text-decoration:none;font-weight:700;box-shadow:0 8px 20px rgba(14,165,233,0.18);">View Dashboard</a>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;border-top:1px solid #11151a;padding-top:18px;">
                <tr>
                  <td align="center" style="color:#64748b;font-size:12px;line-height:1.5;">
                    SilStocks Alerts • <a href="#" style="color:#64748b;text-decoration:underline;">Unsubscribe</a><br>© 2025 SilStocks
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;


export const VOLUME_ALERT_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Volume Alert: {{symbol}}</title>
  <style>
    @media only screen and (max-width:600px){
      .mobile-padding{padding:20px!important;}
      .mobile-title{font-size:20px!important;}
    }
  </style>
</head>
<body style="margin:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0b0c0f;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#071018;padding:26px 30px;text-align:center;">
              <div style="font-size:42px;line-height:1;margin-bottom:6px;">📊</div>
              <h2 style="margin:0;font-size:22px;color:#0ea5e9;font-weight:700;">Volume Spike Detected</h2>
              <p style="margin:8px 0 0 0;color:#cbd5e1;font-size:13px;">{{timestamp}}</p>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding:28px;text-align:center;">
              <h3 style="margin:0 0 6px 0;font-size:28px;color:#0ea5e9;font-weight:800;">{{symbol}}</h3>
              <p style="margin:0 0 14px 0;color:#94a3b8;font-size:15px;">{{company}}</p>

              <div style="font-size:36px;font-weight:800;color:#0ea5e9;margin-bottom:8px;">{{currentVolume}}M</div>
              <p style="margin:0 0 18px 0;color:#94a3b8;font-size:14px;">{{alertMessage}}</p>

              <a href="https://sil-stock-tracker-app-c48v.vercel.app/" style="display:inline-block;background:#0ea5e9;color:#000000;padding:12px 32px;border-radius:999px;text-decoration:none;font-weight:700;box-shadow:0 8px 20px rgba(14,165,233,0.18);">Investigate Now</a>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;border-top:1px solid #11151a;padding-top:18px;">
                <tr>
                  <td align="center" style="color:#64748b;font-size:12px;line-height:1.5;">
                    SilStocks Volume Alerts • <a href="#" style="color:#64748b;text-decoration:underline;">Unsubscribe</a><br>© 2025 SilStocks
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;


export const INACTIVE_USER_REMINDER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>We Miss You! Your Market Insights Await</title>
  <style>
    @media only screen and (max-width:600px){
      .mobile-padding{padding:20px!important;}
      .mobile-title{font-size:22px!important;}
      .mobile-text{font-size:14px!important;}
    }
  </style>
</head>
<body style="margin:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" style="max-width:600px;background:#0b0c0f;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:34px 34px 18px 34px;text-align:center;background:#071018;">
              <img src="https://ik.imagekit.io/kwzdel31q/logo.png" alt="SilStocks" width="96" style="display:block;margin:0 auto 14px auto;height:auto;">
              <h1 class="mobile-title" style="margin:0;font-size:26px;color:#0ea5e9;font-weight:700;">We Miss You, {{name}}!</h1>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding:28px;text-align:center;">
              <p class="mobile-text" style="margin:0 0 20px 0;color:#cbd5e1;font-size:15px;line-height:1.6;">
                The markets have been moving, and there might be opportunities you don't want to miss!
              </p>

              <div style="background:#071017;padding:18px;border-radius:10px;border:1px solid #11151a;margin:18px 0;">
                <h4 style="margin:0 0 8px 0;color:#0ea5e9;font-size:16px;">Market Update</h4>
                <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.5;">Major indices have seen significant movements recently. Your watchlists are ready and waiting!</p>
              </div>

              <a href="{{dashboardUrl}}" style="display:inline-block;background:#0ea5e9;color:#000000;padding:14px 36px;border-radius:999px;text-decoration:none;font-weight:700;box-shadow:0 8px 20px rgba(14,165,233,0.18);">Return to Dashboard</a>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;border-top:1px solid #11151a;padding-top:18px;">
                <tr>
                  <td align="center" style="color:#64748b;font-size:12px;line-height:1.5;">
                    Questions? Reply to this email<br>
                    <a href="{{unsubscribeUrl}}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> • 
                    <a href="{{dashboardUrl}}" style="color:#64748b;text-decoration:underline;">Visit</a><br>
                    © 2025 SilStocks
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

