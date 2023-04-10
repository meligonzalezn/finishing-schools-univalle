import jwt

def handleAuthToken(request):
        method = request.method
        authToken = request.headers.get('Authorization') 
        try: 
            authToken = authToken[7:]
            decodedToken = jwt.decode(authToken, os.getenv('STUDENT_PUBLIC_KEY'), algorithms=["RS256"])
            if method == 'POST':
                if decodedToken['role'] == 'company':
                    return decodedToken['sub_key']
                else:
                    return "invalid token"
            if method == 'GET':
                return decodedToken['sub_key']
            
        except:
            return "invalid token"