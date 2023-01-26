from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
        
class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('user', 'body', 'image')
        