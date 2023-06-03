import axios from "axios";

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
 * For student to apply to a certain vacacy
 * @returns 
 */
async function applyToVacancy(vacancy, student_portfolio, contact_info) {

    const data = { "vacancy_id": vacancy.id, "vacancy": vacancy, "portfolio": student_portfolio, "contact_info": contact_info}
    return(data)
}

  export{ getInfoToApply, applyToVacancy}