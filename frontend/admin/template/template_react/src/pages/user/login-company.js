import React, { useState, useContext , useLayoutEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import { loginCompany } from '../../utils/login-axios.js';
import RegisterBg from '../../assets/img/register/register-bg.jpg'
import logoUnivalle from '../../assets/img/register/logo-univalle.png'
import LoadingOverlay from 'react-loading-overlay';
import './styles/login.css'
import { decodeToken } from "react-jwt";


function LoginCompany(){
	const context = useContext(AppSettings);
	const [redirect, setRedirect] = useState(false)
	const [loader, setLoader] = useState(false)
	const [invalidLogin, setInvalidLogin] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	

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

	

	const handleLogin = async (event) => {
		event.preventDefault();
		setInvalidLogin(false)
		setLoader(true)
		const res = await loginCompany(email, password)
		
		
		if(res!==undefined){
			localStorage.setItem("access_token", res.tokens.access)
			localStorage.setItem("refresh_token", res.tokens.refresh)
			localStorage.setItem("user",  res.email)
			const role = decodeToken(res.tokens.access).role
			localStorage.setItem("role",role)
			sessionStorage.setItem("token", "active")
			setRedirect(true)
			setLoader(false)
		}
		else{
			setInvalidLogin(true)
			setLoader(false)
		}
		setEmail("")
		setPassword("")
  }

  if (redirect) {
	return <Navigate to='/dashboard/services' />;
  }

  return(
	<LoadingOverlay
		active={loader}
		spinner
		text='Cargando...'
		style={{"height": '100vh'}}
		>
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
					<div className="login-content">
						<form id="form-login-company" onSubmit={handleLogin} className="fs-13px">
							<div className="form-floating mb-15px">
								<input data-testid="email-company" type="text" className="form-control h-45px fs-13px" 
								placeholder="Email Address" id="emailAddress" value={email} onChange={(e)=> setEmail(e.target.value) }/>
								<label htmlFor="emailAddress" className="d-flex align-items-center fs-13px text-gray-600">Email Address</label>
							</div>
							<div className="form-floating">
								<input data-testid="password-company" type="password" className="form-control h-45px fs-13px" 
								placeholder="Password" id="password" value={password} onChange={(e)=> setPassword(e.target.value) }/>
								<label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Password</label>
							</div>
							{invalidLogin? 
								<div className="invalid-feedback" style={{"display": "flex"}}>
									Tu correo y/o contraseña no coinciden. Vuelve a intentarlo
								</div>: ''}				
                            <div className="mb-4 mt-4">
                                <button 
									data-testid="submit-company"
                                    type="submit" 
                                    className="btn btn-primary d-block w-100 btn-lg h-45px fs-13px"
                                >
                                    Ingresar
                                </button>
                            </div>
							<div className="mb-10px pb-10px text-inverse" style={{"display": "flex", "justifyContent":"center"}}>
								<Link to="/request_password_recovery/" className="text-primary"> ¿Olvidaste tu contraseña?</Link>
							</div>
							<div className="text-inverse">
							 ¿Aún no tienes una cuenta?  Haz click <Link data-testid="register-company" to="/user/company/register" className="text-primary"> aquí</Link> para registrarte
							</div>
						</form>
					</div>
				</div>
			</div>
			</LoadingOverlay>
  )

}

export default LoginCompany;







