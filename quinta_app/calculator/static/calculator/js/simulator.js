// Quinta Essentia Marketing Simulator - Interactive Growth Simulator

class GrowthSimulator {
    constructor() {
        this.params = {
            strategy: 'balanced',
            personalPv: 70,
            newConsultantsPerMonth: 2,
            avgTeamGrowth: 0.15, // 15% monthly team growth
            teamRetention: 0.85,
            months: 12
        };
        
        this.timeline = [];
        this.chart = null;
        this.pieChart = null;
        this.barChart = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.simulate();
    }
    
    bindEvents() {
        // Strategy selector
        const strategySelect = document.getElementById('sim-strategy');
        if (strategySelect) {
            strategySelect.addEventListener('change', (e) => {
                this.params.strategy = e.target.value;
                this.applyStrategy();
                this.simulate();
            });
        }
        
        // Personal PV slider
        const personalPvSlider = document.getElementById('sim-personal-pv');
        const personalPvValue = document.getElementById('sim-personal-pv-value');
        if (personalPvSlider) {
            personalPvSlider.addEventListener('input', (e) => {
                this.params.personalPv = parseInt(e.target.value);
                if (personalPvValue) personalPvValue.textContent = `${this.params.personalPv} PV`;
                this.simulate();
            });
        }
        
        // New consultants slider
        const consultantsSlider = document.getElementById('sim-new-consultants');
        const consultantsValue = document.getElementById('sim-new-consultants-value');
        if (consultantsSlider) {
            consultantsSlider.addEventListener('input', (e) => {
                this.params.newConsultantsPerMonth = parseInt(e.target.value);
                if (consultantsValue) consultantsValue.textContent = this.params.newConsultantsPerMonth;
                this.simulate();
            });
        }
        
        // Team growth slider
        const growthSlider = document.getElementById('sim-team-growth');
        const growthValue = document.getElementById('sim-team-growth-value');
        if (growthSlider) {
            growthSlider.addEventListener('input', (e) => {
                this.params.avgTeamGrowth = parseFloat(e.target.value) / 100;
                if (growthValue) growthValue.textContent = `${e.target.value}%`;
                this.simulate();
            });
        }
        
        // Retention slider
        const retentionSlider = document.getElementById('sim-retention');
        const retentionValue = document.getElementById('sim-retention-value');
        if (retentionSlider) {
            retentionSlider.addEventListener('input', (e) => {
                this.params.teamRetention = parseFloat(e.target.value) / 100;
                if (retentionValue) retentionValue.textContent = `${e.target.value}%`;
                this.simulate();
            });
        }
        
        // Months slider
        const monthsSlider = document.getElementById('sim-months');
        const monthsValue = document.getElementById('sim-months-value');
        if (monthsSlider) {
            monthsSlider.addEventListener('input', (e) => {
                this.params.months = parseInt(e.target.value);
                if (monthsValue) monthsValue.textContent = `${this.params.months} мес.`;
                this.simulate();
            });
        }
    }
    
    applyStrategy() {
        const strategies = {
            'consumer': {
                personalPv: 140,
                newConsultantsPerMonth: 1,
                avgTeamGrowth: 0.05,
                teamRetention: 0.90
            },
            'balanced': {
                personalPv: 70,
                newConsultantsPerMonth: 2,
                avgTeamGrowth: 0.15,
                teamRetention: 0.85
            },
            'builder': {
                personalPv: 70,
                newConsultantsPerMonth: 4,
                avgTeamGrowth: 0.25,
                teamRetention: 0.80
            },
            'leader': {
                personalPv: 280,
                newConsultantsPerMonth: 6,
                avgTeamGrowth: 0.35,
                teamRetention: 0.75
            }
        };
        
        if (strategies[this.params.strategy]) {
            Object.assign(this.params, strategies[this.params.strategy]);
            this.updateSliders();
        }
    }
    
    updateSliders() {
        const sliders = {
            'sim-personal-pv': { value: this.params.personalPv, display: `${this.params.personalPv} PV` },
            'sim-new-consultants': { value: this.params.newConsultantsPerMonth, display: this.params.newConsultantsPerMonth },
            'sim-team-growth': { value: this.params.avgTeamGrowth * 100, display: `${(this.params.avgTeamGrowth * 100).toFixed(0)}%` },
            'sim-retention': { value: this.params.teamRetention * 100, display: `${(this.params.teamRetention * 100).toFixed(0)}%` }
        };
        
        for (const [id, data] of Object.entries(sliders)) {
            const slider = document.getElementById(id);
            const valueEl = document.getElementById(`${id}-value`);
            
            if (slider) slider.value = data.value;
            if (valueEl) valueEl.textContent = data.display;
        }
    }
    
    simulate() {
        this.timeline = [];
        
        let teamSize = 0;
        let teamPv = 0;
        let accumulatedOtPv = 0;
        let rank = 'Novus';
        
        const pvToEur = 1.0; // 1 PV = 1 EUR
        
        for (let month = 1; month <= this.params.months; month++) {
            // Add new consultants
            teamSize += this.params.newConsultantsPerMonth;
            
            // Apply team growth from existing members recruiting
            teamSize = Math.floor(teamSize * (1 + this.params.avgTeamGrowth));
            
            // Apply retention (some members leave)
            teamSize = Math.ceil(teamSize * this.params.teamRetention);
            
            // Calculate team PV (each team member contributes avg 35-70 PV)
            const avgMemberPv = 50;
            teamPv = teamSize * avgMemberPv;
            
            // Accumulate OT_PV
            accumulatedOtPv += teamPv;
            
            // Calculate rank
            rank = this.calculateRank(this.params.personalPv, teamPv, accumulatedOtPv);
            
            // Calculate income
            const income = this.calculateIncome(rank, teamPv, teamSize);
            
            this.timeline.push({
                month,
                teamSize,
                teamPv,
                accumulatedOtPv,
                rank,
                incomePv: income.totalPv,
                incomeEur: income.totalPv * pvToEur,
                breakdown: income
            });
        }
        
        this.updateUI();
    }
    
    calculateRank(personalPv, teamPv, accumulatedOtPv) {
        const ranks = [
            { name: 'Novus', ltPv: 35, otPv: 0, tPv: 0 },
            { name: 'Inceptor', ltPv: 35, otPv: 1050, tPv: 0 },
            { name: 'Cognitor', ltPv: 35, otPv: 3000, tPv: 0 },
            { name: 'Doctus', ltPv: 70, otPv: 10000, tPv: 2500 },
            { name: 'Primum', ltPv: 70, otPv: 10000, tPv: 5000 },
            { name: 'Dux', ltPv: 70, otPv: 10000, tPv: 11000 },
            { name: 'Provectus', ltPv: 70, otPv: 10000, tPv: 23000 },
            { name: 'Grandis', ltPv: 70, otPv: 10000, tPv: 45000 },
            { name: 'Oraculi', ltPv: 70, otPv: 10000, tPv: 90000 },
            { name: 'Sapiens', ltPv: 70, otPv: 10000, tPv: 150000 },
            { name: 'Superator', ltPv: 70, otPv: 10000, tPv: 280000 },
            { name: 'Principal', ltPv: 70, otPv: 10000, tPv: 500000 }
        ];
        
        let currentRank = 'Novus';
        for (const rank of ranks) {
            if (personalPv >= rank.ltPv && accumulatedOtPv >= rank.otPv && teamPv >= rank.tPv) {
                currentRank = rank.name;
            }
        }
        
        return currentRank;
    }
    
    calculateIncome(rank, teamPv, teamSize) {
        const personalPv = this.params.personalPv;
        
        // Cashback
        let cashbackRate = 0.05;
        if (personalPv >= 280) cashbackRate = 0.125;
        else if (personalPv >= 140) cashbackRate = 0.10;
        else if (personalPv >= 70) cashbackRate = 0.075;
        
        const cashback = personalPv * cashbackRate;
        
        // Sales bonus (simplified)
        let salesRate = 0;
        if (teamSize >= 10 && personalPv >= 280) salesRate = 0.075;
        else if (teamSize >= 8 && personalPv >= 140) salesRate = 0.06;
        else if (teamSize >= 6 && personalPv >= 70) salesRate = 0.035;
        else if (teamSize >= 4 && personalPv >= 70) salesRate = 0.03;
        else if (teamSize >= 2 && personalPv >= 70) salesRate = 0.025;
        
        const salesBonus = teamSize * personalPv * salesRate * 0.5; // Simplified
        
        // Team bonus (simplified - 10% of team PV for higher ranks)
        let teamBonusRate = 0.025;
        if (['Doctus', 'Primum', 'Dux'].includes(rank)) teamBonusRate = 0.05;
        else if (['Provectus', 'Grandis', 'Oraculi'].includes(rank)) teamBonusRate = 0.075;
        else if (['Sapiens', 'Superator', 'Principal'].includes(rank)) teamBonusRate = 0.10;
        
        const teamBonus = teamPv * teamBonusRate;
        
        // Leadership bonus (for Primum+)
        let leadershipBonus = 0;
        const leadershipRanks = ['Primum', 'Dux', 'Provectus', 'Grandis', 'Oraculi', 'Sapiens', 'Superator', 'Principal'];
        if (leadershipRanks.includes(rank)) {
            const leadershipLevels = leadershipRanks.indexOf(rank) + 1;
            leadershipBonus = teamPv * 0.025 * Math.min(leadershipLevels, 5) * 0.3; // Simplified
        }
        
        return {
            cashback,
            salesBonus,
            teamBonus,
            leadershipBonus,
            totalPv: cashback + salesBonus + teamBonus + leadershipBonus
        };
    }
    
    updateUI() {
        if (this.timeline.length === 0) return;
        
        const lastMonth = this.timeline[this.timeline.length - 1];
        const firstMonth = this.timeline[0];
        
        // Update summary stats
        const finalRankEl = document.getElementById('sim-final-rank');
        if (finalRankEl) finalRankEl.textContent = `${this.getRankEmoji(lastMonth.rank)} ${lastMonth.rank}`;
        
        const finalIncomeEl = document.getElementById('sim-final-income');
        if (finalIncomeEl) finalIncomeEl.textContent = this.formatCurrency(lastMonth.incomeEur);
        
        const totalTeamEl = document.getElementById('sim-total-team');
        if (totalTeamEl) totalTeamEl.textContent = lastMonth.teamSize;
        
        // Calculate total earned over period
        const totalEarned = this.timeline.reduce((sum, m) => sum + m.incomeEur, 0);
        const totalEarnedEl = document.getElementById('sim-total-earned');
        if (totalEarnedEl) totalEarnedEl.textContent = this.formatCurrency(totalEarned);
        
        // Update all charts
        this.updateChart();
        this.updatePieChart();
        this.updateBarChart();
        
        // Update timeline
        this.updateTimeline();
    }
    
    updateChart() {
        const ctx = document.getElementById('simulator-chart');
        if (!ctx || typeof Chart === 'undefined') return;
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.timeline.map(m => `Месяц ${m.month}`),
                datasets: [
                    {
                        label: 'Доход (€)',
                        data: this.timeline.map(m => m.incomeEur),
                        borderColor: '#f0994a',
                        backgroundColor: 'rgba(184, 134, 11, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Команда (чел.)',
                        data: this.timeline.map(m => m.teamSize),
                        borderColor: '#17b22a',
                        backgroundColor: 'rgba(23, 178, 42, 0.1)',
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Доход (€)' },
                        ticks: {
                            callback: value => `€${value}`
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'Команда (чел.)' },
                        grid: { drawOnChartArea: false }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            afterBody: (context) => {
                                const monthData = this.timeline[context[0].dataIndex];
                                return [
                                    `Ранг: ${monthData.rank}`,
                                    `Групповой PV: ${monthData.teamPv.toFixed(0)}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }
    
    updatePieChart() {
        const ctx = document.getElementById('income-pie-chart');
        if (!ctx || typeof Chart === 'undefined') return;
        
        if (this.pieChart) {
            this.pieChart.destroy();
        }
        
        const lastMonth = this.timeline[this.timeline.length - 1];
        if (!lastMonth) return;
        
        const breakdown = lastMonth.breakdown;
        
        this.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Кешбэк', 'Бонус с продаж', 'Командный бонус', 'Лидерский бонус'],
                datasets: [{
                    data: [
                        breakdown.cashback,
                        breakdown.salesBonus,
                        breakdown.teamBonus,
                        breakdown.leadershipBonus
                    ],
                    backgroundColor: [
                        '#B8860B',
                        '#17b22a',
                        '#345995',
                        '#e63946'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 10,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.label}: €${ctx.raw.toFixed(0)}`
                        }
                    }
                }
            }
        });
    }
    
    updateBarChart() {
        const ctx = document.getElementById('income-bar-chart');
        if (!ctx || typeof Chart === 'undefined') return;
        
        if (this.barChart) {
            this.barChart.destroy();
        }
        
        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.timeline.map(m => `М${m.month}`),
                datasets: [{
                    label: 'Доход (€)',
                    data: this.timeline.map(m => m.incomeEur),
                    backgroundColor: this.timeline.map((m, i) => 
                        i === this.timeline.length - 1 ? '#17b22a' : '#B8860B'
                    ),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            afterLabel: (ctx) => `Ранг: ${this.timeline[ctx.dataIndex].rank}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: v => '€' + v
                        }
                    }
                }
            }
        });
    }
    
    updateTimeline() {
        const container = document.getElementById('sim-timeline');
        if (!container) return;
        
        container.innerHTML = this.timeline.map(m => `
            <div class="timeline-item">
                <div class="timeline-month">Месяц ${m.month}</div>
                <div class="timeline-data">
                    <span class="timeline-rank">${this.getRankEmoji(m.rank)}</span>
                    <span class="timeline-income">${this.formatCurrency(m.incomeEur)}</span>
                    <span class="timeline-team">👥 ${m.teamSize}</span>
                </div>
            </div>
        `).join('');
    }
    
    getRankEmoji(rank) {
        const emojis = {
            'Novus': '🌱',
            'Inceptor': '🌿',
            'Cognitor': '🌲',
            'Doctus': '⭐',
            'Primum': '✨',
            'Dux': '💎',
            'Provectus': '👑',
            'Grandis': '🏆',
            'Oraculi': '🌟',
            'Sapiens': '💫',
            'Superator': '🔮',
            'Principal': '👸'
        };
        return emojis[rank] || '🌱';
    }
    
    formatCurrency(value) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
}

// Initialize simulator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('simulator-app')) {
        window.growthSimulator = new GrowthSimulator();
    }
});
