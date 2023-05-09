import axios from "axios";

/**
 * Register an array that store objects with experience of user
 * @param {*} experience Array of objects representing work experiences
 * @param {*} studentId string representing the id of student
 */
async function registerExperience(experience, studentId) {
    try {
      await axios({
        url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/workExperience/create_work_experience/create_work_experience/`,
        method: "POST",
        data: {
          student_id: studentId,
          experience: experience,
        },
      });
    } catch (error) {
      throw error;
    }
  }

/**
 * Update array that store objects with experience of user
 * @param {*} experience Array of objects representing work experiences
 * @param {*} studentId string representing the id of student
 */
async function updateExperience(experience, studentId) {
    try {
        await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/workExperience/update_work_experience/${studentId}/`,
            method: "PUT",
            data: { 
                "experience": experience
          }
      });
    } catch (error) {
        throw error
    }
}

  
  /**
   * Register an array that store objects with education of user
   * @param {*} education Array of objects representing education
   * @param {*} studentId string representing the id of the student
   */
  async function registerEducation(education, studentId) {
    try {
      await axios({
        url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/studies/create_studies/create_studies/`,
        method: "POST",
        data: {
          student_id: studentId,
          education: education,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update an array that store objects with education of user
   * @param {*} education Array of objects representing education
   * @param {*} studentId string representing the id of the student
   */  
  async function updateEducation(education, studentId) {
    try {
        await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/studies/update_studies/${studentId}/`,
            method: "PUT",
            data: { 
                "education": education
          }
      });
    } catch (error) {
        throw error;
    }
  }

  /**
   * Register an array that store objects with certifications and licenses of user
   * @param {*} certificationsLicenses Array of objects representing certifications and licenses
   * @param {*} studentId string representing the id of the student
   */
  async function registerCertificationsLicenses(certificationsLicenses, studentId) {
    try {
      await axios({
        url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/certificationsLicenses/create_certifications_licenses/create_certifications_licenses/`,
        method: "POST",
        data: {
          student_id: studentId,
          certifications: certificationsLicenses,
        },
      });
    } catch (error) {
      throw error;
    }
  }

   /**
   * update an array that store objects with certifications and licenses of user
   * @param {*} certificationsLicenses Array of objects representing certifications and licenses
   * @param {*} studentId string representing the id of the student
   */
  async function updateCertificationsLicenses(certificationsLicenses, studentId){
    try {
        await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/certificationsLicenses/update_certifications_licenses/${studentId}/`,
            method: "PUT",
            data: { 
                "certifications": certificationsLicenses
          }
      });
    } catch (error) {
        throw error;
    }
  }

  /**
   * Register an array that store objects with languages of user
   * @param {*} languages Array of objects representing languages
   * @param {*} studentId string representing the id of the student
   */
  async function registerLanguages(languages, studentId) {
    try {
      await axios({
        url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/languages/create_languages/create_languages/`,
        method: "POST",
        data: {
          student_id: studentId,
          languages: languages,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  
   /**
   * Update an array that store objects with languages of user
   * @param {*} languages Array of objects representing languages
   * @param {*} studentId string representing the id of the student
   */
  async function updateLanguages(languages, studentId) {
    try {
        await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/languages/update_languages/${studentId}/`,
            method: "PUT",
            data: { 
                "languages": languages
          }
      });
    } catch (error) {
        throw error;
    }
  }

  /**
   * Register an array that store objects with skills of user
   * @param {*} skills Array of objects representing skills
   * @param {*} studentId string representing the id of the student
   */
  async function registerSkills(skills, studentId) {
    const formattedSkills = skills.map((skill) => ({ name: skill }));
    try {
      await axios({
        url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/create_skills/create_skills/`,
        method: "POST",
        data: {
          student_id: studentId,
          skills: formattedSkills,
        },
      });
    } catch (error) {
      throw error;
    }
  }

   /**
   * Update an array that store objects with skills of user
   * @param {*} skills Array of objects representing skills
   * @param {*} studentId string representing the id of the student
   */
  async function updateSkills(skills, studentId){
    try {
        const formattedSkills = skills.map(skill => ({ "name": skill }));
        await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/update_skills/${studentId}/`,
            method: "PUT",
            data: { 
                "skills": formattedSkills
          }
      });
    } catch (error) {
        throw error;
    }
  }


/**
 * Registers portfolio student information for the given student ID
 * @param {Object} data Portfolio student information data
 * @param {string} studentId Student ID
 * @returns {Promise<Object>} Promise that resolves to an object with status 200 on success or the error on failure
 */
async function registerPortfolioStudentInformation(data, studentId) {
    try {
        // Register work experience if it exists
        if(data.experience?.length !== 0){
            await registerExperience(data.experience, studentId)
        }

        // Register education if it exists
        if(data.education?.length !== 0){
            await registerEducation(data.education, studentId)
        }

        // Register certifications and licenses if they exist
        if(data.certifications?.length !== 0){
            await registerCertificationsLicenses(data.certifications, studentId)
        }

        // Register languages if they exist
        if(data.languages?.length !== 0){
            await registerLanguages(data.languages, studentId)
        }

        // Register skills if they exist
        if(data.skills?.length !== 0){
            await registerSkills(data.skills, studentId)
        }

        // Return an object with status 200 to indicate success
        return { status:200 };
    } catch (error) {
        // Throw the error on failure
        throw error;
    }
}

/**
 * Fetches portfolio information of a given student by making multiple API calls
 * @param {string} studentId ID of the student whose portfolio information is to be fetched
 * @returns {Promise<Object>} An object containing the fetched information
 */
async function getPortfolioStudentInformation(studentId) {
    try {
        let experienceResponse, educationResponse, certificationResponse, languagesResponse, skillsResponse;
        experienceResponse  = await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/workExperience/${studentId}/get_work_experience/`,
            method: "GET",
        });
        educationResponse  = await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/studies/${studentId}/get_studies/`,
            method: "GET",
        });
        
        certificationResponse  = await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/certificationsLicenses/${studentId}/get_certifications_licenses/`,
            method: "GET",
        });
        
        languagesResponse  = await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/languages/${studentId}/get_languages/`,
            method: "GET",
        });
        skillsResponse  = await axios({
            url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/${studentId}/get_skills/`,
            method: "GET",
        });
        const skillsArray = skillsResponse.data.map((skill) => {
            return skill.name
        })      
      return {
        "experience": experienceResponse,
        "certifications": certificationResponse,
        "education": educationResponse,
        "languages": languagesResponse,
        "skills": [...new Set(skillsArray)],
      }
    }
    catch(error){
        throw error
    }
}

/**
 * Updates portfolio student information for the given student ID
 * @param {Object} data Portfolio student information data
 * @param {string} studentId Student ID
 * @returns {Promise<Object>} Promise that resolves to an object with status 200 on success or the error on failure
 */
async function updatePortfolioStudentInformation(data, studentId) {
    try {
        if(data.experience?.length !== 0){
            await updateExperience(data.experience, studentId)
        }
        if(data.education?.length !== 0){
            await updateEducation(data.education, studentId)
        }
        
        if(data.certifications?.length !== 0){
            await updateCertificationsLicenses(data.certifications, studentId)
        }
        
        if(data.languages?.length !== 0){
            await updateLanguages(data.languages, studentId)
        }
        
        if(data.skills?.length !== 0){
            await updateSkills(data.skills, studentId);
        }
        
        return { status:200 };
        
    } catch (error) {
        return error
    }
} 

export {registerPortfolioStudentInformation, getPortfolioStudentInformation, updatePortfolioStudentInformation}