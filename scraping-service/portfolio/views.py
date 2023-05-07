from django.shortcuts import render
from rest_framework import viewsets
from .models import Student
from rest_framework.response import Response
from urllib.request import Request
from .serializers import StudentSerializer
from rest_framework import status
from rest_framework.decorators import action
from .tokens_handler import handleAuthToken
from django.shortcuts import get_object_or_404


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

    http_method_names = ['get', 'post', 'put'] 

    @action(detail=True, methods=['get'])
    def get_user(this, request: Request, pk: int) -> Response:
        """
            return a all users on DB.\n
            @return users: List[Object]
        """
        try:
            query = Student.objects.all().get(pk=pk)
            serializer: StudentSerializer = this.serializer_class(
                query, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("User doesn't exist", status=status.HTTP_400_BAD_REQUEST)
 
    @action(detail=True, methods=['put'])
    def update_user(this, request: Request, pk: int) -> Response:
        """
            For user with id=pk Update his attributes.
        """
        try:
            user = Student.objects.get(id=pk)
            if('idCard' in request.data):
                user.idCard = request.data['idCard']
            if('issueDate' in request.data):
                user.issueDate = request.data['issueDate']
            if('github_profile' in request.data):
                user.github_profile = request.data['github_profile']
            if('gitlab_profile' in request.data):
                user.gitlab_profile = request.data['gitlab_profile']
            if('linkedin_profile' in request.data):
                user.linkedin_profile = request.data['linkedin_profile']
            if('image_profile' in request.data):
                user.image_profile = request.data['image_profile']
            if('description' in request.data):
                user.description = request.data['description']
            user.save()

            return Response("User updated", status=status.HTTP_200_OK)
        except:
            return Response("Error", status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['get'])
    def get_portfolio_state(this, request: Request) -> Response:
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        registerState = "In progress"
        try:
            student = Student.objects.all().get(pk=sub_key)
            if(student.isFilled):
                registerState = "Filled"
            return Response({"state": registerState}, status=status.HTTP_200_OK)
        except:
            return Response({"state": registerState},status=status.HTTP_200_OK)




