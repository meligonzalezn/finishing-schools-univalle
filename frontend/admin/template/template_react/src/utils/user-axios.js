import axios from "axios";

/**
 * Retrieves company basic info: Company name.
 * @returns 
 */

async function get_user_basic_info(auth_token){
        const response  = await axios({
  
            // Endpoint to send files
            url: "http://localhost:8001/company/user/get_user_basic_info/",
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