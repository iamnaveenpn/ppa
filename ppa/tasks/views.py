# tasks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task, Comment, Approval, Notification
from .serializers import TaskSerializer, CommentSerializer, ApprovalSerializer, NotificationSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get('status', None)
        if status:
            return Task.objects.filter(status=status)
        return Task.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        task = Task.objects.get(pk=request.data['task'])
        if task.status == 'Completed':
            return super().create(request, *args, **kwargs)
        else:
            return Response({'error': 'Task must be completed before approval.'}, status=status.HTTP_400_BAD_REQUEST)

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]  # Ensure that the user is authenticated