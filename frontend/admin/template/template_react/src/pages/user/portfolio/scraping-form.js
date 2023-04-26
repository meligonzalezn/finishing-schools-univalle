import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import ProfileImage from '../../../assets/img/profile/user-image-default.png'
import { ReactNotifications, Store } from 'react-notifications-component';
import { get_user_basic_info } from '../../../utils/user-axios';
import { getPortfolioStudent, registerPortfolioStudent, updatePortfolioStudent } from '../../../utils/scraping-axios';

const ScrapingForm = () => {
    const [name, setName ] = useState("")
    const [lastname, setLastname] = useState("")
    const [idCard, setIdCard] = useState("") 
    const [image, setImage] = useState("") 
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")
    const [gitlab, setGitlab] = useState("")
    const [issueDate, setIssueDate] = useState("")
    const [isFilled, setIsField] = useState(false)
    const [infoLoaded, setInfoLoaded] = useState(false)
    const [infoSaved, setInfoSaved] = useState(false)
    const [infoUpdated, setInfoUpdated] = useState(false)
    const [imageChanged, setImageChanged] = useState(false)
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
            idCard: idCard || '',
            issueDate: issueDate || '',
            image: image || '',
            github: github || '',
            gitlab: gitlab || '',
            linkedin: linkedin || '',
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
          image: Yup.mixed().optional(),
          github: Yup.string().optional(),
          gitlab: Yup.string().optional(),
          linkedin: Yup.string().optional(),
        }),
        enableReinitialize: true,
    })

    useEffect(() => {
        const fetchUserBasicInfo = async () => {
          try {
            const basicInfo = await get_user_basic_info();
            const portfolioStudent = await getPortfolioStudent();
            if (basicInfo) {
              setName(basicInfo['user_name']);
              setLastname(basicInfo['user_last_name']);  
            }
            if (portfolioStudent) {
                setIdCard(portfolioStudent['idCard'])
                setIssueDate(new Date(portfolioStudent['issueDate']))
                setImage(portfolioStudent['image_profile'])
                setGithub(portfolioStudent['github_profile'])
                setGitlab(portfolioStudent['gitlab_profile'])
                setLinkedin(portfolioStudent['linkedin_profile'])
                setIsField(portfolioStudent['isFilled'])
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
      }, [name, lastname, isFilled]);
    
    const handleUpdateUser = async (event) => {
        event.preventDefault();
        if(formik.isValid){
            setInfoUpdated(true)
            const response = await updatePortfolioStudent(formik.values, imageChanged)
            if (response?.status === 200) {
                setInfoUpdated(false)
                Store.addNotification({
                    title: "Register Success",
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
                        <p>Si proporciona los enlaces a su perfil en GitHub, GitLab o LinkedIn, podremos llenar su portafolio automáticamente mediante el uso de scraping</p>
                        <form autoComplete="off">
                            <div className='col' style={{"display": "flex", "gap": "2rem"}}>
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
                                        El tamaño máximo de archivo permitido es de 200 KB
                                    </p>
                                </div>
                            </div>
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
                                        name='github'
                                        type="text" 
                                        className="form-control" 
                                        placeholder="https://github.com/User"
                                        value={formik.values.github}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Gitlab</label>
                                    <input
                                        name='gitlab'
                                        type="text" 
                                        className="form-control" 
                                        placeholder="https://gitlab.com/User"
                                        value={formik.values.gitlab}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label col-form-label col-md-3">Linkedin</label>
                                    <input
                                        name='linkedin' 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="https://www.linkedin.com/User/"
                                        value={formik.values.linkedin}
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
                                    {/* <button 
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
                                    </button> */}

                                </div>
                                <Link to="/user/student/portfolio">                                
                                    <button 
                                        type='submit' 
                                        className="btn btn-gray w-120px me-5px" >
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