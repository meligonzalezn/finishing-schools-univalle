# Generated by Django 3.1.3 on 2023-04-30 05:19

import cloudinary.models
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('sub_key', models.CharField(max_length=500, primary_key=True, serialize=False)),
                ('NIT', models.CharField(max_length=100)),
                ('website', models.CharField(blank=True, max_length=300)),
                ('aboutUs', models.CharField(blank=True, max_length=1000)),
                ('fields', models.CharField(blank=True, max_length=300)),
                ('image', cloudinary.models.CloudinaryField(blank=True, max_length=255)),
                ('office', models.CharField(blank=True, max_length=300)),
                ('size', models.CharField(blank=True, max_length=300)),
                ('specialties', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
            ],
        ),
    ]
