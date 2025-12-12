# Project Structure - nextjs-demo

```
nextjs-demo/
│
├── app/                              # Next.js App Router
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   │
│   ├── (auth)/                       # Auth route group
│   │   ├── layout.tsx               # Auth layout
│   │   ├── sign-in/
│   │   │   └── page.tsx             # Sign in page
│   │   └── sign-up/
│   │       └── page.tsx             # Sign up page
│   │
│   ├── (root)/                       # Main app route group
│   │   ├── layout.tsx               # Main layout
│   │   ├── page.tsx                 # Home page
│   │   ├── stocks/
│   │   │   └── [symbol]/
│   │   │       └── page.tsx         # Stock detail page
│   │   └── watchlist/
│   │       └── [symbol]/
│   │           └── page.tsx         # Watchlist symbol page
│   │
│   ├── api/                          # API routes
│   │   ├── auth/
│   │   │   └── [...all]/
│   │   │       └── route.ts         # Auth catch-all route
│   │   ├── inngest/
│   │   │   └── route.ts             # Inngest webhook
│   │   ├── test-db/
│   │   │   └── route.ts             # DB test endpoint
│   │   └── watchlist/
│   │       └── route.ts             # Watchlist API
│   │
│   └── types/
│       └── global.d.ts               # Global type definitions
│
├── components/                        # React components
│   ├── Header.tsx
│   ├── Navitems.tsx
│   ├── SearchCommand.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── TradingViewWIdgets.tsx
│   ├── UserDropDown.tsx
│   ├── WatchlistButton.tsx
│   │
│   ├── form/                         # Form components
│   │   ├── CountrySelectField.tsx
│   │   ├── FooterLink.tsx
│   │   ├── InputField.tsx
│   │   └── SelectField.tsx
│   │
│   └── ui/                           # UI components (shadcn/ui)
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── command.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       └── sonner.tsx
│
├── database/                          # Database configuration
│   ├── mongoose.ts                   # Mongoose connection
│   └── models/
│       └── watchlist.model.ts        # Watchlist model
│
├── hooks/                             # Custom React hooks
│   ├── useDebounce.tsx
│   └── useTradingViewWidget.tsx
│
├── lib/                               # Utility libraries
│   ├── constants.ts                  # App constants
│   ├── utils.ts                      # Utility functions
│   │
│   ├── actions/                      # Server actions
│   │   ├── call.actions.ts
│   │   ├── finnhub.actions.ts
│   │   ├── user.actions.ts
│   │   └── watchlist.actions.ts
│   │
│   ├── better-auth/                  # Authentication setup
│   │   └── auth.ts
│   │
│   ├── Inngest/                      # Inngest functions
│   │   ├── client.ts
│   │   ├── functions.ts
│   │   └── prompts.ts
│   │
│   └── nodemailer/                   # Email configuration
│       ├── index.ts
│       └── templates.ts
│
├── middleware/                        # Next.js middleware
│   └── index.ts
│
├── public/                            # Static assets
│   └── assets/
│       ├── icons/
│       └── images/
│
├── scripts/                           # Utility scripts
│   └── test-db-connection.ts
│
├── components.json                    # shadcn/ui config
├── DATABASE_TEST_INSTRUCTIONS.md
├── eslint.config.mjs                 # ESLint configuration
├── folder-tree.txt
├── next-env.d.ts                     # Next.js types
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
├── postcss.config.mjs                # PostCSS configuration
├── README.md
├── tsconfig.json                     # TypeScript configuration
└── tree
```

## Key Features

### 🔐 Authentication
- Better Auth integration (`lib/better-auth/`)
- Sign in/up pages (`app/(auth)/`)
- User management actions

### 📊 Stock Tracking
- Stock detail pages (`app/(root)/stocks/[symbol]/`)
- Watchlist functionality
- TradingView widget integration

### 🗄️ Database
- MongoDB with Mongoose
- Watchlist model
- Connection utilities

### 🎨 UI Components
- shadcn/ui component library
- Theme toggle (dark/light mode)
- Custom form components
- Search command palette

### 🔧 Infrastructure
- Inngest for background jobs
- Nodemailer for emails
- Finnhub API integration
- Server actions for data mutations

### 📡 API Routes
- Authentication endpoints
- Watchlist CRUD operations
- Database testing
- Inngest webhooks
