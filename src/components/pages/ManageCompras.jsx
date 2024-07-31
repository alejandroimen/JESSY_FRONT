import React from "react";
import { useEffect, useState } from "react";
import Logo from '../atoms/Logo';
import axios from 'axios';
import SidebarMenu from "../molecules/SidebarMenu";

function ManagaCompras() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <SidebarMenu isOpen={isOpen} toggleMenu={toggleMenu} />
          <div className="header-line">
            <Logo className="custom-logo" />
          </div>
        </div>
        <div className="navbar-right">
          <div className="profile-circle">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </header>
    </div>
  );
}

export default ManagaCompras;