# Deployment Guide for M05 Exam Question Practice App

## Recommended Hosting Options

### 1. **PythonAnywhere** (Easiest - Recommended for Quick Setup)
**Best for:** Quick deployment, free tier available, Python-focused

**Pros:**
- Free tier available (limited but functional)
- Easy Flask deployment
- Built-in file management
- No server configuration needed

**Cons:**
- Free tier has limitations (web app sleeps after inactivity)
- Limited customization

**Steps:**
1. Sign up at https://www.pythonanywhere.com
2. Upload your code via web interface or git
3. Create a web app (Flask)
4. Set environment variables for credentials
5. Configure static files mapping

**Cost:** Free tier available, $5/month for hobbyist

---

### 2. **Railway** (Modern & Easy)
**Best for:** Modern deployment, easy setup, good free tier

**Pros:**
- Very easy deployment
- Free tier with $5 credit/month
- Automatic HTTPS
- Git-based deployment
- Good documentation

**Cons:**
- Free tier may sleep after inactivity
- Requires credit card (but free tier available)

**Steps:**
1. Sign up at https://railway.app
2. Connect GitHub repository (or upload code)
3. Railway auto-detects Flask app
4. Set environment variables
5. Deploy!

**Cost:** Free tier with $5 credit/month, then pay-as-you-go

---

### 3. **Render** (Simple & Reliable)
**Best for:** Simple deployment, good free tier

**Pros:**
- Free tier available
- Easy setup
- Automatic HTTPS
- Good for Flask apps

**Cons:**
- Free tier sleeps after 15 min inactivity
- Slower cold starts

**Steps:**
1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub or upload code
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `python3 app.py`
6. Set environment variables

**Cost:** Free tier available, $7/month for always-on

---

### 4. **DigitalOcean App Platform** (Balanced)
**Best for:** More control, reasonable pricing

**Pros:**
- $5/month basic plan
- Always-on (no sleeping)
- Good performance
- Easy scaling

**Cons:**
- Requires payment (no free tier)
- Slightly more setup

**Cost:** $5/month minimum

---

### 5. **VPS (DigitalOcean Droplet, Linode, Vultr)** (Most Control)
**Best for:** Full control, learning, custom setup

**Pros:**
- Full control
- Can run multiple apps
- Learn server management
- $5-6/month

**Cons:**
- Requires server management knowledge
- Need to set up nginx, SSL, etc.
- More maintenance

**Cost:** $5-6/month

---

## Quick Setup for Railway (Recommended)

### Prerequisites:
1. GitHub account
2. Railway account (free)

### Steps:

1. **Create a Procfile** (for Railway):
```
web: python3 app.py
```

2. **Update app.py for production:**
```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
```

3. **Set Environment Variables in Railway:**
   - `APP_USERNAME=aaron`
   - `APP_PASSWORD=m05pass2025`
   - `SECRET_KEY=<generate a random secret key>`

4. **Deploy:**
   - Push code to GitHub
   - Connect Railway to GitHub repo
   - Railway auto-deploys

---

## Quick Setup for Render

1. **Create account** at render.com
2. **New Web Service** → Connect GitHub
3. **Settings:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python3 app.py`
   - Environment Variables:
     - `APP_USERNAME=aaron`
     - `APP_PASSWORD=m05pass2025`
     - `SECRET_KEY=<random key>`
     - `PORT=5001`

---

## Security Checklist Before Hosting:

- [ ] Change default credentials (use environment variables)
- [ ] Set a strong SECRET_KEY
- [ ] Use HTTPS (most platforms provide this automatically)
- [ ] Consider adding rate limiting
- [ ] Review file upload security

---

## Environment Variables to Set:

```bash
APP_USERNAME=aaron
APP_PASSWORD=m05pass2025
SECRET_KEY=<generate a secure random key>
PORT=5001  # Some platforms set this automatically
```

---

## Recommended: Railway or Render

For your use case, I'd recommend **Railway** or **Render** because:
- Easy setup
- Free tier to start
- Automatic HTTPS
- Good for Flask apps
- Minimal configuration needed

