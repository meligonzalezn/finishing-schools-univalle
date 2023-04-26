import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceDashboard = () => {
    const [role, setRole] = useState('')
    useEffect(() => {
        setRole(sessionStorage.getItem("type"));
    }, [])

	return (
        <div>
            <div className="mb-10px mt-10px">
                <h4>Services</h4>
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
                                <Link to="/user/student/profile">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
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
                                <Link to="/dashboard/v1">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
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
                            <Link to="/dashboard/v1">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
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
                            <Link to="/dashboard/v1">Ingresar <i className="fa fa-arrow-alt-circle-right"></i></Link>
                        </div>
                    </div>
				</div>              
			</div>
        </div>
	)}

export default ServiceDashboard;