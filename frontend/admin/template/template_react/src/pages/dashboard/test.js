import React, { useContext, useLayoutEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';

const DashboardV2 = () => {
   /* eslint-disable */
  //Avoids user going back by error(with back button from browser) to the login page 
  window.history.pushState(null, null, window.location.pathname);
  
  const [redirect, setRedirect] = useState(false)
  const context = useContext(AppSettings);
 
  
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

  if(redirect){
    return <Navigate to='/' />;
  }

  return (
    <div>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item">
          <Link to="/dashboard/v3">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/dashboard/v3">Dashboard</Link>
        </li>
        <li className="breadcrumb-item active">Dashboard v3</li>
      </ol>
      <h1 className="page-header mb-3">Dashboard v3</h1>
    </div>
  );
};

export default DashboardV2;
