from rest_framework import viewsets
from .models import Student, WorkExperience, Studies, CertificationLicenses, Languages, Skills
from rest_framework.response import Response
from urllib.request import Request
from .serializers import StudentSerializer, WorkExperienceSerializer, StudiesSerializer, CertificationLicensesSerializer, LanguagesSerializer, SkillsSerializer
from rest_framework import status
from rest_framework.decorators import action


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

    http_method_names = ['get', 'post', 'put'] 

    @action(detail=True, methods=['get'])
    def get_user(this, request: Request, pk: int) -> Response:
        """
            return a all users on DB.\n
            @return users: List[Object]
        """
        try:
            query = Student.objects.all().get(pk=pk)
            serializer: StudentSerializer = this.serializer_class(
                query, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("User doesn't exist", status=status.HTTP_400_BAD_REQUEST)
 
    @action(detail=True, methods=['put'])
    def update_user(this, request: Request, pk: int) -> Response:
        """
            For user with id=pk Update his attributes.
        """
        try:
            user = Student.objects.get(id=pk)
            if('idCard' in request.data):
                user.idCard = request.data['idCard']
            if('issueDate' in request.data):
                user.issueDate = request.data['issueDate']
            if('github_profile' in request.data):
                user.github_profile = request.data['github_profile']
            if('gitlab_profile' in request.data):
                user.gitlab_profile = request.data['gitlab_profile']
            if('linkedin_profile' in request.data):
                user.linkedin_profile = request.data['linkedin_profile']
            if('image_profile' in request.data):
                user.image_profile = request.data['image_profile']
            if('description' in request.data):
                user.description = request.data['description']
            user.save()

            return Response("User updated", status=status.HTTP_200_OK)
        except:
            return Response("Error", status.HTTP_500_INTERNAL_SERVER_ERROR)


class WorkExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkExperienceSerializer
    queryset = WorkExperience.objects.all()

    http_method_names = ['get', 'post', 'put'] 

    @action(detail=False, methods=['get'], url_path='get_work_experience/(?P<student_id>[^/.]+)')
    def get_work_experience(self, request, student_id=None):
        """
        Retrieve all work experiences with the given student id.
        """
        try:
            work_experiences = WorkExperience.objects.filter(student_id=student_id)
            serializer = self.serializer_class(work_experiences, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("No work experience registered", status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def create_work_experience(self, request, *args, **kwargs):
        try:
            student_id = request.data['student_id']
            for experience_data in request.data['experience']:
                experience_data['student_id'] = student_id
                serializer = self.get_serializer(data=experience_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response("Error registering work experiences", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'], url_path='update_work_experience/(?P<student_id>[^/.]+)')
    def update_work_experience(self, request, student_id=None):
        try:
            work_experiences = request.data.get('experience', [])
            for experience_data in work_experiences:
                work_experience_id = experience_data.get('id', None)
                if not work_experience_id:
                    continue
                work_experience = WorkExperience.objects.get(student_id=student_id, id=work_experience_id)
                serializer = self.serializer_class(work_experience, data=experience_data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

            return Response("Work experiences updated successfully", status=status.HTTP_200_OK)
        except WorkExperience.DoesNotExist:
            return Response("Work experience not found", status=status.HTTP_404_NOT_FOUND)
        except:
            return Response("Error updating work experiences", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StudiesViewSet(viewsets.ModelViewSet):
    serializer_class = StudiesSerializer
    queryset = Studies.objects.all()

    http_method_names = ['get', 'post', 'put']

    @action(detail=True, methods=['get'], url_path='get_studies/(?P<student_id>[^/.]+)')
    def get_studies(self, request, student_id=None):
        """
        Retrieve all studies related with the given student id.
        """
        try:
            studies = Studies.objects.filter(student_id=student_id)
            serializer = self.serializer_class(studies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("No studies registered", status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_studies(self, request, *args, **kwargs):
        try:
            student_id = request.data['student_id']
            for studies_data in request.data['education']:
                studies_data['student_id'] = student_id
                serializer = self.get_serializer(data=studies_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response("Error registering studies", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'], url_path='update_studies/(?P<student_id>[^/.]+)')
    def update_studies(self, request, student_id=None):
        try:
            studies = request.data.get('education', [])
            for studies_data in studies:
                studies_id = studies_data.get('id', None)
                if not studies_id:
                    continue
                studies = Studies.objects.get(student_id=student_id, id=studies_id)
                serializer = self.serializer_class(studies, data=studies_data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

            return Response("Studies updated successfully", status=status.HTTP_200_OK)
        except Studies.DoesNotExist:
            return Response("Studies not found", status=status.HTTP_404_NOT_FOUND)
        except:
            return Response("Error updating studies", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CertificationsLicensesViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationLicensesSerializer
    queryset = CertificationLicenses.objects.all()

    http_method_names = ['get', 'post', 'put']

    @action(detail=True, methods=['get'], url_path='get_certifications_licenses/(?P<student_id>[^/.]+)')
    def get_certifications_licenses(self, request, student_id=None):
        """
        Retrieve all certifications and licenses related with the given student id.
        """
        try:
            certifications_licenses = CertificationLicenses.objects.filter(student_id=student_id)
            serializer = self.serializer_class(certifications_licenses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("No certifications or licenses registered", status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def create_certifications_licenses(self, request, *args, **kwargs):
        try:
            student_id = request.data['student_id']
            for certifications_data in request.data['certifications']:
                certifications_data['student_id'] = student_id
                serializer = self.get_serializer(data=certifications_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response("Error registering certifications or licenses", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'], url_path='update_certifications_licenses/(?P<student_id>[^/.]+)')
    def update_certifications_licenses(self, request, student_id=None):
        try:
            certifications_licenses = request.data.get('certifications', [])
            for certifications_licenses_data in certifications_licenses:
                certifications_licenses_id = certifications_licenses_data.get('id', None)
                if not certifications_licenses_id:
                    continue
                certifications_licenses = CertificationLicenses.objects.get(student_id=student_id, id=certifications_licenses_id)
                serializer = self.serializer_class(certifications_licenses, data=certifications_licenses_data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

            return Response("Certifications or licenses updated successfully", status=status.HTTP_200_OK)
        except CertificationLicenses.DoesNotExist:
            return Response("Certifications or licenses not found", status=status.HTTP_404_NOT_FOUND)
        except:
            return Response("Error updating certifications or licenses", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LanguagesViewSet(viewsets.ModelViewSet):
    serializer_class = LanguagesSerializer
    queryset = Languages.objects.all()

    http_method_names = ['get', 'post', 'put']

    @action(detail=True, methods=['get'], url_path='get_languages/(?P<student_id>[^/.]+)')
    def get_languages(self, request, student_id=None):
        """
        Retrieve all languages related with the given student id.
        """
        try:
            languages = Languages.objects.filter(student_id=student_id)
            serializer = self.serializer_class(languages, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("No languages registered", status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_languages(self, request, *args, **kwargs):
        try:
            student_id = request.data['student_id']
            for languages_data in request.data['languages']:
                languages_data['student_id'] = student_id
                serializer = self.get_serializer(data=languages_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response("Error registering languages", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'], url_path='update_languages/(?P<student_id>[^/.]+)')
    def update_languages(self, request, student_id=None):
        try:
            languages = request.data.get('languages', [])
            for languages_data in languages:
                languages_id = languages_data.get('id', None)
                if not languages_id:
                    continue
                languages = Languages.objects.get(student_id=student_id, id=languages_id)
                serializer = self.serializer_class(languages, data=languages_data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

            return Response("Languages updated successfully", status=status.HTTP_200_OK)
        except Languages.DoesNotExist:
            return Response("Languages not found", status=status.HTTP_404_NOT_FOUND)
        except:
            return Response("Error updating languages", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SkillsViewSet(viewsets.ModelViewSet):
    serializer_class = SkillsSerializer
    queryset = Skills.objects.all()

    http_method_names = ['get', 'post', 'put'] 

    @action(detail=True, methods=['get'], url_path='get_skills/(?P<student_id>[^/.]+)')
    def get_skills(self, request, student_id=None):
        """
        Retrieve all studies related with the given student id.
        """
        try:
            skills = Skills.objects.filter(student_id=student_id)
            serializer = self.serializer_class(skills, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response("No skills registered", status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['post'])
    def create_skills(self, request, *args, **kwargs):
        try:
            student_id = request.data['student_id']
            for skills_data in request.data['skills']:
                skills_data['student_id'] = student_id
                serializer = self.get_serializer(data=skills_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except:
            return Response("Error registering skills", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['put'], url_path='update_skills/(?P<student_id>[^/.]+)')
    def update_skills(self, request, student_id=None):
        try:
            skills = request.data.get('skills', [])
            for skills_data in skills:
                skills_id = skills_data.get('id', None)
                if not skills_id:
                    continue
                skills = Skills.objects.get(student_id=student_id, id=skills_id)
                serializer = self.serializer_class(skills, data=skills_data, partial=True)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)

            return Response("Skills updated successfully", status=status.HTTP_200_OK)
        except Skills.DoesNotExist:
            return Response("Skills not found", status=status.HTTP_404_NOT_FOUND)
        except:
            return Response("Error updating skills", status=status.HTTP_500_INTERNAL_SERVER_ERROR)      
