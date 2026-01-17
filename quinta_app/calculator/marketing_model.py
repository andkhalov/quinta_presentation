"""
Математическая модель маркетинга Quinta Essentia
Все данные из ТЗ маркетинга Quinta Essentia v.7
"""

# Курс: 1 PV = 1 EUR (по условию задания)
PV_TO_EUR = 1.0

# Кэшбэк таблица
CASHBACK_TABLE = [
    {'lt_min': 35, 'lt_max': 69, 'percent': 5},
    {'lt_min': 70, 'lt_max': 139, 'percent': 7.5},
    {'lt_min': 140, 'lt_max': 279, 'percent': 10},
    {'lt_min': 280, 'lt_max': float('inf'), 'percent': 12.5},
]

# Бонус продаж таблица
SALES_BONUS_TABLE = {
    # (кол-во ЛП, ЛТ пользователя, ЛТ приглашенных): процент
    2: {70: 2.5, 140: 4.5, 280: 5.5},
    4: {70: 3.0, 140: 5.0, 280: 6.0},
    6: {70: 3.5, 140: 5.5, 280: 6.5},
    8: {70: 4.0, 140: 6.0, 280: 7.0},
    10: {70: 4.5, 140: 6.5, 280: 7.5},
}

# Командный бонус по рангам
TEAM_BONUS = {
    'Novus': {1: 5, 2: 2.5, 3: 2.5},
    'Inceptor': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5},
    'Cognitor': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5},
    'Doctus': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 'deep': 1},
    'Primum': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 'deep': 1},
    'Dux': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
    'Provectus': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
    'Grandis': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
    'Oraculi': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
    'Sapiens': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
    'Superator': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
    'Principal': {1: 5, 2: 2.5, 3: 2.5, 4: 2.5, 5: 1.5, 6: 1.5, 7: 1.5, 'deep': 1},
}

# Ранги с требованиями
RANKS = [
    {
        'name': 'Novus',
        'name_ru': 'Новус',
        'lt': 35,
        'ot': 0,
        't': 0,
        'kt': 0,
        'conditions': [],
        'color': '#6B7280',
        'icon': '🌱'
    },
    {
        'name': 'Inceptor',
        'name_ru': 'Инцептор',
        'lt': 35,
        'ot': 1050,
        't': 0,
        'kt': 0,
        'conditions': [],
        'color': '#10B981',
        'icon': '🌿'
    },
    {
        'name': 'Cognitor',
        'name_ru': 'Когнитор',
        'lt': 35,
        'ot': 3000,
        't': 0,
        'kt': 0,
        'conditions': [],
        'color': '#3B82F6',
        'icon': '💡'
    },
    {
        'name': 'Doctus',
        'name_ru': 'Доктус',
        'lt': 70,
        'ot': 10000,
        't': 2500,
        'kt': 0,
        'conditions': [],
        'color': '#8B5CF6',
        'icon': '📚'
    },
    {
        'name': 'Primum',
        'name_ru': 'Примум',
        'lt': 70,
        'ot': 10000,
        't': 5000,
        'kt': 1500,
        'conditions': ['1 Doctus в первой линии'],
        'color': '#EC4899',
        'icon': '⭐'
    },
    {
        'name': 'Dux',
        'name_ru': 'Дукс',
        'lt': 70,
        'ot': 10000,
        't': 11000,
        'kt': 1350,
        'conditions': ['1 Doctus + 1 Primum'],
        'color': '#F59E0B',
        'icon': '🏅'
    },
    {
        'name': 'Provectus',
        'name_ru': 'Провектус',
        'lt': 70,
        'ot': 10000,
        't': 23000,
        'kt': 1200,
        'conditions': ['2 Doctus + 1 Primum'],
        'color': '#EF4444',
        'icon': '🚀'
    },
    {
        'name': 'Grandis',
        'name_ru': 'Грандис',
        'lt': 70,
        'ot': 10000,
        't': 45000,
        'kt': 1100,
        'conditions': ['2 Doctus + 1 Primum + 1 Dux'],
        'color': '#DC2626',
        'icon': '👑'
    },
    {
        'name': 'Oraculi',
        'name_ru': 'Оракули',
        'lt': 70,
        'ot': 10000,
        't': 90000,
        'kt': 1100,
        'conditions': ['2 Primum + 1 Dux + 1 Provectus'],
        'color': '#9333EA',
        'icon': '🔮'
    },
    {
        'name': 'Sapiens',
        'name_ru': 'Сапиенс',
        'lt': 70,
        'ot': 10000,
        't': 150000,
        'kt': 1000,
        'conditions': ['2 Dux + 2 Provectus + 1 Grandis'],
        'color': '#7C3AED',
        'icon': '🧠'
    },
    {
        'name': 'Superator',
        'name_ru': 'Суператор',
        'lt': 70,
        'ot': 10000,
        't': 280000,
        'kt': 1000,
        'conditions': ['2 Provectus + 2 Grandis'],
        'color': '#4F46E5',
        'icon': '💎'
    },
    {
        'name': 'Principal',
        'name_ru': 'Принципал',
        'lt': 70,
        'ot': 10000,
        't': 500000,
        'kt': 800,
        'conditions': ['6 Grandis'],
        'color': '#1D4ED8',
        'icon': '🏆'
    },
]

# Ранговые подарки
RANK_REWARDS = {
    'Primum': {'reward': '100 PV', 'pv': 100, 'months': '2 подряд'},
    'Dux': {'reward': '300 PV', 'pv': 300, 'months': '2 подряд'},
    'Provectus': {'reward': '1,200 PV', 'pv': 1200, 'months': '2 подряд'},
    'Grandis': {'reward': '2,500 PV', 'pv': 2500, 'months': '2 подряд'},
    'Oraculi': {'reward': 'VIP путешествие на двоих', 'pv': 0, 'months': '3 из 5'},
    'Sapiens': {'reward': 'Часы Rolex / Omega', 'pv': 0, 'months': '3 из 5'},
    'Superator': {'reward': 'Престижное авто', 'pv': 0, 'months': '6 из 9'},
    'Principal': {'reward': 'Недвижимость', 'pv': 0, 'months': '6 из 9'},
}

# Лидерский бонус
LEADER_BONUS_PERCENT = 2.5
LEADER_BONUS_LEVELS = {
    'Primum': 1,
    'Dux': 2,
    'Provectus': 3,
    'Grandis': 4,
    'Oraculi': 5,
    'Sapiens': 5,
    'Superator': 5,
    'Principal': 5,
}

# ТОП бонус
TOP_BONUS = {
    'Sapiens': {'percent': 0.8, 'max_share': 10},
    'Superator': {'percent': 0.7, 'max_share': 15},
    'Principal': {'percent': 0.5, 'max_share': 20},
}


def get_cashback_percent(lt: float) -> float:
    """Получить процент кэшбэка по ЛТ"""
    for level in CASHBACK_TABLE:
        if level['lt_min'] <= lt <= level['lt_max']:
            return level['percent']
    return 0


def calculate_cashback(lt: float) -> dict:
    """Рассчитать кэшбэк"""
    percent = get_cashback_percent(lt)
    bonus_pv = lt * percent / 100
    bonus_eur = bonus_pv * PV_TO_EUR
    
    return {
        'lt': lt,
        'percent': percent,
        'bonus_pv': round(bonus_pv, 2),
        'bonus_eur': round(bonus_eur, 2),
    }


def get_sales_bonus_percent(lp_count: int, user_lt: int, lp_lt: int) -> float:
    """Получить процент бонуса продаж"""
    # Найти подходящее количество ЛП
    applicable_lp = 0
    for lp_threshold in sorted(SALES_BONUS_TABLE.keys()):
        if lp_count >= lp_threshold:
            applicable_lp = lp_threshold
    
    if applicable_lp == 0:
        return 0
    
    # Найти подходящий ЛТ пользователя
    lt_thresholds = sorted(SALES_BONUS_TABLE[applicable_lp].keys())
    applicable_lt = 0
    for lt_threshold in lt_thresholds:
        if user_lt >= lt_threshold:
            applicable_lt = lt_threshold
    
    if applicable_lt == 0:
        return 0
    
    return SALES_BONUS_TABLE[applicable_lp][applicable_lt]


def calculate_sales_bonus(user_lt: int, partners: list) -> dict:
    """
    Рассчитать бонус продаж
    partners: список словарей {'lt': int, 'structure_volume': int}
    """
    # Считаем ЛП с нужным ЛТ
    qualifying_partners = [p for p in partners if p.get('lt', 0) >= 70]
    lp_count = len(qualifying_partners)
    
    percent = get_sales_bonus_percent(lp_count, user_lt, 70)
    
    # Считаем бонус с оборота структуры
    total_volume = sum(p.get('structure_volume', 0) for p in partners)
    bonus_pv = total_volume * percent / 100
    bonus_eur = bonus_pv * PV_TO_EUR
    
    return {
        'lp_count': lp_count,
        'user_lt': user_lt,
        'percent': percent,
        'total_volume': total_volume,
        'bonus_pv': round(bonus_pv, 2),
        'bonus_eur': round(bonus_eur, 2),
    }


def get_rank(lt: float, ot: float, t: float, kt: float) -> dict:
    """Определить ранг по объемам"""
    current_rank = None
    
    for rank in RANKS:
        if (lt >= rank['lt'] and 
            ot >= rank['ot'] and 
            t >= rank['t'] and 
            kt >= rank['kt']):
            current_rank = rank
        else:
            break
    
    return current_rank or RANKS[0]


def calculate_team_bonus(rank_name: str, team_volumes: list) -> dict:
    """
    Рассчитать командный бонус
    team_volumes: список объемов по уровням [{level: 1, volume: 1000}, ...]
    """
    if rank_name not in TEAM_BONUS:
        rank_name = 'Novus'
    
    bonus_structure = TEAM_BONUS[rank_name]
    total_bonus_pv = 0
    level_bonuses = []
    
    for item in team_volumes:
        level = item.get('level', 0)
        volume = item.get('volume', 0)
        
        if level in bonus_structure:
            percent = bonus_structure[level]
        elif 'deep' in bonus_structure and level > max(k for k in bonus_structure if isinstance(k, int)):
            percent = bonus_structure['deep']
        else:
            percent = 0
        
        bonus = volume * percent / 100
        total_bonus_pv += bonus
        level_bonuses.append({
            'level': level,
            'volume': volume,
            'percent': percent,
            'bonus': round(bonus, 2)
        })
    
    bonus_eur = total_bonus_pv * PV_TO_EUR
    
    return {
        'rank': rank_name,
        'level_bonuses': level_bonuses,
        'total_bonus_pv': round(total_bonus_pv, 2),
        'total_bonus_eur': round(bonus_eur, 2),
    }


def calculate_leader_bonus(rank_name: str, doctus_partners: list) -> dict:
    """
    Рассчитать лидерский бонус
    doctus_partners: список словарей {'level': int, 'lt': int, 'kt': int}
    """
    if rank_name not in LEADER_BONUS_LEVELS:
        return {
            'rank': rank_name,
            'accessible_levels': 0,
            'partners': [],
            'total_bonus_pv': 0,
            'total_bonus_eur': 0,
        }
    
    accessible_levels = LEADER_BONUS_LEVELS[rank_name]
    total_bonus_pv = 0
    partner_bonuses = []
    
    for partner in doctus_partners:
        level = partner.get('level', 0)
        if level <= accessible_levels:
            lt = partner.get('lt', 0)
            kt = partner.get('kt', 0)
            bonus = (lt + kt) * LEADER_BONUS_PERCENT / 100
            total_bonus_pv += bonus
            partner_bonuses.append({
                'level': level,
                'lt': lt,
                'kt': kt,
                'bonus': round(bonus, 2)
            })
    
    bonus_eur = total_bonus_pv * PV_TO_EUR
    
    return {
        'rank': rank_name,
        'accessible_levels': accessible_levels,
        'partners': partner_bonuses,
        'total_bonus_pv': round(total_bonus_pv, 2),
        'total_bonus_eur': round(bonus_eur, 2),
    }


def calculate_total_income(
    lt: float,
    ot: float,
    t: float,
    kt: float,
    partners: list = None,
    team_volumes: list = None,
    doctus_partners: list = None
) -> dict:
    """Рассчитать полный доход"""
    
    # Определяем ранг
    rank = get_rank(lt, ot, t, kt)
    
    # Кэшбэк
    cashback = calculate_cashback(lt)
    
    # Бонус продаж
    partners = partners or []
    sales_bonus = calculate_sales_bonus(lt, partners)
    
    # Командный бонус
    team_volumes = team_volumes or []
    team_bonus = calculate_team_bonus(rank['name'], team_volumes)
    
    # Лидерский бонус
    doctus_partners = doctus_partners or []
    leader_bonus = calculate_leader_bonus(rank['name'], doctus_partners)
    
    # Ранговый подарок
    rank_reward = RANK_REWARDS.get(rank['name'], {})
    
    # Итого
    total_pv = (
        cashback['bonus_pv'] + 
        sales_bonus['bonus_pv'] + 
        team_bonus['total_bonus_pv'] + 
        leader_bonus['total_bonus_pv']
    )
    total_eur = total_pv * PV_TO_EUR
    
    return {
        'rank': rank,
        'cashback': cashback,
        'sales_bonus': sales_bonus,
        'team_bonus': team_bonus,
        'leader_bonus': leader_bonus,
        'rank_reward': rank_reward,
        'total': {
            'pv': round(total_pv, 2),
            'eur': round(total_eur, 2),
        }
    }


# Стратегии работы
STRATEGIES = [
    {
        'id': 'client',
        'name': 'Клиентский путь',
        'name_en': 'Client Path',
        'icon': '🛒',
        'color': '#10B981',
        'personality': 'Интроверт',
        'description': 'Фокус на личном потреблении продукции и постепенном привлечении знакомых',
        'focus': ['Кэшбэк 5-12.5%', 'Личное потребление', 'Рекомендации друзьям'],
        'effort': 'Минимальные усилия',
        'income_type': 'Стабильный небольшой доход',
        'expected_income': {
            '3_months': {'min': 10, 'max': 30, 'currency': 'EUR'},
            '6_months': {'min': 20, 'max': 60, 'currency': 'EUR'},
            '12_months': {'min': 40, 'max': 100, 'currency': 'EUR'},
        },
        'steps': [
            'Зарегистрируйтесь как консультант (35 PV)',
            'Начните использовать продукцию сами',
            'Делитесь результатами с близкими',
            'Постепенно увеличивайте ЛТ до 280 PV',
            'Получайте максимальный кэшбэк 12.5%',
        ],
    },
    {
        'id': 'seller',
        'name': 'Активный продавец',
        'name_en': 'Active Seller',
        'icon': '💼',
        'color': '#F59E0B',
        'personality': 'Экстраверт',
        'description': 'Активные продажи клиентам, максимизация розничного дохода',
        'focus': ['Кэшбэк 12.5%', 'Бонус продаж до 7.5%', 'Работа с клиентами'],
        'effort': 'Активная работа',
        'income_type': 'Высокий активный доход',
        'expected_income': {
            '3_months': {'min': 100, 'max': 300, 'currency': 'EUR'},
            '6_months': {'min': 200, 'max': 600, 'currency': 'EUR'},
            '12_months': {'min': 400, 'max': 1000, 'currency': 'EUR'},
        },
        'steps': [
            'Зарегистрируйтесь с максимальным ЛТ (280 PV)',
            'Изучите продуктовую линейку',
            'Создайте базу из 10+ клиентов',
            'Пригласите 10 активных партнеров',
            'Получайте до 20% от объема структуры',
        ],
    },
    {
        'id': 'builder',
        'name': 'Строитель команды',
        'name_en': 'Team Builder',
        'icon': '👥',
        'color': '#8B5CF6',
        'personality': 'Лидер',
        'description': 'Фокус на построении команды и развитии партнеров',
        'focus': ['Командный бонус 7 уровней', 'Лидерский бонус 2.5%', 'Ранговые подарки'],
        'effort': 'Систематическая работа',
        'income_type': 'Масштабируемый пассивный доход',
        'expected_income': {
            '3_months': {'min': 200, 'max': 600, 'currency': 'EUR'},
            '6_months': {'min': 600, 'max': 1400, 'currency': 'EUR'},
            '12_months': {'min': 1000, 'max': 3000, 'currency': 'EUR'},
        },
        'steps': [
            'Зарегистрируйтесь и пройдите обучение',
            'Постройте первую линию из 6+ консультантов',
            'Помогите партнерам достичь ранга Doctus',
            'Достигните ранга Primum для лидерского бонуса',
            'Развивайте глубину структуры',
        ],
    },
    {
        'id': 'hybrid',
        'name': 'Гибридная стратегия',
        'name_en': 'Hybrid Strategy',
        'icon': '🎯',
        'color': '#EC4899',
        'personality': 'Универсал',
        'description': 'Баланс между продажами и построением команды',
        'focus': ['Все виды бонусов', 'Диверсификация дохода', 'Максимальный потенциал'],
        'effort': 'Полная вовлеченность',
        'income_type': 'Максимальный комбинированный доход',
        'expected_income': {
            '3_months': {'min': 300, 'max': 800, 'currency': 'EUR'},
            '6_months': {'min': 800, 'max': 2000, 'currency': 'EUR'},
            '12_months': {'min': 1500, 'max': 5000, 'currency': 'EUR'},
        },
        'steps': [
            'Зарегистрируйтесь с максимальным стартом',
            'Создайте клиентскую базу (5-10 клиентов)',
            'Пригласите 10+ активных партнеров',
            'Достигните ранга Doctus за 3 месяца',
            'Стремитесь к Primum за 6 месяцев',
            'Цель: Grandis за 12 месяцев',
        ],
    },
]


def get_strategy_recommendation(answers: dict) -> dict:
    """
    Получить рекомендацию стратегии на основе ответов
    answers: {'time': 1-4, 'communication': 1-4, 'goal': 1-4, 'experience': 1-4}
    """
    scores = {s['id']: 0 for s in STRATEGIES}
    
    # Время
    time_score = answers.get('time', 2)
    if time_score <= 1:
        scores['client'] += 3
    elif time_score == 2:
        scores['client'] += 1
        scores['seller'] += 2
    elif time_score == 3:
        scores['seller'] += 1
        scores['builder'] += 2
        scores['hybrid'] += 1
    else:
        scores['builder'] += 2
        scores['hybrid'] += 3
    
    # Общительность
    comm_score = answers.get('communication', 2)
    if comm_score <= 1:
        scores['client'] += 3
    elif comm_score == 2:
        scores['client'] += 1
        scores['hybrid'] += 1
    elif comm_score == 3:
        scores['seller'] += 2
        scores['hybrid'] += 1
    else:
        scores['seller'] += 1
        scores['builder'] += 3
        scores['hybrid'] += 2
    
    # Цель дохода
    goal_score = answers.get('goal', 2)
    if goal_score <= 1:
        scores['client'] += 3
    elif goal_score == 2:
        scores['seller'] += 2
        scores['client'] += 1
    elif goal_score == 3:
        scores['seller'] += 1
        scores['builder'] += 2
        scores['hybrid'] += 2
    else:
        scores['builder'] += 2
        scores['hybrid'] += 3
    
    # Опыт
    exp_score = answers.get('experience', 1)
    if exp_score <= 1:
        scores['client'] += 2
    elif exp_score == 2:
        scores['seller'] += 1
        scores['client'] += 1
    elif exp_score == 3:
        scores['seller'] += 1
        scores['builder'] += 1
        scores['hybrid'] += 2
    else:
        scores['builder'] += 2
        scores['hybrid'] += 2
    
    # Найти лучшую стратегию
    best_strategy_id = max(scores, key=scores.get)
    best_strategy = next(s for s in STRATEGIES if s['id'] == best_strategy_id)
    
    return {
        'recommended': best_strategy,
        'scores': scores,
        'all_strategies': STRATEGIES,
    }
