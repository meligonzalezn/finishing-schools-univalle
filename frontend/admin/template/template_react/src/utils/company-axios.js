import axios from "axios";
import jwt_decode from 'jwt-decode';
/**
 * Saves company data in the company service
 * @param {*} data
 * @returns 
 */
async function registerCompanyData(data) {
  var company = new FormData()
  console.log(data.company.locations)
  company.append('aboutUs', data.company.aboutUs);
  company.append('locations', JSON.stringify(data.company.locations) );
  company.append('fields', data.company.fields);
  company.append('NIT', data.company.NIT);

  if (data.company.image){
      company.append('image', data.company.image, data.company.image.name) 
  }
  
  // if (data.company.image !== ''){
  //   company.append('image', data.company.image, data.company.image.name)
  // }
  company.append('office', data.company.office);
  company.append('size', data.company.size);
  company.append('website', data.company.website);
  company.append('specialties', JSON.stringify(data.company.specialties) );

  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_COMPANY_BACKEND_URL}/api/company/`,
    method: "POST",
    headers: {
      // Add any auth token here
      authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    data: company
  })
    // Catch errors if any
    .catch((err) => {
      return err.response
    });
  if (response.status === 200) {
    return response
  }
  else {
    return undefined
  }
}

/**
 * Updates data of given company in the company service
 * @param {*} data
 * @returns 
 */
async function updateCompanyData(data , imageChanged) {
  const decoded = jwt_decode(localStorage.getItem("access_token"));
  var company = new FormData()
  console.log(data.company.locations)
  company.append('aboutUs', data.company.aboutUs);
  company.append('locations', JSON.stringify(data.company.locations) );
  company.append('fields', data.company.fields);
  company.append('NIT', data.company.NIT);

  if (imageChanged){
      company.append('image', data.company.image, data.company.image.name) 
  }
  else {
      company.append('image', data.company.image)
  }
  
  // if (data.company.image !== ''){
  //   company.append('image', data.company.image, data.company.image.name)
  // }
  company.append('office', data.company.office);
  company.append('size', data.company.size);
  company.append('website', data.company.website);
  company.append('specialties', JSON.stringify(data.company.specialties) );

  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_COMPANY_BACKEND_URL}/api/company/` + decoded.sub_key,
    method: "PUT",
    headers: {

      authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    data: company
  })
    // Catch errors if any
    .catch((err) => {
      return err.response
    });
  if (response.status === 200) {
    return response
  }
  else {
    return undefined
  }
}


/**
 * Updates data of given company in the company service
 * @param {*} data
 * @returns 
 */
async function getCompanyData(data) {
  const decoded = jwt_decode(localStorage.getItem("access_token"));
  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_COMPANY_BACKEND_URL}/api/company/` + decoded.sub_key,
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
  if (response.status === 404){
    return "unregistered"
  }
  else {
    return undefined
  }
}

export { registerCompanyData, updateCompanyData, getCompanyData }