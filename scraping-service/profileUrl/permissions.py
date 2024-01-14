from rest_framework import permissions
import jwt
import os

class HasRole(permissions.BasePermission):
    def has_permission(self, request, view):
        method = request.method
        authToken = request.headers.get('Authorization') 
        if authToken == None:
             return False
        try: 
            authToken = authToken[7:]
            decodedToken = jwt.decode(authToken, os.getenv('AUTH_PUBLIC_KEY'), algorithms=["RS256"])
            if method == 'POST':
                if decodedToken['role'] == 'student':  
                    return True
                else:
                    return False
            else: 
                return False
        except:
            return False
 