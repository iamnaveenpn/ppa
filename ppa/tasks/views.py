# tasks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task, Comment, Approval, Notification
from .serializers import TaskSerializer, CommentSerializer, ApprovalSerializer, NotificationSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.utils import timezone

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        status = self.request.query_params.get('status', None)
        if status:
            return Task.objects.filter(status=status)
        return Task.objects.all()
    
    def perform_update(self, serializer):
        instance = serializer.save()
        # If the task status is set to 'Completed', create a notification
        if instance.status == 'Completed':
            Notification.objects.create(
                user=instance.assigned_to,
                message=f'Task "{instance.title}" has been marked as completed.',
                created_at=timezone.now(),
            )

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        instance = serializer.save()
        # Create a notification when a comment is added
        Notification.objects.create(
            user=instance.task.assigned_to,
            message=f'New comment on task "{instance.task.title}": "{instance.text}".',
            created_at=timezone.now(),
        )

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        task = Task.objects.get(pk=request.data['task'])
        if task.status == 'Completed':
            response = super().create(request, *args, **kwargs)
            # Create a notification after approval is given
            Notification.objects.create(
                user=task.assigned_to,
                message=f'Task "{task.title}" has been approved.',
                created_at=timezone.now(),
            )
            return response
        else:
            return Response({'error': 'Task must be completed before approval.'}, status=status.HTTP_400_BAD_REQUEST)

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]  # Ensure that the user is authenticated