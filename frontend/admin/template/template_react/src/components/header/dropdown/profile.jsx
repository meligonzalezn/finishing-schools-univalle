import React from 'react';
import { Link } from 'react-router-dom';
import {logout } from '../../../utils/logout-axios';


const DropdownProfile = (props) => {
  return (
    <div className="navbar-item navbar-user dropdown">
      <a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
        <img src="/assets/img/user/user-13.jpg" alt="" />
        <span>
          <span className="d-none d-md-inline">{props.userNameProp}</span>
          <b className="caret"></b>
        </span>
      </a>
      <div className="dropdown-menu dropdown-menu-end me-1">
        <a href="#/" className="dropdown-item">Edit Profile</a>
        <a href="#/" className="dropdown-item">Settings</a>
        <div className="dropdown-divider"></div>
        <Link to="/" onClick={logout} className="dropdown-item">Log Out</Link>
      </div>
    </div>
  );
};

export default DropdownProfile;