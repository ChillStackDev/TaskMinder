from django.urls import path
from .views import *
urlpatterns = [
    path('',apiOverview,name='api-overview'),
    path('task-list/',tasklist,name="tasklist"),
    path('task-detail/<str:pk>/',taskdetail,name="taskdetail"),
    path('task-create/',taskcreate,name="taskcreate"),
    path('task-update/<str:pk>/',taskupdate,name="taskupdate"),
      path('task-delete/<str:pk>/',taskdelete,name="taskdelete"),
    
]
