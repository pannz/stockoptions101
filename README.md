# Stock Options & RSUs Guide

A comprehensive web application for Chinese employees working at foreign companies to understand and manage their stock compensation.

## Features

### 📚 Educational Content (Info Page)
- **Stock Options 101**: ISO vs NSO, vesting schedules, exercise mechanics
- **RSUs 101**: How they work, vesting timeline, tax events  
- **Tax Guide**: US tax implications, China tax considerations, double taxation
- **Exercise Strategies**: When to exercise, hold vs sell decisions

### 🧮 Interactive Calculators
- **Options Calculator**: Current value, potential gains, break-even analysis
- **RSUs Calculator**: Vesting tracker, tax withholding estimates
- **Decision Advisor**: Personalized recommendations based on your situation

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite (instead of turbopack for Cloudflare compatibility)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Pages/Workers

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development

The app has a simple 2-page structure:
- `/` - Educational content and 101 guide
- `/calculator` - Interactive calculators and decision tools

### Deployment to Cloudflare

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
pnpm deploy
```

## Important Disclaimers

⚠️ **This is educational content only**. Tax laws are complex and change frequently. Always consult with qualified financial and tax professionals before making decisions about your stock compensation.

⚠️ **Not Financial Advice**: The calculators and recommendations are for educational purposes and should not be considered personalized financial advice.

## Contributing

This project is designed to help Chinese employees better understand their stock compensation. Contributions that improve accuracy, add relevant information, or enhance the user experience are welcome.

## License

MIT License - feel free to use this code for educational purposes.
