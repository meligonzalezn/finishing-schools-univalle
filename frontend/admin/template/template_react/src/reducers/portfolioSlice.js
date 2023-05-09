import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    about: "",
    image: "",
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    skills: [],
    showModalExperience: false,
    showModalEducation: false,
}

const portfolioSlice = createSlice({
    name: 'portfolio', 
    initialState,
    reducers: {
        setAbout(state, action) {
            state.about = action.payload;
        }, 
        setImage(state, action){
            state.image = action.payload;
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
        setEducation(state, action) {
            state.education = action.payload;
        },
        setShowModalEducation(state, action){
            state.showModalEducation = action.payload;
        },
        setCertifications(state, action){
            state.certifications = action.payload;
        },
        setLanguages(state, action){
            state.languages = action.payload;
        },
        setSkills(state, action) {
            state.skills = action.payload;
        }
    }
})

// selectors
export const selectAbout = (state) => state.portfolio.about;
export const selectImage = (state) => state.portfolio.image;
export const selectExperience = (state) => state.portfolio.experience;
export const selectEducation = (state) => state.portfolio.education;
export const selectCertifications = (state) => state.portfolio.certifications;
export const selectLanguages = (state) => state.portfolio.languages;
export const selectSkills = (state) => state.portfolio.skills;
export const selectShowModalExperience = (state) => state.portfolio.showModalExperience;
export const selectShowModalEducation = (state) => state.portfolio.showModalEducation;

export const {setAbout, setImage, setExperiences, setSingleExperience, 
            setEducation, setCertifications, setLanguages, setSkills, 
            setShowModalExperience, setShowModalEducation} = portfolioSlice.actions;

export default portfolioSlice.reducer;