from django.urls import path, include
from rest_framework import routers
from user import views
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView
from user.views import LogoutView



router = routers.SimpleRouter()
router.register(r'user', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api/verify/', TokenVerifyView.as_view(), name="verify"),
    path('api/logout/', LogoutView.as_view(), name="logout"),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
urlpatterns += router.urls