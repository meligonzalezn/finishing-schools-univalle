import React, { useState, useContext , useLayoutEffect} from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Navigate } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';
import { loginStudent } from '../../utils/login-axios.js';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import RegisterBg from '../../assets/img/register/register-bg.jpg';
import logoUnivalle from '../../assets/img/register/logo-univalle.png';
import './styles/login.css'


function LoginStudent() {
	
	const context = useContext(AppSettings);
	const [redirect, setRedirect] = useState(false);
	const [loader, setLoader] = useState(false);

	const handleOAuthLogin = async (response) => {
	  setLoader(true);
  
	  const res = await loginStudent(response.credential);
  
	  if (res !== undefined) {
		sessionStorage.setItem('user', res.email);
		setRedirect(true);
	  } else {
		setLoader(false);
		Store.addNotification({
		  title: 'Login Error',
		  message: 'Debes ingresar con tu correo institucional',
		  type: 'danger',
		  container: 'bottom-left',
		  animationIn: ['animated', 'fadeIn'],
		  animationOut: ['animated', 'fadeOut'],
		  dismiss: {
			duration: 3000,
		  },
		});
	  }
	};
	useLayoutEffect(() => {
	  context.handleSetAppSidebarNone(true);
	  context.handleSetAppHeaderNone(true);
	  context.handleSetAppContentClass('p-0');
  
	  return () => {
		context.handleSetAppSidebarNone(false);
		context.handleSetAppHeaderNone(false);
		context.handleSetAppContentClass('');
	  };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (redirect) {
	  return <Navigate to='/dashboard/v3' />;
	}

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
				<LoadingOverlay
							active={loader}
							spinner
							text='Cargando...'
							style={{height: '100vh'}}
						>
				<div className="login login-with-news-feed" >
					<div className="news-feed">
						<div className='news-image'> 
							<img src={RegisterBg} alt="register-bg" className='bg-style'/>
						</div>
						<div className="news-caption">
							<h4 className="caption-title"><b>Finishing Schools</b> App</h4>
							<p>
								Sistema que permitirá que los estudiantes/egresados puedan desarrollar todas las habilidades requeridas para ingresar al mercado laboral
							</p>
						</div>
					</div>
					<div className="login-container" style={{"justifyContent":"start"}}>
						<div className="register-header mb-25px h1">
								<div className='col-lg-12 col-md-12 col-sm-12 col-xs-9'>
									<img className='logo' src={logoUnivalle} style={{"width":"80%","marginBottom": '16px'}} alt="bg-register"/>
								</div>
								<small className="d-block fs-13px lh-16">Este sistema te permitirá desarrollar todas las habilidades requeridas para ingresar al mercado laboral.</small>
							</div>
							<GoogleLogin
								onSuccess={handleOAuthLogin}
								onFailure={(error) => {
									setLoader(false);
									Store.addNotification({
									title: 'Login Error',
									message: 'Se presentó un error inesperado. Por favor intenta ingresar nuevamente',
									type: 'danger',
									container: 'bottom-left',
									animationIn: ['animated', 'fadeIn'],
									animationOut: ['animated', 'fadeOut'],
									dismiss: {
										duration: 3000,
									},
									});
								}}
							/>
						<ReactNotifications />
					</div>
				</div>
				</LoadingOverlay>
			</GoogleOAuthProvider> 
	)
}
export default LoginStudent;