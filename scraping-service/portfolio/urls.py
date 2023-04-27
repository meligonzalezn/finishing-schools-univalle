from django.urls import path, include
from rest_framework import routers
from .views import StudentViewSet
from portfolio import views

router = routers.SimpleRouter()
router.register(r'student', views.StudentViewSet)
urlpatterns = [
        path('', include(router.urls)),
    ]
urlpatterns += router.urls