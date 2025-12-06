// Results page logic
document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is authenticated
    try {
        const authResponse = await fetch('/api/check-auth');
        const authData = await authResponse.json();
        if (!authData.authenticated) {
            window.location.href = '/login';
            return;
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/login';
        return;
    }
    let results;
    try {
        const resultsData = sessionStorage.getItem('quizResults');
        if (!resultsData) {
            // No results, show message and redirect
            document.body.innerHTML = `
                <div class="container">
                    <header><h1>Quiz Results</h1></header>
                    <div class="results-content">
                        <div class="results-card">
                            <p>No quiz results found. Please complete a quiz first.</p>
                            <button onclick="window.location.href='/'" class="btn-primary">Go to Home</button>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        results = JSON.parse(resultsData);
    } catch (e) {
        console.error('Error parsing results:', e);
        document.body.innerHTML = `
            <div class="container">
                <header><h1>Quiz Results</h1></header>
                <div class="results-content">
                    <div class="results-card">
                        <p>Error loading results. Please try again.</p>
                        <button onclick="window.location.href='/'" class="btn-primary">Go to Home</button>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    displayResults(results);
    
    document.getElementById('reviewBtn').addEventListener('click', () => {
        toggleReview(results);
    });
    
    document.getElementById('newQuizBtn').addEventListener('click', () => {
        window.location.href = '/';
    });
    
    // Add history button if it exists
    const historyBtn = document.getElementById('historyBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', () => {
            window.location.href = '/history';
        });
    }
});

function displayResults(results) {
    // Update score display
    document.getElementById('finalScore').textContent = results.correct;
    document.getElementById('finalTotal').textContent = results.total;
    document.getElementById('scorePercentage').textContent = results.percentage + '%';
    
    // Update stats
    document.getElementById('correctCount').textContent = results.correct;
    document.getElementById('incorrectCount').textContent = results.incorrect;
    document.getElementById('totalCount').textContent = results.total;
    
    // Update score circle color based on percentage
    const scoreCircle = document.querySelector('.score-circle');
    if (results.percentage >= 80) {
        scoreCircle.style.borderColor = '#4caf50';
    } else if (results.percentage >= 60) {
        scoreCircle.style.borderColor = '#ff9800';
    } else {
        scoreCircle.style.borderColor = '#f44336';
    }
}

function toggleReview(results) {
    const reviewSection = document.getElementById('reviewSection');
    const reviewBtn = document.getElementById('reviewBtn');
    
    if (reviewSection.classList.contains('hidden')) {
        reviewSection.classList.remove('hidden');
        reviewBtn.textContent = 'Hide Review';
        displayReview(results);
    } else {
        reviewSection.classList.add('hidden');
        reviewBtn.textContent = 'Review Answers';
    }
}

function displayReview(results) {
    const reviewContent = document.getElementById('reviewContent');
    let html = '';
    
    results.questions.forEach((question, index) => {
        const answer = results.answers[index];
        const isCorrect = answer.correct;
        
        html += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-header">
                    <span class="review-number">Question ${index + 1}</span>
                    <span class="review-status">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <div class="review-question">${question.question}</div>
                <div class="review-answers">
                    <div class="review-answer ${answer.selected === question.correct_answer ? 'correct' : ''}">
                        <strong>Your answer:</strong> ${answer.selected}) ${getOptionText(question, answer.selected)}
                    </div>
                    ${!isCorrect ? `
                        <div class="review-answer correct">
                            <strong>Correct answer:</strong> ${question.correct_answer}) ${getOptionText(question, question.correct_answer)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    reviewContent.innerHTML = html;
}

function getOptionText(question, letter) {
    const option = question.options.find(opt => opt.letter === letter);
    return option ? option.text : '';
}

