import axios from "axios";

/**
 * Gets username
 * @param {str} auth_token access token 
 * @param {str} user_type Type of user (student/company)
 * @returns 
 */

async function get_user_basic_info(auth_token, user_type){
        const response  = await axios({
  
            // Endpoint to send files
            url: process.env.REACT_APP_COMPANY_BACKEND_URL+"/"+user_type+"/user/get_user_basic_info/",
            method: "GET",
            headers: {
        
            // Add any auth token here
               authorization: "Bearer "+ auth_token,
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

export {get_user_basic_info}