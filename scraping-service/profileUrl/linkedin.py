from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import time 
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.proxy import Proxy, ProxyType
import requests

def get_linkedin_information(profile_url):
    #Setting chrome options 
    chrome_options = webdriver.ChromeOptions()
    #Configuration from the selenium/standalone-chrome container 
    chrome_options.set_capability("browserVersion", "111.0")
    chrome_options.set_capability("platformName", "Linux")
    #Solves issue with container size and chrome rendering large pages correctly(?)
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_experimental_option("excludeSwitches", ['enable-automation']);    # To set a different user-agent string 
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36')
    
    #Set remote web driver. Recives the url of the remote web server (selenium container) and options. 
    driver = webdriver.Remote(
        command_executor='http://172.19.0.5:4444',
        options=chrome_options
    )
    # Variables to return
    about = ""
    experience = []
    educationInfo = []
    certifications = []
    languagesInfo = []
    # Opening linkedIn's user profile
    driver.get(profile_url)
    # Waiting for the page to load
    time.sleep(7)
    # Get sign in modal to close it
    dialog = driver.find_element(By.CSS_SELECTOR, '[aria-labelledby="public_profile_contextual-sign-in-modal-header"]')
    dialog.find_element(By.CSS_SELECTOR, '[aria-label="Dismiss"]').click()

    src = driver.page_source
    soup = BeautifulSoup(src, 'html.parser')
    """
        #This function deletes \n from the dictionary that recieves as parameter
    """
    def clean_dict_list(dict_list):
        cleaned_list = []
        for d in dict_list:
            cleaned_dict = {}
            for i, j in d.items():
                if isinstance(j, str):
                    cleaned_dict[i] = j.replace('\n', '').strip()
                else:
                    cleaned_dict[i] = j
            cleaned_list.append(cleaned_dict)
        return cleaned_list
    # ------------------------------- Getting about information (Description) --------------------------------------
    try:
        aboutSection = soup.find_all("section", {"data-section":"summary"})[0]
        about = aboutSection.find('p').text
        print(about)
    except:
        print('-------------- No description')
    
    # ------------------------------- Getting experience information ------------------------------------------------
    try:
        experienceUnorderedList = soup.find_all("ul", {"class": "experience__list"})[0]
        def extract_experience_info_item(experienceList):
            experienceItems = []
            for experienceItem in experienceList:
                roleCompany = experienceItem.find("h3", {"class": "profile-section-card__title"}).text
                companyName = experienceItem.find("h4", {"class": "profile-section-card__subtitle"}).text
                experienceTime = experienceItem.find("span", {"class": "date-range__duration"}).text
                experienceItems.append({
                    "companyName": companyName,
                    "experienceTime": experienceTime,
                    "rolesCompany": [roleCompany.strip()]
                })
            return experienceItems
            
        def extract_experience_info_group(experienceList):
            experiences = []
            for experienceItem in experienceList:
                companyName = experienceItem.find("h4", {"class": "experience-group-header__company"})
                experienceTime = experienceItem.find("p", {"class": "experience-group-header__duration"})
                groupPositions = experienceItem.find("ul", {"class": "experience-group__positions"})
                if groupPositions:
                    rolesCompanyElements = experienceItem.find_all("h3", {"class":"profile-section-card__title"})
                    rolesCompany = [role.text for role in rolesCompanyElements]
                    rolesCompany = [role.strip() for role in rolesCompany]
                    experiences.append({
                        "companyName": companyName.text,
                        "experienceTime": experienceTime.text,
                        "rolesCompany": rolesCompany
                    })
            return experiences

        # Case 1: When user have had different roles in a company
        try:
            experienceGroups = experienceUnorderedList.find_all("li", {"class": "experience-group experience-item"})
            experienceGroupInfo = extract_experience_info_group(experienceGroups)
            experience.append(clean_dict_list(experienceGroupInfo))
        except:
            print('-------------- Have not had different roles in a company')

        #Case 2: When user have had only a role in a company
        try:
            experienceList = experienceUnorderedList.find_all("li", {"class": "profile-section-card experience-item"})
            print(experienceList)
            experienceInfo = extract_experience_info_item(experienceList)
            experience.append(clean_dict_list(experienceInfo))
        except:
            print('-------------- Have not had only one in a company')
        print(experience)
    except:
        print('-------------- No experience information')

    # ---------------------------------- Getting education information -----------------------------------------------
    try:
        educationSection = soup.find_all("section", {"data-section":"educationsDetails"})[0]
        educationList = educationSection.find_all("ul", {"class": "education__list"})[0]
        educationItems = educationList.find_all("li", {"class": "profile-section-card education__list-item"})

        for educationItem in educationItems:
            education = {}
            education["academy"] = educationItem.find_all("h3", {"class": "profile-section-card__title"})[0].text
            degrees = educationItem.find_all("span", {"data-section": "educations"})
            dateRange = educationItem.find_all("span", {"class": "date-range"})
            if degrees:
                education["degree"] = degrees[0].text
            if dateRange:
                education["dateRange"] = dateRange[0].find_all("time")[0].text + "-" + dateRange[0].find_all("time")[1].text
            educationInfo.append(education)
            
        educationInfo = clean_dict_list(educationInfo)
        print(educationInfo)
    except:
        print('-------------- No education information')

    # ----------------------------------- Getting licenses & certifications --------------------------------------------
    try:    
        certificationSection = soup.find_all("section", {"data-section": "certifications"})[0]
        certificationList = certificationSection.find_all("ul", {"class": "certifications__list"})[0]
        certificationItems = certificationList.find_all("li", {"class": "profile-section-card"})

        for certificationItem in certificationItems:
            certification = {}
            certification["name"] = certificationItem.find_all("h3", {"class": "profile-section-card__title"})[0].text
            certification["organization"] = certificationItem.find_all("h4", {"class": "profile-section-card__subtitle"})[0].text
            startDate = certificationItem.find_all("span", {"class": "certifications__start-date"})
            endDate = certificationItem.find_all("span", {"class": "certifications__end-date"})
            if startDate:
                certification["startDate"] = startDate[0].text
            if endDate:
                certification["endDate"] = endDate[0].text
            certifications = [{k: v.replace('\n', '').strip() for k, v in cert.items()} for cert in certifications]
            certifications.append(certification)

        # Delete (\n) from the dictionary
        certifications = clean_dict_list(certifications)
        print(certifications)
    except:
        print('-------------- No licenses & certifications')
    
    # ------------------------------------- Getting languages -----------------------------------------------------
    try:            
        languagesSection = soup.find_all("section", {"data-section": "languages"})[0]
        languagesList = languagesSection.find_all("ul", {"class": "languages__list"})[0]
        languagesItems = languagesList.find_all("li", {"class": "profile-section-card"})

        for language in languagesItems:
            languages = {}
            languagesItemList = language.find_all("h3", {"class": "profile-section-card__title"})[0].text
            proficiency = language.find_all("h4", {"class": "profile-section-card__subtitle"})[0].text
            if languagesItemList:
                languages["language"] = languagesItemList
                languages["proficiency"] = proficiency
            languagesInfo.append(languages)

        languagesInfo = clean_dict_list(languagesInfo)
        print(languagesInfo)
    except:
        print('-------------- No languages information')