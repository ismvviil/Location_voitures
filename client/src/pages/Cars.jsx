import React, { useEffect, useState, useRef } from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useLocation, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimationFrame } from "motion/react";

function Cars() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const searchRef = useRef(null);
  
  // Advanced scroll animations
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 120 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  // Getting search params from url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pickupLocation = queryParams.get("pickupLocation");
  const pickupDate = queryParams.get("pickupDate");
  const returnDate = queryParams.get("returnDate");

  const { cars, axios } = useAppContext();
  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const applyFilter = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (input === "") {
      setFilteredCars(cars);
      setIsLoading(false);
      return null;
    }

    const filtered = cars.slice().filter((car) => {
      return (
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission?.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
    setIsLoading(false);
  };

  const searchCarAvailability = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/booking/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast("Aucune voiture disponible");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      toast.error("Erreur lors de la recherche de disponibilité");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearchData && cars.length > 0) {
      setFilteredCars(cars);
    }
  }, [cars, isSearchData]);

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    }
  }, [isSearchData]);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [input, cars, isSearchData]);

  // 2025 Ultra Modern Animation Variants
  const heroVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: 45,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
      }
    }
  };

  const searchBarVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      backdropFilter: "blur(0px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: 60,
      rotateY: -25,
      scale: 0.8,
      filter: "blur(10px)"
    }),
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -30,
      rotateY: 25,
      filter: "blur(5px)",
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const morphingLoader = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.3, scale: 1 },
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 50%)`
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-xl pointer-events-none z-0"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="fixed top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-600/20 rounded-full blur-xl pointer-events-none z-0"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Hero Section with 3D Transform */}
      <motion.div 
        ref={heroRef}
        className="relative flex flex-col items-center py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 max-md:px-4 z-10"
        variants={heroVariants}
        style={{ 
          y: yHero, 
          opacity: opacityHero,
          scale: scaleHero
        }}
      >
        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -50, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <Title
            title="Voitures disponibles"
            subtitle="Parcourez notre sélection de véhicules haut de gamme pour votre prochaine aventure"
          />
        </motion.div>
        
        {/* Ultra Modern Search Bar */}
        <motion.div
          ref={searchRef}
          className="relative flex items-center bg-white/80 backdrop-blur-xl px-6 mt-8 max-w-140 w-full h-14 rounded-2xl shadow-2xl border border-white/20"
          variants={searchBarVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderColor: "rgba(59, 130, 246, 0.3)"
          }}
          whileFocus={{ scale: 1.02 }}
        >
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
          
          <motion.img 
            src={assets.search_icon} 
            alt="" 
            className="w-5 h-5 mr-3 z-10 relative"
            animate={isLoading ? { 
              rotate: 360,
              scale: [1, 1.2, 1]
            } : { rotate: 0, scale: 1 }}
            transition={{ 
              rotate: { duration: 1, repeat: isLoading ? Infinity : 0 },
              scale: { duration: 0.5, repeat: isLoading ? Infinity : 0 }
            }}
          />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Rechercher par marque, modèle ou options"
            className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-400 z-10 relative font-medium"
          />
          <motion.img 
            src={assets.filter_icon} 
            alt="" 
            className="w-5 h-5 ml-3 z-10 relative cursor-pointer"
            whileHover={{ 
              scale: 1.2,
              rotate: 15,
              filter: "brightness(1.2)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
      </motion.div>

      {/* Results Section */}
      <motion.div 
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Animated Results Counter */}
        <motion.div
          className="xl:px-20 max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p
            className="text-gray-600 font-medium text-lg"
            key={filteredCars.length}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <motion.span
              className="inline-block text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {filteredCars.length}
            </motion.span>
            {" "}voitures affichées
          </motion.p>
        </motion.div>

        {/* Ultra Modern Loading Animation */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex justify-center items-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative">
                {/* Morphing SVG loader */}
                <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    variants={morphingLoader}
                    initial="hidden"
                    animate="visible"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Pulsing center dot */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <motion.span 
                className="ml-4 text-gray-600 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Recherche en cours...
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-20 max-w-7xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          <AnimatePresence mode="popLayout">
            {!isLoading && filteredCars.map((car, i) => (
              <motion.div 
                key={car._id || i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ 
                  y: -15,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State with Particle Animation */}
        <AnimatePresence>
          {!isLoading && filteredCars.length === 0 && (
            <motion.div
              className="text-center py-20 relative"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 2) * 20}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10"
              >
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  Aucune voiture trouvée
                </h3>
                <p className="text-gray-500 text-lg">
                  Essayez de modifier vos critères de recherche
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Cars;