import random
import string
from django.utils.text import slugify
import os
from django.core.exceptions import ValidationError

def generate_unique_slug(instance, new_slug=None):
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.body[:30])

    # check if a blog with the same slug already exists
    Blog = instance.__class__
    qs = Blog.objects.filter(slug=slug)
    if qs.exists():
        # if it does, append a random string to the slug
        new_slug = "{}-{}".format(slug, ''.join(random.choices(string.ascii_letters + string.digits, k=5)))
        return generate_unique_slug(instance, new_slug=new_slug)
    return slug

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.jpg', '.png', '.gif']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')
