from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from rest_framework_simplejwt.tokens import RefreshToken
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django.template.loader import get_template


#Handles user's creation for custom user model
class CustomUserManager(BaseUserManager):
    '''
        Function that creates user
    '''
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users require an email field')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    ''' 
        Calls ._create user with fields staff and superuser = false. This occurs when a
        user is created 
    '''
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    '''
        Calls ._create user with fields staff and superuser = true. This occurs when an 
        superuser is created
    '''
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

#Overrides .for_user() to remove the user_id field from the token's payload
# and adds the sub_key
class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token.payload['sub_key'] = user.sub_key
        token.payload['role'] = user.role
        # if 'user_id' in token.payload:
        #     del token.payload['user_id']
        return token
        

AUTH_PROVIDERS = { 'google': 'google', 'email':'email' }
#Custom user model
class User(AbstractUser):
    pass
    username = None
    sub_key = models.CharField(max_length=1000, unique=True)
    email = models.EmailField(max_length=255, unique=True) 
    password = models.CharField(verbose_name='password', max_length=128)
    name = models.CharField(max_length=2000, blank=True)
    last_name = models.CharField(max_length=2000, blank=True)
    state = models.BooleanField(default=True, blank=True)
    role = models.CharField(max_length=50, blank=True)
    is_verified = models.BooleanField(default=False)
    # To save the authentication method - for example: Google
    auth_provider = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    '''
        Access token and refresh token
    '''
    def tokens(self):
        refresh = CustomRefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }




#Once a reset_paswword_token is created it triggers the funcion to send an email to user's account
#for the password recovery 
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    context = { 
					"email":reset_password_token.user.email,
					'domain':'localhost:3000',
					'site_name': 'Website',
					"password_reset" : "/password_recovery/",
					"user": "",
					'token': reset_password_token.key,
					'protocol': 'http',
					}
    template = get_template('password_recovery.html').render(context)

    send_mail(
        # title:
        #"Password Reset for {title}".format(title="Finishing Schools-EISC"),
        "[Finishing Schools EISC] Password recovery",
        # message:
        email_plaintext_message,
        # from:
        "michelleghblue@gmail.com",
        # to:
        [reset_password_token.user.email],
        html_message=template
    )

    