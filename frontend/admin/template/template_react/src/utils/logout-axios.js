import axios from "axios";

/**
 * Retrieves company basic info: Company name.
 * @returns 
 */

async function logoutCompany(){
    const response  = await axios({
        url: "http://localhost:8001/company/api/logout/",
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

async function refreshToken(){
    const response  = await axios({
        url: "http://localhost:8001/company/api/refresh/",
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