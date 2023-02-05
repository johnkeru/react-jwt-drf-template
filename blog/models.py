from django.db import models
from django.contrib.auth import get_user_model
from .utils import generate_unique_slug, upload_to, validate_file_extension


class Blog(models.Model):
    class Meta:
        ordering = ('-created',)
    
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
    updated = models.DateField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    slug = models.SlugField(max_length=250, unique_for_date='created', blank=True)

    custom_objects = CustomManager()
    objects = models.Manager()


