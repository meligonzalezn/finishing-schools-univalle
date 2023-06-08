import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';
import { getPortfolioState, getProfileState } from "../../utils/user-axios.js";
import { ReactNotifications, Store } from 'react-notifications-component';

const ServiceDashboard = () => {
      /* eslint-disable */
  //Avoids user going back by error(with back button from browser) to the login page 
  window.history.pushState(null, null, window.location.pathname);
  
  const [redirect, setRedirect] = useState(false)
  const context = useContext(AppSettings);
  const [role, setRole] = useState('')
 
  
  useLayoutEffect(() => {
	if(localStorage.getItem("access_token") === null){
      
      context.handleSetAppSidebarNone(true);
      context.handleSetAppHeaderNone(true);
      context.handleSetAppContentClass('p-0');
      setRedirect(true)
      return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass('');
      };
    }
    else{

      setRole(localStorage.getItem("role"));

      window.addEventListener('popstate', function(event) {
        if (window.location.pathname === '/company/login' ||window.location.pathname === '/univalle/login' ) {
          window.location.replace('/dashboard/v3');
        }
        });
      return () => {
        window.removeEventListener('popstate', function(event) {
          if (window.location.pathname === '/company/login' ||window.location.pathname === '/univalle/login' ) {
            window.location.replace('/dashboard/v3');
          }
          });
      };

    }

	}, [redirect]);



    useEffect(() => {
        
        if(localStorage.getItem("role") === "student"){
          getPortfolioState().then((res)=>{
            console.log("state: " , res)
            if(res.state==="In progress"){
                Store.addNotification({
                    title: 'Registro incompleto',
                    message: 'Debes completar tu portafolio para un mejor posicionamiento en el sistema de vacantes',
                    type: 'danger',
                    container: 'bottom-left',
                    animationIn: ['animated', 'fadeIn'],
                    animationOut: ['animated', 'fadeOut'],
                    dismiss: {
                      duration: 6000,
                    },
                  });
            }
          })   
        }

        if(localStorage.getItem("role") === "company"){
            getProfileState().then((res)=>{
              if(res?.state==="In progress"){
                  Store.addNotification({
                      title: 'Registro incompleto',
                      message: 'Debes completar tu perfil para poder publicar vacantes',
                      type: 'danger',
                      container: 'bottom-left',
                      animationIn: ['animated', 'fadeIn'],
                      animationOut: ['animated', 'fadeOut'],
                      dismiss: {
                        duration: 6000,
                      },
                    });
              }
            })   
          }
    
        }, [redirect]);


    if(redirect){
        return <Navigate to='/' />;
    }

	return (
        <div>
            <div className="mb-10px mt-10px">
                <h4>Servicios</h4>
            </div>
            <div className="row">
                {
                    role === 'student' &&                 
                    <div className="col-xl-3 col-md-6">
                        <div className="widget widget-stats bg-success">
                            <div className="stats-icon"><i className="fa fa-user"></i></div>
                            <div className="stats-info" >
                                <h5>Portafolio Estudiantes</h5>
                                <small>Gestiona la información relacionada con tu perfil profesional</small>	
                            </div>
                            <div className="stats-link">
                                <Link data-testid="portfolio-student" to="/user/student/profile">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                }
                {
                    role === 'company' && 
                    <div className="col-xl-3 col-md-6">
                        <div className="widget widget-stats bg-teal">
                            <div className="stats-icon"><i className="fa fa-building"></i></div>
                            <div className="stats-info">
                                <h5>Empresa</h5>
                                <small>Gestiona la información relacionada con la empresa</small>	
                            </div>
                            <div className="stats-link">
                                <Link to="/user/company/profile">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                }
				<div className="col-xl-3 col-md-6">
					<div className="widget widget-stats bg-orange">
                        <div className="stats-icon"><i className="fa fa-desktop"></i></div>
                        <div className="stats-info">
                            <h5>Capacitación en Tecnología</h5>
                            {role === 'student' ?  
                                <small>Accede a cursos y recursos para mejorar sus habilidades técnicas</small>	:
                                <small>Cree sus propios cursos de formación en línea</small>
                            }
                        </div>
                        <div className="stats-link">
                            <Link to="/user/student/profile">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                        </div>
					</div>
				</div>
                {
                    role === 'student' && 
                    <div className="col-xl-3 col-md-6">
                        <div className="widget widget-stats bg-red">
                            <div className="stats-icon"><i className="fa fa-language"></i></div>
                            <div className="stats-info">
                                <h5>Formación en Ingles</h5>
                                <small>Accede a cursos y recursos para mejorar su nivel de inglés</small>	
                            </div>
                            <div className="stats-link">
                                <Link to="/dashboard/v1">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                }
				<div className="col-xl-3 col-md-6">
					<div className="widget widget-stats bg-indigo">
						<div className="stats-icon"><i className="fa fa-graduation-cap"></i></div>
						<div className="stats-info">
							<h5>Bootcamps</h5>
                            {role === 'student' ?
                                <small>Accede a programas de formación en habilidades específicas</small> :
                                <small>Cree sus propios programas de formación en habilidades específicas</small>
                            }
						</div>
						<div className="stats-link">
							<Link to="/dashboard/v1">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
						</div>
					</div>
				</div>
                {
                    role === 'student' && 
                    <div className="col-xl-3 col-md-6">
                        <div className="widget widget-stats bg-info">
                            <div className="stats-icon"><i className="fa fa-building"></i></div>
                            <div className="stats-info">
                                <h5>Prácticas y pasantías</h5>
                                <small>Adquiere experiencia en un entorno profesional</small>	
                            </div>
                            <div className="stats-link">
                                <Link to="/dashboard/v1">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-xl-3 col-md-6">
                    <div className="widget widget-stats bg-purple">
                        <div className="stats-icon"><i className="fa fa-building"></i></div>
                        <div className="stats-info">
                            <h5>Vacantes laborales</h5>
                            <small>Información actualizada sobre las oportunidades de trabajo</small>	
                        </div>
                        <div className="stats-link">
                            <Link to="/vacancies/search">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                        </div>
                    </div>
				</div>   
                <ReactNotifications />           
			</div>
        </div>
	)}

export default ServiceDashboard;