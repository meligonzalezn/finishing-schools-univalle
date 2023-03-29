from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import time 
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC



def get_github_information(profile_url):
    #Setting chrome options 
    chrome_options = webdriver.ChromeOptions()
    #Configuration from the selenium/standalone-chrome container 
    chrome_options.set_capability("browserVersion", "110.0")
    chrome_options.set_capability("platformName", "Linux")
    #Solves issue with container size and chrome rendering large pages correctly(?)
    chrome_options.add_argument('--disable-dev-shm-usage')
    #Set remote web driver. Recives the url of the remote web server (selenium container) and options. 
    driver = webdriver.Remote(
        command_executor='http://172.22.0.3:4444',
        options=chrome_options
    )
    

    try: 
        # Opening github's user profile
        print("1------------------------")
        driver.get(profile_url)
        print("2------------------------")

        time.sleep(5)


        src = driver.page_source
        soup = BeautifulSoup(src, 'html.parser')
        
        # Waiting for the page to load
        time.sleep(5)


        # Searching for repositories
        repositoriesButton = driver.find_element(By.CSS_SELECTOR, '[data-tab-item="repositories"]').click()

        time.sleep(5)


        src = driver.page_source
        soup = BeautifulSoup(src, 'html.parser')


        #Getting proggramming languages 
        languagesList = soup.find("details", {"id":"language-options"})
        languagesItems = languagesList.find_all("label", {"class":"SelectMenu-item"})
        programmingLanguages = []

        for item in languagesItems:
            programmingLanguages.append(item.find("span", {"class":"text-normal"}).text)

        programmingLanguages.pop(0)   
        #Close/Delete the session
        driver.quit() 
        return programmingLanguages
    except:
        driver.quit() 
        return []



def get_gitlab_information(profile_url):

    #Setting chrome options 
    chrome_options = webdriver.ChromeOptions()
    #Configuration from the selenium/standalone-chrome container 
    chrome_options.set_capability("browserVersion", "110.0")
    chrome_options.set_capability("platformName", "Linux")
    #Solves issue with container size and chrome rendering large pages correctly(?)
    chrome_options.add_argument('--disable-dev-shm-usage')
    #Set remote web driver. Recives the url of the remote web server (selenium container) and options. 
    driver = webdriver.Remote(
        command_executor='http://172.22.0.3:4444',
        options=chrome_options
    )
    programmingLanguages = []

    try:
        # Opening gitlab's user profile
        driver.get(profile_url)

        # Waiting to emulate user actions
        time.sleep(2)

        # Searching for personal projects
        personalProjectsButton = WebDriverWait(driver, 5).until(    
        EC.presence_of_element_located((By.CSS_SELECTOR, '[data-action="projects"]'))
        )

        personalProjectsButton.click()
        
        programmingLanguages = []
            
        time.sleep(4)

        #Obtaining urls to each project page  
        projectsList = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//div[@id="projects"]'))
        )

        projects = []

        try:
            projects = projectsList.find_elements(By.CSS_SELECTOR, '[class="project-row"]')
        except: 
            print("-------No personal projects found")

        projectsLinks = []

        for project in projects:
            projectsLinks.append(project.find_element(By.TAG_NAME, 'a').get_attribute("href"))


        # Reopening gitlab's user profile
        driver.get(profile_url)

        # Waiting to emulate user actions
        time.sleep(2)
            
        # Searching for contributed projects
        contributedProjectsButton = driver.find_element(By.CSS_SELECTOR, '[data-action="contributed"]')
        contributedProjectsButton.click()

        time.sleep(4)

        #Obtaining urls to each project page   
        projectsList2 = driver.find_element(By.CSS_SELECTOR, '[id="contributed"]')

        try:
            projects = projectsList2.find_elements(By.CSS_SELECTOR, '[class="project-row"]')
        except:
            projects = []
            print("-------No contributed projects found")

        for project in projects:
            projectsLinks.append(project.find_element(By.TAG_NAME, 'a').get_attribute("href"))
            
            
        #Obtains technologies used in personal and contributed projects
        for link in projectsLinks:
            #Redirect to each project page
            driver.get(link)
            time.sleep(2)
            
            #Obtain programming languages
            try:
                programmingLanguagesBar = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[class="progress repository-languages-bar js-show-on-project-root"]'))
                )
                programmingLanguagesHtml = programmingLanguagesBar.find_elements(By.TAG_NAME, 'div')

                for item in programmingLanguagesHtml:
                    languageItem = item.get_attribute("title")
                    soup = BeautifulSoup(languageItem, 'html.parser')
                    programmingLanguages.append(soup.find("span", {"class":"repository-language-bar-tooltip-language"}).text)

            except:
                print("---",driver.current_url)


        programmingLanguages = [*set(programmingLanguages)]
        driver.quit()
        return programmingLanguages

    except:
        driver.quit()
        return programmingLanguages
    