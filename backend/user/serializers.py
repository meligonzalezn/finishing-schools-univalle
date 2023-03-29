from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import google
from .register import register_social_user
import os
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        User = get_user_model()
        model = User
        fields = ('id', 'sub_key', 'email', 'name', 'last_name', 'state', 'github_user', 'gitlab_user', 'linkedin_user')
        extra_kwargs = {'password': {'write_only': True, 'required': False}}
    
    def create(self, validated_data):
        User = get_user_model()
        user = User.objects.create_user(**validated_data)
        return user



class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()
    '''
        This function validates information that is receinving in auth token (credential) with
        the data of client side and returns information of user
    '''
    def validate_auth_token(self, auth_token):
        #Validates if the given token is valid 
        user_data = google.Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )

        if user_data['aud'] != os.environ.get('GOOGLE_CLIENT_ID'):

            raise AuthenticationFailed('oops, who are you?')
        #Obtains the user information from google that will be saved in the db or use it
        #to login if the user is already registered
        user_id = user_data['sub']
        email = user_data['email']
        name = user_data['name']
        provider = 'google'
        
        #Verifies domain of email. It has to be correounivalle.edu.co
        domain = email.split('@')[1]
        domain_list = ["correounivalle.edu.co"]
        if domain not in domain_list:
            raise serializers.ValidationError("The domain has to be correounivalle.edu.co")
        
        return register_social_user(
            provider=provider, user_id=user_id, email=email, name=name)
