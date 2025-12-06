// Selection page logic
let selectedOptions = null;

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
    
    loadAvailableYears();
    loadLearningObjectives();
    loadMultipleChoiceCount();
    
    // Handle count buttons
    document.querySelectorAll('.quiz-btn[data-mode="count"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const count = btn.dataset.value;
            selectQuizMode({ count: parseInt(count) }, btn);
        });
    });
    
    // Handle multiple selection buttons
    document.querySelectorAll('.quiz-btn[data-mode="multiple"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            if (value === 'all') {
                selectQuizMode({ multiple_choice_only: true }, btn);
            } else {
                selectQuizMode({ multiple_choice_only: true, count: parseInt(value) }, btn);
            }
        });
    });
    
    // Handle reload button
    document.getElementById('reloadBtn').addEventListener('click', reloadQuestions);
    
    // Handle start quiz button
    document.getElementById('startQuizBtn').addEventListener('click', () => {
        if (selectedOptions) {
            startQuiz(selectedOptions);
        }
    });
    
    // Handle change selection button
    document.getElementById('changeSelectionBtn').addEventListener('click', () => {
        clearSelection();
    });
});

async function loadAvailableYears() {
    try {
        const response = await fetch('/api/years');
        const years = await response.json();
        
        const yearButtons = document.getElementById('yearButtons');
        yearButtons.innerHTML = '';
        
        if (years.length === 0) {
            yearButtons.innerHTML = '<p>No exam years found. Please reload questions.</p>';
            return;
        }
        
        years.forEach(year => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.dataset.year = year;
            btn.textContent = year;
            btn.addEventListener('click', () => {
                selectQuizMode({ year: parseInt(year) }, btn);
            });
            yearButtons.appendChild(btn);
        });
    } catch (error) {
        console.error('Error loading years:', error);
        document.getElementById('yearButtons').innerHTML = '<p>Error loading years</p>';
    }
}

function selectQuizMode(options, clickedButton) {
    // Store selected options
    selectedOptions = options;
    
    // Clear previous selections
    document.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Highlight selected button
    clickedButton.classList.add('selected');
    
    // Show confirmation section
    showConfirmation(options);
}

function showConfirmation(options) {
    const confirmation = document.getElementById('selectionConfirmation');
    const selectedInfo = document.getElementById('selectedInfo');
    
    let infoText = '';
    if (options.count) {
        infoText = `
            <div class="selected-detail">
                <span class="selected-label">Mode:</span>
                <span class="selected-value">Random Practice</span>
            </div>
            <div class="selected-detail">
                <span class="selected-label">Number of Questions:</span>
                <span class="selected-value">${options.count}</span>
            </div>
            <div class="selected-note">Questions will be randomly selected from all available exam papers.</div>
        `;
    } else if (options.year) {
        infoText = `
            <div class="selected-detail">
                <span class="selected-label">Mode:</span>
                <span class="selected-value">Past Paper</span>
            </div>
            <div class="selected-detail">
                <span class="selected-label">Year:</span>
                <span class="selected-value">${options.year}</span>
            </div>
            <div class="selected-note">You will practice questions from the ${options.year} exam paper in the exact order they appear.</div>
        `;
    } else if (options.learning_objective) {
        infoText = `
            <div class="selected-detail">
                <span class="selected-label">Mode:</span>
                <span class="selected-value">Learning Objective Practice</span>
            </div>
            <div class="selected-detail">
                <span class="selected-label">Learning Objective:</span>
                <span class="selected-value">${options.learning_objective}</span>
            </div>
            <div class="selected-note">You will practice up to 20 questions (or all available) from Learning Objective ${options.learning_objective}.</div>
        `;
    } else if (options.multiple_choice_only) {
        if (options.count) {
            infoText = `
                <div class="selected-detail">
                    <span class="selected-label">Mode:</span>
                    <span class="selected-value">Multiple Selection Questions</span>
                </div>
                <div class="selected-detail">
                    <span class="selected-label">Number of Questions:</span>
                    <span class="selected-value">${options.count}</span>
                </div>
                <div class="selected-note">You will practice ${options.count} multiple selection questions (questions where you can select more than one answer).</div>
            `;
        } else {
            infoText = `
                <div class="selected-detail">
                    <span class="selected-label">Mode:</span>
                    <span class="selected-value">Multiple Selection Questions</span>
                </div>
                <div class="selected-detail">
                    <span class="selected-label">Number of Questions:</span>
                    <span class="selected-value">All Available</span>
                </div>
                <div class="selected-note">You will practice all available multiple selection questions (questions where you can select more than one answer).</div>
            `;
        }
    }
    
    selectedInfo.innerHTML = infoText;
    confirmation.classList.remove('hidden');
    
    // Scroll to confirmation
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearSelection() {
    selectedOptions = null;
    document.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('selectionConfirmation').classList.add('hidden');
}

function startQuiz(options) {
    // Store quiz options in sessionStorage
    sessionStorage.setItem('quizOptions', JSON.stringify(options));
    // Navigate to quiz page
    window.location.href = '/quiz';
}

async function loadLearningObjectives() {
    try {
        const response = await fetch('/api/learning-objectives');
        const objectives = await response.json();
        
        const loButtons = document.getElementById('learningObjectiveButtons');
        loButtons.innerHTML = '';
        
        if (objectives.length === 0) {
            loButtons.innerHTML = '<p>No learning objectives found. Please reload questions.</p>';
            return;
        }
        
        objectives.forEach(obj => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.dataset.lo = obj.number;
            btn.textContent = `Learning Objective ${obj.number}`;
            btn.title = `${obj.count} questions available`; // Show count in tooltip
            btn.addEventListener('click', () => {
                selectQuizMode({ learning_objective: obj.number }, btn);
            });
            loButtons.appendChild(btn);
        });
    } catch (error) {
        console.error('Error loading learning objectives:', error);
        document.getElementById('learningObjectiveButtons').innerHTML = '<p>Error loading learning objectives</p>';
    }
}

async function loadMultipleChoiceCount() {
    try {
        const response = await fetch('/api/multiple-choice-count');
        const data = await response.json();
        const count = data.count;
        
        // Update button labels to show count
        document.querySelectorAll('.quiz-btn[data-mode="multiple"]').forEach(btn => {
            const value = btn.dataset.value;
            if (value === 'all') {
                btn.textContent = `All Multiple Selection Questions (${count} available)`;
            } else {
                const maxCount = Math.min(parseInt(value), count);
                btn.textContent = `${maxCount} Multiple Selection Questions`;
                if (maxCount < parseInt(value)) {
                    btn.disabled = true;
                    btn.title = `Only ${count} multiple selection questions available`;
                }
            }
        });
    } catch (error) {
        console.error('Error loading multiple choice count:', error);
    }
}

async function reloadQuestions() {
    try {
        const btn = document.getElementById('reloadBtn');
        btn.disabled = true;
        btn.textContent = 'Reloading...';
        
        const response = await fetch('/api/reload-questions', {
            method: 'POST'
        });
        const result = await response.json();
        
        alert(`Loaded ${result.count} questions from exam papers.`);
        
        // Reload years, learning objectives, and multiple choice count
        loadAvailableYears();
        loadLearningObjectives();
        loadMultipleChoiceCount();
    } catch (error) {
        console.error('Error reloading questions:', error);
        alert('Failed to reload questions. Please check that exam papers are in the exam_papers/ directory.');
    } finally {
        const btn = document.getElementById('reloadBtn');
        btn.disabled = false;
        btn.textContent = 'Reload Questions from PDFs';
    }
}

