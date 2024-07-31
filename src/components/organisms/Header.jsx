import React from "react";

function Header(props) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <SidebarMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        {!isOpen && (
          <button className="menu-btn" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
        )}
        <div className="header-line">
          <Logo className="custom-logo" />
        </div>
      </div>
      <ModalFiltroProductos categories={categories} />
      <div className="navbar-right">
        <div className="profile-circle">
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
    </header>
  )
}

export default Header;