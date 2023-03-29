import React, { useState, useContext , useLayoutEffect} from 'react';
import { AppSettings } from '../../config/app-settings.js';
import { password_recovery } from '../../utils/login-axios.js';
import LoadingOverlay from 'react-loading-overlay';
import { ReactNotifications, Store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import logoSimboloUnivalle from '../../assets/img/register/logo-simbolo-univalle.jpg'
import './styles/login.css'


function PasswordRecovery(){
	const context = useContext(AppSettings);
	const [loader, setLoader] = useState(false)
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [invalidPasswordRecovery, setInvalidPasswordRecovery] = useState(false)
	const [invalidPasswordRecoveryLabel, setInvalidPasswordRecoveryLabel ] = useState("Por favor ingresa otra contraseña") 
		
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
		setLoader(true)
		setInvalidPasswordRecovery(false)
		setInvalidPasswordRecoveryLabel("")

		if(password !== passwordConfirm){
			setTimeout(() => {
				setInvalidPasswordRecovery(true);
				setInvalidPasswordRecoveryLabel("Las contraseñas no coinciden");
				setLoader(false);
			  }, 1000);
		}
		else{

			const parameters = window.location.search
			const token = parameters.split('?token=')[1]
		
			const res = await password_recovery(token, password)
			
			if(res==="OK"){
				setLoader(false)
				Store.addNotification({
					title: 'Solicitud exitosa',
					message: 'Tu contraseña se actualizó con exito',
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
				if(res==="NOT FOUND"){
					setInvalidPasswordRecovery(true)
					setInvalidPasswordRecoveryLabel( "Debes solicitar un nuevo correo para restablecer tu contraseña")
					setLoader(false)

				}
				if(res!=="NOT FOUND"){
					setInvalidPasswordRecovery(true)
					setInvalidPasswordRecoveryLabel( res)
					setLoader(false)

				}
			}
	    }
		setPassword("")
		setPasswordConfirm("")
	}

	return (
		<LoadingOverlay
			active={loader}
			spinner
			text='Cargando...'
			style={{"height": '100vh'}}
		>
		<div className="login login-v1" style={{"background": "#fff", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
			<div className="login-container" style={{"maxWidth": "fit-content", "boxShadow": "0px 0px 9px -4px rgb(0 0 0 / 75%)", "padding": "53px 0px"}}>
				<div className="login-header" style={{"display": "flex", "justifyContent": "center"}}>
					<Link to="/" style={{"width": "15%"}}>
						<img className='logo' src={logoSimboloUnivalle} style={{ "width": "100%","padding-right": "12px"}} alt="logo-simbolo-univalle"/>
					</Link>
					<div>
						<div className="d-flex align-items-center">
							<h1 style={{"fontSize": "1.5rem"}}> Finishing Schools </h1>
						</div>
						<small style={{"textAlign": "center"}}>Recuperar contraseña</small>
					</div>
				</div>
				<div className="login-header">
					<small style={{"textAlign": "center", "padding": "15px 49px"}}>
						Cree una nueva contraseña que no utilice en ningún otro sitio
					</small>
				</div>
				<div className="login-body" style={{"background": "#fff", "padding": "0px 30px"}}>
					<div className="login-content fs-13px">
						<form onSubmit={handleSubmit}>
							<div className="form-floating mb-15px">
								<input type="password" className="form-control h-45px fs-13px" style={{"border": "1px solid #ced4da", "backgroundColor": "#fff", "color": "#000"}}
								placeholder="Password" id="password" value={password} onChange={(e)=> setPassword(e.target.value) }/>
								<label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Contraseña</label>
							</div>
							<div className="form-floating">
								<input type="password" className="form-control h-45px fs-13px" style={{"border": "1px solid #ced4da", "backgroundColor": "#fff", "color": "#000"}}
								placeholder="Confirm password" id="passwordConfirm" value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value) }/>
								<label htmlFor="passwordConfirm" className="d-flex align-items-center fs-13px text-gray-600">Confirmar contraseña</label>
							</div>
							{invalidPasswordRecovery? 
								<div className="invalid-feedback" style={{"display": "flex"}}> 
									{invalidPasswordRecoveryLabel}</div>: ''}				
							<div className="login-buttons mt-4">
								<button type="submit" className="btn btn-primary d-block w-100 btn-lg h-45px fs-13px">
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

export default PasswordRecovery;