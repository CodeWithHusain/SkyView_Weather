# GitHub Upload Guide

## Key Files for VS Code Preview

Here are the main files you should review in VS Code before uploading to GitHub:

### Project Configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite configuration
- `.env.example` - Example environment variables
- `.gitignore` - Files to exclude from Git

### Frontend Files
- `client/src/App.tsx` - Main App component
- `client/src/main.tsx` - Entry point
- `client/src/index.css` - Global styles
- `client/src/pages/Weather.tsx` - Main weather page
- `client/src/context/WeatherContext.tsx` - Theme and unit context
- `client/src/components/` - All UI components
- `client/src/hooks/useWeather.ts` - Weather data hook
- `client/src/utils/helpers.ts` - Utility functions
- `client/src/lib/weatherApi.ts` - API client
- `client/src/types/weather.ts` - TypeScript interfaces

### Backend Files
- `server/index.ts` - Server entry point
- `server/routes.ts` - API routes
- `server/storage.ts` - Data storage
- `shared/schema.ts` - Shared data schema

### Documentation
- `README.md` - Project documentation
- `LICENSE` - MIT license

## Steps to Upload to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Enter a repository name (e.g., "skyview-weather")
   - Add a description (optional)
   - Choose public or private visibility
   - Do not initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Initialize Git in your local project** 
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Add the remote repository and push**
   ```bash
   git remote add origin https://github.com/yourusername/skyview-weather.git
   git branch -M main
   git push -u origin main
   ```

4. **Verify your upload**
   - Visit your repository on GitHub to confirm all files were uploaded

## Additional Information

### GitHub Pages Setup (Optional)
If you want to deploy your app to GitHub Pages:

1. Create a new branch named `gh-pages`
2. Build your app with `npm run build`
3. Copy the contents of the `dist` directory to the `gh-pages` branch
4. Push the `gh-pages` branch to GitHub
5. Enable GitHub Pages in your repository settings

### GitHub Actions Setup (Optional)
To set up CI/CD with GitHub Actions:

1. Create a `.github/workflows` directory
2. Create a workflow file, e.g., `deploy.yml`
3. Configure the workflow to build and deploy your app

## Best Practices
- Always keep your API keys and sensitive information in the `.env` file (not tracked by Git)
- Regularly update your dependencies with `npm update`
- Write meaningful commit messages