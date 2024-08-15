# tasks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task, Comment, Approval
from .serializers import TaskSerializer, CommentSerializer, ApprovalSerializer
from django.contrib.auth.models import User

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer

    def create(self, request, *args, **kwargs):
        task = Task.objects.get(pk=request.data['task'])
        if task.status == 'Completed':
            return super().create(request, *args, **kwargs)
        else:
            return Response({'error': 'Task must be completed before approval.'}, status=status.HTTP_400_BAD_REQUEST)
