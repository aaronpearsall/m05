// History page logic
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
    loadHistory();
});

async function loadHistory() {
    try {
        const response = await fetch('/api/results/history');
        const history = await response.json();
        
        if (history.length === 0) {
            document.getElementById('historyList').innerHTML = '<p>No quiz history yet. Complete a quiz to see your results here!</p>';
            return;
        }
        
        // Sort by most recent first
        history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        displayHistory(history);
        displayAnalytics(history);
    } catch (error) {
        console.error('Error loading history:', error);
        document.getElementById('historyList').innerHTML = '<p>Error loading history.</p>';
    }
}

function displayHistory(history) {
    const historyList = document.getElementById('historyList');
    let html = '';
    
    history.forEach(result => {
        const date = new Date(result.timestamp);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        
        html += `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-date">${dateStr}</div>
                    <div class="history-mode">${result.mode || 'Unknown'}</div>
                    <div class="history-score ${result.percentage >= 80 ? 'excellent' : result.percentage >= 60 ? 'good' : 'needs-work'}">
                        ${result.percentage}%
                    </div>
                </div>
                <div class="history-details">
                    <span>${result.correct}/${result.total} correct</span>
                    <span>•</span>
                    <span>${result.incorrect} incorrect</span>
                </div>
            </div>
        `;
    });
    
    historyList.innerHTML = html;
}

function displayAnalytics(history) {
    // Overall stats
    const totalQuizzes = history.length;
    const totalQuestions = history.reduce((sum, r) => sum + r.total, 0);
    const totalCorrect = history.reduce((sum, r) => sum + r.correct, 0);
    const avgPercentage = Math.round((totalCorrect / totalQuestions) * 100);
    
    document.getElementById('overallStats').innerHTML = `
        <div class="stat-card">
            <div class="stat-value">${totalQuizzes}</div>
            <div class="stat-label">Total Quizzes</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${totalQuestions}</div>
            <div class="stat-label">Total Questions</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${avgPercentage}%</div>
            <div class="stat-label">Average Score</div>
        </div>
    `;
    
    // Learning objective performance
    const loStats = {};
    history.forEach(result => {
        if (result.learning_objective_breakdown) {
            Object.keys(result.learning_objective_breakdown).forEach(lo => {
                if (!loStats[lo]) {
                    loStats[lo] = { total: 0, correct: 0 };
                }
                loStats[lo].total += result.learning_objective_breakdown[lo].total;
                loStats[lo].correct += result.learning_objective_breakdown[lo].correct;
            });
        }
    });
    
    let loHtml = '';
    const loArray = Object.keys(loStats).sort((a, b) => parseFloat(a) - parseFloat(b));
    
    loArray.forEach(lo => {
        const stats = loStats[lo];
        const percentage = Math.round((stats.correct / stats.total) * 100);
        const colorClass = percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs-work';
        
        loHtml += `
            <div class="lo-item">
                <div class="lo-header">
                    <span class="lo-name">Learning Objective ${lo}</span>
                    <span class="lo-score ${colorClass}">${percentage}%</span>
                </div>
                <div class="lo-bar">
                    <div class="lo-bar-fill ${colorClass}" style="width: ${percentage}%"></div>
                </div>
                <div class="lo-details">${stats.correct}/${stats.total} correct</div>
            </div>
        `;
    });
    
    document.getElementById('loPerformance').innerHTML = loHtml || '<p>No learning objective data available.</p>';
    
    // Weak areas (learning objectives below 60%)
    const weakAreas = loArray.filter(lo => {
        const stats = loStats[lo];
        return (stats.correct / stats.total) < 0.6;
    });
    
    if (weakAreas.length > 0) {
        let weakHtml = '<ul class="weak-areas-list">';
        weakAreas.forEach(lo => {
            const stats = loStats[lo];
            const percentage = Math.round((stats.correct / stats.total) * 100);
            weakHtml += `<li>Learning Objective ${lo}: ${percentage}% (${stats.correct}/${stats.total})</li>`;
        });
        weakHtml += '</ul>';
        document.getElementById('weakAreas').innerHTML = weakHtml;
    } else {
        document.getElementById('weakAreas').innerHTML = '<p>Great job! No areas need significant improvement.</p>';
    }
}

