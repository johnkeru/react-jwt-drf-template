from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import (
    DjangoModelPermissionsOrAnonReadOnly, 
    BasePermission, 
    SAFE_METHODS, 
    DjangoModelPermissions
    )
from .serializers import BlogSerializer
from .models import Blog


class CustomPermission(BasePermission):
    message = 'Adding customers not allowed.'
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user == obj.user

class BlogView(ListCreateAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Blog.custom_objects.all()
    serializer_class = BlogSerializer

class BlogRetrieveView(RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission, DjangoModelPermissions]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class UserBlogsView(ListCreateAPIView):
    permission_classes = [CustomPermission]
    serializer_class = BlogSerializer
    
    def get_queryset(self):
        if self.request.user.id is not None:
            user = self.request.user
            return Blog.objects.filter(user=user)