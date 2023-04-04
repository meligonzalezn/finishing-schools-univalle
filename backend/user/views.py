import jwt
import os
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
from rest_framework_simplejwt.views import TokenRefreshView
from Crypto.PublicKey import RSA
from .scraping import get_github_information, get_gitlab_information
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsCreationOrIsAuthenticated]
    User = get_user_model()
    serializer_class = UserSerializer
    queryset = User.objects.all()

    http_method_names = ['get', 'post', 'put']

    @action(detail=False, methods=['GET'])
    def get_user_basic_info(this, request: Request) -> Response:
        User = get_user_model()
        authToken = request.headers.get('Authorization')
        authToken = authToken[7:]
        try: 
            decodedToken = jwt.decode(authToken, os.getenv('STUDENT_PUBLIC_KEY'), algorithms=["RS256"])
            user = User.objects.get(pk=decodedToken['user_id'])
            return Response({"user_name": user.name}, status=status.HTTP_200_OK)
        except:
            return Response("Signature verification failed", status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def decode_jwt(this, request: Request) -> Response:
        data = request.data
        try: 
            decoded = jwt.decode(data['auth-token'], os.getenv('PUBLIC_KEY'), algorithms=["RS256"])
            return Response(decoded, status=status.HTTP_200_OK)
        except:
            return Response("Signature verification failed", status=status.HTTP_200_OK)


    @action(detail=False, methods=['POST'])
    def github_information(this, request: Request) -> Response:
        """
        Recieves the profile url from user. Scrapes through the site to obtain the programming 
        languages user has worked with based on public repositories
        """
        profile_url = request.data["url"]
        githubInformation = get_github_information(profile_url)
        return Response(githubInformation, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def gitlab_information(this, request: Request) -> Response:
        """
        Recieves the profile url from user. Scrapes through the site to obtain the programming 
        languages user has worked with based on personal projects
        """
        profile_url = request.data["url"]
        gitlabInformation = get_gitlab_information(profile_url)
        return Response(gitlabInformation, status=status.HTTP_200_OK)


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
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 
