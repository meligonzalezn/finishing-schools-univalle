import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {logout } from '../../../utils/logout-axios';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import profileDefault from '../../../assets/img/profile/user-image-default.png'




function DropdownProfile (props) {
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    logout().then(
      (res)=>{
       if(res === undefined){
        Store.addNotification({
          title: 'Logout error',
          message: 'Ocurrio un error inesperado. Por favor intenta nuevamente',
          type: 'danger',
          container: 'bottom-left',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
          duration: 4000,
          },
        })
       }
       else{
        navigate("/");
   
       }
    })
  };

  return (
    <div className="navbar-item navbar-user dropdown">
      <a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
        <img src={profileDefault} alt="profile" />
        <span>
          <span className="d-none d-md-inline">{props.userNameProp}</span>
          <b className="caret"></b>
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-end me-1">
        <a href="#/" className="dropdown-item">Edit Profile</a>
        <a href="#/" className="dropdown-item">Settings</a>
        <div className="dropdown-divider"></div>
        <Link to="/" onClick={handleLogout} className="dropdown-item">Log Out</Link>
      </div>
      <ReactNotifications />
    </div>
  );
};

export default DropdownProfile;