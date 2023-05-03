import axios from "axios";

/**
 * Log out the user
 * @returns 
 */
async function logout(){
    const response  = await axios({
        url: `${process.env.REACT_APP_AUTH_BACKEND_URL}/auth/api/logout/`,
        method: "POST",
        data: { "refresh_token": localStorage.getItem("refresh_token")},
        })
    .catch((err) => { 
        return err.response
    });
    if(response.status===205){
        localStorage.clear()
        return response.data
    }
    else{
        return undefined
    }
}

/**
 * Refresh access token
 * @param {str} user_type Type of user (student/company)
 * @returns 
 */
async function refreshToken(){
    const response  = await axios({
        url: `${process.env.REACT_APP_AUTH_BACKEND_URL}/auth/api/refresh/`,
        method: "POST",
        data: { 'refresh': localStorage.getItem("refresh_token")},
      })
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

export {logout, refreshToken}