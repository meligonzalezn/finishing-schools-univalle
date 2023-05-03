import jwt
import os
import json
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .serializers import UserSerializer
from .permissions import IsCreationOrIsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from urllib.request import Request
from rest_framework import status
from rest_framework.generics import GenericAPIView
from .serializers import GoogleSocialAuthSerializer
from Crypto.PublicKey import RSA
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsCreationOrIsAuthenticated]
    User = get_user_model()
    serializer_class = UserSerializer
    queryset = User.objects.all()
    http_method_names = ['get', 'post', 'put']

    #Login for company users
    @action(detail=False, methods=['POST'])
    def login(this, request: Request) -> Response:
        """
        Check given credentials to login the user and returns access and refresh token
        """
        data = request.data
        registered_user = authenticate(username=data['email'], password=data['password'])
        if registered_user is not None:
           auth_token = {
                    'email': registered_user.email,
                    'tokens': registered_user.tokens()}
           return Response(auth_token, status=status.HTTP_200_OK)
        else:
            raise AuthenticationFailed(
                    detail='Authentication with given credentials failed') 
    
    @action(detail=False, methods=['POST'])
    def check_email(this, request: Request) -> Response:
        """
        Check if the email given in request.body has been registered.
        """
        try:
            data = json.loads(request.body)
            Email = str(data["email"])
            User = get_user_model()
            query = User.objects.get(email=Email)
            return Response("Email already registered", status=status.HTTP_200_OK)
        except:
            return Response("Email not registered", status=status.HTTP_200_OK)
    
    #From the authorization token in header obtains the user and return their basic info (Name)
    @action(detail=False, methods=['GET'])
    def get_user_basic_info(this, request: Request) -> Response:
        User = get_user_model()
        authToken = request.headers.get('Authorization')
        authToken = authToken[7:]
        try: 
            decodedToken = jwt.decode(authToken, os.getenv('AUTH_PUBLIC_KEY'), algorithms=["RS256"])
            user = User.objects.get(pk=decodedToken['user_id'])
            return Response({"user_name": user.name, "user_last_name": user.last_name}, status=status.HTTP_200_OK)
        except:
            return Response("Signature verification failed", status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['POST'])
    def decode_jwt(this, request: Request) -> Response:
        data = request.data
        try: 
            decoded = jwt.decode(data['auth-token'], os.getenv('AUTH_PUBLIC_KEY'), algorithms=["RS256"])
            return Response(decoded, status=status.HTTP_200_OK)
        except:
            return Response("Signature verification failed", status=status.HTTP_401_UNAUTHORIZED)

class GoogleSocialAuthView(GenericAPIView):
    serializer_class = GoogleSocialAuthSerializer
    def post(self, request):
        """
        POST with "auth_token"
        Send an idtoken as from google to get user information
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 
