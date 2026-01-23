# Step-by-Step Guide: Deploy to GitHub Pages

## Prerequisites
- Your code is already on GitHub at: `https://github.com/aneesh-123/OssiclesVisualizer`
- You have Node.js and npm installed
- You have git installed

## Step 1: Make sure your code is up to date

1. Open your terminal/command prompt in the project folder
2. Check if you have any uncommitted changes:
   ```bash
   git status
   ```
3. If you have changes, commit and push them:
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages deployment"
   git push
   ```

## Step 2: Deploy to GitHub Pages

1. In your terminal, make sure you're in the project folder (`OssiclesVisualizer`)
2. Run the deploy command:
   ```bash
   npm run deploy
   ```
   
   This will:
   - Build your app for production
   - Create a `gh-pages` branch
   - Push the built files to GitHub

3. Wait for it to complete (it may take 1-2 minutes)

## Step 3: Enable GitHub Pages in GitHub Settings

1. Go to your GitHub repository: https://github.com/aneesh-123/OssiclesVisualizer
2. Click on the **Settings** tab (at the top of the repository page, next to "Code", "Issues", etc.)
3. In the left sidebar, scroll down and click **Pages** (under "Code and automation" section)
4. You'll see a section called **"Build and deployment"** or **"Source"**
   - If you see a dropdown that says "None" or "Deploy from a branch", click it
   - Select **"Deploy from a branch"**
5. Below that, you'll see options for:
   - **Branch**: Select **gh-pages** from the dropdown
   - **Folder**: Select **/ (root)** from the dropdown
6. Click **Save** button

**Note**: If you don't see "gh-pages" in the branch dropdown yet, make sure you've completed Step 2 (running `npm run deploy`) first. The branch needs to exist before you can select it.

## Step 4: Wait for GitHub to publish your site

- GitHub will show a message: "Your site is ready to be published at..."
- It may take 1-5 minutes for the site to become available
- You can refresh the Settings → Pages page to see the status

## Step 5: Access your live site

Your site will be available at:
**https://aneesh-123.github.io/OssiclesVisualizer/**

(Note: The first deployment may take a few minutes. If you get a 404, wait 2-3 minutes and try again.)

## Updating Your Site

Whenever you make changes and want to update the live site:

1. Make your code changes
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Run the deploy command again:
   ```bash
   npm run deploy
   ```
4. Wait 1-2 minutes for GitHub to update the site

## Troubleshooting

**Problem: Site shows 404 or blank page**
- Wait 2-3 minutes after first deployment
- Check that the `gh-pages` branch exists in your repository
- Verify in Settings → Pages that it's set to deploy from `gh-pages` branch

**Problem: Assets (images, CSS) don't load**
- Make sure the base path in `vite.config.ts` matches your repository name
- For your repo, it should be `/OssiclesVisualizer/` (which it already is)

**Problem: Deploy command fails**
- Make sure you're logged into GitHub (git config)
- Try running `npm run build` first to see if there are build errors
- Check that `gh-pages` package is installed: `npm list gh-pages`
