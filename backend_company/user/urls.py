from django.urls import path, include
from rest_framework import routers
from .views import CompanyView, get_profile_state, get_pfp




router = routers.SimpleRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('company/', CompanyView.as_view(), name="company"),
    path('company/<str:pk>' , CompanyView.as_view()) ,
    path('company/get_profile_state/', get_profile_state),
    path('company/get_pfp/', get_pfp)

]
urlpatterns += router.urls