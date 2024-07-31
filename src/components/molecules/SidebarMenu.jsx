import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from '../atoms/Logo';
import '../styles/molecules/SidebarMenu.css'

const SidebarMenu = (props) => {
    if (!props.isOpen) {
        return (
            <button className="menu-btn" onClick={props.toggleMenu}>
                <i className="fas fa-bars"></i>
            </button>
        )
    }

    return (
        <div className={`sidebar-container ${props.isOpen ? 'open' : ''}`}>
            <div className={`sidebar ${props.isOpen ? 'open' : ''}`}>
                <div className="profile-section">
                    <Logo className="logo-sidebar" />
                    <button className="close-btn" onClick={props.toggleMenu}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <nav className="menu">
                    <ul>
                        <li><a href="/products">Gestión de productos</a></li>
                        <li><a href="/categories">Gestionar categorías</a></li>
                        <li><a href="/suppliers">Administrar proveedores</a></li>
                        <li><a href="/saleshistory">Historial de ventas</a></li>
                        <li><a href="/purchasehistory">Historial de compras</a></li>
                        <li><a href="/client">Ver como cliente</a></li>
                    </ul>
                </nav>
                <div className="logout-container">
                    <button className="logout-btn">Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;