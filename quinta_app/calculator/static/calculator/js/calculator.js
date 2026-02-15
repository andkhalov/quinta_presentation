// Quinta Essentia Marketing Calculator - Interactive Calculator JavaScript

// Marketing plan data based on TЗ
const MARKETING_DATA = {
    pvToEur: 1.0, // 1 PV = 1 EUR (по условию задания)

    ranks: {
        'Novus': { ltPv: 35, otPv: 0, tPv: 0, ktPv: null, icon: '🌱', name_ru: 'Новус', reward: null },
        'Inceptor': { ltPv: 35, otPv: 1050, tPv: 0, ktPv: null, icon: '🌿', name_ru: 'Инцептор', reward: null },
        'Cognitor': { ltPv: 35, otPv: 3000, tPv: 0, ktPv: null, icon: '🌲', name_ru: 'Когнитор', reward: null },
        'Doctus': { ltPv: 70, otPv: 10000, tPv: 2500, ktPv: null, icon: '⭐', name_ru: 'Доктус', reward: '500£ промо' },
        'Primum': { ltPv: 70, otPv: 10000, tPv: 5000, ktPv: 1500, icon: '✨', name_ru: 'Примум', reward: '100 PV (2 мес подряд)' },
        'Dux': { ltPv: 70, otPv: 10000, tPv: 11000, ktPv: 1350, icon: '💎', name_ru: 'Дукс', reward: '300 PV (2 мес подряд)', minPrimum: 1 },
        'Provectus': { ltPv: 70, otPv: 10000, tPv: 23000, ktPv: 1200, icon: '👑', name_ru: 'Провектус', reward: '1 200 PV (2 мес подряд)', minPrimum: 1, minDoctus: 2 },
        'Grandis': { ltPv: 70, otPv: 10000, tPv: 45000, ktPv: 1100, icon: '🏆', name_ru: 'Грандис', reward: '2 500 PV (2 мес подряд)', minDux: 1, minPrimum: 1, minDoctus: 2 },
        'Oraculi': { ltPv: 70, otPv: 10000, tPv: 90000, ktPv: 1100, icon: '🌟', name_ru: 'Оракули', reward: 'VIP поездка на двоих (3 из 5 мес)', minProvectus: 1, minDux: 1, minPrimum: 2 },
        'Sapiens': { ltPv: 70, otPv: 10000, tPv: 150000, ktPv: 1000, icon: '💫', name_ru: 'Сапиенс', reward: 'Часы Rolex/Omega (3 из 5 мес)', minGrandis: 1, minProvectus: 2, minDux: 2 },
        'Superator': { ltPv: 70, otPv: 10000, tPv: 280000, ktPv: 1000, icon: '🔮', name_ru: 'Суператор', reward: 'Престижное авто (6 из 9 мес)', minGrandis: 2, minProvectus: 2 },
        'Principal': { ltPv: 70, otPv: 10000, tPv: 500000, ktPv: 800, icon: '👸', name_ru: 'Принципал', reward: 'Недвижимость (6 из 9 мес)', minGrandis: 6 }
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
        // Dux(и выше) — все ранги от Dux до Principal имеют одинаковые ставки (PDF маркетинг-план)
        'Dux': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 },
        'Provectus': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 },
        'Grandis': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 },
        'Oraculi': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 },
        'Sapiens': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 },
        'Superator': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 },
        'Principal': { 1: 0.05, 2: 0.025, 3: 0.025, 4: 0.025, 5: 0.015, 6: 0.015, 7: 0.015, 'unlimited': 0.01 }
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

// Rank groups for income display states
const ELITE_RANKS = ['Dux', 'Provectus', 'Grandis', 'Oraculi', 'Sapiens', 'Superator', 'Principal'];
const PREMIUM_RANKS = ['Doctus', 'Primum'];

// Input field ID → model key mapping (used in multiple places)
const INPUT_MAPPING = {
    'lt-pv': 'ltPv',
    'invited-count': 'invitedCount',
    'team-pv': 'teamPv',
    'level1-pv': 'level1Pv',
    'level2-pv': 'level2Pv',
    'level3-pv': 'level3Pv',
    'level4-pv': 'level4Pv',
    'level5-pv': 'level5Pv'
};

// Calculator Class
class QuintaCalculator {
    constructor() {
        this.inputs = {
            ltPv: 70,
            invitedCount: 4,
            teamPv: 3000,
            level1Pv: 1000,
            level2Pv: 3000,
            level3Pv: 10000,
            level4Pv: 15000,
            level5Pv: 25000
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

        this.goldMode = false;
        this.chart = null;
        this.init();
    }

    init() {
        // 1. Read actual slider values from DOM (source of truth)
        this.syncFromSliders();
        // 2. Bind slider events
        this.bindEvents();
        // 3. Set initial gold mode
        this.goldMode = this.inputs.ltPv >= 280;
        this.applyGoldMode(this.goldMode);
        // 4. First calculation
        this.calculate();
    }

    // ─── Display helpers ───

    formatCompact(n) {
        if (n >= 1000000) {
            const v = n / 1000000;
            return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + 'M';
        }
        if (n >= 10000) {
            const v = n / 1000;
            return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + 'K';
        }
        return n.toLocaleString('ru-RU');
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    formatDisplayValue(id, val) {
        if (id.startsWith('level')) return this.formatCompact(val);
        return val.toLocaleString('ru-RU');
    }

    // ─── Initialization ───

    syncFromSliders() {
        for (const [id, key] of Object.entries(INPUT_MAPPING)) {
            const slider = document.getElementById(id + '-slider');
            const display = document.getElementById(id);
            if (slider) {
                const val = parseInt(slider.value) || 0;
                this.inputs[key] = val;
                if (display) {
                    display.textContent = this.formatDisplayValue(id, val);
                }
            }
        }
    }

    bindEvents() {
        for (const id of Object.keys(INPUT_MAPPING)) {
            const slider = document.getElementById(id + '-slider');
            if (!slider) continue;

            slider.addEventListener('input', (e) => {
                const val = parseInt(e.target.value) || 0;
                // Update display text
                const display = document.getElementById(id);
                if (display) {
                    display.textContent = this.formatDisplayValue(id, val);
                }
                // Update model + recalculate
                this.inputs[INPUT_MAPPING[id]] = val;

                // Gold mode transition
                const wasGold = this.goldMode;
                this.goldMode = this.inputs.ltPv >= 280;
                if (wasGold !== this.goldMode) {
                    this.applyGoldMode(this.goldMode);
                }

                this.calculate();
            });
        }
    }

    // ─── Gold mode ───

    applyGoldMode(isGold) {
        const app = document.getElementById('calculator-app');
        if (!app) return;

        if (isGold) {
            app.classList.add('gold-mode');
        } else {
            app.classList.remove('gold-mode');
        }

        const badge = document.getElementById('gold-badge');
        if (badge) {
            badge.style.display = isGold ? 'inline-block' : 'none';
        }
    }

    // ─── Calculations ───

    calculateRank() {
        const { ltPv, teamPv } = this.inputs;
        let rank = 'Novus';

        // Approximate accumulated OT_PV
        const otPv = teamPv * 3;

        for (const [rankName, cond] of Object.entries(MARKETING_DATA.ranks)) {
            if (ltPv >= cond.ltPv && teamPv >= cond.tPv && otPv >= cond.otPv) {
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
        let rate = 0;
        for (const count of [2, 4, 6, 8, 10]) {
            for (const pv of [70, 140, 280]) {
                if (invitedCount >= count && ltPv >= pv) {
                    const key = `${count}_${pv}`;
                    if (MARKETING_DATA.salesBonus[key]) {
                        rate = Math.max(rate, MARKETING_DATA.salesBonus[key]);
                    }
                }
            }
        }

        // Gold mode: each consultant buys 280 PV, normal: minimum qualification 35 PV
        const consultantPv = this.goldMode ? 280 : 35;
        return invitedCount * consultantPv * rate;
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

        const doctusLinePv = Math.max(0, this.inputs.teamPv - 2000);
        return doctusLinePv * 0.025 * Object.keys(rates).length;
    }

    calculate() {
        this.results.rank = this.calculateRank();
        this.results.cashback = this.calculateCashback();
        this.results.salesBonus = this.calculateSalesBonus();
        this.results.teamBonus = this.calculateTeamBonus();
        this.results.leadershipBonus = this.calculateLeadershipBonus();

        this.results.totalPv =
            this.results.cashback +
            this.results.salesBonus +
            this.results.teamBonus +
            this.results.leadershipBonus;

        this.results.totalEur = this.results.totalPv * MARKETING_DATA.pvToEur;

        this.updateUI();
    }

    // ─── UI Updates ───

    updateUI() {
        // Total income
        const totalEl = document.getElementById('total-income');
        if (totalEl) totalEl.textContent = this.formatCurrency(this.results.totalEur);

        const totalPvEl = document.getElementById('total-income-pv');
        if (totalPvEl) totalPvEl.textContent = `${this.results.totalPv.toFixed(0)} PV`;

        // Rank
        const rankEl = document.getElementById('current-rank');
        if (rankEl) {
            const rd = MARKETING_DATA.ranks[this.results.rank];
            rankEl.innerHTML = `${rd.icon} ${this.results.rank} (${rd.name_ru})`;
        }

        // Breakdown
        const items = {
            'cashback': { pv: this.results.cashback, percent: this.getCashbackPercent() },
            'sales-bonus': { pv: this.results.salesBonus, percent: this.getSalesBonusPercent() },
            'team-bonus': { pv: this.results.teamBonus, percent: '5-2.5-2.5%' },
            'leadership-bonus': { pv: this.results.leadershipBonus, percent: '2.5%' }
        };

        for (const [id, data] of Object.entries(items)) {
            const valueEl = document.getElementById(`${id}-value`);
            const percentEl = document.getElementById(`${id}-percent`);
            if (valueEl) valueEl.textContent = this.formatCurrency(data.pv * MARKETING_DATA.pvToEur);
            if (percentEl) percentEl.textContent = data.percent;
        }

        // Income box state (gamification)
        this.updateIncomeState();

        // Chart (wrapped in try-catch to avoid cascading failures)
        try { this.updateChart(); } catch (e) { /* chart error, non-critical */ }

        // Table highlights
        this.updateTableHighlights();
    }

    updateIncomeState() {
        const box = document.querySelector('.total-box');
        if (!box) return;

        box.classList.remove('state-grey', 'state-green', 'state-gold', 'state-blue');

        const { totalEur } = this.results;
        const rank = this.results.rank;

        if (totalEur <= 0) {
            box.classList.add('state-grey');
        } else if (ELITE_RANKS.includes(rank)) {
            box.classList.add('state-blue');
        } else if (this.goldMode || PREMIUM_RANKS.includes(rank)) {
            box.classList.add('state-gold');
        } else {
            box.classList.add('state-green');
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

        const colors = this.goldMode
            ? ['#8B6914', '#6d5514', '#f0994a', '#e63946']
            : ['#17b22a', '#345995', '#f0994a', '#e63946'];

        const data = [
            { label: 'Кешбэк', value: this.results.cashback * MARKETING_DATA.pvToEur, color: colors[0] },
            { label: 'Бонус с продаж', value: this.results.salesBonus * MARKETING_DATA.pvToEur, color: colors[1] },
            { label: 'Командный бонус', value: this.results.teamBonus * MARKETING_DATA.pvToEur, color: colors[2] },
            { label: 'Лидерский бонус', value: this.results.leadershipBonus * MARKETING_DATA.pvToEur, color: colors[3] }
        ].filter(d => d.value > 0);

        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        if (data.length > 0 && typeof Chart !== 'undefined') {
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
                                font: { size: 10 },
                                boxWidth: 12
                            }
                        }
                    }
                }
            });
        }
    }

    updateTableHighlights() {
        const { ltPv, invitedCount, teamPv } = this.inputs;

        // Cashback table
        const cashbackTable = document.querySelector('.ref-table:nth-child(1) table');
        if (cashbackTable) {
            const rows = cashbackTable.querySelectorAll('tr');
            rows.forEach(row => row.classList.remove('highlight'));
            let idx = -1;
            if (ltPv >= 280) idx = 3;
            else if (ltPv >= 140) idx = 2;
            else if (ltPv >= 70) idx = 1;
            else if (ltPv >= 35) idx = 0;
            if (idx >= 0 && rows[idx]) rows[idx].classList.add('highlight');
        }

        // Sales bonus table
        const salesTable = document.querySelector('.ref-table:nth-child(2) table');
        if (salesTable) {
            const rows = salesTable.querySelectorAll('tr');
            rows.forEach(row => row.classList.remove('highlight'));
            let idx = -1;
            if (invitedCount >= 10) idx = 2;
            else if (invitedCount >= 6) idx = 1;
            else if (invitedCount >= 2) idx = 0;
            if (idx >= 0 && rows[idx]) rows[idx].classList.add('highlight');
        }

        // Ranks table
        const ranksTable = document.querySelector('.ref-table:nth-child(3) table');
        if (ranksTable) {
            const rows = ranksTable.querySelectorAll('tr');
            rows.forEach(row => row.classList.remove('highlight'));
            let idx = 0;
            if (teamPv >= 45000) idx = 3;
            else if (teamPv >= 11000) idx = 2;
            else if (teamPv >= 2500) idx = 1;
            if (rows[idx]) rows[idx].classList.add('highlight');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calculator-app')) {
        window.quintaCalculator = new QuintaCalculator();
    }
});
