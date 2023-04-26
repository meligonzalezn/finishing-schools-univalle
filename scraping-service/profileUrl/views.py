from rest_framework.response import Response
from rest_framework import status
from .scraping import get_github_information, get_gitlab_information
from .linkedin import get_linkedin_information
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAuthenticated, HasRole


class BasicInfo(APIView):
    permission_classes = (IsAuthenticated, HasRole)

    def post(self, request, format=None):
        if request.data["platform"] == "github":
            profile_url = request.data["url"]
            githubInformation = get_github_information(profile_url)
            return Response(githubInformation, status=status.HTTP_200_OK)
        elif request.data["platform"] == "gitlab":
            profile_url = request.data["url"]
            gitlabInformation = get_gitlab_information(profile_url)
            return Response(gitlabInformation, status=status.HTTP_200_OK)
        elif request.data["platform"] == "linkedin":
            profile_url = request.data["url"]
            linkedInData = get_linkedin_information(profile_url)
            return Response(linkedInData, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid info_type parameter"}, status=status.HTTP_400_BAD_REQUEST)
