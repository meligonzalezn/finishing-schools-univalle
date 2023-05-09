import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import CardPortfolio from "../../../components/cards/card";
import ProfileImage from "../../../assets/img/profile/user-image-default.png"
import { getPortfolioStudent, getScrapingInfo, updatePortfolioStudent } from "../../../utils/scraping-axios";
import { ReactNotifications, Store } from 'react-notifications-component';
import { registerPortfolioStudentInformation, getPortfolioStudentInformation, updatePortfolioStudentInformation } from "../../../utils/portfolio-axios";
import { selectAbout, setAbout, selectImage, setImage, selectExperience, 
    setExperiences,setSingleExperience, selectEducation, setEducation, selectCertifications, 
    setCertifications, selectLanguages, setLanguages, selectSkills, setSkills, 
    selectShowModalExperience, setShowModalExperience} from "../../../reducers/portfolioSlice";
import ModalAdd from "../../../components/modal/modalAdd";
import { experienceFields } from "./fields";
const PortfolioForm = () => {
    const dispatch = useDispatch();
    const [portfolioStudent, setPortfolioStudent] = useState({}) 
    const image = useSelector(selectImage);
    const [imageChanged, setImageChanged] = useState(false)
    const about = useSelector(selectAbout);
    const experience = useSelector(selectExperience);
    const education = useSelector(selectEducation);
    const certifications = useSelector(selectCertifications);
    const languages = useSelector(selectLanguages);
    const skills = useSelector(selectSkills);
    const [infoLoaded, setInfoLoaded] = useState(false)
    const [updateDescriptionImage, setUpdateDescriptionImage] = useState(false)
    const [infoSaved, setInfoSaved] = useState(false)
    const [infoUpdated, setInfoUpdated] = useState(false)
    const [isScrape, setIsScrape] = useState(false)
    const [scraping, setScraping] = useState(false);
    const modalExperience = useSelector(selectShowModalExperience);

    /**
     * Default options for warning, success and error messages
     */
    const defaultOptions = {
        container: 'bottom-left',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
    }

    const formik = useFormik({
        initialValues: {
            image: image || '',
            about: about || '',
            experience: experience || [],
            education: education || [],
            certifications: certifications || [],
            skills: skills || [],
            languages: languages || []
        },
        onSubmit: async (values) => {
            if(formik.isValid){
                if(formik.values.image !== '' || formik.values.about !== '') {
                    setPortfolioStudent(prevState => ({...prevState, image_profile: formik.values.image, description: formik.values.about, scrapeInfoSaved: true}));
                    setUpdateDescriptionImage(true)
                }
                setInfoSaved(true)
                const response = await registerPortfolioStudentInformation(values, portfolioStudent.sub_key)
                if(response.status === 200 ){
                    setInfoSaved(false)
                    Store.addNotification({
                        title: "Register Success",
                        message: "Información registrada",
                        type: "success",
                        dismiss: {
                            duration: 3000,
                        },
                        ...defaultOptions
                    });
                } else {
                    setInfoSaved(false)
                    Store.addNotification({
                        title: "Error",
                        message: "Error registrando la información",
                        type: "danger",
                        dismiss: {
                            duration: 3000,
                        },
                        ...defaultOptions
                    });
                }
            }
        },
        validationSchema: Yup.object({
          image: Yup.mixed().optional(),
          about: Yup.string()
            .required('Campo obligatorio'),
          experience: Yup.array().of(Yup.object()).optional(),
          education: Yup.array().of(Yup.object()).optional(),
          certifications: Yup.array().of(Yup.object()).optional(),
          skills: Yup.array().of(Yup.string()).optional(),
          languages: Yup.array().of(Yup.object()).optional(),
        }),
        enableReinitialize: true,
    })

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const student = await getPortfolioStudent();
            setPortfolioStudent(student);
            dispatch(setImage(student.image_profile));
            if (student.scrapeInfoSaved) {
              dispatch(setAbout(student.description));
              setIsScrape(student.scrapeInfoSaved);
              const portfolioInformation = await getPortfolioStudentInformation(student.sub_key);
              if (portfolioInformation) {
                dispatch(setExperiences(portfolioInformation.experience.data));
                dispatch(setEducation(portfolioInformation.education.data));
                dispatch(setCertifications(portfolioInformation.certifications.data));
                dispatch(setLanguages(portfolioInformation.languages.data));                  
                dispatch(setSkills(portfolioInformation.skills));
              }
            } else {
              setScraping(true); 
              let scrapingInfo = []
              if (student?.linkedin_profile !== '') {
                const url = student.linkedin_profile
                scrapingInfo.push({platform: 'linkedin', url: url})
              }
              if (student?.github_profile !== '') {
                const url =  student.github_profile
                scrapingInfo.push({platform:  'github', url: url})
              }
              if (student?.gitlab_profile !== '') {
                const url =  student.gitlab_profile
                scrapingInfo.push({platform:  'gitlab', url: url})
              }

              const resScrapedInfo = await getScrapingInfo({"scraping-data":scrapingInfo});
              const scrapedInfo = resScrapedInfo.data
              if(scrapedInfo.linkedinInfo !== ""){
                    const data = scrapedInfo.linkedinInfo[0];
                    dispatch(setAbout(data.about));
                    dispatch(setExperiences(data.experience));
                    dispatch(setEducation(data.education));
                    dispatch(setCertifications(data.certifications));
                    dispatch(setLanguages(data.languages));
              }
              if(scrapedInfo.githubInfo !== ""){
                dispatch(setSkills(prevSkills => [...new Set([...prevSkills, ...scrapedInfo.githubInfo])]));
              }
              if(scrapedInfo.gitlabInfo !== ""){
                dispatch(setSkills(prevSkills => [...new Set([...prevSkills, ...scrapedInfo.gitlabInfo])]));
              }
             
            }
            setInfoLoaded(true);
          } catch (error) {
            Store.addNotification({
              title: 'Error',
              message: 'Error obteniendo la información',
              type: 'danger',
              dismiss: {
                duration: 3000,
              },
              ...defaultOptions,
            });
            setInfoLoaded(true);
          }
        };
      
        if (!infoLoaded) {
          fetchUserInfo();
        }
        // eslint-disable-next-line
      }, []);
      
      useEffect(() => {
        if (!infoLoaded && scraping) {
          Store.addNotification({
            title: 'Info',
            message:
              'Tenga en cuenta que Web Scraping es un proceso automatizado y puede tomar algún tiempo en completarse. Gracias por su paciencia.',
            type: 'info',
            dismiss: {
              duration: 8000,
            },
            ...defaultOptions,
            });
        }
        // eslint-disable-next-line
        }, [infoLoaded, scraping]);
    
    useEffect(() => {
        const updateDescriptionImageField = async () => {
          const response = await updatePortfolioStudent(portfolioStudent, imageChanged);
          return response
        }; 
        if(updateDescriptionImage){
            updateDescriptionImageField();
        }
        // eslint-disable-next-line
      }, [portfolioStudent, imageChanged, updateDescriptionImage]);

    const handleUpdatePortfolio = async (event) => {
        event.preventDefault();
        if(formik.isValid){
            if(formik.values.image !== '' || formik.values.about !== '') {
                setPortfolioStudent(prevState => ({...prevState, image_profile: formik.values.image, description: formik.values.about}));
                setUpdateDescriptionImage(true)
            }
            setInfoUpdated(true)
            const response = await updatePortfolioStudentInformation(formik.values, portfolioStudent.sub_key)
            if (response?.status === 200) {
                setInfoUpdated(false)
                Store.addNotification({
                    title: "Actualización exitosa",
                    message: "Información actualizada",
                    type: "success",
                    ...defaultOptions
                });
            }
            else {
                setInfoUpdated(false)
                Store.addNotification({
                    title: "Error",
                    message: "Error actualizando la información",
                    type: "danger",
                    ...defaultOptions
                });
            }
        }
    } 

    console.log(experience)
    return (
        <div>
            {
                infoLoaded ? (
                <div className="panel panel-inverse" data-sortable-id="form-stuff-1" style={{"maxWidth": "900px", "justifyContent": "center", "margin": "auto"}}>
                    <div className="panel-heading bg-gray-700" style={{"display": "block"}}>
                        <h4 className="panel-title" style={{"fontSize": "14px"}}>Portafolio</h4>
                    </div>
                    <div className="panel-body">
                        <p>Por favor, proporcione la siguiente información para ayudarnos a comprender mejor su experiencia y habilidades profesionales. Esta información nos permitirá brindarle una mejor experiencia y hacer coincidir oportunidades de trabajo relevantes con su perfil. Toda la información proporcionada será tratada con confidencialidad y solo se utilizará con fines relacionados con nuestros servicios.</p>
                        <form autoComplete="off">
                            <div className='col' style={{"display": "flex", "gap": "2rem", "marginBottom": "1.5rem"}}>
                                    <img src={image ? "https://res.cloudinary.com/dlhcdji3v/"+image : ProfileImage} style={{"width": "10rem", "height": "10rem"}} alt="Perfil" className="rounded-circle img-fluid" />
                                    <div style={{"display": "flex", "gap": "0.5rem", "justifyContent": "center", "flexDirection": "column"}}>
                                        <label className="form-label">Carga una imagen de perfil</label>
                                        <input
                                            id="formFile" 
                                            name='image'
                                            className="form-control" 
                                            type="file" 
                                            onChange={(event) => {
                                                formik.setFieldValue('image', event.target.files[0]);
                                                setImageChanged(true);
                                            }}
                                            onBlur={formik.handleBlur}
                                            accept='.png, .jpg, jpeg'
                                        />
                                        <p>
                                            El tamaño máximo de archivo permitido es de 10MB
                                        </p>
                                    </div>
                                </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Sobre mí</h5>
                                        <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                    </div>
                                    <div className="card" style={{"marginBottom": "2rem"}}>
                                        <div className="card-body">
                                            {formik.values.about}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center">                            
                                        <h5>Experiencia Laboral</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            <button className="border-0 bg-white" onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(setShowModalExperience(true));
                                                }}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                            </button>
                                            <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                        </div>
                                    </div>
                                </div>
                                <CardPortfolio
                                    list={formik.values.experience}
                                    titleKey="company_name"
                                    firstTimeKey="experience_time"
                                    descriptionKey="description"
                                    workExperience={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Educación</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                            <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                        </div>
                                    </div>
                                    <CardPortfolio
                                        list={formik.values.education}
                                        titleKey="degree"
                                        firstTimeKey="start_date"
                                        secondTimeKey="end_date"
                                        subtitleKey="school"
                                        iconClass="mortarboard"
                                        workExperience={false}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Licencias & Certicaciones</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                                <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                        </div>
                                    </div>
                                    <CardPortfolio
                                        list={formik.values.certifications}
                                        titleKey="name"
                                        firstTimeKey="issue_date"
                                        secondTimeKey="expiration_date"
                                        subtitleKey="organization"
                                        iconClass="award"
                                        workExperience={false}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Competencias</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                                <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-2" style={{"display": "grid", "gridTemplateColumns": "repeat(4, 1fr)", "gap": "0.5rem", "padding": "1rem 1.5rem"}}>
                                    {
                                        formik.values.skills?.map((skill, key) =>
                                            <span key={key} className="badge bg-gray-500" style={{"fontSize": "12px"}}>{skill}</span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Idiomas</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                                <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                        </div>
                                    </div>
                                    <CardPortfolio
                                        list={formik.values.languages}
                                        titleKey="language"
                                        subtitleKey="proficiency"
                                        iconClass="translate"
                                        workExperience={false}
                                    />
                                </div>
                            </div>
                            <div style={{"marginTop": "2rem"}}>
                                {
                                    isScrape ? (
                                        <button 
                                            onClick={(event) => handleUpdatePortfolio(event)}
                                            className="btn btn-primary w-120px me-5px d-flex justify-content-center align-items-center" style={{"gap": "0.5rem"}}>
                                                Actualizar
                                            {
                                                infoUpdated ? (
                                                    <div className="spinner-border" role="status" style={{"width": "1rem", "height": "1rem"}}>
                                                        <span className="sr-only">Loading...</span>
                                                    </div> 
                                                )
                                                : null
                                            }
                                        </button>
                                        ) : 
                                        (
                                        <button 
                                            type='submit' 
                                            onClick={formik.handleSubmit}
                                            className="btn btn-success w-120px me-5px d-flex justify-content-center align-items-center" style={{"gap": "0.5rem"}}>
                                                Guardar
                                            {
                                                infoSaved ? (
                                                <div className="spinner-border" role="status" style={{"width": "1rem", "height": "1rem"}}>
                                                    <span className="sr-only">Loading...</span>
                                                </div> 
                                                ) : null
                                            }
                                        </button>
                                        )
                                    }
                            </div>
                        </form>
                    </div>
            </div>
            ) : (
                <div style={{transform: "translate(0, 1000%)"}} className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span> 
                    </div>
                </div>
            )
        }
        <ReactNotifications />
        {
            modalExperience ? (
                <ModalAdd 
                    title={"Añadir experiencia"} 
                    description={"Por favor, completa los siguientes campos para añadir una nueva experiencia:"} 
                    fields={experienceFields} 
                    action={setSingleExperience}
                    showModalAction={setShowModalExperience}
                    />
            ): null
        }
        </div>
    )
}

export default PortfolioForm;