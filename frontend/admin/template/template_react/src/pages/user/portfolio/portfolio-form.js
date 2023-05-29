import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import CardPortfolio from "../../../components/cards/card";
import ProfileImage from "../../../assets/img/profile/user-image-default.png"
import { getPortfolioStudent, getScrapingInfo, updatePortfolioStudent } from "../../../utils/scraping-axios";
import { ReactNotifications, Store } from 'react-notifications-component';
import { registerPortfolioStudentInformation, getPortfolioStudentInformation,
        registerExperience,
        registerEducation,
        registerCertificationsLicenses,
        registerLanguages,
        registerSkills,
        deleteSkillsBack} from "../../../utils/portfolio-axios";
import { selectAbout, setAbout, selectImage, setImage, selectExperience, 
    setExperiences,setSingleExperience, selectEducation, setEducation, selectCertifications, 
    setCertifications, selectLanguages, setLanguages, selectSkills, setSkills, 
    selectShowModalExperience, setShowModalExperience, setShowModalEducation, selectShowModalEducation,
    setSingleEducation, setShowModalCertification, setSingleCertification, selectShowModalCertification,
    setSingleLanguage, selectShowModalLanguages, setShowModalLanguage, selectShowlModalAbout,
    setShowModalAbout, setSingleAbout, setShowModalSkills, selectShowModalSkills,
    setSingleSkills, setStudentId, selectImageChanged, setImageChanged, setPortfolioStudent, selectPortfolioStudent, setIsEditing,
    setShowModalEditExperience, 
    setShowModalEditEducation,
    setShowModalEditCertifications,
    setShowModalEditSkills,
    setShowModalEditLanguages, setEditForm, selectShowModalAboutEdit, setShowModalAboutEdit, setEditObject, setUpdateAbout, deleteSkill, selectShowNotificationUpdatePortfolioError, selectShowNotificationUpdatePortfolioSuccess, selectShowNotificationCreateSuccess, selectShowNotificationCreateError} from "../../../reducers/portfolioSlice";
import ModalAdd from "../../../components/modal/modalAdd";
import {descriptionField, experienceFields, studiesFields, certificationsLicensesFields, skillsFields, languagesFields } from "./fields";
import { useNavigate } from "react-router-dom";

const PortfolioForm = () => {
    const dispatch = useDispatch();
    const portfolioStudent = useSelector(selectPortfolioStudent);
    const image = useSelector(selectImage);
    const imageChanged = useSelector(selectImageChanged)
    const about = useSelector(selectAbout);
    const experience = useSelector(selectExperience);
    const education = useSelector(selectEducation);
    const certifications = useSelector(selectCertifications);
    const languages = useSelector(selectLanguages);
    const skills = useSelector(selectSkills);
    const [infoLoaded, setInfoLoaded] = useState(false)
    const [updateDescriptionImage, setUpdateDescriptionImage] = useState(false)
    const [infoSaved, setInfoSaved] = useState(false)
    const [isScrape, setIsScrape] = useState(false)
    const [scraping, setScraping] = useState(false);
    const modalExperience = useSelector(selectShowModalExperience);
    const modalEducation = useSelector(selectShowModalEducation);
    const modalCertification = useSelector(selectShowModalCertification); 
    const modalLanguage = useSelector(selectShowModalLanguages);
    const modalAbout = useSelector(selectShowlModalAbout);
    const modalAboutEdit = useSelector(selectShowModalAboutEdit)
    const modalSkills = useSelector(selectShowModalSkills);
    const modalNotificationPortfolioSuccess = useSelector(selectShowNotificationUpdatePortfolioSuccess)
    const modalNotificationPortfolioError = useSelector(selectShowNotificationUpdatePortfolioError)
    const modalNotificationCreateSuccess = useSelector(selectShowNotificationCreateSuccess)
    const modalNotificationCreateError = useSelector(selectShowNotificationCreateError)
    const navigate = useNavigate();


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
        onSubmit: {},
        validationSchema: Yup.object({
          image: Yup.mixed().optional(),
          about: Yup.string().required('Campo obligatorio'),
          experience: Yup.array().of(Yup.object()).optional(),
          education: Yup.array().of(Yup.object()).optional(),
          certifications: Yup.array().of(Yup.object()).optional(),
          skills: Yup.array().of(Yup.string()).optional(),
          languages: Yup.array().of(Yup.object()).optional(),
        }),
        enableReinitialize: true,
      });
      

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const student = await getPortfolioStudent();
            dispatch(setPortfolioStudent(student));
            dispatch(setImage(student.image_profile));
            dispatch(setStudentId(student.sub_key));
            if (student.scrapeInfoSaved) {
              dispatch(setAbout(student.description));
              setIsScrape(student.scrapeInfoSaved);
              const portfolioInformation = await getPortfolioStudentInformation(student.sub_key);
              if (portfolioInformation) {
                dispatch(setExperiences(portfolioInformation.experience.data));
                dispatch(setEducation(portfolioInformation.education.data));
                dispatch(setCertifications(portfolioInformation.certifications.data));
                dispatch(setLanguages(portfolioInformation.languages.data));
                const uniqueList = portfolioInformation.skills.data.filter(
                    (skill, index, self) => index === self.findIndex((s) => s.name === skill.name)
                );
                dispatch(setSkills(uniqueList))                  
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
                    dispatch(setExperiences(data.experience.reverse()));
                    dispatch(setEducation(data.education.reverse()));
                    dispatch(setCertifications(data.certifications.reverse()));
                    dispatch(setLanguages(data.languages.reverse()));
              }
              if (scrapedInfo.githubInfo !== "") {
                const newSkills = [...new Set([...scrapedInfo.githubInfo])];
                const formattedSkills = newSkills.map((skill, index) => ({ id: index, name: skill }));
                dispatch(setSkills([...skills, ...formattedSkills]));
              }
              
              if (scrapedInfo.gitlabInfo !== "") {
                const newSkills = [...new Set([...scrapedInfo.gitlabInfo])];
                const formattedSkills = newSkills.map((skill, index) => ({ id: index, name: skill }));
                dispatch(setSkills([...skills, ...formattedSkills]));
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

    const handleSubmitPortfolio = async (event) => {
        event.preventDefault();
        if (formik.isValid) {
            if (formik.values.image !== '' || formik.values.about !== '') {
              const newValuesPortfolioStudent = {
                ...portfolioStudent,
                image_profile: formik.values.image,
                description: formik.values.about,
                scrapeInfoSaved: true
              };
              dispatch(setPortfolioStudent(newValuesPortfolioStudent));
              setUpdateDescriptionImage(true);
            }
            setInfoSaved(true);
            const response = await registerPortfolioStudentInformation(
              formik.values,
              portfolioStudent.sub_key
            );
            if (response.status === 200) {
              setInfoSaved(false);
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
              setInfoSaved(false);
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
    }

    const handleUpdatePortfolio = async (event) => {
        event.preventDefault();
            if(formik.values.image !== '' || formik.values.about !== '') {
                const newValuesPortfolio = {...portfolioStudent, image_profile: formik.values.image, description: formik.values.about}
                dispatch(setPortfolioStudent(newValuesPortfolio));
                setUpdateDescriptionImage(true)
            }
            const response = await updatePortfolioStudent(formik.values, imageChanged)
            if (response?.status === 200) {
                Store.addNotification({
                    title: "Actualización exitosa",
                    message: "Información actualizada",
                    type: "success",
                    ...defaultOptions
                });
            }
            else {
                Store.addNotification({
                    title: "Error",
                    message: "Error actualizando la información",
                    type: "danger",
                    ...defaultOptions
            });
        }
    } 

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
                                            onChange={async (event) => {
                                                formik.setFieldValue('image', event.target.files[0]);
                                                dispatch(setImageChanged(true));
                                                handleUpdatePortfolio(event)
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
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            {
                                                about !== "" ? 
                                                <button className="border-0 bg-white" onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(setShowModalAboutEdit(true));
                                                    dispatch(setEditForm(true));
                                                    dispatch(setEditObject({description: formik.values.about}))
                                                }}>
                                                    <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                                </button> : 
                                                <button className="border-0 bg-white" 
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        dispatch(setShowModalAbout(true));
                                                    }}>
                                                    <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                                </button>
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className="card" style={ isScrape ? {"marginBottom": "1rem"} : {"marginBottom": "2rem", "border": 0}}>
                                        <div className="card-body">
                                            {formik.values.about}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"
                                        style={isScrape ? { paddingBottom: "0rem" } : { paddingBottom: "1.5rem" }}
                                    >                            
                                        <h5 className="mb-4">Experiencia Laboral</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            <button className="border-0 bg-white" onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(setShowModalExperience(true));
                                                    dispatch(setShowModalEditExperience(false));
                                                    dispatch(setEditForm(false))
                                                }}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                            </button>
                                            {
                                                experience?.length !== 0 ? 
                                                <button type="button" className="border-0 bg-white" onClick={(event) => {
                                                    dispatch(setIsEditing("experience"))
                                                    dispatch(setEditForm(true))
                                                    navigate("/user/student/portfolio/edit")
                                                }}>
                                                    <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                                </button> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <CardPortfolio
                                    list={formik.values.experience}
                                    titleKey="company_name"
                                    timeKey="experience_time"
                                    firstTimeKey="start_date"
                                    secondTimeKey="end_date"
                                    descriptionKey="description"
                                    workExperience={true}
                                    isEdit={false}
                                />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Educación</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            <button className="border-0 bg-white" onClick={(event) => {
                                                        event.preventDefault();
                                                        dispatch(setShowModalEducation(true));
                                                        dispatch(setShowModalEditEducation(false));
                                                        dispatch(setEditForm(false));
                                                    }}>
                                                    <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                            </button>
                                            {
                                                education?.length !== 0 ? 
                                                <button type="button" className="border-0 bg-white" onClick={(event) => {
                                                    dispatch(setIsEditing("education"))
                                                    dispatch(setEditForm(true))
                                                    navigate("/user/student/portfolio/edit")
                                                }}>
                                                    <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                                </button> : null
                                            }
                                        </div>
                                    </div>
                                    <CardPortfolio
                                        list={formik.values.education}
                                        titleKey="degree"
                                        firstTimeKey="start_date"
                                        secondTimeKey="end_date"
                                        subtitleKey="school"
                                        descriptionKey="description"
                                        iconClass="mortarboard"
                                        workExperience={false}
                                        isEdit={false}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Licencias & Certicaciones</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            <button className="border-0 bg-white" onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(setShowModalCertification(true));
                                                    dispatch(setShowModalEditCertifications(false));
                                                    dispatch(setEditForm(false));
                                                }}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                            </button>
                                            {
                                                certifications?.length !== 0 ? 
                                                <button type="button" className="border-0 bg-white" onClick={(event) => {
                                                    dispatch(setIsEditing("certifications"))
                                                    dispatch(setEditForm(true))
                                                    navigate("/user/student/portfolio/edit")
                                                }}>
                                                    <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                                </button> : null
                                            }
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
                                        isEdit={false}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Competencias</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                            <button className="border-0 bg-white"  onClick={(event) => {
                                                        event.preventDefault();
                                                        dispatch(setShowModalSkills(true));
                                                        dispatch(setShowModalEditSkills(false));
                                                        dispatch(setEditForm(false));
                                                }}>
                                                <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                            </button>                                                
                                        </div>
                                    </div>
                                </div>
                                {<CardPortfolio
                                    list={formik.values.skills}
                                    workExperience={false}
                                    isEdit={true}
                                    skills={true}
                                    deleteAction={deleteSkill}
                                    deleteFunction={deleteSkillsBack}
                                />
                                } 
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center"> 
                                        <h5>Idiomas</h5>
                                        <div className="d-flex" style={{"gap": "0.5rem"}}>
                                                <button className="border-0 bg-white" onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(setShowModalLanguage(true));
                                                            dispatch(setShowModalEditLanguages(false));
                                                            dispatch(setEditForm(false));
                                                        }}>
                                                        <i className="bi bi-plus-lg" style={{"fontSize": "1.2rem"}}></i>
                                                </button>
                                                {
                                                languages?.length !== 0 ? 
                                                <button type="button" className="border-0 bg-white" onClick={(event) => {
                                                    dispatch(setIsEditing("languages"))
                                                    dispatch(setEditForm(true))
                                                    navigate("/user/student/portfolio/edit")
                                                }}>
                                                    <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i>
                                                </button> : null
                                                }
                                        </div>
                                    </div>
                                    <CardPortfolio
                                        list={formik.values.languages}
                                        titleKey="language"
                                        subtitleKey="proficiency"
                                        iconClass="translate"
                                        workExperience={false}
                                        isEdit={false}
                                    />
                                </div>
                            </div>
                            <div style={{"marginTop": "2rem"}}>
                                {
                                    isScrape ? 
                                    null : 
                                        (
                                        <div className="row m-4">
                                            <p className="p-0">Recuerde guardar la información si la has obtenido mediante Web Scraping o si estás registrando tu portafolio por primera vez.</p>
                                            <button 
                                                type='submit' 
                                                onClick={(event) => {handleSubmitPortfolio(event)}}
                                                className="btn btn-success w-100px me-5px d-flex justify-content-center align-items-center" style={{"gap": "0.5rem"}}>
                                                    Guardar
                                                {
                                                    infoSaved ? (
                                                    <div className="spinner-border" role="status" style={{"width": "1rem", "height": "1rem"}}>
                                                        <span className="sr-only">Loading...</span>
                                                    </div> 
                                                    ) : null
                                                }
                                            </button>
                                        </div>
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
            modalAbout ? (
                <ModalAdd 
                    title={"Añadir descripción"} 
                    description={"Por favor, completa el siguiente campo para añadir una descripción sobre su perfil profesional:"} 
                    fields={descriptionField} 
                    action={setSingleAbout}
                    showModalAction={setShowModalAbout}
                    onUpdate={updatePortfolioStudent}
                    isAbout={true}
                />
            ): null
        }
        {
            modalAboutEdit ? (
                <ModalAdd 
                    title={"Editar descripción"} 
                    description={"Puedes escribir sobre tus años de experiencia, tu sector o tus habilidades. La gente también habla de sus logros o experiencias laborales anteriores"} 
                    fields={descriptionField} 
                    action={setUpdateAbout}
                    showModalAction={setShowModalAboutEdit}
                    onUpdate={updatePortfolioStudent}
                    isAbout={true}
                />

            ): null
        }
        {
            modalExperience ? (
                <ModalAdd 
                    title={"Añadir experiencia"} 
                    description={"Por favor, completa los siguientes campos para añadir una nueva experiencia:"} 
                    fields={experienceFields} 
                    action={setSingleExperience}
                    showModalAction={setShowModalExperience}
                    onSubmit={registerExperience}
                    isAbout={false}
                />
            ): null
        }
        {
            modalEducation ? (
                <ModalAdd 
                    title={"Añadir educación"} 
                    description={"Por favor, completa los siguientes campos para registrar su información académica:"} 
                    fields={studiesFields} 
                    action={setSingleEducation}
                    showModalAction={setShowModalEducation}
                    onSubmit={registerEducation}
                    isAbout={false}
                />
            ) : null
        }
        {
            modalCertification ? (
                <ModalAdd 
                    title={"Añadir certificación o licencia"} 
                    description={"Por favor, completa los siguientes campos para registrar sus certificaciones o licencias:"} 
                    fields={certificationsLicensesFields} 
                    action={setSingleCertification}
                    showModalAction={setShowModalCertification}
                    onSubmit={registerCertificationsLicenses}
                    isAbout={false}
                />
            ) : null
        }
        {
            modalLanguage ? (
                <ModalAdd 
                    title={"Añadir idioma"} 
                    description={"Por favor, completa los siguientes campos para registrar su conocimiento en diferentes idiomas:"} 
                    fields={languagesFields} 
                    action={setSingleLanguage}
                    showModalAction={setShowModalLanguage}
                    onSubmit={registerLanguages}
                    isAbout={false}
                />
            ) : null
        }
        {
            modalSkills ? (
                <ModalAdd 
                    title={"Añadir competencias"} 
                    description={"Por favor complete los siguientes campos para registrar sus competencias. Recuerde evitar agregar competencias duplicadas."} 
                    fields={skillsFields} 
                    action={setSingleSkills}
                    showModalAction={setShowModalSkills}
                    onSubmit={registerSkills}
                    isAbout={false}
                />
            ): null
        }
        {
            modalNotificationPortfolioSuccess ?
            <ReactNotifications /> : null
        }
        {
            modalNotificationPortfolioError ? 
            <ReactNotifications /> : null
        }
                {
            modalNotificationCreateSuccess ?
            <ReactNotifications /> : null
        }
        {
            modalNotificationCreateError ? 
            <ReactNotifications /> : null
        }
        </div>
    )
}

export default PortfolioForm;