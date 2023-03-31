import jwt
import os

from rest_framework.response import Response
from rest_framework.decorators import action
from urllib.request import Request
from rest_framework import status


from .scraping import get_github_information, get_gitlab_information
from rest_framework.views import APIView
from .permissions import IsAuthenticated



class BasicInfo(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        if request.data["platform"] == "github":
            profile_url = request.data["url"]
            githubInformation = get_github_information(profile_url)
            return Response(githubInformation, status=status.HTTP_200_OK)
        elif request.data["platform"] == "gitlab":
            profile_url = request.data["url"]
            gitlabInformation = get_gitlab_information(profile_url)
            return Response(gitlabInformation, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid info_type parameter"}, status=status.HTTP_400_BAD_REQUEST)