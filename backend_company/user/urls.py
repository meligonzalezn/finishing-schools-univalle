from django.urls import path, include
from rest_framework import routers
from .views import CompanyView



router = routers.SimpleRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('company/', CompanyView.as_view(), name="company"),
    path('company/<int:pk>' , CompanyView.as_view()) 
]
urlpatterns += router.urls