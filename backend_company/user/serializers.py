
from rest_framework import serializers
from .models import Company



class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
        extra_kwargs = {'sub_key': {'write_only': True}}


