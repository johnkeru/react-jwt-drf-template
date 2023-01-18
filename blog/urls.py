from django.urls import path
from .views import BlogView, BlogRetrieveView, MyTokenObtainPairView, UserBlogsView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', BlogView.as_view()),
    path('<int:pk>/', BlogRetrieveView.as_view()),
    path('user/blogs/', UserBlogsView.as_view()),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]