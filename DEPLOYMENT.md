# Deployment Instructions

## Cloudflare Pages Deployment

### Option 1: Automatic Deployment via Git

1. **Connect Repository to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages > Create a project
   - Connect your Git repository
   - Set build settings:
     - **Framework preset**: None
     - **Build command**: `pnpm build`
     - **Build output directory**: `dist`
     - **Root directory**: `/` (leave empty)

2. **Environment Variables:**
   - No environment variables needed for this static site

### Option 2: Manual Deployment via Wrangler CLI

1. **Install Wrangler CLI:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   pnpm build
   wrangler pages deploy dist --project-name exercise-or-not
   ```

### Option 3: Direct Upload

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Upload via Cloudflare Dashboard:**
   - Go to Pages > Create a project
   - Choose "Upload assets"
   - Drag and drop the `dist` folder
   - Set project name: `exercise-or-not`

## Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to Custom domains
3. Add your domain and follow DNS setup instructions

## Performance Optimizations

The app is already optimized for Cloudflare Pages:
- Static site generation (SSG)
- Optimized asset bundling with Vite
- TailwindCSS purging for minimal CSS
- Modern JavaScript output

## Monitoring

- Cloudflare provides analytics and performance metrics
- Check Web Vitals in the Pages dashboard
- Monitor function invocations (if any backend features are added)

## Troubleshooting

- **Build Fails**: Check Node.js version compatibility (18+)
- **Routing Issues**: Ensure `_routes.json` is properly configured
- **Assets Not Loading**: Verify base path in `vite.config.ts`
