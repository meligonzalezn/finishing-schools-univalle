import jwt
import os
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

def handleAuthToken(request):
        method = request.method
        authToken = request.headers.get('Authorization') 
        if authToken == None:
             return  Response({'error': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
        try:
            authToken = authToken[7:]
            decodedToken = jwt.decode(authToken, os.getenv('AUTH_PUBLIC_KEY'), algorithms=["RS256"])
            if method == 'POST':
                if decodedToken['role'] == 'student':  
                    return decodedToken['sub_key']
                if decodedToken['role'] == 'program_direction':
                    if request.data['action'] == "check_background_info":
                        return decodedToken['sub_key']
                    if request.data['action'] == "get_students_background_check":
                        return decodedToken['sub_key']
                else:
                    return "invalid token"
            if method == 'GET':   
                if decodedToken['role'] == 'student':  
                    return decodedToken['sub_key']
                else:
                    return "invalid token"
            if method == 'PUT':
                if decodedToken['role'] == 'student':  
                    return decodedToken['sub_key']
                else:
                    return "invalid token"
            if method == 'DELETE':
                if decodedToken['role'] == 'student':  
                    return decodedToken['sub_key']
                else:
                    return "invalid token"
        except:
            return "invalid token"