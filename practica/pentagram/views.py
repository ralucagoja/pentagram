from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from pentagram.models import Photo
from pentagram.models import Comment, Likes
from pentagram.serializers import PhotoSerializer, UserSerializer, CommentSerializer


@api_view(['GET', 'POST'])
def photos(request):
    if request.method == 'GET':
        photos = Photo.objects.all()
        serializer = PhotoSerializer(photos, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    if request.method == "POST":
        photo_serializer = PhotoSerializer(data=request.data)
        if photo_serializer.is_valid():
            photo_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=photo_serializer.errors)


@api_view(['POST'])
@permission_classes((AllowAny, ))
def users(request):
    if request.method == "POST":
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=user_serializer.errors)


@api_view(['GET', 'POST'])
def comments(request, id_photo):
    if request.method == 'GET':
        comments = Comment.objects.filter(photo=id_photo)
        serializer = CommentSerializer(comments, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    if request.method == "POST":
        comment_serializer = CommentSerializer(data=request.data)
        if comment_serializer.is_valid():
            comment_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST, data=comment_serializer.errors)


@api_view(['GET', 'POST'])
def like(request, id_photo):
    if request.method == 'POST':
        if Likes.objects.filter(photo_id=id_photo, user=request.user.id).count() == 0:
            Likes.objects.create(photo_id=id_photo, user=request.user.id).save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            Likes.objects.filter(photo_id=id_photo, user=request.user.id).delete()
            return Response(status=status.HTTP_205_RESET_CONTENT)
    else:
        if request.method == 'GET':
            counter = Likes.objects.filter(photo_id=id_photo).count()
            return Response(status=status.HTTP_302_FOUND, data=counter)
