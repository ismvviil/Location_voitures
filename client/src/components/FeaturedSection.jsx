import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import { motion } from "motion/react";
function FeaturedSection() {
  const navigate = useNavigate();

  const { cars } = useAppContext();

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 
    lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          title="Véhicules en vedette"
          subtitle="Découvrez notre sélection de véhicules disponibles pour votre prochaine aventure"
        />
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={car.id}
          >
            {" "}
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border 
        border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        Voir toutes les voitures
        <img src={assets.arrow_icon} alt="flèche" />
      </motion.button>
    </motion.div>
  );
}

export default FeaturedSection;
