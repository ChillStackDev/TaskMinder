from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *

from .serializers import *


@api_view(['GET'])
def apiPreview(request):
    
    api_urls = {
        'List':'/notes/',
        'Detail_view':'/notes/<str:pk>/',
        'Create':'/create/',
        'Update':'/update/<str:pk>/',
        'Delete':'/delete/<str:pk>/'
    }
    return Response(api_urls)


@api_view(['GET'])
def getNotes(request):
    
    notes = Note.objects.all()
    
    serializer = NoteSerializer(notes,many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request,pk):
    
    notes = Note.objects.get(id=pk)
    
    serializer = NoteSerializer(notes)
    
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    
    data =request.data
    serializer = NoteSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def updateNote(request,pk):
    
    data = request.data
    
    notes = Note.objects.get(id=pk)
    
    serializer = NoteSerializer(instance=notes,data=data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)


@api_view(['DELETE'])
def deletNote(request,pk):
    
    notes = Note.objects.get(id=pk)
    
    notes.delete()
    
    return Response("ITEM DELETED SUCCESSFULLY")
