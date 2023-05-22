import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    studentId: "",
    about: "",
    image: "",
    imageChanged: false,
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    skills: [],
    portfolioStudent: {},
    showModalAbout: false,
    showModalAboutEdit: false,
    showModalExperience: false,
    showModalEducation: false,
    showModalCertifications: false,
    showModalLanguages: false,
    showModalSkills: false,
    showModalEditExperience: false,
    showModalEditEducation: false,
    showModalEditCertifications: false,
    showModalEditLanguages: false,
    showModalEditSkills:false,
    showNotificationCreateSuccess: false,
    showNotificationCreateError: false,
    showNotificationDeleteSuccess: false,
    showNotificationDeleteError: false,
    showNotificationUpdateSuccess: false,
    showNotificationUpdateError: false,
    showNotificationUpdatePortfolioSuccess: false,
    showNotificationUpdatePortfolioError: false,
    isEditing: "",
    editObject: {},
    editForm: false,
    editObjectId: -1,
}

const portfolioSlice = createSlice({
    name: 'portfolio', 
    initialState,
    reducers: {
        setStudentId(state,action) {
            state.studentId = action.payload;
        },
        setAbout(state, action) {
            state.about = action.payload;
        },
        setSingleAbout(state, action) {
            state.about = action.payload.description;
        },
        setUpdateAbout(state, action) {
            state.about = action.payload.description
        },
        setShowModalAbout(state, action) {
            state.showModalAbout = action.payload;
        },
        setShowModalAboutEdit(state, action){
            state.showModalAboutEdit = action.payload;
        },
        setImage(state, action){
            state.image = action.payload;
        },
        setImageChanged(state, action) {
            state.imageChanged = action.payload;
        },
        setExperiences(state, action) {
            state.experience = action.payload;            
        },
        setSingleExperience(state, action) {
            state.experience.unshift(action.payload);
        },
        setShowModalExperience(state, action){
            state.showModalExperience = action.payload
        },
        setUpdateExperience(state, action) {
            const { id, updatedObject } = action.payload;
            state.experience = state.experience.map(experience => {
              if (experience.id === id) {
                return { ...experience, ...updatedObject };
              }
              return experience;
            });
        },
        deleteExperience(state, action) {
            state.experience = state.experience.filter((experience) => experience.id !== action.payload);
        },
        setEducation(state, action) {
            state.education = action.payload;
        },
        setSingleEducation(state, action) {
            state.education.unshift(action.payload);
        },
        deleteEducation(state, action){
            state.education = state.education.filter((education) => education.id !== action.payload);
        },  
        setShowModalEducation(state, action){
            state.showModalEducation = action.payload;
        },
        setUpdateEducation(state, action) {
            const { id, updatedObject } = action.payload;
            state.education = state.education.map(studie => {
              if (studie.id === id) {
                return { ...studie, ...updatedObject };
              }
              return studie;
            });
        },
        setCertifications(state, action){
            state.certifications = action.payload;
        },
        setSingleCertification(state, action){
            state.certifications.unshift(action.payload);
        },
        setShowModalCertification(state, action) {
            state.showModalCertifications = action.payload;
        },
        deleteCertification(state, action){
            state.certifications = state.certifications.filter((certification) => certification.id !== action.payload);
        },
        setUpdateCertification(state, action) {
            const { id, updatedObject } = action.payload;
            state.certifications = state.certifications.map(certification => {
              if (certification.id === id) {
                return { ...certification, ...updatedObject };
              }
              return certification;
            });
        },
        setLanguages(state, action){
            state.languages = action.payload;
        },
        setSingleLanguage(state, action) {
            state.languages.unshift(action.payload);
        },
        setShowModalLanguage(state, action) {
            state.showModalLanguages = action.payload;
        },
        deleteLanguages(state,action){
            state.languages = state.languages.filter((language) => language.id !== action.payload);
        },
        setUpdateLanguage(state, action) {
            const { id, updatedObject } = action.payload;
            state.languages = state.languages.map(language => {
              if (language.id === id) {
                return { ...language, ...updatedObject };
              }
              return language;
            });
        },
        setSkills(state, action) {
            state.skills = action.payload;
        },
        setSingleSkills(state, action){
            action.payload.map((skill) => 
                state.skills.unshift(skill)
            )   
        },
        setShowModalSkills(state, action) {
            state.showModalSkills = action.payload;
        },
        deleteSkill(state, action) {
            state.skills = state.skills.filter((skill) => skill.id !== action.payload);
        },
        setPortfolioStudent(state, action){
            state.portfolioStudent = action.payload;
        },
        setIsEditing(state, action) {
            state.isEditing = action.payload;
        },
        setEditObject(state, action) {
            state.editObject = action.payload;
        },
        setShowModalEditExperience(state, action){
            state.showModalEditExperience = action.payload;
        },
        setShowModalEditEducation(state, action){
            state.showModalEditEducation = action.payload;
        },
        setShowModalEditCertifications(state, action){
            state.showModalEditCertifications = action.payload;
        },
        setShowModalEditLanguages(state, action){
            state.showModalEditLanguages = action.payload;
        },
        setShowModalEditSkills(state, action){
            state.showModalEditSkills = action.payload;
        },
        setEditForm(state, action){
            state.editForm = action.payload;
        }, 
        setEditObjectId(state, action){
            state.editObjectId = action.payload;
        },
        setNotificationDeleteSuccess(state, action){
            state.showNotificationDeleteSuccess = action.payload;
        },
        setNotificationDeleteError(state, action){
            state.showNotificationDeleteError = action.payload;
        },
        setShowNotificationUpdateSuccess(state, action){
            state.showNotificationUpdateSuccess = action.payload;
        },
        setShowNotificationUpdateError(state, action){
            state.showNotificationUpdateError = action.payload;
        },
        setShowNotificationUpdatePortfolioSuccess(state, action){
            state.showNotificationUpdatePortfolioSuccess = action.payload;
        },
        setShowNotificationUpdatePortfolioError(state, action) {
            state.showNotificationUpdatePortfolioSuccess = action.payload;
        }, 
        setShowNotificationCreateSuccess(state, action){
            state.showNotificationCreateSuccess = action.payload;
        },
        setShowNotificationCreateError(state, action){
            state.showNotificationCreateError = action.payload;
        }
    }
})

// selectors
export const selectStudentId = (state) => state.portfolio.portfolioState.studentId;
export const selectAbout = (state) => state.portfolio.portfolioState.about;
export const selectImage = (state) => state.portfolio.portfolioState.image;
export const selectExperience = (state) => state.portfolio.portfolioState.experience;
export const selectEducation = (state) => state.portfolio.portfolioState.education;
export const selectCertifications = (state) => state.portfolio.portfolioState.certifications;
export const selectLanguages = (state) => state.portfolio.portfolioState.languages;
export const selectSkills = (state) => state.portfolio.portfolioState.skills;
export const selectPortfolioStudent = (state) => state.portfolio.portfolioState.portfolioStudent;
export const selectShowlModalAbout = (state) => state.portfolio.portfolioState.showModalAbout;
export const selectShowModalAboutEdit = (state) => state.portfolio.portfolioState.showModalAboutEdit;
export const selectShowModalExperience = (state) => state.portfolio.portfolioState.showModalExperience;
export const selectShowModalEducation = (state) => state.portfolio.portfolioState.showModalEducation;
export const selectShowModalCertification = (state) => state.portfolio.portfolioState.showModalCertifications;
export const selectShowModalLanguages = (state) => state.portfolio.portfolioState.showModalLanguages;
export const selectShowModalSkills = (state) => state.portfolio.portfolioState.showModalSkills;
export const selectImageChanged = (state) => state.portfolio.portfolioState.imageChanged;
export const selectIsEditing = (state) => state.portfolio.portfolioState.isEditing;
export const selectEditObject = (state) => state.portfolio.portfolioState.editObject;
export const selectShowModalEditExperience = (state) => state.portfolio.portfolioState.showModalEditExperience;
export const selectShowModalEditEducation = (state) => state.portfolio.portfolioState.showModalEditEducation;
export const selectShowModalEditCertifications = (state) => state.portfolio.portfolioState.showModalEditCertifications;
export const selectShowModalEditLanguages = (state) => state.portfolio.portfolioState.showModalEditLanguages;
export const selectShowModalEditSkills = (state) => state.portfolio.portfolioState.showModalEditSkills;
export const selectEditForm = (state) => state.portfolio.portfolioState.editForm;
export const selectEditObjectId = (state) => state.portfolio.portfolioState.editObjectId;
export const selectShowNotificationDeleteSuccess = (state) => state.portfolio.portfolioState.showNotificationDeleteSuccess;
export const selectShowNotificationDeleteError = (state) => state.portfolio.portfolioState.showNotificationDeleteError;
export const selectShowNotificationUpdateSuccess = (state) => state.portfolio.portfolioState.showNotificationUpdateSuccess;
export const selectShowNotificationUpdateError = (state) => state.portfolio.portfolioState.showNotificationUpdateError;
export const selectShowNotificationUpdatePortfolioSuccess = (state) => state.portfolio.portfolioState.showNotificationUpdatePortfolioSuccess;
export const selectShowNotificationUpdatePortfolioError = (state) => state.portfolio.portfolioState.showNotificationUpdatePortfolioError;
export const selectShowNotificationCreateSuccess = (state) => state.portfolio.portfolioState.showNotificationCreateSuccess;
export const selectShowNotificationCreateError = (state) => state.portfolio.portfolioState.showNotificationCreateError;

export const {setAbout, setImage, setExperiences, setSingleExperience, 
            setEducation, setSingleEducation, setCertifications, setLanguages, setSkills, 
            setShowModalExperience, setShowModalEducation, setShowModalCertification,
            setSingleCertification, setSingleLanguage, setSingleAbout, setShowModalLanguage, setShowModalAbout,
            setShowModalSkills, setSingleSkills, setStudentId, setImageChanged,
            setPortfolioStudent, setIsEditing, setEditObject, setShowModalEditExperience,
            setShowModalEditEducation, setShowModalEditCertifications, setShowModalEditLanguages, 
            setShowModalEditSkills, setEditForm, setEditObjectId, setUpdateExperience,
            setUpdateEducation, setUpdateCertification, setUpdateLanguage, setUpdateSkills, 
            deleteSkill, deleteExperience, deleteCertification, deleteEducation, deleteLanguages,
            setShowModalAboutEdit, setUpdateAbout, setNotificationDeleteSuccess, setNotificationDeleteError,
            setShowNotificationUpdateSuccess, setShowNotificationUpdateError, setShowNotificationUpdatePortfolioError,
            setShowNotificationUpdatePortfolioSuccess, setShowNotificationCreateSuccess, setShowNotificationCreateError
        } = portfolioSlice.actions;

export default portfolioSlice.reducer;