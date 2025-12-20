---
layout: base
title: Leaderboard
permalink: /leaderboard/
templateEngine: njk,md
---

<div class="leaderboard-container">
    <div class="leaderboard-header">
        <h1 class="leaderboard-title">🏆 Programming Party Leaderboard 🏆</h1>
        <p class="leaderboard-subtitle">Who's bringing the most party to the party?</p>
    </div>

    <div class="leaderboard-stats">
        <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-value">42</div>
            <div class="stat-label">Total Projects</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-value">18</div>
            <div class="stat-label">Active Partiers</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value">156</div>
            <div class="stat-label">Commits This Month</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🎉</div>
            <div class="stat-value">∞</div>
            <div class="stat-label">Fun Had</div>
        </div>
    </div>

    <div class="leaderboard-table">
        <h2>🥇 Top Contributors This Month</h2>
        <table class="rankings-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Partier</th>
                    <th>Projects</th>
                    <th>Commits</th>
                    <th>Party Points</th>
                    <th>Achievement</th>
                </tr>
            </thead>
            <tbody>
                <tr class="rank-1">
                    <td class="rank-number">1</td>
                    <td class="player-name">
                        <span class="crown">👑</span> Alex Chen
                    </td>
                    <td>5</td>
                    <td>47</td>
                    <td class="party-points">235 🎉</td>
                    <td><span class="achievement">🔥 On Fire!</span></td>
                </tr>
                <tr class="rank-2">
                    <td class="rank-number">2</td>
                    <td class="player-name">Sarah Johnson</td>
                    <td>4</td>
                    <td>38</td>
                    <td class="party-points">190 🎉</td>
                    <td><span class="achievement">⚡ Speed Demon</span></td>
                </tr>
                <tr class="rank-3">
                    <td class="rank-number">3</td>
                    <td class="player-name">Mike Rodriguez</td>
                    <td>3</td>
                    <td>42</td>
                    <td class="party-points">168 🎉</td>
                    <td><span class="achievement">💡 Idea Machine</span></td>
                </tr>
                <tr>
                    <td class="rank-number">4</td>
                    <td class="player-name">Emily Wang</td>
                    <td>3</td>
                    <td>35</td>
                    <td class="party-points">155 🎉</td>
                    <td><span class="achievement">🎨 Creative Coder</span></td>
                </tr>
                <tr>
                    <td class="rank-number">5</td>
                    <td class="player-name">James Park</td>
                    <td>2</td>
                    <td>28</td>
                    <td class="party-points">112 🎉</td>
                    <td><span class="achievement">🚀 Rising Star</span></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="achievements-section">
        <h2>🏅 Recent Achievements Unlocked</h2>
        <div class="achievement-grid">
            <div class="achievement-card">
                <div class="achievement-icon">🌟</div>
                <div class="achievement-title">First Commit</div>
                <div class="achievement-owner">Lisa Martinez</div>
                <div class="achievement-date">2 days ago</div>
            </div>
            <div class="achievement-card">
                <div class="achievement-icon">🔗</div>
                <div class="achievement-title">Team Player</div>
                <div class="achievement-owner">David Kim</div>
                <div class="achievement-date">3 days ago</div>
            </div>
            <div class="achievement-card">
                <div class="achievement-icon">🌙</div>
                <div class="achievement-title">Night Owl</div>
                <div class="achievement-owner">Alex Chen</div>
                <div class="achievement-date">5 days ago</div>
            </div>
            <div class="achievement-card">
                <div class="achievement-icon">📚</div>
                <div class="achievement-title">Documentation Hero</div>
                <div class="achievement-owner">Sarah Johnson</div>
                <div class="achievement-date">1 week ago</div>
            </div>
        </div>
    </div>

    <div class="fun-facts">
        <h2>📊 Fun Stats</h2>
        <div class="fun-fact-cards">
            <div class="fun-fact">
                <div class="fact-emoji">☕</div>
                <div class="fact-number">427</div>
                <div class="fact-label">Cups of Coffee Consumed</div>
            </div>
            <div class="fun-fact">
                <div class="fact-emoji">🐛</div>
                <div class="fact-number">1,337</div>
                <div class="fact-label">Bugs Squashed</div>
            </div>
            <div class="fun-fact">
                <div class="fact-emoji">😂</div>
                <div class="fact-number">2,048</div>
                <div class="fact-label">Laughs Shared</div>
            </div>
            <div class="fun-fact">
                <div class="fact-emoji">💻</div>
                <div class="fact-number">42</div>
                <div class="fact-label">The Answer</div>
            </div>
        </div>
    </div>
</div>

<style>
/* Leaderboard Styles */
.leaderboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.leaderboard-header {
    text-align: center;
    margin-bottom: 3rem;
}

.leaderboard-title {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #ff00ff, #00ff00, #0000ff, #ff0000);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400% 400%;
    animation: gradientShift 5s ease infinite;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.leaderboard-subtitle {
    font-size: 1.2rem;
    color: #666;
}

/* Stats Cards */
.leaderboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.stat-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px) rotate(2deg);
}

.stat-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: #666;
    font-size: 0.9rem;
}

/* Rankings Table */
.leaderboard-table {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.rankings-table {
    width: 100%;
    border-collapse: collapse;
}

.rankings-table th {
    text-align: left;
    padding: 1rem;
    border-bottom: 2px solid #eee;
    color: #666;
    font-weight: 600;
}

.rankings-table td {
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
}

.rankings-table tr {
    transition: background-color 0.3s ease;
}

.rankings-table tr:hover {
    background-color: #f8f8f8;
}

.rank-1 {
    background: linear-gradient(90deg, rgba(255,215,0,0.1) 0%, rgba(255,255,255,0) 100%);
}

.rank-2 {
    background: linear-gradient(90deg, rgba(192,192,192,0.1) 0%, rgba(255,255,255,0) 100%);
}

.rank-3 {
    background: linear-gradient(90deg, rgba(205,127,50,0.1) 0%, rgba(255,255,255,0) 100%);
}

.rank-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.player-name {
    font-weight: 600;
    color: #333;
}

.crown {
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}

.party-points {
    font-weight: bold;
    color: #ff00ff;
}

.achievement {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    white-space: nowrap;
}

/* Achievements Section */
.achievements-section {
    margin-bottom: 3rem;
}

.achievement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.achievement-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.achievement-card:hover {
    transform: scale(1.05) rotate(-2deg);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.achievement-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.achievement-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
}

.achievement-owner {
    color: #666;
    margin-bottom: 0.25rem;
}

.achievement-date {
    color: #999;
    font-size: 0.85rem;
}

/* Fun Facts */
.fun-facts {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 2rem;
    color: white;
}

.fun-facts h2 {
    text-align: center;
    margin-bottom: 2rem;
}

.fun-fact-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.fun-fact {
    background: rgba(255,255,255,0.2);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
}

.fun-fact:hover {
    transform: translateY(-5px);
}

.fact-emoji {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.fact-number {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.fact-label {
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
    .leaderboard-title {
        font-size: 2rem;
    }
    
    .rankings-table {
        font-size: 0.9rem;
    }
    
    .rankings-table th,
    .rankings-table td {
        padding: 0.5rem;
    }
    
    .achievement {
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
    }
}
</style>

<script>
// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate numbers on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                const factNumber = entry.target.querySelector('.fact-number');
                const target = statValue || factNumber;
                
                if (target && target.textContent !== '∞') {
                    const finalValue = parseInt(target.textContent);
                    let currentValue = 0;
                    const increment = finalValue / 30;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            currentValue = finalValue;
                            clearInterval(counter);
                        }
                        target.textContent = Math.floor(currentValue);
                    }, 50);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card, .fun-fact').forEach(card => {
        observer.observe(card);
    });
    
    // Add confetti burst on achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
});

// Pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
</script>