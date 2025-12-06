# Step-by-Step Railway Deployment Guide

## Prerequisites
- GitHub account (free)
- Railway account (free)

---

## Step 1: Create a GitHub Repository

1. **Go to GitHub** (https://github.com)
2. **Sign in** or create an account
3. **Click the "+" icon** in the top right → **"New repository"**
4. **Repository settings:**
   - Name: `m05-exam-practice` (or any name you prefer)
   - Description: "M05 Exam Question Practice App"
   - **Make it Private** (recommended for your exam app)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click **"Create repository"**

---

## Step 2: Push Your Code to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in
3. Click **"File" → "Add Local Repository"**
4. Navigate to `/Users/aaronpearsall/m05`
5. Click **"Publish repository"**
6. Choose your new repository
7. Click **"Publish"**

### Option B: Using Terminal (Command Line)

Open Terminal and run these commands:

```bash
cd /Users/aaronpearsall/m05

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - M05 Exam Practice App"

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/m05-exam-practice.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** You'll need to authenticate with GitHub. If prompted, use a Personal Access Token instead of password.

---

## Step 3: Create Railway Account

1. **Go to Railway**: https://railway.app
2. **Click "Start a New Project"** or **"Login"**
3. **Sign up** using GitHub (recommended - easiest)
   - Click **"Login with GitHub"**
   - Authorize Railway to access your GitHub account
4. You'll be taken to the Railway dashboard

---

## Step 4: Deploy Your App on Railway

1. **In Railway dashboard**, click **"New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Authorize Railway** to access your GitHub repositories (if first time)
4. **Select your repository** (`m05-exam-practice` or whatever you named it)
5. Railway will automatically:
   - Detect it's a Python/Flask app
   - Start building and deploying

---

## Step 5: Configure Environment Variables

1. **Click on your deployed service** in Railway
2. **Go to the "Variables" tab**
3. **Click "New Variable"** and add each of these:

   **Variable 1:**
   - Key: `APP_USERNAME`
   - Value: `aaron`
   - Click "Add"

   **Variable 2:**
   - Key: `APP_PASSWORD`
   - Value: `m05pass2025`
   - Click "Add"

   **Variable 3:**
   - Key: `SECRET_KEY`
   - Value: `[Generate a random key - see below]`
   - Click "Add"

   **Variable 4:**
   - Key: `FLASK_DEBUG`
   - Value: `False`
   - Click "Add"

### Generate a SECRET_KEY:

You can generate a random secret key using Python:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Or use this online tool: https://randomkeygen.com/

Copy the generated key and paste it as the value for `SECRET_KEY`.

---

## Step 6: Get Your App URL

1. **In Railway**, click on your service
2. **Go to the "Settings" tab**
3. **Scroll down to "Domains"**
4. **Click "Generate Domain"** (Railway provides a free subdomain)
5. **Copy the generated URL** (e.g., `your-app-name.up.railway.app`)

---

## Step 7: Test Your App

1. **Open the URL** in your browser
2. **You should see the login page**
3. **Log in with:**
   - Username: `aaron`
   - Password: `m05pass2025`
4. **Test the app** to make sure everything works

---

## Step 8: Upload Your Files (Important!)

Your exam papers and study text need to be uploaded to Railway:

### Option A: Via Railway Dashboard (Easiest)

1. **In Railway**, go to your service
2. **Click "View Logs"** or **"Deployments"**
3. **Click the three dots** (⋯) → **"Open in Browser"** or use the terminal
4. **Navigate to the file system** and upload:
   - PDF files to `exam_papers/` folder
   - Study text files to `study_text/` folder

### Option B: Via Git (Recommended)

1. **Add your PDFs and study text files** to your local project
2. **Commit and push** to GitHub:
   ```bash
   git add exam_papers/*.pdf study_text/*.pdf study_text/*.txt
   git commit -m "Add exam papers and study text"
   git push
   ```
3. **Railway will automatically redeploy** with the new files

**Note:** Make sure your PDFs and study text files are in the correct folders:
- Exam papers: `exam_papers/` folder
- Study text: `study_text/` folder
- Explanations file: `study_text/` folder (if you have one)

---

## Step 9: Custom Domain (Optional)

If you want a custom domain:

1. **In Railway**, go to your service → **Settings** → **Domains**
2. **Click "Custom Domain"**
3. **Enter your domain** (e.g., `exam-practice.yourdomain.com`)
4. **Follow Railway's DNS instructions** to point your domain

---

## Troubleshooting

### App won't start:
- Check **"Deployments"** tab for error logs
- Verify all environment variables are set correctly
- Make sure `Procfile` exists and is correct

### Can't log in:
- Verify `APP_USERNAME` and `APP_PASSWORD` environment variables
- Check that `SECRET_KEY` is set

### Files not found:
- Make sure PDFs and study text are in the correct folders
- Check file paths in the code match Railway's file structure

### Port errors:
- Railway automatically sets the `PORT` environment variable
- The app is configured to use it automatically

---

## Updating Your App

Whenever you make changes:

1. **Make changes locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. **Railway automatically redeploys** your app

---

## Cost

- **Free tier:** $5 credit per month (usually enough for personal use)
- **After free tier:** Pay-as-you-go, very affordable
- **Custom domain:** Free (just need to own the domain)

---

## Security Notes

- Your app is now publicly accessible
- Consider changing the password to something stronger
- The free Railway domain is fine for personal use
- For production, consider adding rate limiting

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check Railway logs in the dashboard for errors

