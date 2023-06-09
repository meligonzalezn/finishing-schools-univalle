import React, { useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';
import RegisterBg from '../../assets/img/register/register-bg.jpg'
import logoUnivalle from '../../assets/img/register/logo-univalle.png'
import 'react-notifications-component/dist/theme.css';
import './styles/login.css'


const LoginPortal = () => {
    /* eslint-disable */
    const context = useContext(AppSettings);

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

	  
      
      return (
			<div className="login login-with-news-feed">
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
				<div className="login-container">
					<div className="register-header mb-25px h1">
						<div className='col-lg-12 col-md-12 col-sm-12 col-xs-9'>
							<img className='logo' src={logoUnivalle} style={{"width":"80%","marginBottom": '12px'}} alt="bg-register"/>
						</div>
						<small className="d-block fs-15px lh-16">Este sistema te permitirá desarrollar todas las habilidades requeridas para ingresar al mercado laboral.</small>
					</div>
					<div className="text-gray pb-4">
						<b>¡Bienvenido!</b> Inicia sesión para explorar todas las funcionalidades que tenemos disponibles
					</div>
					<div className="login-content login-portal-buttons">
						<Link to="/user/univalle/login">
							<button data-testid="btn-univalle-login" className="btn btn-outline-primary">
								Universidad del Valle
							</button>
						</Link>
						<Link to="/user/company/login">
							<button data-testid="btn-company-login" className="btn btn-outline-danger">
								Empresa
							</button>
						</Link>
						<div className="text-inverse">
							 ¿Quieres registrar tu empresa? Haz click <Link data-testid="register-company" to="/user/company/register" className="text-primary"> aquí</Link> para comenzar el registro
						</div>
					</div>
				</div>
			</div>
		
    )
}

export default LoginPortal;