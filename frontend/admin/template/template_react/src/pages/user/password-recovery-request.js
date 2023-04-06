import React, { useState, useContext , useLayoutEffect}  from 'react';
import { AppSettings } from './../../config/app-settings.js';
import { request_password_recovery } from '../../utils/login-axios.js';
import LoadingOverlay from 'react-loading-overlay';
import { ReactNotifications,Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import logoSimboloUnivalle from '../../assets/img/register/logo-simbolo-univalle.jpg'
import './styles/login.css'

function PasswordRecoveryRequest(){
	const context = useContext(AppSettings);
	const [loader, setLoader] = useState(false)
	const [invalidEmail, setInvalidEmail] = useState(false)
	const [email, setEmail] = useState("")

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

	
	const handleSubmit = async (event) => {
		event.preventDefault();
		setInvalidEmail(false)
		setLoader(true)

		const res = await request_password_recovery(email)

		if(res==="OK"){
			setLoader(false)
			Store.addNotification({
				title: 'Solicitud exitosa',
				message: 'Hemos enviado un correo a tu cuenta. Revisa el mensaje para restablecer tu contraseña',
				type: 'success',               
				container: 'bottom-left',          
				animationIn: ["animated", "fadeIn"],    
				animationOut: ["animated", "fadeOut"],
					dismiss: {
					duration: 5000 
						}
				})
		}
		else{
			setInvalidEmail(true)
			setLoader(false)
		}
		setEmail("")
  }


  return (
	<LoadingOverlay
		active={loader}
		spinner
		text='Cargando...'
		style={{"height": '100vh'}}
		>
	<div className="login login-v1" style={{"background": "#fff", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
		<div className="login-container" style={{"maxWidth": "fit-content", "boxShadow": "0px 0px 9px -4px rgb(0 0 0 / 75%)", "padding": "53px 10px"}}>
			<div className="login-header" style={{"display": "flex", "justifyContent": "center"}}>
					<Link to="/" style={{"width": "15%"}}>
						<img className='logo' src={logoSimboloUnivalle} style={{ "width": "100%","paddingRight": "12px"}} alt="logo-simbolo-univalle"/>
					</Link>				<div>
					<div className="d-flex align-items-center">
						 <h1 style={{"fontSize": "1.5rem"}}> Finishing Schools </h1>
					</div>
					<small style={{"textAlign": "center"}}>Recuperar contraseña</small>
				</div>
			</div>
			<div className="login-header">
				<small style={{"textAlign": "center", "padding": "15px 30px"}}>
					Ingrese su dirección de correo electrónico. Recibirá un enlace para crear una nueva contraseña por correo electrónico
				</small>
			</div>

			
			<div className="login-body" style={{"background": "#fff", "padding": "0px 30px"}}>
				<div className="login-content fs-13px">
					<form onSubmit={handleSubmit}>
						<div className="form-floating">
							<input type="text" className="form-control h-45px fs-13px" style={{"border": "1px solid #ced4da", "backgroundColor": "#fff", "color": "#000"}}
							placeholder="Email Address" id="emailAddress" value={email} onChange={(e)=> setEmail(e.target.value) }/>
							<label htmlFor="emailAddress" className="d-flex align-items-center fs-13px text-gray-600">Email Address</label>
						</div>
						{invalidEmail? 
							<div className="invalid-feedback" style={{"display": "flex"}}> 
								El correo no coincide con ninguna cuenta 
							</div>: ''}				
						<div className="login-buttons mt-3">
							<button 
								type="submit" 
								className="btn btn-primary d-block w-100 btn-lg h-45px fs-13px">
								Restablecer
							</button>
						</div>
					</form>
				</div>
			</div>

		</div>
		<ReactNotifications />
	</div>
	</LoadingOverlay>
)

}


export default PasswordRecoveryRequest;