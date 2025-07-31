import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

function CarDetails() {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  useEffect(() => {
    // Simulate fetching car details from an API
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/booking/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Variantes d'animation pour les éléments
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return car ? (
    <motion.div 
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Bouton retour animé */}
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
        variants={itemVariants}
        whileHover={{ x: -5, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img 
          src={assets.arrow_icon} 
          className="rotate-180 opacity-65"
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        Retour à toutes les voitures
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Partie gauche : image et détails de la voiture */}
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          {/* Image avec animation de zoom */}
          <motion.img
            src={car.image}
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
            variants={imageVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          />
          
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {/* Titre animé */}
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {car.brand} {car.model}
              </motion.h1>
              <motion.p 
                className="text-gray-500 text-lg"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {car.category} • {car.year}
              </motion.p>
            </motion.div>

            <motion.hr 
              className="border-borderColor my-6"
              variants={itemVariants}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            {/* Grille d'informations avec animation en cascade */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} sièges`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car.fuel_type,
                },
                {
                  icon: assets.car_icon,
                  text: car.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car.location,
                },
              ].map(({ icon, text }, index) => (
                <motion.div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <motion.img 
                    src={icon} 
                    className="h-5 mb-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  {text}
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-xl font-medium mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Description
              </motion.h1>
              <motion.p 
                className="text-gray-500"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                {car.description}
              </motion.p>
            </motion.div>

            {/* Équipements */}
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-xl font-medium mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                Équipements
              </motion.h1>
              <motion.ul 
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  "Caméra 360°",
                  "Bluetooth",
                  "GPS",
                  "Sièges chauffants",
                  "Rétroviseur arrière",
                ].map((item, index) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center text-gray-500"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.5 + index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      x: 5,
                      color: "#3B82F6",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.img 
                      src={assets.check_icon} 
                      className="h-4 mr-2"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Partie droite : formulaire de réservation */}
        <motion.form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
          variants={formVariants}
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.p 
            className="flex items-center justify-between text-2xl text-gray-800 font-semibold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {car.pricePerDay}
              {currency}
            </motion.span>
            <span className="text-base text-gray-400 font-normal">
              par jour
            </span>
          </motion.p>

          <motion.hr 
            className="border-borderColor my-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />

          <motion.div 
            className="flex flex-col gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <label htmlFor="pickup-date">Date de départ</label>
            <motion.input
              onChange={(e) => setPickupDate(e.target.value)}
              value={pickupDate}
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              whileFocus={{ 
                scale: 1.02,
                borderColor: "#3B82F6",
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                transition: { duration: 0.2 }
              }}
            />
          </motion.div>

          <motion.div 
            className="flex flex-col gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <label htmlFor="return-date">Date de retour</label>
            <motion.input
              onChange={(e) => setReturnDate(e.target.value)}
              value={returnDate}
              type="date"
              className="border border-borderColor px-3 py-2 rounded-lg"
              required
              id="return-date"
              whileFocus={{ 
                scale: 1.02,
                borderColor: "#3B82F6",
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                transition: { duration: 0.2 }
              }}
            />
          </motion.div>

          <motion.button 
            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
          >
            Réserver maintenant
          </motion.button>

          <motion.p 
            className="text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            Aucune carte bancaire requise pour réserver
          </motion.p>
        </motion.form>
      </div>
    </motion.div>
  ) : (
    <Loader />
  );
}

export default CarDetails;