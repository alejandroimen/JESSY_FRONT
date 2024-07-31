import React from "react";
import { GoMail } from "react-icons/go";
import { FaPhone, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/molecules/Footer.css"

function Footer() {
  return (
    <footer className="footer-client">
      <div>
        <h2>Contáctanos</h2>
        <ul>
          <li>
            <GoMail className="icon" />
            correo@gmail.com
          </li>
          <li>
            <FaPhone className="icon" />
            961 111 1100
          </li>
        </ul>
      </div>
      <div>
        <h2>Redes sociales</h2>
        <ul>
          <li>
            <a href="">
              <FaInstagram className="icon" />
              @Instagram
            </a>
          </li>
          <li>
            <a href="">
              <FaXTwitter className="icon" />
              @X
            </a>
          </li>
          <li>
            <a href="">
              <FaFacebook className="icon" />
              @Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;