import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { ReactNotifications, Store } from 'react-notifications-component';
import { get_user_basic_info } from '../../../utils/user-axios';
import { getPortfolioStudent, registerPortfolioStudent, updatePortfolioStudent } from '../../../utils/scraping-axios';

const ScrapingForm = () => {
    const [name, setName ] = useState("")
    const [lastname, setLastname] = useState("")
    const [idCard, setIdCard] = useState("") 
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")
    const [gitlab, setGitlab] = useState("")
    const [issueDate, setIssueDate] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [isFilled, setIsFilled] = useState(false)
    const [infoLoaded, setInfoLoaded] = useState(false)
    const [infoSaved, setInfoSaved] = useState(false)
    const [infoUpdated, setInfoUpdated] = useState(false)
    const [enableButton, setEnableButton] = useState(false)
    /**
     * Default options for warning, success and error messages
     */
    const defaultOptions = {
        container: 'bottom-left',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 3000
        },
    }
    const formik = useFormik({
        initialValues: {
            firstName: name || '',
            lastName: lastname || '',
            phone_number: phoneNumber || '',
            idCard: idCard || '',
            issueDate: issueDate || '',
            github_profile: github || '',
            gitlab_profile: gitlab || '',
            linkedin_profile: linkedin || '',
            isFilled: isFilled || false,
        },
        onSubmit: async (values) => {
            if(formik.isValid) {
                setInfoSaved(true)
                const response = await registerPortfolioStudent(values)
                if(response?.status === 201) {
                    setInfoSaved(false)
                    Store.addNotification({
                        title: "Register Success",
                        message: "Información guardada",
                        type: "success",
                        ...defaultOptions
                    });
                    setEnableButton(true)
                }
                else {
                    setInfoSaved(false)
                    Store.addNotification({
                        title: "Error",
                        message: "Error guardando la información",
                        type: "danger",
                        ...defaultOptions
                    });
                }
            }
        },
        validationSchema: Yup.object({
          firstName: Yup.string()
            .required('Campo obligatorio'),
          lastName: Yup.string()
            .required('Campo obligatorio'),
          idCard: Yup.string()
            .required('Campo obligatorio'),
          issueDate: Yup.date()
           .required('Campo obligatorio'),
          phone_number: Yup.number(),
          github_profile: Yup.string().optional(),
          gitlab_profile: Yup.string().optional(),
          linkedin_profile: Yup.string().optional(),
        }),
        enableReinitialize: true,
    })

    useEffect(() => {
        const fetchUserBasicInfo = async () => {
          try {
            const portfolioStudent = await getPortfolioStudent();

            if (portfolioStudent !== "unregistered") {
                setName(portfolioStudent['first_name']);
                setLastname(portfolioStudent['last_name']);  
                setIdCard(portfolioStudent['idCard'])
                setIssueDate(new Date(portfolioStudent['issueDate']))
                setPhoneNumber(portfolioStudent['phone_number'])
                setGithub(portfolioStudent['github_profile'])
                setGitlab(portfolioStudent['gitlab_profile'])
                setLinkedin(portfolioStudent['linkedin_profile'])
                setIsFilled(portfolioStudent['isFilled'])
                setEnableButton(true)
            }
            else{
                const basicInfo = await get_user_basic_info();

                setName(basicInfo['user_name']);
                setLastname(basicInfo['user_last_name']);  
            }

            setInfoLoaded(true) 
          } catch (error) {
            Store.addNotification({
                title: "Error",
                message: "Error obteniendo la información",
                type: "danger",
                ...defaultOptions
            });            
            setInfoLoaded(true)
          }
        };      
        fetchUserBasicInfo();
        // eslint-disable-next-line
      }, [ ]);
    
    const handleUpdateUser = async (event) => {
        event.preventDefault();
        if(formik.isValid){
            setInfoUpdated(true)
            const response = await updatePortfolioStudent(formik.values, false)
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
    
    return (
        <div>
            {
                infoLoaded ? (
                    <div className="panel panel-inverse" data-sortable-id="form-stuff-1" style={{"maxWidth": "900px", "justifyContent": "center", "margin": "auto"}}>
                    <div className="panel-heading bg-gray-700" style={{"display": "block"}}>
                        <h4 className="panel-title" style={{"fontSize": "14px"}}>Formulario de perfil</h4>
                    </div>
                    <div className="panel-body">
                        <p>Si nos proporciona enlaces a su perfil en GitHub, GitLab o LinkedIn, podremos completar automáticamente su portafolio mediante el uso de Web scraping</p>
                        <form id="scraping-form" autoComplete="off">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Nombre <span className="text-danger">*</span></label>
                                    <input 
                                        name="firstName"
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Primer nombre"
                                        value={formik.values.firstName} 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={name?.length !== 0 ? true : false}
                                    />
                                    {formik.errors.name && formik.touched.name ? 
                                        <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.name }</div> : null}
                                </div>
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Apellidos <span className="text-danger">*</span></label>
                                    <input
                                        name='lastName'
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Apellidos"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={name?.length !== 0 ?  true: false}
                                    />
                                    {formik.errors.lastName && formik.touched.lastName ? 
                                        <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.lastName }</div> : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label col-form-label">Cédula <span className="text-danger">*</span></label>
                                    <input 
                                        name="idCard"
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Cedula"
                                        value={formik.values.idCard} 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.idCard && formik.touched.idCard ? 
                                        <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.idCard }</div> : null}
                                </div>
                                <div className="col">
                                    <label className="form-label col-form-label">Fecha de expedición <span className="text-danger">*</span></label>
                                    <DatePicker 
                                        selected={formik.values.issueDate}
                                        onChange={(date) => formik.setFieldValue('issueDate', date)}
                                        onBlur={formik.handleBlur}
                                        dateFormat={"MM/dd/yyyy"}
                                        className="form-control"
                                        placeholderText="Selecciona una fecha"
                                    />
                                    {formik.errors.issueDate && formik.touched.issueDate ? 
                                        <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.issueDate }</div> : null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Github</label>
                                    <input 
                                        id='github_profile'
                                        name='github_profile'
                                        type="text" 
                                        className="form-control" 
                                        placeholder="https://github.com/User"
                                        value={formik.values.github_profile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Gitlab</label>
                                    <input
                                        id='gitlab_profile'
                                        name='gitlab_profile'
                                        type="text" 
                                        className="form-control" 
                                        placeholder="https://gitlab.com/User"
                                        value={formik.values.gitlab_profile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Linkedin</label>
                                    <input
                                        id='linkedin_profile'
                                        name='linkedin_profile' 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="https://www.linkedin.com/User/"
                                        value={formik.values.linkedin_profile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Teléfono</label>
                                    <input
                                        name='phone_number' 
                                        type="number" 
                                        className="form-control" 
                                        
                                        value={formik.values.phone_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                           
                            <div style={{"marginTop": "2rem", "display": "flex", "justifyContent": "space-between"}}>
                                <div className='d-flex'>
                                    {
                                        isFilled ? (
                                        <button 
                                            onClick={(event) => handleUpdateUser(event)}
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
                                            disabled={isFilled ? true : false}
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
                                <Link to="/user/student/portfolio">                                
                                    <button 
                                        type='submit' 
                                        data-testid='continue-button'
                                        className="btn btn-gray w-120px me-5px" 
                                        disabled= {enableButton ? false: true}
                                        >
                                            Continuar
                                    </button>
                                </Link>
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
        </div>
    )
}
export default ScrapingForm;