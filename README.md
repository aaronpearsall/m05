# M05 Exam Question Practice App

This app helps you practice multiple choice questions from insurance law exam papers with detailed feedback.

## Setup

1. **Upload Exam Papers**: Place your exam papers (PDF or text files) in the `exam_papers/` directory
   - **Recommended: Use `.txt` files** for more reliable parsing (see `EXAM_PAPER_TEXT_FORMAT.md` for format guide)
   - PDFs are supported but may have parsing issues with page breaks and formatting
2. **Upload Study Text**: Place your study text materials (PDF or text files) in the `study_text/` directory
3. **Upload Question Explanations** (Optional): Place a text file with "explanation", "answer", or "concept" in the filename in the `study_text/` directory. The app will use these pre-written explanations instead of searching the study text. See `study_text/EXPLANATIONS_FORMAT.txt` for format examples.
4. **Install Dependencies**: Run `pip install -r requirements.txt`
5. **Set Login Credentials** (Optional): Set environment variables for custom credentials:
   - `export APP_USERNAME=your_username`
   - `export APP_PASSWORD=your_password`
   - `export SECRET_KEY=your_secret_key` (for session security)
6. **Run the App**: Run `python3 app.py` and open `http://localhost:5001` in your browser

## Login

**Default Credentials:**
- Username: `aaron`
- Password: `m05pass2025`

**Important:** Change these credentials before hosting online by setting environment variables.

## Features

- Multiple choice questions from exam papers
- Instant feedback on answers
- Detailed explanations with study text references
- Marking system to track your progress
- Concept explanations and definitions

## File Structure

```
m05/
├── exam_papers/          # Upload your exam papers here
├── study_text/           # Upload your study text here
├── app.py               # Flask backend
├── static/              # Frontend assets
├── templates/           # HTML templates
├── requirements.txt     # Python dependencies
└── deploy.sh            # Quick deployment script
```

## Updating the Live App

After making changes to your files:

1. **Option 1: Use the deploy script** (easiest)
   ```bash
   ./deploy.sh "Your commit message"
   ```

2. **Option 2: Manual git commands**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. **Railway will automatically redeploy** when it detects the push to GitHub (usually takes 1-2 minutes)

**Note:** Make sure Railway is connected to your GitHub repository and has auto-deploy enabled (this is the default).

