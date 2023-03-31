from django.urls import path
from rest_framework import routers
from .views import BasicInfo


router = routers.SimpleRouter()

urlpatterns = [
    path('scrape/', BasicInfo.as_view(), name="scraping"),
    ]
urlpatterns += router.urls