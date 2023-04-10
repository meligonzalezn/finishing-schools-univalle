from django.db import models


class Company(models.Model):
    NIT = models.CharField(max_length=100,unique=True)
    website = models.CharField(max_length=150, blank=True)
    sub_key = models.CharField(max_length=1000, unique=True)

    