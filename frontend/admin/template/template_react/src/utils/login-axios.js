import axios from "axios";

/**
 * Tries to login an user
 * Given valid credentials returns a token that authenticates the user, 
 * otherwise returns null
 * @param {str} Email
 * @param {str} Password
 * @returns 
 */

async function loginStudent(credential){
  const response  = await axios({
    //  Sends credential to be verified in backend
      url: process.env.REACT_APP_STUDENT_BACKEND_URL+"/student/api/login/",
      method: "POST",
      data: { 'auth_token': credential},
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


/**
 * Tries to login an user
 * Given valid credentials returns a token that authenticates the user, 
 * otherwise returns null
 * @param {str} Email
 * @param {str} Password
 * @returns 
 */

async function loginCompany(email, password){
  const response  = await axios({
    url: process.env.REACT_APP_COMPANY_BACKEND_URL+"/company/user/login/",
    method: "POST",
    data: { 'email': email, 'password': password},
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

/**
 * Sends a request for a password recovery
 * @param {str} email
 * @returns 
 */

async function request_password_recovery(email){
 
  const response  = await axios({
      url: process.env.REACT_APP_COMPANY_BACKEND_URL+"/company/password_reset/",
      method: "POST",
      data: { 'email': email},
    })
          
      .catch((err) => { 
          return err.response
      });
  if(response.status===200){
    return "OK"
  }
  else{
    return "Correo invalido"
  }
    
}

/**
 * Performs a password recovery
 * @param {str} token
 * @param {str} password
 * @returns 
 */

async function password_recovery(token, password){
 
  const response  = await axios({
      url: process.env.REACT_APP_COMPANY_BACKEND_URL+"/company/password_reset/confirm/",
      method: "POST",
      data: { 'token': token, 'password': password},
    })

      .catch((err) => { 
          return err.response
      });
  if(response.status===200){
    console.log("response",response)
    return "OK"
  }
  if(response.status===404){
    return "NOT FOUND"
  }
  if(response.status===400){
    const error = response.data.password[0]
    console.log(error)
    if(error.includes("The password is too similar to")){
      return "Esta contraseña es muy similar a otra información personal de tu cuenta"
    }
    switch (response.data.password[0]) {
      case 'This password is too common.':
        return "Esta contraseña es muy común"
      case 'This password is entirely numeric.':
        return "La contraseña debe contener letras y/o símbolos"
      case 'This password is too short. It must contain at least 8 characters.':
        return "Esta contraseña es muy corta. Debe contener al menos 8 carácteres"
      default:
        return "Contraseña invalida"
    }
  }
  else{
    return "Contraseña invalida"
  }
    
}

export {loginStudent, loginCompany, request_password_recovery, password_recovery}