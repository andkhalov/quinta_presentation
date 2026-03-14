# Quinta Essentia — Маркетинговая платформа

Интерактивная платформа для презентации и расчёта маркетинг-плана **Quinta Essentia**.

![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Django](https://img.shields.io/badge/django-5.0+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Быстрый старт

```bash
# Клонируем репозиторий
git clone https://github.com/andkhalov/quinta_presentation.git
cd quinta_presentation

# Запускаем одной командой
./run-all.sh

# Открываем в браузере
open http://localhost:8765/calculator/
```

---

## 📋 Что включено

### Интерактивное Django-приложение

| Страница | Описание |
|----------|----------|
| `/calculator/` | Главная — обзор возможностей и доходов |
| `/calculator/calc/` | Калькулятор дохода с интерактивными слайдерами |
| `/calculator/charts/` | Интерактивные графики бонусов |
| `/calculator/ranks/` | Система из 12 рангов с наградами |
| `/calculator/bonuses/` | Детальное описание 6 видов бонусов |
| `/calculator/strategies/` | Квиз для выбора персональной стратегии |
| `/calculator/simulator/` | Симулятор роста команды на 12 месяцев |
| `/calculator/presentation/` | Презентация с заметками для спикера |
| `/calculator/reference/` | Полный справочник маркетинг-плана |

### Материалы для презентаций

```
presentation_materials/
├── presentation_content.md    # Текст презентации (15 слайдов)
├── speaker_notes.md           # Заметки для спикера
├── meta_analysis.md           # Мета-анализ лучших выступлений
└── graphics/                  # 9 готовых графиков PNG
```

---

## 💡 Основные функции

### Калькулятор дохода
- Интерактивные слайдеры для всех параметров
- Расчёт в реальном времени
- Круговая диаграмма распределения дохода
- Справочные таблицы с динамической подсветкой

### 5 источников дохода
1. **Кешбэк** — до 12.5% от личных покупок
2. **Бонус продаж** — до 7.5% от структуры
3. **Командный бонус** — до 7 уровней глубины
4. **Лидерский бонус** — для рангов Primum+
5. **TOP-бонус** — для топ-лидеров компании

### Система рангов
- 12 уровней: от Novus до Principal
- Накопительные и лидерские ранги
- Награды: от 100 PV до недвижимости

---

## 🛠 Технологии

- **Backend**: Django 5.0.6
- **Frontend**: Vanilla JS, Chart.js
- **Styling**: CSS3 с CSS-переменными, шрифт Geologica
- **Контейнеризация**: Docker / Docker Compose

---

## 📁 Структура проекта

```
quinta_presentation/
├── README.md
├── run-all.sh                    # Скрипт запуска
├── .gitignore
├── meta_analysis.md              # Мета-анализ выступлений
│
├── quinta_app/                   # Django приложение
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── quinta_project/           # Настройки Django
│   └── calculator/               # Основное приложение
│       ├── marketing_model.py    # Математическая модель
│       ├── views.py
│       ├── templates/
│       └── static/
│
├── presentation_materials/       # Материалы презентации
│   ├── presentation_content.md
│   ├── speaker_notes.md
│   └── graphics/
│
└── png/                          # Графика и логотип
```

---

## 🎯 Три роли в системе

| Роль | Описание | Минимум |
|------|----------|---------|
| **Покупатель** | Покупает продукцию со скидкой | — |
| **Консультант** | Зарабатывает на продажах и команде | 35 PV/мес |
| **Лидер** | Строит команду, получает все виды бонусов | Ранг Doctus+ |

---

## 📊 Ключевые параметры

| Параметр | Значение |
|----------|----------|
| 1 PV | 1 EUR |
| Минимальная активность | 35 PV (Novus), 70 PV (Doctus+) |
| Глубина командного бонуса | до 7 уровней (∞ для Doctus+) |
| Максимальный кешбэк | 12.5% |
| Максимальный бонус продаж | 7.5% |

---

## 🚀 Запуск

### Вариант 1: Скрипт (рекомендуется)

```bash
./run-all.sh
```

### Вариант 2: Вручную

```bash
cd quinta_app
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver 8765
```

### Вариант 3: Docker

```bash
cd quinta_app
docker-compose up --build
```

---

## 📝 Для спикеров

1. Изучите `presentation_materials/speaker_notes.md`
2. Откройте приложение на `/calculator/presentation/`
3. Используйте `/calculator/calc/` для демонстрации расчётов
4. Проведите квиз на `/calculator/strategies/`

---

## 🔗 Ссылки

- **Демо**: [localhost:8765/calculator/](http://localhost:8765/calculator/)
- **Репозиторий**: [github.com/andkhalov/quinta_presentation](https://github.com/andkhalov/quinta_presentation)

---

## 📄 Лицензия

MIT License © 2026 Quinta Essentia

---

*Создано с ❤️ для консультантов Quinta Essentia*
