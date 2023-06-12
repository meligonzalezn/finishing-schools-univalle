import React from 'react';
import { Outlet } from 'react-router-dom';

import App from './../app.jsx';
import UIGeneral from './../pages/ui/ui-general.js';
import UITypography from './../pages/ui/ui-typography.js';
import UITabsAccordion from './../pages/ui/ui-tabs-accordion.js';
import UIModalNotification from './../pages/ui/ui-modal-notification.js';
import UIWidgetBoxes from './../pages/ui/ui-widget-boxes.js';
import UIMediaObject from './../pages/ui/ui-media-object.js';
import UIButtons from './../pages/ui/ui-buttons.js';
import UIIconFontAwesome from './../pages/ui/ui-icon-fontawesome.js';
import UIIconBootstrap from './../pages/ui/ui-icon-bootstrap.js';
import UIIconSimpleLineIcons from './../pages/ui/ui-icon-simple-line-icons.js';
import UILanguageBarIcon from './../pages/ui/ui-language-bar-icon.js';
import UISocialButtons from './../pages/ui/ui-social-buttons.js';
import VacanciesSearch from './../pages/extra/extra-search.js';
import LoginStudent from './../pages/user/login-student.js';
import LoginCompany from '../pages/user/login-company.js';
import LoginPortal from '../pages/user/login-portal.js';
import RegisterCompany from '../pages/user/register-company.js';
import PasswordRecovery from '../pages/user/password-recovery.js';
import PasswordRecoveryRequest from '../pages/user/password-recovery-request.js';
import ServiceDashboard from '../pages/dashboard/service-dashboard.js';
import ScrapingForm from '../pages/user/portfolio/scraping-form.js';
import PortfolioForm from '../pages/user/portfolio/portfolio-form.js';
import PortfolioEdit from '../pages/user/portfolio/portfolio-edit.js';
import CompanyForm from '../pages/user/company_profile/company-form.js';
import { Navigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";

const ProtectedRoute = ({
	allow,
	redirectPath = '/',
	children,
}) => {


	if (!(allow.includes(decodeToken(localStorage.getItem("access_token")).role))) {

		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
};


const AppRoute = [
	{
		path: '*',
		element: <App />,
		children: [
			{
				path: '',
				element: <LoginPortal />
			}, {
				path: 'password_recovery/',
				element: <PasswordRecovery />
			},
			{
				path: 'request_password_recovery/',
				element: <PasswordRecoveryRequest />
			},
			{
				path: 'dashboard/*',
				element:
					<ProtectedRoute
						allow={["company", "student"]}
					>

					</ProtectedRoute>,
				children: [
					{ path: 'services', element: <ServiceDashboard /> },
				]
			},
			{
				path: 'user/*',
				element: <Outlet />,
				children: [
					{ path: 'univalle/login', element: <LoginStudent /> },
					{ path: 'company/login', element: <LoginCompany /> },
					{ path: 'company/register', element: <RegisterCompany /> },

				]
			},
			{
				path: 'user/*',
				element: <ProtectedRoute
					allow={["student"]}
				>

				</ProtectedRoute>,
				children: [
					{ path: 'student/profile', element: <ScrapingForm /> },
					{ path: 'student/portfolio', element: <PortfolioForm /> },
					{ path: 'student/portfolio/edit', element: <PortfolioEdit/>},
				]
			},
			{
				path: 'user/*',
				element: <ProtectedRoute
					allow={["company"]}
				>
					
				</ProtectedRoute>,
				children: [
					{ path: 'company/profile', element: <CompanyForm /> },
					
				]

			},
			{
				path: 'vacancies/*',
				element: <ProtectedRoute
				allow={["student", "company"]}
			>

			</ProtectedRoute>,
				children: [
					{ path: 'search', element: <VacanciesSearch /> },

				]
			},
			{
				path: 'ui/*',
				element: <Outlet />,
				children: [
					{ path: 'general', element: <UIGeneral /> },
					{ path: 'typography', element: <UITypography /> },
					{ path: 'tabs-accordion', element: <UITabsAccordion /> },
					{ path: 'modal-notification', element: <UIModalNotification /> },
					{ path: 'widget-boxes', element: <UIWidgetBoxes /> },
					{ path: 'media-object', element: <UIMediaObject /> },
					{ path: 'buttons', element: <UIButtons /> },
					{ path: 'icon-fontawesome', element: <UIIconFontAwesome /> },
					{ path: 'icon-bootstrap', element: <UIIconBootstrap /> },
					{ path: 'icon-simple-line-icons', element: <UIIconSimpleLineIcons /> },
					{ path: 'language-bar-icon', element: <UILanguageBarIcon /> },
					{ path: 'social-buttons', element: <UISocialButtons /> }
				]
			},
		]
	}
];


export default AppRoute;