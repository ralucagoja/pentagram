from django.contrib import admin
from pentagram.models import Photo
from pentagram.models import Comment, Likes

# Register your models here.

admin.site.register(Photo)
admin.site.register(Comment)
admin.site.register(Likes)
