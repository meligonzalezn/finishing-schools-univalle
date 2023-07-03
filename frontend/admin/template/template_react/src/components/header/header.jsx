import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropdownLanguage from './dropdown/language.jsx';
import DropdownProfile from './dropdown/profile.jsx';
import DropdownMegaMenu from './dropdown/mega.jsx';
import logoSimboloUnivalle from '../../assets/img/register/logo-simbolo-univalle.jpg'
import { AppSettings } from './../../config/app-settings.js';
import { get_user_basic_info } from '../../utils/user-axios.js';
import { refreshToken } from '../../utils/logout-axios.js';

const Header = () => {
	const [userName, setUserName] = useState(localStorage.getItem("user_name"));
	const [refreshSession, setRefreshSession] = useState(false)
	const {
		toggleAppSidebarMobile,
		toggleAppSidebarEnd,
		toggleAppSidebarEndMobile,
		toggleAppTopMenuMobile,
		appHeaderLanguageBar,
		appHeaderMegaMenu,
		appHeaderInverse,
		appSidebarTwo,
		appTopMenu,
		appSidebarNone
	} = useContext(AppSettings);

	const getUserBasicInfo =  async () => {
		if(localStorage.getItem("user_name")== null){
			let accessToken = localStorage.getItem("access_token");
			if (accessToken) {
				const response = await get_user_basic_info()
				localStorage.setItem("user_name",response["user_name"] )
				setUserName(response["user_name"])
			}
		}
		
	}
	
	useEffect(() => {
		getUserBasicInfo();
		
		if(sessionStorage.getItem("token") == null){
			//Refresh the acces_token in case the user got in to page without login in. 
			//(Didn't logout, closed the page and opened the page
			// again, now with the access_token already exdpired)
			refreshToken()
				.then(response => {
					localStorage.setItem("access_token",response.access);
				})
				.catch(error => {
				console.log(error);
				});
			sessionStorage.setItem("token", "active")
			setRefreshSession(true)
		}
		const interval = setInterval(() => {
			refreshToken()
				.then(response => {
					localStorage.setItem("access_token",response.access);
				})
				.catch(error => {
				console.log(error);
				});
		  }, 4 * 60 * 1000);
	  
		  
		  return () => clearInterval(interval);
	}, [userName, refreshSession])

	return (
		<div id="header" className={'app-header ' + (appHeaderInverse ? 'app-header-inverse' : '')}>
		<div className="navbar-header">
			{appSidebarTwo && (
			<button type="button" className="navbar-mobile-toggler" onClick={toggleAppSidebarEndMobile}>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			)}
			<Link to="/" className="navbar-brand" style={{"gap": "0.5rem"}}> <img src={logoSimboloUnivalle} alt="" /> 
			<b>Finishing</b> Schools
			</Link>
			{appHeaderMegaMenu && (
			<button type="button" className="navbar-mobile-toggler" data-bs-toggle="collapse" data-bs-target="#top-navbar">
				<span className="fa-stack fa-lg text-inverse">
				<i className="far fa-square fa-stack-2x"></i>
				<i className="fa fa-cog fa-stack-1x"></i>
				</span>
			</button>
			)}
			{appTopMenu && !appSidebarNone && (
			<button type="button" className="navbar-mobile-toggler" onClick={toggleAppTopMenuMobile}>
				<span className="fa-stack fa-lg text-inverse">
				<i className="far fa-square fa-stack-2x"></i>
				<i className="fa fa-cog fa-stack-1x"></i>
				</span>
			</button>
			)}
			{appSidebarNone && appTopMenu && (
			<button type="button" className="navbar-mobile-toggler" onClick={toggleAppTopMenuMobile}>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			)}
			{!appSidebarNone && (
			<button type="button" className="navbar-mobile-toggler" onClick={toggleAppSidebarMobile}>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			)}
		</div>

		{appHeaderMegaMenu && (
			<DropdownMegaMenu />
		)}

		<div className="navbar-nav">
				
				{appHeaderLanguageBar && (
				<DropdownLanguage />
				)}

				<DropdownProfile userNameProp={userName}/>

				{appSidebarTwo && (
				<div className="navbar-divider d-none d-md-block"></div>
				)}

				{appSidebarTwo && (
					<div className="navbar-item d-none d-md-block">
						<Link to="/" onClick={toggleAppSidebarEnd} className="navbar-link icon">
							<i className="fa fa-th"></i>
						</Link>
					</div>
				)}        
			</div>
		</div>
	)}

export default Header;