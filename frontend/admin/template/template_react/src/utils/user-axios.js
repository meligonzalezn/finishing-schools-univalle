import axios from "axios";

/**
 * Gets username
 * @returns 
 */
async function get_user_basic_info() {
  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_AUTH_BACKEND_URL}/auth/user/get_user_basic_info/`,
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
 * Returns the student profile picture
 * @returns 
 */
async function get_user_pfp() {
  if (localStorage.getItem("role") === "student") {
    const response = await axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/get_pfp/`,
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
  if (localStorage.getItem("role") === "company") {
    const response = await axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_COMPANY_BACKEND_URL}/api/company/get_pfp/`,
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

}




async function decodeJwt() {
  try {
    const request = await axios.post(`${process.env.REACT_APP_AUTH_BACKEND_URL}/auth/user/decode_jwt/`, { "auth-token": localStorage.getItem("access_token") })
    return [request.data, true];
  }
  catch (err) {
    return [null, err]
  }
}

/**
 * Returns if the student's portfolio has been filled up.
 * @returns 
 */
async function getPortfolioState() {
  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/get_portfolio_state/`,
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
 * Returns if the company's profile has been filled up.
 * @returns 
 */
async function getProfileState() {
  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_COMPANY_BACKEND_URL}/api/company/get_profile_state/`,
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

export { get_user_basic_info, decodeJwt, getPortfolioState, getProfileState, get_user_pfp }