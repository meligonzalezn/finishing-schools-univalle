import axios from "axios";

/**
 * Log out the user
 * @returns 
 */

async function logoutCompany(){
    const response  = await axios({
        url: process.env.REACT_APP_COMPANY_BACKEND_URL+"/company/api/logout/",
        method: "POST",
        headers: {
            authorization: "Bearer "+ sessionStorage.getItem("access_token"),
        },
        data: { 'refresh_token': sessionStorage.getItem("refresh_token")},
        })
    .catch((err) => { 
        return err.response
    });
    if(response.status===205){
        sessionStorage.clear()
        console.log(response.data)
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

async function refreshToken(user_type){
    const response  = await axios({
        url: process.env.REACT_APP_COMPANY_BACKEND_URL+"/"+user_type+"/api/refresh/",
        method: "POST",
        headers: {
            authorization: "Bearer "+ sessionStorage.getItem("access_token"),
        },
        data: { 'refresh': sessionStorage.getItem("refresh_token")},
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

export {logoutCompany, refreshToken}