from django.db import models
import cloudinary
from cloudinary.models import CloudinaryField
from django.contrib.postgres.fields import ArrayField


class Company(models.Model):
    sub_key = models.CharField(max_length=500, auto_created=False, primary_key=True)
    NIT = models.CharField(max_length=100, blank=False)
    website = models.CharField(max_length=300, blank=True)
    aboutUs = models.CharField(max_length=1000,blank=True)
    fields = models.CharField(max_length=300,blank=True)
    image = cloudinary.models.CloudinaryField(
        folder='media/profile_images/', overwrite=True, resource_type='', blank=True)
    office= models.CharField(max_length=300,blank=True)
    size = models.CharField(max_length=300,blank=True)
    locations = ArrayField(models.CharField(max_length=300), blank=True, null=True)
    specialties = ArrayField(models.CharField(max_length=100), blank=True, null=True)


    