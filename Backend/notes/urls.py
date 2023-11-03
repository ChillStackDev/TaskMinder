from django.urls import path
from .views import *
urlpatterns = [
    path('',apiPreview,name='apiPreview'),
    path('notes/',getNotes,name='getNotes'),
    path('notes/<str:pk>/',getNote,name='getNote'),
    path('create/',createNote,name='createNote'),
    path('update/<str:pk>/',updateNote,name='updateNote'),
    path('delete/<str:pk>/',deletNote,name='deleteNote'),
    
]
