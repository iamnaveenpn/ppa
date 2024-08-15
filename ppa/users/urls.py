# users/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, LoginView, RegisterView, EmployeeViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'employees', EmployeeViewSet, basename='employee')  # Provide a unique basename

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),  # Add login endpoint
    path('register/', RegisterView.as_view(), name='register'),  # Add register endpoint
    path('', include(router.urls)),
]

