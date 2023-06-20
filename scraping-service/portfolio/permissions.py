from rest_framework import permissions
import jwt
import os

class HasRole(permissions.BasePermission):
    def has_permission(self, request, view):
        method = request.method
        authToken = request.headers.get('Authorization') 
        if authToken == None:
             return False
        print(authToken)
        try:
            authToken = authToken[7:]
            
            decodedToken = jwt.decode(authToken, os.getenv('AUTH_PUBLIC_KEY'), algorithms=["RS256"])
            if method == 'POST':
                if decodedToken['role'] == 'student' or decodedToken['role'] == 'company' or decodedToken['role'] == 'program_direction':  
                    return True
                else:
                    return False
            if method == 'GET':
                if decodedToken['role'] == 'student' or decodedToken['role'] == 'company' or decodedToken['role'] == 'program_direction':  
                    return True
                else:
                    return False
            if method == 'PUT':
                if decodedToken['role'] == 'student':  
                    return True
                else:
                    return False
            if method == 'DELETE':
                if decodedToken['role'] == 'student':  
                    return True
                else:
                    return False
        except:
            return False
 