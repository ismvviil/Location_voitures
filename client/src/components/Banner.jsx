import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

function Banner() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-start
  items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r 
  from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <div className="text-white">
        <h2 className="text-3xl font-medium">Possédez-vous une voiture ?</h2>
        <p className="mt-2">
          Rentabilisez votre véhicule facilement en le listant sur MarocDrive.
        </p>
        <p className="max-w-130">
          Nous nous occupons de l’assurance, de la vérification des conducteurs
          et des paiements sécurisés — pour que vous puissiez gagner un revenu
          passif sans stress.
        </p>

        <motion.button
          whileHover={{ opacity: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all
      text-primary rounded-lg text-sm mt-4 cursor-pointer"
        >
          Lister votre voiture
        </motion.button>
      </div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image}
        alt="voiture"
        className="max-h-60 w-100 mt-10"
      />
    </motion.div>
  );
}

export default Banner;
