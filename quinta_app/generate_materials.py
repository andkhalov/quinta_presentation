#!/usr/bin/env python3
"""
Generate presentation materials for Quinta Essentia Marketing Plan.
Creates graphs, diagrams, and the presentation document.
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import numpy as np
import os

# Create output directories
OUTPUT_DIR = '../presentation_materials'
GRAPHICS_DIR = os.path.join(OUTPUT_DIR, 'graphics')
os.makedirs(GRAPHICS_DIR, exist_ok=True)

# Color scheme
COLORS = {
    'primary': '#B8860B',
    'primary_dark': '#8B6914',
    'primary_light': '#DAA520',
    'secondary': '#2D5016',
    'secondary_light': '#4A7C23',
    'accent': '#8B4513',
    'bg_dark': '#1A1A1A',
    'text_dark': '#1A1A1A',
    'text_light': '#F5F5F0',
}

# Set default style
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.size'] = 12
plt.rcParams['axes.titlesize'] = 16
plt.rcParams['axes.labelsize'] = 12


def create_cashback_chart():
    """Create cashback rates chart."""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    pv_levels = [35, 70, 140, 280]
    rates = [5, 7.5, 10, 12.5]
    colors = [COLORS['secondary_light'], COLORS['secondary'], COLORS['primary_light'], COLORS['primary']]
    
    bars = ax.bar(range(len(pv_levels)), rates, color=colors, edgecolor='white', linewidth=2)
    
    ax.set_xticks(range(len(pv_levels)))
    ax.set_xticklabels([f'{pv} PV' for pv in pv_levels])
    ax.set_ylabel('Ставка кешбэка (%)', fontsize=14)
    ax.set_title('💰 Кешбэк: чем больше покупаете — тем выше возврат', fontsize=16, fontweight='bold')
    ax.set_ylim(0, 15)
    
    # Add value labels on bars
    for bar, rate in zip(bars, rates):
        height = bar.get_height()
        ax.annotate(f'{rate}%',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3),
                    textcoords="offset points",
                    ha='center', va='bottom',
                    fontsize=14, fontweight='bold', color=COLORS['text_dark'])
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'cashback_rates.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created cashback_rates.png')


def create_income_growth_chart():
    """Create income growth over time chart."""
    fig, ax = plt.subplots(figsize=(12, 7))
    
    months = range(1, 13)
    
    # Different strategies
    consumer = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 140, 160]
    balanced = [50, 100, 200, 350, 500, 700, 900, 1100, 1300, 1500, 1700, 2000]
    builder = [100, 250, 500, 900, 1400, 2000, 2700, 3400, 4200, 5000, 5800, 6500]
    leader = [200, 500, 1000, 2000, 3500, 5000, 7000, 9000, 11000, 13500, 16000, 20000]
    
    ax.plot(months, consumer, marker='o', linewidth=2, markersize=8, label='🛒 Клиент', color=COLORS['secondary_light'])
    ax.plot(months, balanced, marker='s', linewidth=2, markersize=8, label='⚖️ Партнёр', color=COLORS['primary'])
    ax.plot(months, builder, marker='^', linewidth=2, markersize=8, label='🏗️ Строитель', color=COLORS['accent'])
    ax.plot(months, leader, marker='D', linewidth=2, markersize=8, label='👑 Лидер', color=COLORS['primary_dark'])
    
    ax.set_xlabel('Месяц работы', fontsize=14)
    ax.set_ylabel('Доход (€)', fontsize=14)
    ax.set_title('📈 Рост дохода по стратегиям за 12 месяцев', fontsize=16, fontweight='bold')
    ax.legend(loc='upper left', fontsize=12)
    ax.set_xticks(months)
    ax.set_xlim(0.5, 12.5)
    ax.set_ylim(0, 22000)
    
    # Add grid
    ax.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'income_growth.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created income_growth.png')


def create_bonus_structure_chart():
    """Create pie chart of bonus structure."""
    fig, ax = plt.subplots(figsize=(10, 8))
    
    # For a typical Primum consultant
    bonuses = ['Кешбэк\n(7.5%)', 'Бонус с продаж\n(~5%)', 'Командный\n(~10%)', 'Лидерский\n(2.5%)']
    values = [15, 20, 45, 20]
    colors = [COLORS['primary'], COLORS['secondary'], COLORS['accent'], COLORS['primary_dark']]
    explode = (0, 0, 0.05, 0)
    
    wedges, texts, autotexts = ax.pie(values, explode=explode, labels=bonuses, colors=colors,
                                       autopct='%1.0f%%', startangle=90,
                                       textprops={'fontsize': 12},
                                       wedgeprops={'edgecolor': 'white', 'linewidth': 2})
    
    for autotext in autotexts:
        autotext.set_fontsize(14)
        autotext.set_fontweight('bold')
        autotext.set_color('white')
    
    ax.set_title('🎯 Структура дохода (ранг Primum)', fontsize=16, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'bonus_structure.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created bonus_structure.png')


def create_ranks_ladder():
    """Create ranks ladder visualization."""
    fig, ax = plt.subplots(figsize=(14, 8))
    
    ranks = [
        ('Novus', '🌱', 35, None),
        ('Inceptor', '🌿', 35, 1050),
        ('Cognitor', '🌲', 35, 3000),
        ('Doctus', '⭐', 2500, 10000),
        ('Primum', '✨', 5000, None),
        ('Dux', '💎', 11000, None),
        ('Provectus', '👑', 23000, None),
        ('Grandis', '🏆', 45000, None),
    ]
    
    x_positions = range(len(ranks))
    heights = [1, 2, 3, 5, 7, 10, 14, 20]
    colors = ['#8BC34A', '#4CAF50', '#009688', '#00BCD4', '#03A9F4', '#2196F3', '#673AB7', '#9C27B0']
    
    bars = ax.bar(x_positions, heights, color=colors, edgecolor='white', linewidth=2)
    
    ax.set_xticks(x_positions)
    ax.set_xticklabels([f'{r[1]}\n{r[0]}' for r in ranks], fontsize=11)
    ax.set_ylabel('Уровень сложности', fontsize=14)
    ax.set_title('🏆 Карьерная лестница: от Novus до Grandis', fontsize=16, fontweight='bold')
    ax.set_ylim(0, 25)
    
    # Add T_PV requirements
    for i, (rank, emoji, t_pv, ot_pv) in enumerate(ranks):
        y_pos = heights[i] + 0.5
        if t_pv > 100:
            label = f'T: {t_pv:,} PV'
        else:
            label = f'ЛТ: {t_pv} PV'
        ax.annotate(label, xy=(i, y_pos), ha='center', fontsize=9, color=COLORS['text_dark'])
    
    ax.set_yticks([])
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'ranks_ladder.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created ranks_ladder.png')


def create_team_bonus_depth():
    """Create team bonus depth visualization."""
    fig, ax = plt.subplots(figsize=(12, 6))
    
    levels = ['1 ур.', '2 ур.', '3 ур.', '4 ур.', '5 ур.', '6 ур.', '7+ ур.']
    rates = [5, 2.5, 2.5, 2.5, 1.5, 1.5, 1]
    
    colors = [COLORS['primary'] if r >= 2.5 else COLORS['secondary'] for r in rates]
    
    bars = ax.barh(levels, rates, color=colors, edgecolor='white', linewidth=2)
    
    ax.set_xlabel('Процент от оборота (%)', fontsize=14)
    ax.set_title('👥 Командный бонус: глубина выплат по уровням', fontsize=16, fontweight='bold')
    ax.set_xlim(0, 7)
    
    # Add value labels
    for bar, rate in zip(bars, rates):
        width = bar.get_width()
        ax.annotate(f'{rate}%',
                    xy=(width, bar.get_y() + bar.get_height() / 2),
                    xytext=(3, 0),
                    textcoords="offset points",
                    ha='left', va='center',
                    fontsize=12, fontweight='bold', color=COLORS['text_dark'])
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'team_bonus_depth.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created team_bonus_depth.png')


def create_strategies_comparison():
    """Create strategies comparison chart."""
    fig, ax = plt.subplots(figsize=(12, 8))
    
    strategies = ['🛒 Клиент', '⚖️ Партнёр', '🏗️ Строитель', '👑 Лидер']
    
    # Categories
    categories = ['Время/день\n(часы)', 'Рекрутинг/мес\n(чел)', 'Доход 6 мес\n(сотни €)', 'Доход 12 мес\n(тысячи €)']
    
    data = {
        '🛒 Клиент': [1, 0.5, 0.5, 0.15],
        '⚖️ Партнёр': [3, 2, 8, 1.5],
        '🏗️ Строитель': [5, 5, 25, 5],
        '👑 Лидер': [7, 7, 45, 15],
    }
    
    x = np.arange(len(categories))
    width = 0.2
    colors = [COLORS['secondary_light'], COLORS['primary'], COLORS['accent'], COLORS['primary_dark']]
    
    for i, (strategy, color) in enumerate(zip(strategies, colors)):
        offset = (i - 1.5) * width
        bars = ax.bar(x + offset, data[strategy], width, label=strategy, color=color, edgecolor='white')
    
    ax.set_ylabel('Значение (нормализовано)', fontsize=14)
    ax.set_title('🎯 Сравнение стратегий: время vs результат', fontsize=16, fontweight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(categories, fontsize=11)
    ax.legend(loc='upper left', fontsize=11)
    ax.set_ylim(0, 50)
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'strategies_comparison.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created strategies_comparison.png')


def create_rewards_chart():
    """Create rewards visualization."""
    fig, ax = plt.subplots(figsize=(12, 6))
    
    ranks = ['Doctus', 'Primum', 'Dux', 'Provectus', 'Grandis', 'Sapiens']
    rewards_eur = [500, 2000, 1000, 2000, 3500, 5000]
    reward_types = ['Единораз.', 'Единораз.', 'Ежемес.', 'Ежемес.', 'Ежемес.', 'Ежемес.']
    colors = [COLORS['secondary'], COLORS['secondary'], COLORS['primary'], COLORS['primary'], COLORS['primary_dark'], COLORS['accent']]
    
    bars = ax.bar(ranks, rewards_eur, color=colors, edgecolor='white', linewidth=2)
    
    ax.set_ylabel('Сумма (€)', fontsize=14)
    ax.set_title('🎁 Награды за достижение рангов', fontsize=16, fontweight='bold')
    ax.set_ylim(0, 6000)
    
    # Add labels
    for bar, reward, rtype in zip(bars, rewards_eur, reward_types):
        height = bar.get_height()
        ax.annotate(f'€{reward:,}\n({rtype})',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3),
                    textcoords="offset points",
                    ha='center', va='bottom',
                    fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'rewards.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created rewards.png')


def create_5_income_sources():
    """Create 5 income sources infographic."""
    fig, ax = plt.subplots(figsize=(14, 8))
    
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')
    
    # Title
    ax.text(50, 95, '💰 5 Источников дохода в Quinta Essentia', 
            ha='center', fontsize=20, fontweight='bold', color=COLORS['text_dark'])
    
    # Source boxes
    sources = [
        ('🎁 КЕШБЭК', '5-12.5%', 'от личных покупок', COLORS['primary']),
        ('💼 БОНУС С ПРОДАЖ', '2.5-7.5%', 'от покупок приглашённых', COLORS['secondary']),
        ('👥 КОМАНДНЫЙ', '1-5%', 'с оборота команды', COLORS['accent']),
        ('👑 ЛИДЕРСКИЙ', '2.5%×5', 'с Doctus-линий', COLORS['primary_dark']),
        ('🏆 TOP БОНУС', 'до 3%', 'от оборота компании', '#9C27B0'),
    ]
    
    positions = [(10, 55), (30, 55), (50, 55), (70, 55), (90, 55)]
    
    for (title, rate, desc, color), (x, y) in zip(sources, positions):
        # Draw box
        rect = FancyBboxPatch((x-8, y-20), 16, 35, boxstyle="round,pad=0.02,rounding_size=0.5",
                               facecolor=color, edgecolor='white', linewidth=2, alpha=0.9)
        ax.add_patch(rect)
        
        # Add text
        ax.text(x, y+10, title, ha='center', fontsize=11, fontweight='bold', color='white')
        ax.text(x, y, rate, ha='center', fontsize=14, fontweight='bold', color='white')
        ax.text(x, y-10, desc, ha='center', fontsize=9, color='white', wrap=True)
    
    # Bottom note
    ax.text(50, 15, '✅ Все бонусы работают одновременно — вы получаете доход из всех источников!',
            ha='center', fontsize=12, color=COLORS['text_dark'], style='italic')
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, '5_income_sources.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created 5_income_sources.png')


def create_first_steps():
    """Create first steps infographic."""
    fig, ax = plt.subplots(figsize=(14, 6))
    
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')
    
    ax.text(50, 90, '🚀 Первые шаги: от регистрации до первого дохода', 
            ha='center', fontsize=18, fontweight='bold', color=COLORS['text_dark'])
    
    steps = [
        ('1', '📝', 'Регистрация', 'Бесплатно, 5 минут'),
        ('2', '🛒', 'Первый заказ', '70 PV (≈€130)'),
        ('3', '💬', 'Рекомендации', '2-3 друзьям'),
        ('4', '👥', 'Приглашения', '2 консультанта'),
        ('5', '💰', 'Первый доход', '€100-300/мес'),
    ]
    
    for i, (num, emoji, title, desc) in enumerate(steps):
        x = 10 + i * 20
        y = 50
        
        # Circle with number
        circle = plt.Circle((x, y), 5, color=COLORS['primary'], ec='white', linewidth=2)
        ax.add_patch(circle)
        ax.text(x, y, num, ha='center', va='center', fontsize=16, fontweight='bold', color='white')
        
        # Emoji and text
        ax.text(x, y-12, emoji, ha='center', fontsize=24)
        ax.text(x, y-22, title, ha='center', fontsize=11, fontweight='bold', color=COLORS['text_dark'])
        ax.text(x, y-30, desc, ha='center', fontsize=9, color='gray')
        
        # Arrow
        if i < len(steps) - 1:
            ax.annotate('', xy=(x+10, y), xytext=(x+5, y),
                       arrowprops=dict(arrowstyle='->', color=COLORS['primary'], lw=2))
    
    plt.tight_layout()
    plt.savefig(os.path.join(GRAPHICS_DIR, 'first_steps.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print('✓ Created first_steps.png')


def main():
    print('\n' + '='*50)
    print('Generating presentation materials for Quinta Essentia')
    print('='*50 + '\n')
    
    create_cashback_chart()
    create_income_growth_chart()
    create_bonus_structure_chart()
    create_ranks_ladder()
    create_team_bonus_depth()
    create_strategies_comparison()
    create_rewards_chart()
    create_5_income_sources()
    create_first_steps()
    
    print('\n' + '='*50)
    print(f'All graphics saved to: {os.path.abspath(GRAPHICS_DIR)}')
    print('='*50 + '\n')


if __name__ == '__main__':
    main()
