import React from "react";
import { assets } from "../assets/assets";
// import { assets } from "../assets/assets";

import { motion } from "motion/react";

function Footer() {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b"
      >
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src="MarocDrive-logo.png"
            alt="logo"
            className="h-8 md:h-20"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3"
          >
            Service de location de voitures haut de gamme avec un large choix de
            véhicules de luxe et de tous les jours pour tous vos besoins de
            conduite.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            <a href="#">
              <img
                src={assets.facebook_logo}
                className="w-5 h-5"
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                src={assets.instagram_logo}
                className="w-5 h-5"
                alt="Instagram"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                className="w-5 h-5"
                alt="Twitter"
              />
            </a>
            <a href="#">
              <img src={assets.gmail_logo} className="w-5 h-5" alt="Gmail" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8"
        >
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              Liens rapides
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">Accueil</a>
              </li>
              <li>
                <a href="#">Parcourir les voitures</a>
              </li>
              <li>
                <a href="#">Proposer votre voiture</a>
              </li>
              <li>
                <a href="#">À propos</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              Ressources
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#">Centre d’aide</a>
              </li>
              <li>
                <a href="#">Conditions d’utilisation</a>
              </li>
              <li>
                <a href="#">Politique de confidentialité</a>
              </li>
              <li>
                <a href="#">Assurance</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>Marrakech, Maroc</li>
              <li>souifiismail@gmail.com</li>
              <li>+212 6 02 07 97 75</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
      initial={{ opacity: 0  , y:10}}
            whileInView={{ opacity: 1 , y:0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
      
      className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://prebuiltui.com">MarocDrive</a>. Tous droits réservés.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Confidentialité</a>
          </li>
          <li> | </li>

          <li>
            <a href="#">Conditions</a>
          </li>
          <li> | </li>

          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Footer;
