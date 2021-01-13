from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('basic_timer/', views.basic_timer, name='basic_timer'),
]