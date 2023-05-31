
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
from django.http import QueryDict
        
class CompanyView(APIView):
    def post(self, request):
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data.copy()
        arrays_data = {"locations": json.loads(data['locations']) , "specialties":  json.loads(data['specialties']) }
       
        data.pop('locations')
        data.pop('specialties')
       
        data['sub_key'] = sub_key
       
        serializerCompany = CompanySerializer(data=data)
        
        if serializerCompany.is_valid():
            #Saves company data
            
            company_saved = serializerCompany.save()
            serialize_arrays = CompanySerializer(instance=company_saved, data=arrays_data, partial=True)
            if serialize_arrays.is_valid():
                company_saved = serialize_arrays.save()
                return Response(status=status.HTTP_200_OK)
            else:
                Response(serialize_arrays.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            
            return  Response(serializerCompany.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, pk=None):
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        if pk:
            company = get_object_or_404(Company.objects.all(),pk=pk)
            serializer =  CompanySerializer(company)
            return Response(serializer.data , status=status.HTTP_200_OK)
        else:
            companies = Company.objects.all()
            serializer = CompanySerializer(companies, many=True)
            return Response({"companies": serializer.data}, status=status.HTTP_200_OK)
            
    def put(self, request, pk):
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        company = get_object_or_404(Company.objects.all(),pk=pk)
        
        data = request.data.copy()
        arrays_data = {"locations": json.loads(data['locations']) , "specialties":  json.loads(data['specialties']) }
       
        data.pop('locations')
        data.pop('specialties')
   
        serializer = CompanySerializer(instance=company, data=data, partial=True)
        if serializer.is_valid():
            company_saved = serializer.save()

            serialize_arrays = CompanySerializer(instance=company, data=arrays_data, partial=True)
            if serialize_arrays.is_valid():
                company_saved = serialize_arrays.save()
                return Response(status=status.HTTP_200_OK)
            else:
                Response(serialize_arrays.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(serializer.errors)
            return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        sub_key = handleAuthToken(request)
        if sub_key == 'invalid_token':
            return  Response({"error": sub_key}, status=status.HTTP_400_BAD_REQUEST)
        company = get_object_or_404(Company.objects.all(), pk=pk)
        company.delete()
        return Response(status=status.HTTP_200_OK)

        
        




 