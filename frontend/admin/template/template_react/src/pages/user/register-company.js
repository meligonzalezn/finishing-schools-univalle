import React, { useState, useLayoutEffect, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';
import { registerCompany, checkEmail } from '../../utils/register-axios.js';
import { ReactNotifications, Store } from 'react-notifications-component';
import RegisterBg from '../../assets/img/register/register-bg.jpg'
import logoUnivalle from '../../assets/img/register/logo-univalle.png'
import LoadingOverlay from 'react-loading-overlay';
import 'react-notifications-component/dist/theme.css';

const RegisterCompany = () => {
    /* eslint-disable */
    const context = useContext(AppSettings);
    const [loading, setLoading] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
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
            companyName: '',
            email: '',
            password: '',
            passwordConfirmed: '',
            agreement: false,
        }, 
        onSubmit: async () => {
            try {
              if(!(formik.values.companyName === "" || formik.values.email === "" || 
                formik.values.password === "" || formik.values.passwordConfirmed === "" ||
                formik.values.agreement === false )){
                    if(formik.isValid){
                        setLoading(true)
                        const response = await registerCompany(formik.values)
                        if (response[0].status === 201) {                            
                            Store.addNotification({
                                title: "Register Success",
                                message: "Registro completado con éxito",
                                type: "success",
                                ...defaultOptions
                            });
                            formik.resetForm()
                        }
                        
                  }
                  setLoading(false)
                }
              else {
                Store.addNotification({
                    title: "Register Error",
                    message: "No se pudo completar el registro",
                    type: "danger",
                    ...defaultOptions
                });
                }
                setLoading(false)
              }
            catch(error){
                Store.addNotification({
                    title: "Register Error",
                    message: "Ocurrió un error con el registro",
                    type: "danger",
                    ...defaultOptions
                });
                setLoading(false)
            }
        },
        validationSchema: Yup.object().shape({
            companyName: Yup
                .string()
                .required('Nombre de la empresa requerido').max(2000),
            email: Yup
                .string()
                .matches(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})+$/,
                    "Correo inválido"
                )
                .required('Correo requerido'),
            password: Yup
                .string()
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula, 1 número y 1 carácter especial"
                )
                .required("Contraseña requerida"),
            passwordConfirmed: Yup.string()
                .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
                .required("Confirma la contraseña"),
            agreement: Yup
                .boolean()
                .required("Debes aceptar los términos y condiciones")
        }),
    })
    useLayoutEffect(() => {
        context.handleSetAppSidebarNone(true);
        context.handleSetAppHeaderNone(true);
        context.handleSetAppContentClass('p-0');
    
        return () => {
          context.handleSetAppSidebarNone(false);
          context.handleSetAppHeaderNone(false);
          context.handleSetAppContentClass('');
        };
      }, []);
    
    /**
    * Check if email in input is already in use
    * @param {*} value string
    * @returns Boolean
    */
    const checkEmailExists = async (value) => {
        const exists = await checkEmail(value);
            if (exists[0] === "Email already registered") {
                setEmailExists(true);
                return true
            } else {
                setEmailExists(false);
                return false
        }
    };

      
      return (
        <LoadingOverlay
			active={loading}
			spinner
			text='Cargando...'
			style={{"height": '100vh'}}
		>
            <div className="register register-with-news-feed">
                <div className="news-feed">
                    <div className='news-image'> 
                        <img src={RegisterBg} alt="register-bg" className='bg-style'/>
                    </div>
                    <div className="news-caption">
                        <h4 className="caption-title"><b>Finishing Schools</b> Univalle</h4>
                        <p>
                            Sistema que permitirá que los estudiantes/egresados puedan desarrollar todas las habilidades requeridas para ingresar al mercado laboral
                        </p>
                    </div>
                </div>
                <div className="register-container">
                    <div className="register-header mb-25px h1">
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-9'>
                            <img className='logo' src={logoUnivalle} style={{"width":"80%","marginBottom": '12px'}} alt="bg-register"/>
                        </div>
                        <small className="d-block fs-15px lh-16">Este sistema te permitirá desarrollar todas las habilidades requeridas para ingresar al mercado laboral.</small>
                    </div>
                    <div className="register-content">
                        <form 
                            id='register-form-company'      
                            className="fs-13px"
                            autoComplete="off"
                            onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className="mb-2">Nombre empresa <span className="text-danger">*</span></label>
                                <input 
                                    id='companyName'
                                    name='companyName'
                                    type="text"
                                    className='form-control fs-13px'
                                    placeholder="Nombre empresa"
                                    value={formik.values.companyName} 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.companyName && formik.touched.companyName ? 
                                    <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.companyName }</div> : null}

                            </div>
                            <div className="mb-3">
                                <label className="mb-2">Correo electrónico <span className="text-danger">*</span></label>
                                <input 
                                    id='email'
                                    name='email'
                                    type="text"
                                    className='form-control fs-13px'
                                    placeholder="Correo electrónico"
                                    value={formik.values.email} 
                                    onChange={(e) => {
                                        checkEmailExists(e.target.value)
                                        formik.handleChange(e)
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.email && formik.touched.email ? 
                                    <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.email }</div> : null}
                                {emailExists ? <div className="invalid-feedback" style={{"display": "flex"}}> Correo ya registrado </div> : null}
                            </div>
                            <div className="mb-3">
                                <label className="mb-2">Contraseña <span className="text-danger">*</span></label>
                                <input 
                                    id='password'
                                    name='password'
                                    type="password"
                                    className='form-control fs-13px'
                                    placeholder="Contraseña"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.password && formik.touched.password ? 
                                    <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.password }</div> : null}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2">Confirmar contraseña <span className="text-danger">*</span></label>
                                <input
                                    id='passwordConfirmed'
                                    name='passwordConfirmed'
                                    type="password"
                                    value={formik.values.passwordConfirmed}
                                    className='form-control fs-13px'
                                    placeholder="Confirmar contraseña"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.passwordConfirmed && formik.touched.passwordConfirmed ? 
                                    <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.passwordConfirmed }</div> : null}
                            </div>
                            <div className="form-check mb-4">
                                <input 
                                    id='agreement'
                                    className="form-check-input" 
                                    type="checkbox" 
                                    checked={formik.values.agreement}
                                    value={formik.values.agreement}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label className="form-check-label" htmlFor="agreementCheckbox">
                                    Al crear una cuenta aceptas los <Link to="/terms_conditions" target="_blank">Teminos y condiciones</Link>
                                </label>
                                {formik.errors.agreement && formik.touched.agreement ? 
                                    <div className="invalid-feedback" style={{"display": "flex"}}>{ formik.errors.agreement }</div> : null}
                            </div>
                            <div className="mb-4">
                                <button 
                                    data-testid="register-button-company"
                                    type="submit" 
                                    className="btn btn-primary d-block w-100 btn-lg h-45px fs-13px"
                                >
                                    Registrarse
                                </button>
                            </div>
                            <div className="mb-4 pb-5">
                                ¿Ya tienes una cuenta? Ingresa <Link to="/user/company/login">aquí</Link>
                            </div>
                        </form>
                        <ReactNotifications />
                    </div>
                </div>
            </div>	
        </LoadingOverlay>
    )
}

export default RegisterCompany;