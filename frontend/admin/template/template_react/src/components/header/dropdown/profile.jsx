import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../utils/logout-axios';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import profileDefault from '../../../assets/img/profile/user-image-default.png'
import { get_user_pfp } from '../../../utils/user-axios';




function DropdownProfile(props) {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("")
  const [hideDropdown, setHideDropdown] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    //Hides dropdown after logout finished loading 
    const dropdown = document.getElementById("profile-dropdown")
    if (hideDropdown) {
      
      dropdown.classList.remove("show");
      setHideDropdown(false)
    }

    //Get user pfp
    if(localStorage.getItem("profile_picture") == null){
			let accessToken = localStorage.getItem("access_token");
			if (accessToken) {
				get_user_pfp().then((res)=>{
          if(res !== undefined && res["profile_picture"] !== "" ){
            console.log("hola",res)
            localStorage.setItem("profile_picture","https://res.cloudinary.com/dlhcdji3v/"+ res["profile_picture"] )
            setProfilePicture("https://res.cloudinary.com/dlhcdji3v/" +res["profile_picture"])
          }
          else{
            localStorage.setItem("profile_picture", "" )
          }
        })
				
			}
		}
    else{
      setProfilePicture(localStorage.getItem("profile_picture"))
    }

  }, [hideDropdown]);


  const handleLogout = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true)
    logout().then(
      (res) => {
        setLoading(false)
        setHideDropdown(true)
        if (res === undefined) {
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
        else {
          navigate("/");

        }
      })
  };

  return (
    <div className="navbar-item navbar-user dropdown">
      <a href="#/" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
        <img src={ profilePicture !== "" ? profilePicture : profileDefault} alt="profile" />
        <span>
          <span className="d-none d-md-inline">{props.userNameProp}</span>
          <b className="caret"></b>
        </span>
      </a>
      <div id="profile-dropdown" className="dropdown-menu dropdown-menu-end me-1">
        <a href="#/" className="dropdown-item">Edit Profile</a>
        <a href="#/" className="dropdown-item">Settings</a>
        <div className="dropdown-divider"></div>
        <Link to="/" onClick={handleLogout} className="dropdown-item">
        
          {loading ?
          
            <div className="spinner-border spinner-border-sm" style={{"margin": "0rem 0.3rem 0rem 0rem"}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            : 
            <></>}
          Log Out
        </Link>

      </div>
      <ReactNotifications />
    </div>
  );
};

export default DropdownProfile;