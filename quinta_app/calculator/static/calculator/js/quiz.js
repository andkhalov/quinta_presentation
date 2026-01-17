// Quinta Essentia Strategy Quiz - Find Your Perfect Strategy

class StrategyQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                id: 1,
                text: 'Сколько времени в день вы готовы уделять бизнесу?',
                options: [
                    { icon: '☕', text: 'Немного', desc: '30-60 минут в день', value: 'consumer' },
                    { icon: '⏰', text: 'Несколько часов', desc: '2-3 часа в день', value: 'balanced' },
                    { icon: '💼', text: 'Полный рабочий день', desc: '6-8 часов в день', value: 'builder' },
                    { icon: '🚀', text: 'Всё время', desc: 'Это мой главный бизнес', value: 'leader' }
                ]
            },
            {
                id: 2,
                text: 'Как вы относитесь к общению с новыми людьми?',
                options: [
                    { icon: '🏠', text: 'Предпочитаю близких', desc: 'Общаюсь в узком кругу', value: 'consumer' },
                    { icon: '🤝', text: 'Готов знакомиться', desc: 'Могу общаться, но без фанатизма', value: 'balanced' },
                    { icon: '🎉', text: 'Люблю людей', desc: 'Легко нахожу общий язык', value: 'builder' },
                    { icon: '🌟', text: 'Вдохновляю других', desc: 'Люди тянутся ко мне', value: 'leader' }
                ]
            },
            {
                id: 3,
                text: 'Какая финансовая цель вас мотивирует больше всего?',
                options: [
                    { icon: '🎁', text: 'Скидки', desc: 'Хочу покупать продукцию дешевле', value: 'consumer' },
                    { icon: '💰', text: 'Доп. доход', desc: '300-1000€ в месяц будет отлично', value: 'balanced' },
                    { icon: '💎', text: 'Замена зарплаты', desc: '2000-5000€ в месяц', value: 'builder' },
                    { icon: '🏆', text: 'Финансовая свобода', desc: '10000€+ и пассивный доход', value: 'leader' }
                ]
            },
            {
                id: 4,
                text: 'Что для вас важнее в работе?',
                options: [
                    { icon: '🧘', text: 'Баланс', desc: 'Работа не должна мешать жизни', value: 'consumer' },
                    { icon: '📈', text: 'Рост', desc: 'Хочу развиваться постепенно', value: 'balanced' },
                    { icon: '🎯', text: 'Результат', desc: 'Готов вкладываться ради цели', value: 'builder' },
                    { icon: '👑', text: 'Лидерство', desc: 'Хочу вести за собой команду', value: 'leader' }
                ]
            },
            {
                id: 5,
                text: 'Ваш опыт в продажах или сетевом маркетинге?',
                options: [
                    { icon: '🌱', text: 'Новичок', desc: 'Никогда не занимался', value: 'consumer' },
                    { icon: '📚', text: 'Немного', desc: 'Пробовал, но без особых результатов', value: 'balanced' },
                    { icon: '💪', text: 'Есть опыт', desc: 'Успешно продавал / строил сеть', value: 'builder' },
                    { icon: '🎖️', text: 'Профессионал', desc: 'Имею значительные достижения', value: 'leader' }
                ]
            }
        ];
        
        this.strategies = {
            consumer: {
                name: 'Лояльный клиент',
                icon: '🛒',
                personality: 'Практичный минималист',
                description: 'Вы цените качество продукта и хотите получать его по лучшей цене. Отличный выбор для тех, кто хочет пользоваться продукцией Quinta Essentia со скидкой и получать небольшой бонус за рекомендации.',
                income: '50-200€ / месяц',
                color: '#2D5016',
                steps: [
                    'Зарегистрируйтесь как консультант (бесплатно)',
                    'Делайте ежемесячную активность от 35 PV',
                    'Получайте кешбэк 5-12.5% от покупок',
                    'Рекомендуйте друзьям и получайте бонус с продаж'
                ]
            },
            balanced: {
                name: 'Активный партнёр',
                icon: '⚖️',
                personality: 'Сбалансированный практик',
                description: 'Вы готовы уделять бизнесу несколько часов в день и постепенно строить свой доход. Это оптимальный путь для большинства людей — стабильный рост без чрезмерного напряжения.',
                income: '300-1500€ / месяц',
                color: '#B8860B',
                steps: [
                    'Делайте активность 70 PV ежемесячно',
                    'Приглашайте 2-4 новых консультантов в месяц',
                    'Помогайте команде делать первые шаги',
                    'Стремитесь к рангу Doctus-Primum за 3-6 месяцев'
                ]
            },
            builder: {
                name: 'Строитель сети',
                icon: '🏗️',
                personality: 'Целеустремлённый достигатор',
                description: 'Вы серьёзно настроены на построение бизнеса. Готовы активно работать, обучаться и вести команду. За год вы можете выйти на доход, сопоставимый с хорошей зарплатой топ-менеджера.',
                income: '2000-5000€ / месяц',
                color: '#DAA520',
                steps: [
                    'Максимизируйте личную активность (140-280 PV)',
                    'Рекрутируйте 4-6 активных консультантов ежемесячно',
                    'Выстраивайте систему обучения в команде',
                    'Цель — ранг Dux-Provectus за 6-12 месяцев'
                ]
            },
            leader: {
                name: 'Сетевой лидер',
                icon: '👑',
                personality: 'Прирождённый лидер',
                description: 'Вы — прирождённый лидер, готовый посвятить себя построению большой организации. Ваш путь — к финансовой свободе, пассивному доходу и признанию на уровне компании.',
                income: '10000€+ / месяц',
                color: '#8B4513',
                steps: [
                    'Станьте экспертом в продукте и маркетинг-плане',
                    'Рекрутируйте и развивайте лидеров в команде',
                    'Проводите обучения, мероприятия, вдохновляйте',
                    'Цель — Grandis+ за 12-18 месяцев'
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.renderQuestion();
        this.updateProgress();
    }
    
    renderQuestion() {
        const questionContainer = document.getElementById('quiz-questions');
        if (!questionContainer) return;
        
        questionContainer.innerHTML = this.questions.map((q, index) => `
            <div class="quiz-question ${index === this.currentQuestion ? 'active' : ''}" data-question="${index}">
                <h3>${q.text}</h3>
                <div class="quiz-options">
                    ${q.options.map((opt, optIndex) => `
                        <div class="quiz-option ${this.answers[index] === opt.value ? 'selected' : ''}" 
                             data-value="${opt.value}" 
                             data-question="${index}"
                             onclick="strategyQuiz.selectOption(${index}, '${opt.value}')">
                            <span class="option-icon">${opt.icon}</span>
                            <span class="option-text">${opt.text}</span>
                            <span class="option-desc">${opt.desc}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    selectOption(questionIndex, value) {
        this.answers[questionIndex] = value;
        
        // Update UI
        const options = document.querySelectorAll(`[data-question="${questionIndex}"].quiz-option`);
        options.forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === value);
        });
        
        // Auto-advance after a short delay
        setTimeout(() => {
            if (questionIndex < this.questions.length - 1) {
                this.nextQuestion();
            } else {
                this.showResult();
            }
        }, 300);
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.updateActiveQuestion();
            this.updateProgress();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.updateActiveQuestion();
            this.updateProgress();
        }
    }
    
    updateActiveQuestion() {
        document.querySelectorAll('.quiz-question').forEach((q, i) => {
            q.classList.toggle('active', i === this.currentQuestion);
        });
    }
    
    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `Вопрос ${this.currentQuestion + 1} из ${this.questions.length}`;
        }
    }
    
    calculateResult() {
        // Count votes for each strategy
        const votes = { consumer: 0, balanced: 0, builder: 0, leader: 0 };
        
        this.answers.forEach(answer => {
            if (votes.hasOwnProperty(answer)) {
                votes[answer]++;
            }
        });
        
        // Find the strategy with most votes
        let maxVotes = 0;
        let result = 'balanced';
        
        for (const [strategy, count] of Object.entries(votes)) {
            if (count > maxVotes) {
                maxVotes = count;
                result = strategy;
            }
        }
        
        return result;
    }
    
    showResult() {
        const strategyKey = this.calculateResult();
        const strategy = this.strategies[strategyKey];
        
        // Hide questions
        document.getElementById('quiz-questions').style.display = 'none';
        document.querySelector('.quiz-progress').style.display = 'none';
        
        // Show result
        const resultContainer = document.getElementById('quiz-result');
        if (resultContainer) {
            resultContainer.classList.add('show');
            resultContainer.innerHTML = `
                <div class="result-card" style="--strategy-color: ${strategy.color}">
                    <div class="result-header">
                        <span class="result-icon">${strategy.icon}</span>
                        <div>
                            <h4>${strategy.name}</h4>
                            <span class="result-personality">${strategy.personality}</span>
                        </div>
                    </div>
                    <p class="result-desc">${strategy.description}</p>
                    <div class="result-income">
                        <span>Потенциальный доход:</span>
                        <strong>${strategy.income}</strong>
                    </div>
                    <div class="result-steps">
                        <h5>Ваши первые шаги:</h5>
                        <ol>
                            ${strategy.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    <div style="text-align: center; margin-top: var(--space-lg);">
                        <button class="btn btn-primary" onclick="strategyQuiz.restart()">
                            Пройти ещё раз
                        </button>
                        <a href="/calculator/strategies/" class="btn btn-secondary">
                            Все стратегии
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    restart() {
        this.currentQuestion = 0;
        this.answers = [];
        
        document.getElementById('quiz-questions').style.display = 'block';
        document.querySelector('.quiz-progress').style.display = 'block';
        
        const resultContainer = document.getElementById('quiz-result');
        if (resultContainer) {
            resultContainer.classList.remove('show');
            resultContainer.innerHTML = '';
        }
        
        this.renderQuestion();
        this.updateProgress();
    }
}

// Initialize quiz when DOM is ready
let strategyQuiz;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('strategy-quiz')) {
        strategyQuiz = new StrategyQuiz();
        window.strategyQuiz = strategyQuiz;
    }
});
