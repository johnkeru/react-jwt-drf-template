from .models import NewUser
from rest_framework import serializers

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create (self, validated_data):
        return NewUser.objects.create_user(**validated_data)
