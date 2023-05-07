from rest_framework.response import Response
from rest_framework import status
from .scraping import get_github_information, get_gitlab_information, scrape_info
from .linkedin import get_linkedin_information
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAuthenticated, HasRole
import threading


class BasicInfo(APIView):
    permission_classes = (IsAuthenticated, HasRole)

    def post(self, request, format=None):
        
        #Array with json {platform, url} --: [{platform, url} ... {platform, url}]
        scrapingData = request.data["scraping-data"]
        
        threads = []
        results = { "linkedinInfo": "", "githubInfo": "", "gitlabInfo": ""}


        for data in scrapingData:
            if(data["platform"] == "github"):
                 scrape_info("github", data["url"], results)
                 scrapingData.remove(data)
                 break
        print(scrapingData)      
        # Create a thread for each platform to be scraped 
        for data in scrapingData:
            thread = threading.Thread(target=scrape_info, args=(data["platform"],data["url"], results))
            threads.append(thread)

        # Start each thread
        for thread in threads:
            thread.start()

        # Wait for each thread to finish
        for thread in threads:
            thread.join()

        return Response(results, status=status.HTTP_200_OK)