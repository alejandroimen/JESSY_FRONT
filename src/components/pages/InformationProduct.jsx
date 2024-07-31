import React from "react";
import ContainerInfo from "../molecules/ContainerInfo";
import Footer from "../molecules/Footer";
import Comentarios from "../organisms/Comentarios";
import "../styles/pages/InformationProduct.css"
import imagen from "../../assets/sendlier.png"
import Logo from "../atoms/Logo";
import ModalFiltroProductos from "../organisms/ModalFiltroProductos";

const comments = [
    {
        user: "Pepe",
        image: imagen
    },
    {
        user: "Fulano",
        image: imagen
    }
]

function InformationProduct(){
    return(
        <div className="page-body">
            <header className="navbar-c">
                <div className="navbar-left-c">
                    <div className="header-logo-client">
                        <Logo className="custom-logo-client" />
                    </div>
                </div>
                <div className="navbar-right-c">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <ContainerInfo />
            <Comentarios comments = {comments} />
            <Footer />
        </div>
    )
}

export default InformationProduct;