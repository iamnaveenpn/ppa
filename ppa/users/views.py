# users/views.py
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer, RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Remove or change permission_classes to allow any authenticated user
    permission_classes = [AllowAny]  # Allow any authenticated user

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]  # Allow any user to perform actions

    def get_queryset(self):
        # Optionally filter to return profiles for a specific user if needed
        # This is optional and can be adjusted based on your use case
        if self.request.user.is_authenticated:
            return Profile.objects.filter(user=self.request.user)
        return Profile.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_staff=False)  # Assuming non-staff users are employees
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

