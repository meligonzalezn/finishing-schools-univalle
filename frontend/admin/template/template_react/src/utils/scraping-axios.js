import axios from 'axios'
import { decodeJwt } from './user-axios'

async function registerPortfolioStudent(data) {
    try {        
        // use decode_jwt to obtain sub_key
        const decodeData = await decodeJwt()
        if(decodeData[0] !== null) {
            // save info in database
            let student = new FormData()
            student.append('idCard', data.idCard)
            student.append('issueDate', data.issueDate)
            student.append('github_profile', data.github_profile)
            student.append('gitlab_profile', data.gitlab_profile)
            student.append('linkedin_profile', data.linkedin_profile)
            student.append('isFilled', true)
            if (decodeData[0].sub_key) {
                student.append('sub_key', decodeData[0].sub_key)
            }
            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Accept': 'application/json',
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
        const decodeData = await decodeJwt()
        if(decodeData[0] !== null) {
            const response  = await axios({
                // Endpoint to send files
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/${decodeData[0].sub_key}/get_user/`,
                method: "GET",
                headers: {
                // Add any auth token here
                   authorization: "Bearer "+ sessionStorage.getItem("access_token"),
                },
              })    
                // Catch errors if any
                .catch((err) => { 
                    return err.response
                });
            if(response.status===200){
              return response.data
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
        const decodeData = await decodeJwt()
        if(decodeData[0] !== null) {
            let student= new FormData()
            student.append('idCard', data.idCard)
            student.append('issueDate', data.issueDate)
            student.append('github_profile', data.github_profile)
            student.append('gitlab_profile', data.gitlab_profile)
            student.append('linkedin_profile', data.linkedin_profile)
            student.append('isFilled', true)
            if (decodeData[0].sub_key) {
                student.append('sub_key', decodeData[0].sub_key)
            }
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
            const response = await axios.put(`${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/${decodeData[0].sub_key}/`, student, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
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
        console.log("datos:" , scrapingInfo)
        const response  = await axios({
              url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/get-basic-info/scrape/`,
              method: "POST",
              data: scrapingInfo,
        })
        return response;
    } catch (error) {
        return error;
    }
}




/**
 * Returns if the student's portfolio has been filled up.
 * @returns 
 */
async function get_portfolio_state(){
    const response  = await axios({
        // Endpoint to send files
        url:`${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/get_portfolio_state/` ,
        method: "GET",
        headers: {
        // Add any auth token here
           authorization: "Bearer "+ localStorage.getItem("access_token"),
        },
      })    
        // Catch errors if any
        .catch((err) => { 
            return err.response
        });
    if(response.status===200){
      return response.data
    }
    else{
      return undefined
    }     
}

export {registerPortfolioStudent, getPortfolioStudent, updatePortfolioStudent, getScrapingInfo, get_portfolio_state }