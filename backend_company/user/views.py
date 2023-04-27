
from .tokens_handler import handleAuthToken
from rest_framework.response import Response
from rest_framework import status
from urllib.request import Request
from rest_framework.views import APIView
from .serializers import CompanySerializer
from .models import Company
import json
import jwt
import os
from django.shortcuts import get_object_or_404

        
class CompanyView(APIView):
    def post(self, request):
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data.get('company')
        company={
            'sub_key': sub_key,
            'website': data['website'],
            'NIT': data['NIT']
        }
        serializer = CompanySerializer(data=company)
        if serializer.is_valid():
            company_saved = serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        companies = Company.objects.all()
        return Response({"companies": companies}, status=status.HTTP_200_OK)
        
    def put(self, request, pk):
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        company = get_object_or_404(Company.objects.all(),pk=pk)
        data = request.data.get('company')
        serializer = CompanySerializer(instance=company, data=data, partial=True)
        if serializer.is_valid():
            company_saved = serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        company = get_object_or_404(Company.objects.all(), pk=pk)
        company.delete()
        return Response(status=status.HTTP_200_OK)

        
        




 