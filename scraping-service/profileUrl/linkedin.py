import time 
import requests
import random
import urllib.parse
import zipfile
import os
import calendar
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
import os

def get_linkedin_information(profile_url):


    def get_linkedin_info_from_API(profile_url):
        try: 
            api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin'
            api_key = os.getenv('PROXYCURL_API_KEY')
            
            header_dic = {'Authorization': 'Bearer ' + api_key}
            
            response = requests.get(api_endpoint,
                                        params={'url': profile_url},
                                        headers=header_dic)
            time.sleep(4)
            
            profile_data = response.json()
            
            about = profile_data['summary']
            def get_experience(dataSet):
                for data in dataSet:
                    company_name = data['company']
                    role = data['title']

                    if data['starts_at']:
                        # Convert start date to "Month Year" format
                        start_date = calendar.month_name[data['starts_at']['month']] + ' ' + str(data['starts_at']['year'])
                    else: 
                        start_date = ''
                        # Convert end date to "Month Year" format
                    if data['ends_at']:
                        end_date = calendar.month_name[data['ends_at']['month']] + ' ' + str(data['ends_at']['year'])
                    else:
                        end_date = ''

                    # Calculate experience time
                    if data['ends_at']:
                        start_month = data['starts_at']['month']
                        start_year = data['starts_at']['year']
                        end_month = data['ends_at']['month']
                        end_year = data['ends_at']['year']

                        months = (end_year - start_year) * 12 + (end_month - start_month)
                        years = months // 12
                        months = months % 12

                        if years > 0 and months > 0:
                            experience_time = f"{years} year{'s' if years > 1 else ''} and {months} month{'s' if months > 1 else ''}"
                        elif years > 0:
                            experience_time = f"{years} year{'s' if years > 1 else ''}"
                        else:
                            experience_time = f"{months} month{'s' if months > 1 else ''}"
                    else:
                        experience_time = ''
                    # Check if company exists in the experienceData list
                    company_exists = False
                    for experienceData in experience:
                        if experienceData['company_name'] == company_name:
                            experienceData['roles'].append(role)
                            company_exists = True
                            break

                    # If company does not exist, create a new entry
                    if not company_exists:
                        experienceData = {
                            'company_name': company_name,
                            'roles': [role],
                            'experience_time': experience_time,
                            'start_date': start_date,
                            'end_date': end_date,
                            'description': data['description']
                        }
                        experience.append(experienceData)
                return experience
            get_experience(profile_data['experiences'])
            def get_education(dataSet):
                for data in dataSet:
                    # Convert start date to "Month Year" format
                    if data['starts_at']:
                        start_date = calendar.month_name[data['starts_at']['month']] + ' ' + str(data['starts_at']['year'])
                    else:
                        start_date = ''
                    # Convert end date to "Month Year" format
                    if data['ends_at']:
                        end_date = calendar.month_name[data['ends_at']['month']] + ' ' + str(data['ends_at']['year'])
                    else:
                        end_date = ''
                    if data['degree_name'] == None:
                        degree = ""
                    else: 
                        degree = data['degree_name']
                    education = {
                        'degree': degree,
                        'school': data['school'],
                        'start_date': start_date,
                        'end_date': end_date,
                        'description': ''
                    }
                    educationInfo.append(education)
                return educationInfo
            get_education(profile_data['education'])
            def get_certifications(dataSet):
                for data in dataSet:
                    # Convert start date to "Month Year" format
                    if data['starts_at']:
                        issue_date = calendar.month_name[data['starts_at']['month']] + ' ' + str(data['starts_at']['year'])
                    else:
                        issue_date = ''
                    # Convert end date to "Month Year" format
                    if data['ends_at']:
                        expiration_date = calendar.month_name[data['ends_at']['month']] + ' ' + str(data['ends_at']['year'])
                    else:
                        expiration_date = ''
                    if data['authority'] == None:
                        organization = ""
                    else: 
                        organization = data['authority']
                    if data['name'] == None:
                        name = ""
                    else: 
                        name = data['name']
                    if data['url'] == None:
                        url = ""
                    else: 
                        url = data['url']
                    certificationInfo = {
                        'name': name, 
                        'organization': organization,
                        'issue_date': issue_date,
                        'expiration_date': expiration_date,
                        'credential_url': url
                    }
                    certifications.append(certificationInfo)
                return certifications
            get_certifications(profile_data['certifications'])
            def get_languages(dataSet):
                for data in dataSet:
                    languages = {
                        'language': data, 
                        'proficiency': ''
                    }
                    languagesInfo.append(languages)
                return languagesInfo
            get_languages(profile_data['languages'])
            userPortfolio.append({
                "about": about,
                "experience": experience[::-1],
                "education": educationInfo[::-1],
                "certifications": certifications[::-1],
                "languages": languagesInfo[::-1]
            })
            
            return userPortfolio
        except:
            
           
            return userPortfolio

    # Variables to return
    about = ""
    experience = []
    educationInfo = []
    certifications = []
    languagesInfo = []
    userPortfolio = []
    try:        
        if len(userPortfolio) == 0:
            get_linkedin_info_from_API(profile_url)
           
            return userPortfolio
        else:
  
            return userPortfolio
    except:
        print("entre aqui")
        get_linkedin_info_from_API(profile_url)

        return userPortfolio
