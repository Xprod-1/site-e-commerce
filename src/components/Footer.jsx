import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>YOUSSEF SHOP</h2>
          <p>
            Découvrez les derniers produits. Qualité et style au rendez-vous.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Liens rapides</h2>
          <ul>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Suivez-nous</h2>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YOUSSEF SHOP. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
