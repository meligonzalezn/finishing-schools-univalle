import os
import uuid
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model

def register_social_user(provider, user_id, email, name, last_name, role):
    User = get_user_model()
    #Obtains all user instances that matches the email of the user 
    filtered_user_by_email = User.objects.filter(email=email)
    #Verifies if user already exists
    if filtered_user_by_email.exists():
        #Verifies if user is loggin in with the provider they registered
        if provider == filtered_user_by_email[0].auth_provider:

            registered_user = authenticate(
                email=email, password=os.environ.get('SOCIAL_SECRET'))
            registered_user.email
            registered_user.tokens()
            return {
                'email': registered_user.email,
                'tokens': registered_user.tokens()}

        else:
            print("aqui?")
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
        # Register a new user with google provider
        user = {
            'email': email,
            'password': os.environ.get('SOCIAL_SECRET')}
        user = User.objects.create_user(**user)
        user.is_verified = True
        user.auth_provider = provider
        user.sub_key = str(uuid.uuid4())
        user.name = name
        user.last_name= last_name
        user.role = role
        
        user.save()
        
        new_user = authenticate(
            email=email, password=os.environ.get('SOCIAL_SECRET'))
        return {
            'email': new_user.email,
            'tokens': new_user.tokens()
        }