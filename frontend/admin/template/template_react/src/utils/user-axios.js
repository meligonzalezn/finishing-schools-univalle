import axios from "axios";

/**
 * Gets username
 * @returns 
 */
async function get_user_basic_info(){
        const response  = await axios({
            // Endpoint to send files
            url: `${process.env.REACT_APP_AUTH_BACKEND_URL}/auth/user/get_user_basic_info/`,
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

export {get_user_basic_info}