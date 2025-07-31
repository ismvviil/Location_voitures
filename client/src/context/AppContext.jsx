// import { useContext, useEffect, useState } from "react";
// import { createContext } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const currency = import.meta.env.VITE_CURRENCY;

//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [pickupDate, setPickupDate] = useState("");
//   const [returnDate, setReturnDate] = useState("");

//   const [cars, setCars] = useState([]);

//   //   Function to check if user is logged in
//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/data");
//       if (data.success) {
//         setUser(data.user);
//         setIsOwner(data.user.role === "owner");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   //Function to log out the user
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     setIsOwner(false);
//     axios.defaults.headers.common["Authorization"] = "";
//     toast.success("You have been logged out");
//   };

//   //   Function to fetch all cars from the server
//   const fetchCars = async () => {
//     try {
//       const { data } = await axios.get("/api/user/cars");
//       data.success ? setCars(data.cars) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   //   useEffect to reteive the token from localstorage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setToken(token);
//     fetchCars();
//   }, []);

//   //   useEffect to fetch user data when token is available
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `${token}`;
//       fetchUser();
//     }
//   }, [token]);

//   const value = {
//     navigate,
//     currency,
//     axios,
//     user,
//     setUser,
//     token,
//     setToken,
//     isOwner,
//     setIsOwner,
//     fetchUser,
//     showLogin,
//     setShowLogin,
//     logout,
//     fetchCars,
//     cars,
//     setCars,
//     pickupDate,
//     setPickupDate,
//     returnDate,
//     setReturnDate,
//   };
//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [cars, setCars] = useState([]);

  //   Function to check if user is logged in
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
        console.log("User fetched:", data.user);
        console.log("Is owner:", data.user.role === "owner");
      } else {
        console.log("Failed to fetch user data:", data.message);
        // Ne pas rediriger automatiquement ici
        // Laisser les composants individuels gérer la redirection
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Erreur lors de la récupération des données utilisateur");

      // Seulement rediriger si c'est une erreur d'authentification
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  //Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    setIsLoading(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("Vous avez été déconnecté");
    navigate("/");
  };

  //   Function to fetch all cars from the server
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error("Erreur lors de la récupération des voitures");
    }
  };

  //   useEffect to retrieve the token from localstorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setIsLoading(false);
    }
    fetchCars();
  }, []);

  //   useEffect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    isLoading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
