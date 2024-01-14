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
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        student_id: studentId,
        experience: experience
      },
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Update array that store objects with experience of user
 * @param {*} experience Array of objects representing work experiences
 * @param {*} experienceId to be updated
 * @param {*} studentId string representing the id of student
 */
async function updateExperience(studentId, experienceId, experience) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/workExperience/update_work_experience/${studentId}/${experienceId}/`,
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        "experience": experience
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}



/**
 * Delete information related to a student's work experience
 * @param {string} studentId - Student ID for deleting information
 * @param {string} workExperienceId - Experience ID to be deleted
 * @returns {Promise} - Promise representing the deletion operation
 */
async function deleteExperienceBack(studentId, workExperienceId) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/workExperience/delete_work_experience/${studentId}/${workExperienceId}/`,
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return response;
  } catch (error) {
    throw error;
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
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
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
 * @param {*} studieId to be updated
 * @param {*} studentId string representing the id of the student
 */
async function updateEducation(studentId, studieId, education) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/studies/update_studies/${studentId}/${studieId}/`,
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        "education": education
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}


/**
 * Delete information related with student
 * @param {*} studentId Student ID for delete information
 * @param {*} studiesId studie ID to be deleted
 * @returns 
 */
async function deleteEducationBack(studentId, studiesId) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/studies/delete_studies/${studentId}/${studiesId}/`,
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return response;
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
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
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
 * @param {*} certificationId to be updated
 * @param {*} studentId string representing the id of the student
 */
async function updateCertificationsLicenses(studentId, certificationId, certificationsLicenses) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/certificationsLicenses/update_certifications_licenses/${studentId}/${certificationId}/`,
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        "certifications": certificationsLicenses
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete information related with student
 * @param {*} studentId Student ID for delete information
 * @param {*} certificationLicensesId certification or licenses ID to be deleted
 * @returns 
 */
async function deleteCertificationsLicensesBack(studentId, certificationLicensesId) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/certificationsLicenses/delete_certifications_licenses/${studentId}/${certificationLicensesId}/`,
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return response;
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
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
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
* @param {*} languageId to be updated
* @param {*} studentId string representing the id of the student
*/
async function updateLanguages(studentId, languageId, languages) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/languages/update_languages/${studentId}/${languageId}/`,
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        "languages": languages
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete information related with student
 * @param {*} studentId Student ID for delete information
 * @param {*} languageId language ID to be deleted
 * @returns 
 */
async function deleteLanguagesBack(studentId, languageId) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/languages/delete_languages/${studentId}/${languageId}/`,
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return response;
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
  try {
    await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/create_skills/create_skills/`,
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        student_id: studentId,
        skills: skills,
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
async function updateSkills(skills, studentId) {
  try {
    await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/update_skills/${studentId}/`,
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      data: {
        "skills": skills
      }
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Delete information related with student
 * @param {*} studentId Student ID for delete information
 * @param {*} skillId skill ID to be deleted
 * @returns 
 */
async function deleteSkillsBack(studentId, skillId) {
  try {
    const response = await axios({
      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/delete_skills/${studentId}/${skillId}/`,
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}


/**
 * Registers portfolio student information for the given student ID
 * @param {Object} data Portfolio student information data
 * @param {string} studentId Student ID
 * @param {bool} scrapeState Scrape state, true if a scraping proccess was performed, false otherwise
 * @returns {Promise<Object>} Promise that resolves to an object with status 200 on success or the error on failure
 */
async function registerPortfolioStudentInformation(data, studentId, scrapeState) {
  try {
    if (scrapeState) {
      // Register work experience if it exists
      if (data.experience?.length !== 0) {
        await registerExperience(data.experience, studentId)
      }

      // Register education if it exists
      if (data.education?.length !== 0) {
        await registerEducation(data.education, studentId)
      }

      // Register certifications and licenses if they exist
      if (data.certifications?.length !== 0) {
        await registerCertificationsLicenses(data.certifications, studentId)
      }

      // Register languages if they exist
      if (data.languages?.length !== 0) {
        await registerLanguages(data.languages, studentId)
      }

      // Register skills if they exist
      if (data.skills?.length !== 0) {
        await registerSkills(data.skills, studentId)
      }
    }

    // Return an object with status 200 to indicate success
    await registerScrapeSaved()
    return { status: 200 };
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
async function getPortfolioStudentInformation() {
  try {
    const response = await axios({

      url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/get_portfolio/`,
      method: "GET",
      headers: {
        // Add any auth token here
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })

    return response.data;
  } catch (error) {
    throw error;
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
    if (data.experience?.length !== 0) {
      await updateExperience(data.experience, studentId)
    }
    if (data.education?.length !== 0) {
      await updateEducation(data.education, studentId)
    }

    if (data.certifications?.length !== 0) {
      await updateCertificationsLicenses(data.certifications, studentId)
    }

    if (data.languages?.length !== 0) {
      await updateLanguages(data.languages, studentId)
    }

    if (data.skills?.length !== 0) {
      await updateSkills(data.skills, studentId);
    }

    return { status: 200 };

  } catch (error) {
    return error
  }
}



async function registerScrapeSaved() {
  const response = await axios({
    // Endpoint to send files
    url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/student/set_scraped_info_saved/`,
    method: "POST",
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
    return response;
  }
  else {
    return undefined
  }
}


export {
  registerPortfolioStudentInformation, getPortfolioStudentInformation, updatePortfolioStudentInformation,
  registerExperience, registerCertificationsLicenses, registerEducation, registerLanguages,
  registerSkills, updateExperience, updateEducation, updateCertificationsLicenses, updateLanguages,
  updateSkills, deleteExperienceBack, deleteEducationBack, deleteCertificationsLicensesBack, deleteLanguagesBack,
  deleteSkillsBack, registerScrapeSaved
}