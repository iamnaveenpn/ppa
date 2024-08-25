# tasks/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, CommentViewSet, ApprovalViewSet,NotificationViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'approval', ApprovalViewSet)
router.register(r'notifications', NotificationViewSet)  # Add this line

urlpatterns = [
    path('', include(router.urls)),
]
