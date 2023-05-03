import axios from "axios";

async function registerPortfolioStudentInformation(data, studentId) {
    try {
        let experienceResponse, educationResponse, certificationResponse, languagesResponse, skillsResponse;
        
        if(data.experience?.length !== 0){
            experienceResponse  = await axios({
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/workExperience/create_work_experience/create_work_experience/`,
                method: "POST",
                data: { 
                    "student_id": studentId,
                    "experience": data.experience
              }
          });
        }
        
        if(data.education?.length !== 0){
            educationResponse  = await axios({
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/studies/create_studies/create_studies/`,
                method: "POST",
                data: { 
                    "student_id": studentId,
                    "education": data.education
              }
          });
        }
        
        if(data.certifications?.length !== 0){
            certificationResponse  = await axios({
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/certificationsLicenses/create_certifications_licenses/create_certifications_licenses/`,
                method: "POST",
                data: { 
                    "student_id": studentId,
                    "certifications": data.certifications
              }
          });
        }
        
        if(data.languages?.length !== 0){
            languagesResponse  = await axios({
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/languages/create_languages/create_languages/`,
                method: "POST",
                data: { 
                    "student_id": studentId,
                    "languages": data.languages
              }
          });
        }
        
        if(data.skills?.length !== 0){
            const formattedSkills = data.skills.map(skill => ({ "name": skill }));
            skillsResponse  = await axios({
                url: `${process.env.REACT_APP_PORTFOLIO_BACKEND_URL}/portfolio/skills/create_skills/create_skills/`,
                method: "POST",
                data: { 
                    "student_id": studentId,
                    "skills": formattedSkills
              }
          });
        }
        
        return { experienceResponse, educationResponse, certificationResponse, languagesResponse, skillsResponse, status:200 };
    } catch (error) {
        return error;
    }
}

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
        return error
    }
}

export {registerPortfolioStudentInformation, getPortfolioStudentInformation}