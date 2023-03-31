from rest_framework import permissions
class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return True
            
