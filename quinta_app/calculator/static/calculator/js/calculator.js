// Quinta Essentia Marketing Calculator - Interactive Calculator JavaScript

// Marketing plan data based on TЗ
const MARKETING_DATA = {
    pvToEur: 1.0, // 1 PV = 1 EUR (по условию задания)
    
    ranks: {
        'Novus': { ltPv: 35, otPv: 0, tPv: 0, ktPv: null, icon: '🌱', name_ru: 'Новус', reward: null },
        'Inceptor': { ltPv: 35, otPv: 1050, tPv: 0, ktPv: null, icon: '🌿', name_ru: 'Инцептор', reward: null },
        'Cognitor': { ltPv: 35, otPv: 3000, tPv: 0, ktPv: null, icon: '🌲', name_ru: 'Когнитор', reward: null },
        'Doctus': { ltPv: 70, otPv: 10000, tPv: 2500, ktPv: null, icon: '⭐', name_ru: 'Доктус', reward: '500€ подарок' },
        'Primum': { ltPv: 70, otPv: 10000, tPv: 5000, ktPv: 1500, icon: '✨', name_ru: 'Примум', reward: '2000€ подарок' },
        'Dux': { ltPv: 70, otPv: 10000, tPv: 11000, ktPv: 1350, icon: '💎', name_ru: 'Дукс', reward: '1000€ / месяц', minPrimum: 1 },
        'Provectus': { ltPv: 70, otPv: 10000, tPv: 23000, ktPv: 1200, icon: '👑', name_ru: 'Провектус', reward: '2000€ / месяц', minPrimum: 1, minDoctus: 2 },
        'Grandis': { ltPv: 70, otPv: 10000, tPv: 45000, ktPv: 1100, icon: '🏆', name_ru: 'Грандис', reward: 'Авто / 3500€ мес.', minDux: 1, minPrimum: 1, minDoctus: 2 },
        'Oraculi': { ltPv: 70, otPv: 10000, tPv: 90000, ktPv: 1100, icon: '🌟', name_ru: 'Оракули', reward: null, minProvectus: 1, minDux: 1, minPrimum: 2 },
        'Sapiens': { ltPv: 70, otPv: 10000, tPv: 150000, ktPv: 1000, icon: '💫', name_ru: 'Сапиенс', reward: 'Авто премиум', minGrandis: 1, minProvectus: 2, minDux: 2 },
        'Superator': { ltPv: 70, otPv: 10000, tPv: 280000, ktPv: 1000, icon: '🔮', name_ru: 'Суператор', reward: null, minGrandis: 2, minProvectus: 2 },
        'Principal': { ltPv: 70, otPv: 10000, tPv: 500000, ktPv: 800, icon: '👸', name_ru: 'Принципал', reward: '3% от оборота', minGrandis: 6 }
    },
    
    cashback: {
        35: 0.05,   // 5% от 35 PV
        70: 0.075,  // 7.5% от 70 PV
        140: 0.10,  // 10% от 140 PV
        280: 0.125  // 12.5% от 280 PV
    },
    
    salesBonus: {
        // [консультантов, личный PV]: процент
        '2_70': 0.025, '2_140': 0.045, '2_280': 0.055,
        '4_70': 0.03, '4_140': 0.05, '4_280': 0.06,
        '6_70': 0.035, '6_140': 0.055, '6_280': 0.065,
        '8_70': 0.04, '8_140': 0.06, '8_280': 0.07,
        '10_70': 0.045, '10_140': 0.065, '10_280': 0.075
    },
    
    teamBonus: {
        'Novus': { 1: 0.05, 2: 0.025, 3: 0.025 },
        'Inceptor': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025 },
        'Cognitor': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015 },
        'Doctus': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 'unlimited': 0.01 },
        'Primum': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 'unlimited': 0.01 },
        'Dux': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 }
    },
    
    leadershipBonus: {
        'Primum': { 1: 0.025 },
        'Dux': { 1: 0.025, 2: 0.025 },
        'Provectus': { 1: 0.025, 2: 0.025, 3: 0.025 },
        'Grandis': { 1: 0.025, 2: 0.025, 3: 0.025, 4: 0.025 },
        'Oraculi': { 1: 0.025, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.025 },
        'Sapiens': { 1: 0.025, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.025 },
        'Superator': { 1: 0.025, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.025 },
        'Principal': { 1: 0.025, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.025 }
    }
};

// Calculator Class
class QuintaCalculator {
    constructor() {
        this.inputs = {
            ltPv: 70,           // Личный товарооборот PV
            invitedCount: 4,    // Количество приглашенных
            teamPv: 3000,       // Групповой товарооборот PV
            level1Pv: 1000,     // PV на 1 уровне
            level2Pv: 800,      // PV на 2 уровне
            level3Pv: 500,      // PV на 3 уровне
            level4Pv: 400,      // PV на 4 уровне
            level5Pv: 300       // PV на 5 уровне
        };
        
        this.results = {
            rank: 'Novus',
            cashback: 0,
            salesBonus: 0,
            teamBonus: 0,
            leadershipBonus: 0,
            totalPv: 0,
            totalEur: 0
        };
        
        this.chart = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.calculate();
    }
    
    bindEvents() {
        // Bind all input events
        const inputFields = [
            'lt-pv', 'invited-count', 'team-pv',
            'level1-pv', 'level2-pv', 'level3-pv', 'level4-pv', 'level5-pv'
        ];
        
        inputFields.forEach(id => {
            const valueEl = document.getElementById(id);
            const sliderEl = document.getElementById(id + '-slider');
            
            if (sliderEl) {
                sliderEl.addEventListener('input', (e) => {
                    if (valueEl) valueEl.textContent = e.target.value;
                    this.handleInput(id, e.target.value);
                });
            }
        });
    }
    
    handleInput(id, value) {
        const mapping = {
            'lt-pv': 'ltPv',
            'invited-count': 'invitedCount',
            'team-pv': 'teamPv',
            'level1-pv': 'level1Pv',
            'level2-pv': 'level2Pv',
            'level3-pv': 'level3Pv',
            'level4-pv': 'level4Pv',
            'level5-pv': 'level5Pv'
        };
        
        this.inputs[mapping[id]] = parseInt(value) || 0;
        
        // Sync slider with input
        const slider = document.getElementById(id + '-slider');
        if (slider) slider.value = value;
        
        this.calculate();
    }
    
    calculateRank() {
        const { ltPv, teamPv } = this.inputs;
        let rank = 'Novus';
        
        // Calculate accumulated OT_PV (simplified - assume it's met)
        const otPv = teamPv * 3; // Approximate accumulated
        
        const ranks = MARKETING_DATA.ranks;
        for (const [rankName, conditions] of Object.entries(ranks)) {
            if (ltPv >= conditions.ltPv && teamPv >= conditions.tPv && otPv >= conditions.otPv) {
                rank = rankName;
            }
        }
        
        return rank;
    }
    
    calculateCashback() {
        const { ltPv } = this.inputs;
        let rate = 0;
        
        for (const [threshold, r] of Object.entries(MARKETING_DATA.cashback)) {
            if (ltPv >= parseInt(threshold)) {
                rate = r;
            }
        }
        
        return ltPv * rate;
    }
    
    calculateSalesBonus() {
        const { ltPv, invitedCount } = this.inputs;
        
        // Find maximum applicable rate
        const thresholds = [2, 4, 6, 8, 10];
        const pvThresholds = [70, 140, 280];
        
        let rate = 0;
        for (const count of thresholds) {
            for (const pv of pvThresholds) {
                if (invitedCount >= count && ltPv >= pv) {
                    const key = `${count}_${pv}`;
                    if (MARKETING_DATA.salesBonus[key]) {
                        rate = Math.max(rate, MARKETING_DATA.salesBonus[key]);
                    }
                }
            }
        }
        
        // Calculate bonus from invited consultants' purchases
        const invitedPv = invitedCount * 70; // Assume average 70 PV per consultant
        return invitedPv * rate;
    }
    
    calculateTeamBonus() {
        const rank = this.results.rank;
        const rates = MARKETING_DATA.teamBonus[rank];
        
        if (!rates) return 0;
        
        let bonus = 0;
        const levels = {
            1: this.inputs.level1Pv,
            2: this.inputs.level2Pv,
            3: this.inputs.level3Pv,
            4: this.inputs.level4Pv,
            5: this.inputs.level5Pv
        };
        
        for (const [level, pv] of Object.entries(levels)) {
            if (rates[level]) {
                bonus += pv * rates[level];
            } else if (rates.unlimited && parseInt(level) >= 6) {
                bonus += pv * rates.unlimited;
            }
        }
        
        return bonus;
    }
    
    calculateLeadershipBonus() {
        const rank = this.results.rank;
        const rates = MARKETING_DATA.leadershipBonus[rank];
        
        if (!rates) return 0;
        
        // Simplified calculation - assume 1 Doctus line contributing
        const doctusLinePv = Math.max(0, this.inputs.teamPv - 2000);
        return doctusLinePv * 0.025 * Object.keys(rates).length;
    }
    
    calculate() {
        // Calculate rank first
        this.results.rank = this.calculateRank();
        
        // Calculate all bonuses
        this.results.cashback = this.calculateCashback();
        this.results.salesBonus = this.calculateSalesBonus();
        this.results.teamBonus = this.calculateTeamBonus();
        this.results.leadershipBonus = this.calculateLeadershipBonus();
        
        // Calculate totals
        this.results.totalPv = 
            this.results.cashback + 
            this.results.salesBonus + 
            this.results.teamBonus + 
            this.results.leadershipBonus;
        
        this.results.totalEur = this.results.totalPv * MARKETING_DATA.pvToEur;
        
        this.updateUI();
    }
    
    updateUI() {
        // Update total
        const totalEl = document.getElementById('total-income');
        if (totalEl) {
            totalEl.textContent = this.formatCurrency(this.results.totalEur);
        }
        
        const totalPvEl = document.getElementById('total-income-pv');
        if (totalPvEl) {
            totalPvEl.textContent = `${this.results.totalPv.toFixed(0)} PV`;
        }
        
        // Update rank
        const rankEl = document.getElementById('current-rank');
        if (rankEl) {
            const rankData = MARKETING_DATA.ranks[this.results.rank];
            rankEl.innerHTML = `${rankData.icon} ${this.results.rank} (${rankData.name_ru})`;
        }
        
        // Update breakdown items
        const items = {
            'cashback': { pv: this.results.cashback, percent: this.getCashbackPercent() },
            'sales-bonus': { pv: this.results.salesBonus, percent: this.getSalesBonusPercent() },
            'team-bonus': { pv: this.results.teamBonus, percent: '5-2.5-2.5%' },
            'leadership-bonus': { pv: this.results.leadershipBonus, percent: '2.5%' }
        };
        
        for (const [id, data] of Object.entries(items)) {
            const valueEl = document.getElementById(`${id}-value`);
            const percentEl = document.getElementById(`${id}-percent`);
            
            if (valueEl) {
                valueEl.textContent = this.formatCurrency(data.pv * MARKETING_DATA.pvToEur);
            }
            if (percentEl) {
                percentEl.textContent = data.percent;
            }
        }
        
        // Update chart
        this.updateChart();
        
        // Update table highlights
        this.updateTableHighlights();
    }
    
    updateTableHighlights() {
        const { ltPv, invitedCount, teamPv } = this.inputs;
        
        // Highlight cashback table
        const cashbackTable = document.querySelector('.ref-table:nth-child(1) table');
        if (cashbackTable) {
            const rows = cashbackTable.querySelectorAll('tr');
            rows.forEach(row => row.classList.remove('highlight'));
            
            let highlightIndex = 0;
            if (ltPv >= 280) highlightIndex = 3;
            else if (ltPv >= 140) highlightIndex = 2;
            else if (ltPv >= 70) highlightIndex = 1;
            else if (ltPv >= 35) highlightIndex = 0;
            else highlightIndex = -1;
            
            if (highlightIndex >= 0 && rows[highlightIndex]) {
                rows[highlightIndex].classList.add('highlight');
            }
        }
        
        // Highlight sales bonus table
        const salesTable = document.querySelector('.ref-table:nth-child(2) table');
        if (salesTable) {
            const rows = salesTable.querySelectorAll('tr');
            rows.forEach(row => row.classList.remove('highlight'));
            
            let highlightIndex = -1;
            if (invitedCount >= 10) highlightIndex = 2;
            else if (invitedCount >= 6) highlightIndex = 1;
            else if (invitedCount >= 2) highlightIndex = 0;
            
            if (highlightIndex >= 0 && rows[highlightIndex]) {
                rows[highlightIndex].classList.add('highlight');
            }
        }
        
        // Highlight ranks table
        const ranksTable = document.querySelector('.ref-table:nth-child(3) table');
        if (ranksTable) {
            const rows = ranksTable.querySelectorAll('tr');
            rows.forEach(row => row.classList.remove('highlight'));
            
            let highlightIndex = 0;
            if (teamPv >= 45000) highlightIndex = 3;
            else if (teamPv >= 11000) highlightIndex = 2;
            else if (teamPv >= 2500) highlightIndex = 1;
            else highlightIndex = 0;
            
            if (rows[highlightIndex]) {
                rows[highlightIndex].classList.add('highlight');
            }
        }
    }
    
    getCashbackPercent() {
        const { ltPv } = this.inputs;
        if (ltPv >= 280) return '12.5%';
        if (ltPv >= 140) return '10%';
        if (ltPv >= 70) return '7.5%';
        if (ltPv >= 35) return '5%';
        return '0%';
    }
    
    getSalesBonusPercent() {
        const { ltPv, invitedCount } = this.inputs;
        let rate = 0;
        
        for (const [key, r] of Object.entries(MARKETING_DATA.salesBonus)) {
            const [count, pv] = key.split('_').map(Number);
            if (invitedCount >= count && ltPv >= pv) {
                rate = Math.max(rate, r);
            }
        }
        
        return `${(rate * 100).toFixed(1)}%`;
    }
    
    updateChart() {
        const ctx = document.getElementById('income-chart');
        if (!ctx) return;
        
        const data = [
            { label: 'Кешбэк', value: this.results.cashback * MARKETING_DATA.pvToEur, color: '#17b22a' },
            { label: 'Бонус с продаж', value: this.results.salesBonus * MARKETING_DATA.pvToEur, color: '#345995' },
            { label: 'Командный бонус', value: this.results.teamBonus * MARKETING_DATA.pvToEur, color: '#f0994a' },
            { label: 'Лидерский бонус', value: this.results.leadershipBonus * MARKETING_DATA.pvToEur, color: '#e63946' }
        ].filter(d => d.value > 0);
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        if (typeof Chart !== 'undefined') {
            this.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.map(d => d.label),
                    datasets: [{
                        data: data.map(d => d.value),
                        backgroundColor: data.map(d => d.color),
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
                                padding: 8,
                                font: {
                                    size: 10
                                },
                                boxWidth: 12
                            }
                        }
                    }
                }
            });
        }
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

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calculator-app')) {
        window.quintaCalculator = new QuintaCalculator();
    }
});
