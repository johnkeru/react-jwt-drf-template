from django.urls import path
from .views import BlogView, BlogRetrieveView

urlpatterns = [
    path('', BlogView.as_view()),
    path('<int:pk>/', BlogRetrieveView.as_view())
]