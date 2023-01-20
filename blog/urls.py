from django.urls import path
from .views import BlogView, BlogRetrieveView, UserBlogsView

urlpatterns = [
    path('', BlogView.as_view()),
    path('<int:pk>/', BlogRetrieveView.as_view()),
    path('user/blogs/', UserBlogsView.as_view()),
    
]