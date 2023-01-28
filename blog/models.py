import os
from django.db import models
from django.contrib.auth import get_user_model
from .utils import generate_unique_slug
from django.core.exceptions import ValidationError


def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.jpg', '.png', '.gif']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')

class Blog(models.Model):
    class Meta:
        ordering = ('-created_at',)
    
    class CustomManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(privacy='public')

    choices = (('private', 'Private'), ('public', 'Public'))
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = generate_unique_slug(self)
        else:
            orig = Blog.objects.get(pk=self.pk)
            if orig.body != self.body:
                self.slug = generate_unique_slug(self)
        super(Blog, self).save(*args, **kwargs)
        

    user = models.ForeignKey(get_user_model(), related_name='entries', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_to, default='posts/default.png', validators=[validate_file_extension])
    body = models.TextField(max_length=500)
    privacy = models.CharField(max_length=10, choices=choices, default='public')
    updated_at = models.DateField(auto_now=True)
    created_at = models.DateField(auto_now_add=True)
    slug = models.SlugField(max_length=250, unique_for_date='created_at', blank=True)

    custom_objects = CustomManager()
    objects = models.Manager()


