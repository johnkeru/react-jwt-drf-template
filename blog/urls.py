from django.urls import path
from .views import BlogViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', BlogViewSet)

urlpatterns = router.urls