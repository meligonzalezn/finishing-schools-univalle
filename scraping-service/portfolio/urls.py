from django.urls import path, include
from rest_framework import routers
from portfolio import views

router = routers.SimpleRouter()
router.register(r'student', views.StudentViewSet)
router.register(r'workExperience', views.WorkExperienceViewSet)
router.register(r'studies', views.StudiesViewSet)
router.register(r'certificationsLicenses', views.CertificationsLicensesViewSet)
router.register(r'languages', views.LanguagesViewSet)
router.register(r'skills', views.SkillsViewSet)

urlpatterns = [
        path('', include(router.urls)),
        path('workExperience/<uuid:student_id>/get_work_experience/', views.WorkExperienceViewSet.as_view({'get': 'get_work_experience'})),
        path('workExperience/create_work_experience/', views.WorkExperienceViewSet.as_view({'post': 'create_work_experience'})),
        path('workExperience/delete_work_experience/<str:student_id>/<str:experience_id>/', views.WorkExperienceViewSet.as_view({'delete': 'delete_work_experience'})),
        
        path('studies/<uuid:student_id>/get_studies/', views.StudiesViewSet.as_view({'get': 'get_studies'})),
        path('studies/create_studies/', views.StudiesViewSet.as_view({'post': 'create_studies'})),
        path('studies/delete_studies/<str:student_id>/<str:studies_id>/', views.StudiesViewSet.as_view({'delete': 'delete_studies'})),

        path('certificationsLicenses/<uuid:student_id>/get_certifications_licenses/', views.CertificationsLicensesViewSet.as_view({'get': 'get_certifications_licenses'})),
        path('certificationsLicenses/create_certifications_licenses/', views.CertificationsLicensesViewSet.as_view({'post': 'create_certifications_licenses'})),
        path('certificationsLicenses/delete_certifications_licenses/<str:student_id>/<str:certifications_licenses_id>/', views.CertificationsLicensesViewSet.as_view({'delete': 'delete_certifications_licenses'})),

        path('languages/<uuid:student_id>/get_languages/', views.LanguagesViewSet.as_view({'get': 'get_languages'})),
        path('languages/create_languages/', views.LanguagesViewSet.as_view({'post': 'create_languages'})),
        path('languages/delete_languages/<str:student_id>/<str:languages_id>/', views.LanguagesViewSet.as_view({'delete': 'delete_languages'})),

        path('skills/<uuid:student_id>/get_skills/', views.SkillsViewSet.as_view({'get': 'get_skills'})),
        path('skills/create_skills/', views.SkillsViewSet.as_view({'post': 'create_skills'})),
        path('skills/delete_skills/<str:student_id>/<str:skills_id>/', views.SkillsViewSet.as_view({'delete': 'delete_skills'}))

    ]
urlpatterns += router.urls