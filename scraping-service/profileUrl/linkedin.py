import time 
import requests
import random
import urllib.parse
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC

def get_linkedin_information(profile_url):

    def get_free_proxies():
        url = "https://free-proxy-list.net/"
        #request and grab content
        soup = BeautifulSoup(requests.get(url).content, 'html.parser')
        # to store proxies
        proxies = []
        for row in soup.find("table", attrs={"class": "table table-striped table-bordered"}).find_all("tr")[1:]:
                tds = row.find_all("td")
                try:
                    ip = tds[0].text.strip()
                    port = tds[1].text.strip()
                    proxies.append(str(ip) + ":" + str(port))
                except IndexError:
                    continue
        return proxies
    
    proxies = get_free_proxies()

    def rand_proxy():
        proxy = random.choice(proxies)
        return proxy

    #Setting chrome options 
    chrome_options = webdriver.ChromeOptions()
    #Configuration from the selenium/standalone-chrome container 
    chrome_options.set_capability("browserVersion", "111.0")
    chrome_options.set_capability("platformName", "Linux")
    #Solves issue with container size and chrome rendering large pages correctly(?)
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_experimental_option("excludeSwitches", ['enable-automation']);
    chrome_options.add_experimental_option("useAutomationExtension", False)
 
    # Proxy configuration 
    proxy = rand_proxy()
    #chrome_options.add_argument(f'--proxy-server={proxy}')

    #Set remote web driver. Recives the url of the remote web server (selenium container) and options. 
    driver = webdriver.Remote(
        command_executor='http://172.19.0.4:4444',
        options=chrome_options
    )

    # Variables to return
    about = ""
    experience = []
    educationInfo = []
    certifications = []
    languagesInfo = []
    userPortfolio = []
    driver.implicitly_wait(5)
    try: 
        # Opening linkedIn's user profile
        driver.get(profile_url)
        # Waiting for the page to load
        time.sleep(5)
        # Get current url
        current_url = driver.current_url
        parsed_url = urllib.parse.urlparse(current_url)
        session_redirect = ""
        if parsed_url.netloc == 'www.linkedin.com' and parsed_url.path.startswith('/in/'):
            session_redirect = current_url
        else:
            # Extracts the query string portion of the URL which contains one or more key-value pairs separated by & characters, and parses it into a dictionary object.
            query_dict = urllib.parse.parse_qs(parsed_url.query)
            session_redirect = query_dict['sessionRedirect'][0]
        # Avoiding redirect profile
        driver.execute_script("window.location.href = '{}'".format(session_redirect))
        time.sleep(5)
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
        except:
            print('-------------- No description')

        # ------------------------------- Getting experience information ------------------------------------------------
        try:
            experienceUnorderedList = soup.find_all("ul", {"class": "experience__list"})[0]
            def extract_experience_info_item(experienceList):
                experienceItems = []
                finalDescription = ""
                for experienceItem in experienceList:
                    roleCompany = experienceItem.find("h3", {"class": "profile-section-card__title"}).text
                    companyName = experienceItem.find("h4", {"class": "profile-section-card__subtitle"}).text
                    experienceTime = experienceItem.find("span", {"class": "before:middot"}).text
                    description = experienceItem.find("div", {"class": "show-more-less-text"})
                    if description.find("p", {"class": "show-more-less-text__text--more"}):
                        finalDescription = description.find("p", {"class": "show-more-less-text__text--more"}).text
                    else:
                        finalDescription = description.text
                    experienceItems.append({
                        "company_name": companyName,
                        "experience_time": experienceTime,
                        "roles": [roleCompany.strip()],
                        "description": finalDescription
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
                            "company_name": companyName.text,
                            "experience_time": experienceTime.text,
                            "roles": rolesCompany
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
                experienceInfo = extract_experience_info_item(experienceList)
                experience.append(clean_dict_list(experienceInfo))
            except:
                print('-------------- Have not had only one role in a company')

        except:
            print('-------------- No experience information')

        # ---------------------------------- Getting education information -----------------------------------------------
        try:
            educationSection = soup.find_all("section", {"data-section":"educationsDetails"})[0]
            educationList = educationSection.find_all("ul", {"class": "education__list"})[0]
            educationItems = educationList.find_all("li", {"class": "profile-section-card education__list-item"})

            for educationItem in educationItems:
                education = {}
                education["school"] = educationItem.find_all("h3", {"class": "profile-section-card__title"})[0].text
                degrees = educationItem.find_all("span", {"data-section": "educations"})
                dateRange = educationItem.find_all("span", {"class": "date-range"})
                if degrees:
                    education["degree"] = degrees[0].text
                if dateRange:
                    education["start_date"] = dateRange[0].find_all("time")[0].text
                    education["end_date"] = dateRange[0].find_all("time")[1].text
                educationInfo.append(education)
                
            educationInfo = clean_dict_list(educationInfo)
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
                    certification["issue_date"] = startDate[0].text
                if endDate:
                    certification["expiration_date"] = endDate[0].text
                certifications = [{k: v.replace('\n', '').strip() for k, v in cert.items()} for cert in certifications]
                certifications.append(certification)

            # Delete (\n) from the dictionary
            certifications = clean_dict_list(certifications)
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
        except:
            print('-------------- No languages information')
        # Concatenate the lists and append to the experience list
        experience = [item for sublist in experience for item in sublist]
        userPortfolio.append({
            "about": about,
            "experience": experience,
            "education": educationInfo,
            "certifications": certifications,
            "languages": languagesInfo
        })
        driver.quit()
        return userPortfolio
    except:
        driver.quit()
        return userPortfolio