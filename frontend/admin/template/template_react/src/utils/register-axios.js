import axios from 'axios'
/**
 * With this function we can check if a email is already register
 * @param {string} email 
 * @returns 
 */
async function checkEmail(email) {
     try {
       const request = await axios.post("http://localhost:8001/company/user/check_email/", { email: email })
       return [request.data, null];
     }
     catch (err) {
       return [null, err]
     }
   }

/**
 * Function that register company in database
 * @param {*} data
 * @returns 
 */
async function registerCompany(data) {
    const company = {
        company_name: data.companyName,
        email: data.email,
        password: data.password,
    }
    try {
        const request = await axios.post('http://localhost:8001/company/user/', company);
        return [request, null];
      }
      catch (err) {
        return [null, err]
      }
}

export { registerCompany, checkEmail }