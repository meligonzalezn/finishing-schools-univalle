from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status

class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return True
         
class HasRole(permissions.BasePermission):
    def has_permission(self, request, view):
        request.data['type'] = 'student'
        if request.data['type'] != 'student':
            return False
        return True