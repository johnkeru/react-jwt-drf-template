from django.urls import path
from .views import BlogViewSet, BlogGenericSet, CreatePost
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', BlogViewSet)

urlpatterns = [
    path('list/', BlogGenericSet.as_view()),    
    path('create/', CreatePost.as_view()),
] + router.urls