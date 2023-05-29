from rest_framework import serializers
from .models import Student, WorkExperience, Studies, CertificationLicenses, Languages, Skills

class StudentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Student
        fields = ['sub_key', 'name' , 'phone_number','idCard', 'issueDate','github_profile','gitlab_profile', 'linkedin_profile', 'image_profile', 'description', 'isFilled', 'scrapeInfoSaved']

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta: 
        model = WorkExperience
        fields = ['id', 'student_id', 'company_name', 'roles', 'experience_time', 'description']

class StudiesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Studies
        fields = ['id', 'student_id', 'degree','school', 'start_date', 'end_date', 'description']

class CertificationLicensesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CertificationLicenses
        fields = ['id', 'student_id', 'name', 'organization', 'issue_date', 'expiration_date', 'credential_url']

class LanguagesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Languages
        fields = ['id', 'student_id', 'language', 'proficiency']

class SkillsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Skills
        fields = ['id', 'student_id', 'name']