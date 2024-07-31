import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import "../styles/molecules/UserProfile.css"

const UserProfile = (props) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleChangeAccount = () => {
        localStorage.removeItem('token');
        window.location.href = '/change-account';
    };

    const handleChangeAccountToggle = () => {
        handleChangeAccount();
    };

    const handleLogoutModalToggle = () => {
        handleLogout();
    };

    const handleClick = () => {
        if (props.isOpenUser)
            props.setIsOpenUser(false)
        else
            props.setIsOpenUser(true)
    }

    if (!props.isOpenUser) return(
    <div className="profile-circle">
        <FaUserCircle onClick={handleClick} />
    </div>)

    return (
        <div className="profile-circle">
        <FaUserCircle onClick={handleClick} />
            <div className="user-card">
                <div className="user-icon">
                    <i className="fas fa-user-circle icon-log"></i>
                </div>
                <h3></h3>
                <a href="#" className="change-account" onClick={handleChangeAccountToggle}>Cambiar de cuenta</a>
                <a href="#" className="logout" onClick={handleLogoutModalToggle}>Cerrar sesión</a>
            </div>
        </div>
    );
};

export default UserProfile;