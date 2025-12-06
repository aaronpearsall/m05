let questions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;

// Load questions on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions();
    
    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', prevQuestion);
    document.getElementById('reloadBtn').addEventListener('click', reloadQuestions);
});

async function loadQuestions() {
    try {
        showLoading();
        const response = await fetch('/api/questions');
        questions = await response.json();
        
        if (questions.length === 0) {
            showNoQuestions();
        } else {
            showQuestion();
            updateStats();
        }
    } catch (error) {
        console.error('Error loading questions:', error);
        showError('Failed to load questions. Please try again.');
    }
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('questionContainer').classList.add('hidden');
    document.getElementById('noQuestions').classList.add('hidden');
}

function showNoQuestions() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('questionContainer').classList.add('hidden');
    document.getElementById('noQuestions').classList.remove('hidden');
}

function showQuestion() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('questionContainer').classList.remove('hidden');
    document.getElementById('noQuestions').classList.add('hidden');
    
    if (questions.length === 0) return;
    
    const question = questions[currentQuestionIndex];
    
    // Update question number and progress
    document.getElementById('currentQuestionNum').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.letter = option.letter;
        optionDiv.innerHTML = `
            <span class="option-label">${option.letter})</span>
            <span>${option.text}</span>
        `;
        optionDiv.addEventListener('click', () => selectOption(option.letter));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Reset UI state
    selectedAnswer = null;
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('prevBtn').classList.toggle('hidden', currentQuestionIndex === 0);
    
    // Clear feedback
    clearFeedback();
}

function selectOption(letter) {
    selectedAnswer = letter;
    
    // Update UI
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector(`.option[data-letter="${letter}"]`).classList.add('selected');
    
    document.getElementById('submitBtn').disabled = false;
}

async function submitAnswer() {
    if (!selectedAnswer) return;
    
    const question = questions[currentQuestionIndex];
    
    try {
        const response = await fetch('/api/submit-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question_id: question.id,
                answer: selectedAnswer
            })
        });
        
        const feedback = await response.json();
        displayFeedback(feedback, question);
        
        // Update option styling
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
            const letter = opt.dataset.letter;
            if (letter === feedback.correct_answer) {
                opt.classList.add('correct');
            } else if (letter === selectedAnswer && !feedback.is_correct) {
                opt.classList.add('incorrect');
            }
        });
        
        // Show next button
        document.getElementById('submitBtn').classList.add('hidden');
        if (currentQuestionIndex < questions.length - 1) {
            document.getElementById('nextBtn').classList.remove('hidden');
        }
        
    } catch (error) {
        console.error('Error submitting answer:', error);
        showError('Failed to submit answer. Please try again.');
    }
}

function displayFeedback(feedback, question) {
    const feedbackContent = document.getElementById('feedbackContent');
    
    let html = `
        <div class="feedback-result ${feedback.is_correct ? 'correct' : 'incorrect'}">
            <h3>${feedback.is_correct ? '✓ Correct!' : '✗ Incorrect'}</h3>
            <p><strong>Your answer:</strong> ${selectedAnswer}) ${feedback.selected_option_text}</p>
            <p><strong>Correct answer:</strong> ${feedback.correct_answer}) ${feedback.correct_option_text}</p>
        </div>
    `;
    
    if (feedback.feedback_points && feedback.feedback_points.length > 0) {
        html += '<div class="feedback-points"><h3>Feedback Points:</h3>';
        feedback.feedback_points.forEach(point => {
            html += `
                <div class="feedback-point">
                    <h4>${point.point}</h4>
                    <div class="concept">${point.concept}</div>
                    <div class="explanation">${point.explanation}</div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    if (feedback.study_text_references && feedback.study_text_references.length > 0) {
        html += '<div class="study-text-reference"><h4>Relevant Study Material:</h4>';
        feedback.study_text_references.forEach(ref => {
            html += `
                <div>
                    <div class="file-name">📄 ${ref.file}</div>
                    <div class="text-preview">${ref.text.substring(0, 500)}...</div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    feedbackContent.innerHTML = html;
}

function clearFeedback() {
    document.getElementById('feedbackContent').innerHTML = 
        '<p class="placeholder">Submit an answer to see feedback</p>';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

async function reloadQuestions() {
    try {
        showLoading();
        const response = await fetch('/api/reload-questions', {
            method: 'POST'
        });
        const result = await response.json();
        
        // Reload questions
        await loadQuestions();
        
        alert(`Loaded ${result.count} questions from exam papers.`);
    } catch (error) {
        console.error('Error reloading questions:', error);
        showError('Failed to reload questions. Please check that exam papers are in the exam_papers/ directory.');
    }
}

function updateStats() {
    document.getElementById('questionCount').textContent = `${questions.length} questions loaded`;
}

function showError(message) {
    const feedbackContent = document.getElementById('feedbackContent');
    feedbackContent.innerHTML = `<div class="feedback-result incorrect"><h3>Error</h3><p>${message}</p></div>`;
}

