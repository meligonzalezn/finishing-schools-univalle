from rest_framework import permissions
class IsCreationOrIsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            if view.action == 'create':
                return True
            if view.action == 'check_email':
                return True 
            if view.action == 'login':
                return True  
            if view.action == 'decode_jwt':
                return True  
            else:
                return False
        else:
            return True

