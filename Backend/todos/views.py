from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from.serializers import *
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/task-list/',
        'Detail_view':'/task-detail/<str:pk>/',
        'Create':'/task-create/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/'
    }
    return Response(api_urls)

@api_view(['GET'])
def tasklist(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def taskdetail(request,pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks)
    return Response(serializer.data)
    
@api_view(['POST'])
def taskcreate(request):
    data=request.data
    serializer = TaskSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save()
   
    return Response(serializer.data)
    
    
@api_view(['POST'])
def taskupdate(request,pk):
    data=request.data
    task = Task.objects.get(id=pk)
    
    serializer = TaskSerializer(instance=task,data=data)
    
    if serializer.is_valid():
        serializer.save()
   
    return Response(serializer.data)

@api_view(['DELETE'])
def taskdelete(request,pk):
    
    task = Task.objects.get(id=pk)
    
    task.delete()
   
    return Response("ITEM SUCCESSFULLY DELETED")