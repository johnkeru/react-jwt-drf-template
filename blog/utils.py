import random
import string
from django.utils.text import slugify

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