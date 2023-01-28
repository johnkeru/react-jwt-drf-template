from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, IsAuthenticated
from rest_framework import viewsets
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from .serializers import BlogSerializer, BlogPostSerializer
from .models import Blog

from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied

class BlogViewSet(viewsets.ModelViewSet):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def get_serializer_class(self):
        if self.action in ['update', 'create', 'partial_update']:
            return BlogPostSerializer
        return BlogSerializer
    
    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        if slug:
            return Blog.custom_objects.filter(slug=slug)
        return Blog.custom_objects.all()
    
    def get_object(self):
        slug = self.kwargs.get('pk')
        return get_object_or_404(Blog, slug=slug)
    
    def create(self, request, *args, **kwargs):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_destroy(self, instance):
        if self.request.user != instance.user:
            raise PermissionDenied("You are not the user of this post")
        instance.delete()

    def perform_update(self, serializer):
        if self.request.user != serializer.instance.user:
            raise PermissionDenied("You are not the user of this post")
        serializer.save()


# class CreatePost(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def post(self, request, format=None):
#         serializer = BlogPostSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
  
  
    # def get_queryset(self):
    #     if self.request.user is not None:
    #         user = self.request.user
    #         return Blog.objects.filter(user=user)
    #     return Blog.objects.all()
        
        
        
 