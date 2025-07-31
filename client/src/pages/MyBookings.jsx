import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

function MyBookings() {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  // Variantes d'animation pour le conteneur principal
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

  // Variantes pour les cartes de réservation
  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Variantes pour les éléments internes des cartes
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Variantes pour les images
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

  // Variantes pour les badges de statut
  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
        delay: 0.3
      }
    }
  };

  // Variantes pour les prix
  const priceVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Title
          title="Mes Réservations"
          subtitle="Consultez et gérez toutes vos réservations de voiture"
          align="left"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        ) : bookings.length === 0 ? (
          <motion.div
            key="empty"
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-500 text-lg">Aucune réservation trouvée</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="bookings"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                layout
                custom={index}
              >
                {/* Image + infos voiture */}
                <motion.div 
                  className="md:col-span-1"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="rounded-md overflow-hidden mb-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={booking.car.image}
                      className="w-full h-auto aspect-video object-cover"
                      variants={imageVariants}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                  
                  <motion.p 
                    className="text-lg font-medium mt-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    {booking.car.brand} {booking.car.model}
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-500"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    {booking.car.year} ° {booking.car.category} ° {booking.car.location}
                  </motion.p>
                </motion.div>

                {/* Infos de réservation */}
                <motion.div 
                  className="md:col-span-2"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-2">
                    <motion.p 
                      className="px-3 py-1.5 bg-light rounded"
                      variants={badgeVariants}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#f3f4f6"
                      }}
                    >
                      Réservation #{index + 1}
                    </motion.p>
                    
                    <motion.p
                      className={`px-3 py-1 text-xs rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-400/15 text-green-600"
                          : "bg-red-400/15 text-red-600"
                      }`}
                      variants={badgeVariants}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: booking.status === "confirmed" ? [1, 1.05, 1] : 1
                      }}
                      transition={{
                        duration: 2,
                        repeat: booking.status === "confirmed" ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    >
                      {booking.status}
                    </motion.p>
                  </div>

                  <motion.div 
                    className="flex items-start gap-2 mt-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.img
                      src={assets.calendar_icon_colored}
                      className="w-4 h-4 mt-1"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div>
                      <p className="text-gray-500">Période de location</p>
                      <motion.p
                        whileHover={{ color: "#3B82F6" }}
                      >
                        {booking.pickupDate.split("T")[0]} au{" "}
                        {booking.returnDate.split("T")[0]}
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-2 mt-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.img
                      src={assets.location_icon_colored}
                      className="w-4 h-4 mt-1"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div>
                      <p className="text-gray-500">Lieu de récupération</p>
                      <motion.p
                        whileHover={{ color: "#3B82F6" }}
                      >
                        {booking.car.location}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Prix */}
                <motion.div 
                  className="md:col-span-1 flex flex-col justify-between gap-6"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="text-sm text-gray-500 text-right"
                    variants={priceVariants}
                  >
                    <motion.p
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      Prix total
                    </motion.p>
                    
                    <motion.h1 
                      className="text-2xl font-semibold text-primary"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.8 + index * 0.1,
                        ease: "backOut"
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        color: "#1D4ED8",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {currency}
                      {booking.price}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    >
                      Réservé le {booking.createdAt.split("T")[0]}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MyBookings;