from django.urls import path
from . import views

app_name = 'calculator'

urlpatterns = [
    path('', views.index, name='index'),
    path('calc/', views.calculator, name='calculator'),
    path('ranks/', views.ranks, name='ranks'),
    path('bonuses/', views.bonuses, name='bonuses'),
    path('strategies/', views.strategies, name='strategies'),
    path('simulator/', views.simulator, name='simulator'),
    path('reference/', views.reference, name='reference'),
    path('charts/', views.charts, name='charts'),
    path('presentation/', views.presentation, name='presentation'),
    path('api/calculate/', views.api_calculate, name='api_calculate'),
    path('download/starter-packs/', views.download_starter_packs, name='download_starter_packs'),
]
