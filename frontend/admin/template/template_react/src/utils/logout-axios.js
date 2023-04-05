import axios from "axios";

/**
 * Log out the user
 * @returns 
 */

async function logout(){
    const user_type = sessionStorage.getItem("type")
    let backend_url= process.env.REACT_APP_STUDENT_BACKEND_URL 
    if(user_type==="company"){
          backend_url= process.env.REACT_APP_COMPANY_BACKEND_URL
        }
    const response  = await axios({
        url: backend_url+"/" + "auth"+"/api/logout/",
        method: "POST",
        headers: {
            authorization: "Bearer "+ sessionStorage.getItem("access_token"),
        },
        data: { "refresh_token": sessionStorage.getItem("refresh_token")},
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

    let backend_url= process.env.REACT_APP_STUDENT_BACKEND_URL 
    if(user_type==="company"){
          backend_url= process.env.REACT_APP_COMPANY_BACKEND_URL
        }
    const response  = await axios({
        url: backend_url+"/"+ "auth"+"/api/refresh/",
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

export {logout, refreshToken}