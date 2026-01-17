"""URL configuration for quinta_project project."""
from django.urls import path, include

urlpatterns = [
    path('calculator/', include('calculator.urls')),
]
