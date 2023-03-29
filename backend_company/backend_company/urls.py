from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('company/', include('user.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
