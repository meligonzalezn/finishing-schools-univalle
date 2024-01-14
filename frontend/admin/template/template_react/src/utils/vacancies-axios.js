import axios from "axios";
import { decodeToken } from "react-jwt";

/**
 * Returns all the student's info for applying to a vacancy 
 * @returns 
 */
async function getInfoToApply() {

    const response = await axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/get_info_to_apply/`,
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
    if (response.status === 200) {
      return response.data
    }
    else {
      return undefined
    }
  }


  /**
 * Returns all the student's info for applying to a vacancy 
 * @returns 
 */
async function getVacancies() {

  const response = await axios({
    // Endpoint to send files
    url: "https://jellyfish-app-rbczq.ondigitalocean.app/api/vacancy/",
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
  if (response.status === 200) {
    return response.data
  }
  else {
    return undefined
  }
}



  /**
 * For student to apply to a certain vacacy
 * @returns 
 */
async function applyToVacancy(vacancy, student_portfolio, contact_info) {
  
    const code = decodeToken(localStorage.getItem("access_token")).sub_key
    student_portfolio["phone"] = contact_info.phone
    student_portfolio["mail"] = contact_info.email

    // const response = await axios({
    //   // Endpoint to send files
    //   url: "https://jellyfish-app-rbczq.ondigitalocean.app/api/vacancy",
    //   method: "POST",
    //   headers: {
    //     // Add any auth token here
    //     authorization: "Bearer " + localStorage.getItem("access_token"),
    //   },
    //   data:  {
    //     "code":code,
    //     "vacancy": vacancy,
    //     "student": student_portfolio
    //   }
    // })
    //   // Catch errors if any
    //   .catch((err) => {
    //     return err.response
    //   });
    // if (response.status === 200) {
    //   console.log(response.data)
    //   return response.data
    // }
    // else {
    //   return undefined
    // }
    
    // Actualizar perfil: 
    //https://monkfish-app-a37au.ondigitalocean.app/api/update/student/

    // {
    //   code: <str>,
    //   vacancies: [{},{}],
    //   profile: {},
    //   experiences: [{},{}],
    //   certifications: [{},{}],
    //   skills: [{},{}]
    // }

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    await delay(3000);

    return code

}

  export{ getInfoToApply, applyToVacancy , getVacancies}



 