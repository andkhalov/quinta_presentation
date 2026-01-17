"""Views for Quinta Essentia Marketing Calculator"""
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import marketing_model as mm


def index(request):
    """Главная страница"""
    context = {
        'ranks': mm.RANKS,
        'strategies': mm.STRATEGIES,
        'pv_to_eur': mm.PV_TO_EUR,
    }
    return render(request, 'calculator/index.html', context)


def calculator(request):
    """Калькулятор доходов"""
    context = {
        'cashback_table': mm.CASHBACK_TABLE,
        'sales_bonus_table': mm.SALES_BONUS_TABLE,
        'pv_to_eur': mm.PV_TO_EUR,
    }
    return render(request, 'calculator/calculator.html', context)


def ranks(request):
    """Страница рангов"""
    context = {
        'ranks': mm.RANKS,
        'rank_rewards': mm.RANK_REWARDS,
        'team_bonus': mm.TEAM_BONUS,
    }
    return render(request, 'calculator/ranks.html', context)


def bonuses(request):
    """Страница бонусов"""
    context = {
        'cashback_table': mm.CASHBACK_TABLE,
        'sales_bonus_table': mm.SALES_BONUS_TABLE,
        'team_bonus': mm.TEAM_BONUS,
        'leader_bonus_percent': mm.LEADER_BONUS_PERCENT,
        'leader_bonus_levels': mm.LEADER_BONUS_LEVELS,
        'top_bonus': mm.TOP_BONUS,
        'rank_rewards': mm.RANK_REWARDS,
    }
    return render(request, 'calculator/bonuses.html', context)


def strategies(request):
    """Страница стратегий"""
    context = {
        'strategies': mm.STRATEGIES,
    }
    return render(request, 'calculator/strategies.html', context)


def simulator(request):
    """Симулятор структуры"""
    context = {
        'ranks': mm.RANKS,
        'team_bonus': mm.TEAM_BONUS,
        'pv_to_eur': mm.PV_TO_EUR,
    }
    return render(request, 'calculator/simulator.html', context)


def reference(request):
    """Справочник по маркетингу"""
    context = {
        'ranks': mm.RANKS,
        'rank_rewards': mm.RANK_REWARDS,
        'cashback_table': mm.CASHBACK_TABLE,
        'sales_bonus_table': mm.SALES_BONUS_TABLE,
        'team_bonus': mm.TEAM_BONUS,
        'leader_bonus_percent': mm.LEADER_BONUS_PERCENT,
        'leader_bonus_levels': mm.LEADER_BONUS_LEVELS,
        'top_bonus': mm.TOP_BONUS,
        'pv_to_eur': mm.PV_TO_EUR,
    }
    return render(request, 'calculator/reference.html', context)


def charts(request):
    """Интерактивные графики"""
    context = {
        'ranks': mm.RANKS,
        'cashback_table': mm.CASHBACK_TABLE,
        'sales_bonus_table': mm.SALES_BONUS_TABLE,
        'team_bonus': mm.TEAM_BONUS,
        'pv_to_eur': mm.PV_TO_EUR,
    }
    return render(request, 'calculator/charts.html', context)


def presentation(request):
    """Презентация для спикеров"""
    context = {
        'ranks': mm.RANKS,
        'rank_rewards': mm.RANK_REWARDS,
        'cashback_table': mm.CASHBACK_TABLE,
        'sales_bonus_table': mm.SALES_BONUS_TABLE,
        'team_bonus': mm.TEAM_BONUS,
        'leader_bonus_percent': mm.LEADER_BONUS_PERCENT,
        'leader_bonus_levels': mm.LEADER_BONUS_LEVELS,
        'pv_to_eur': mm.PV_TO_EUR,
    }
    return render(request, 'calculator/presentation.html', context)


@csrf_exempt
def api_calculate(request):
    """API для расчета доходов"""
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    
    try:
        data = json.loads(request.body)
        
        lt = float(data.get('lt', 0))
        ot = float(data.get('ot', 0))
        t = float(data.get('t', 0))
        kt = float(data.get('kt', 0))
        partners = data.get('partners', [])
        team_volumes = data.get('team_volumes', [])
        doctus_partners = data.get('doctus_partners', [])
        
        result = mm.calculate_total_income(
            lt=lt,
            ot=ot,
            t=t,
            kt=kt,
            partners=partners,
            team_volumes=team_volumes,
            doctus_partners=doctus_partners
        )
        
        return JsonResponse(result)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
