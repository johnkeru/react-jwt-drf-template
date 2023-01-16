from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    class Meta:
        ordering = ('-created_at',)
    
    class CustomManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(privacy='public')

    choices = (('private', 'Private'), ('public', 'Public'))

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(max_length=500)
    privacy = models.CharField(max_length=10, choices=choices, default='public')
    updated_at = models.DateField(auto_now=True)
    created_at = models.DateField(auto_now_add=True)

    custom_objects = CustomManager()
    objects = models.Manager()
