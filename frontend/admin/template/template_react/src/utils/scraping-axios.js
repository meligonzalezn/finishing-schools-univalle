import axios from 'axios'
import { decodeToken } from "react-jwt";

async function registerPortfolioStudent(data) {
    try {        
        // use decode_jwt to obtain sub_key
        const decodeData = decodeToken(localStorage.getItem("access_token")).sub_key
        if(decodeData !== null) {
            // save info in database
            let student = new FormData()
            student.append('first_name', data.firstName )
            student.append('last_name',  data.lastName)
            student.append('phone_number', data.phone_number)
            student.append('idCard', data.idCard)
            student.append('issueDate', data.issueDate)
            student.append('github_profile', data.github_profile)
            student.append('gitlab_profile', data.gitlab_profile)
            student.append('linkedin_profile', data.linkedin_profile)
            student.append('isFilled', true)
           
            student.append('sub_key', decodeData)
            
            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Accept': 'application/json',
                  authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            };
            
            try {
                const response = await axios.post(`${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/`, student, config).then((res) => {
                    return res;
                });
                return response
            }
            catch (error) {
                return [null, error]
            }
        }
    } catch (error) {
        return [null, error]
    } 
} 

async function getPortfolioStudent() {
    try {
        // use decode_jwt to obtain sub_key
        const decodeData = decodeToken(localStorage.getItem("access_token")).sub_key
        if(decodeData !== null) {
            const response  = await axios({
                // Endpoint to send files
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/${decodeData}/get_user/`,
                method: "GET",
                headers: {
                    // Add any auth token here
                    authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
              })    
                // Catch errors if any
                .catch((err) => { 
                    return err.response
                });
            if(response.status===200){
              return response.data
            }
            if(response.status===404){
                return "unregistered"
              }
            else{
              return undefined
            }  
        }
    } catch (error) {
        return [null, error]
    }
}

async function updatePortfolioStudent(data, imageChanged) {
    try {
        // use decode_jwt to obtain sub_key
        const decodeData = decodeToken(localStorage.getItem("access_token")).sub_key
        if(decodeData !== null) {
            let student= new FormData()
            student.append('first_name', data.firstName )
            student.append('last_name',  data.lastName)
            student.append('phone_number', data.phone_number)
            student.append('idCard', data.idCard)
            student.append('issueDate', data.issueDate)
            student.append('github_profile', data.github_profile)
            student.append('gitlab_profile', data.gitlab_profile)
            student.append('linkedin_profile', data.linkedin_profile)
            student.append('isFilled', true)
         
            student.append('sub_key', decodeData)
            
            if (data.description) {
                student.append('description', data.description)
            }
            if(data.image_profile) {
                if (imageChanged){
                    student.append('image_profile', data.image_profile, data.image_profile.name) 
                }
                else {
                    student.append('image_profile', data.image_profile)
                }
            }
            if(data.scrapeInfoSaved){
                student.append('scrapeInfoSaved', data.scrapeInfoSaved)
            }
            const response = await axios.put(`${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/${decodeData}/`, student, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                     authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
                 
                }).then((res) => {
                  return res;
                });
                return response;
              }
    } catch (error) {
        return [null, error]
    } 
}


async function getScrapingInfo(scrapingInfo) {
    try {
        const response  = await axios({
              url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/get-basic-info/scrape/`,
              method: "POST",
              data: scrapingInfo,
              headers: {
                // Add any auth token here
                authorization: "Bearer " + localStorage.getItem("access_token"),
              },
        })
        return response;
    } catch (error) {
        return error;
    }
}

export {registerPortfolioStudent, getPortfolioStudent, updatePortfolioStudent, getScrapingInfo}