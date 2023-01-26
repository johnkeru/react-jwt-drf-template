from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, IsAuthenticated
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import BlogSerializer, BlogPostSerializer
from .models import Blog
from .permissions import CustomPermission
from django.shortcuts import get_object_or_404

class BlogViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_permissions(self):
        if self.action in ['retrieve', 'update', 'destroy']:
            self.permission_classes = [CustomPermission]
        return super().get_permissions()
    
    def get_object(self):
        slug = self.kwargs.get('pk')
        return get_object_or_404(Blog, slug=slug)


class CreatePost(APIView):
    # permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogGenericSet(generics.ListAPIView):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = BlogSerializer
    
    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        if slug:
            return Blog.objects.filter(slug=slug)
        return Blog.objects.all()
  
    # def get_queryset(self):
    #     if self.request.user is not None:
    #         user = self.request.user
    #         return Blog.objects.filter(user=user)
    #     return Blog.objects.all()
        
        
        
 