from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import google
from .register import register_social_user
import os
from rest_framework.exceptions import AuthenticationFailed
import uuid



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        User = get_user_model()
        model = User
        fields = ('id', 'sub_key', 'email', 'name', 'last_name', 'state', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': False}, 'sub_key': {'required': False}}
    
    def create(self, validated_data):
        print("--------------------------------------------------", validated_data )
        User = get_user_model()
        user_data = {
            'email': validated_data["email"],
            'password': validated_data["password"]}
        user = User.objects.create_user(**user_data)
        user.name = validated_data["name"]
        user.sub_key = str(uuid.uuid4())
        user.save()
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
        name = user_data['given_name']
        last_name =  user_data['family_name']
        provider = 'google'
        
        #Verifies domain of email. It has to be correounivalle.edu.co
        domain = email.split('@')[1]
        domain_list = ["correounivalle.edu.co"]
        if domain not in domain_list:
            raise serializers.ValidationError("Domain has to be correounivalle.edu.co")
        
        return register_social_user(
            provider=provider, user_id=user_id, email=email, name=name, last_name=last_name)
