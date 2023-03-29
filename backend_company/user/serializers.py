from django.contrib.auth import get_user_model
from rest_framework import serializers
import uuid
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
import uuid


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        User = get_user_model()
        model = User
        fields = ('id', 'email', 'company_name', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}
    
    def create(self, validated_data):
        User = get_user_model()
        user = User.objects.create_user(**validated_data)
        user.sub_key = str(uuid.uuid4())
        user.save()
        return user




