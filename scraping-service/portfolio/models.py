from django.db import models
from django.contrib.postgres.fields import ArrayField
import cloudinary
from cloudinary.models import CloudinaryField

# Create your models here.
class Student(models.Model):
    sub_key = models.CharField(primary_key=True, auto_created=False, max_length=10000)
    idCard = models.CharField(max_length=200, blank=False)
    issueDate = models.CharField(max_length=200, blank=False)
    github_profile = models.CharField(max_length=1000, blank=True)
    gitlab_profile = models.CharField(max_length=1000, blank=True)
    linkedin_profile = models.CharField(max_length=1000, blank=True)
    image_profile = cloudinary.models.CloudinaryField(
        folder='media/profile_images/', overwrite=True, resource_type='', blank=True)
    description = models.CharField(blank=True, max_length=10000)
    isFilled = models.BooleanField(default=False)
    scrapeInfoSaved = models.BooleanField(default=False)

class WorkExperience(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    company_name = models.CharField(max_length=1000)
    roles = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    experience_time = models.CharField(max_length=500, blank=True)
    start_date = models.CharField(max_length=500, blank=True)
    end_date = models.CharField(max_length=500, blank=True)
    description = models.CharField(blank=True, max_length=10000)

class Studies(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    degree = models.CharField(max_length=1000, blank=True)
    school = models.CharField(blank=False, max_length=1000)
    start_date = models.CharField(max_length=500, blank=True)
    end_date = models.CharField(max_length=500, blank=True)
    description = models.CharField(blank=True, max_length=10000)

class CertificationLicenses(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=1000, blank=False)
    organization = models.CharField(blank=False, max_length=1000)
    issue_date = models.CharField(max_length=500, blank=True)
    expiration_date = models.CharField(max_length=500, blank=True)
    credential_url = models.CharField(blank=True, max_length=10000)  

class Languages(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    language = models.CharField(max_length=1000, blank=False)
    proficiency = models.CharField(max_length=1000, blank=True)

class Skills(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=1000, blank=False, null=False)