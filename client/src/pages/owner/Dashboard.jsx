// import React, { useEffect, useState } from "react";
// import { assets } from "../../assets/assets";
// import Title from "../../components/owner/Title";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const { axios, isOwner, currency , user} = useAppContext();

//   const [data, setData] = useState({
//     totalCars: 0,
//     totalBookings: 0,
//     pendingBookings: 0,
//     completedBookings: 0,
//     recentBookings: [],
//     monthlyRevenue: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Add this

//   // ...existing data state...

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       console.log("Fetching dashboard data..."); // Debug log
//       const response = await axios.get("/api/owner/dashboard");
//       console.log("Dashboard response:", response.data); // Debug log

//       if (response.data.success) {
//         setData(response.data.dashboardData);
//         toast.success("Dashboard data loaded successfully");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Dashboard error:", error); // Debug log
//       toast.error(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const currency = import.meta.env.VITE_CURRENCY;

//   const dashboardCards = [
//     {
//       title: "Nombre total de voitures",
//       value: data.totalCars,
//       icon: assets.carIconColored,
//     },
//     {
//       title: "Nombre total de réservations",
//       value: data.totalBookings,
//       icon: assets.listIconColored,
//     },
//     {
//       title: "Réservations en attente",
//       value: data.pendingBookings,
//       icon: assets.cautionIconColored,
//     },
//     {
//       title: "Réservations terminées",
//       value: data.completedBookings,
//       icon: assets.listIconColored,
//     },
//   ];

//   // const fetchDashboardData = async () => {
//   //   try {
//   //     const { data } = await axios.get("/api/owner/dashboard");
//   //     if (data.success) {
//   //       setData(data.dashboardData);
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.message);
//   //   }
//   // };

//   useEffect(() => {
//   if (isOwner === undefined || isOwner === null) return; // Attendre que ça soit défini

//   if (isOwner === true) {
//     fetchDashboardData();
//   } else {
//     toast.error("Only owners can access the dashboard");
//     navigate("/");
//   }
// }, [isOwner]);

//   // Add loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 pt-10 md:px-10 flex-1">
//       <Title
//         title="Tableau de bord administrateur"
//         subtitle="Surveillez les performances globales de la plateforme, incluant le nombre total de voitures, les réservations, le chiffre d’affaires mensuel et les activités récentes"
//       />
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
//         {dashboardCards.map((card, index) => (
//           <div
//             key={index}
//             className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
//           >
//             <div>
//               <h3 className="text-xs text-gray-500">{card.title}</h3>
//               <p className="text-lg font-semibold">{card.value}</p>
//             </div>
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
//               <img src={card.icon} alt={card.title} className="h-5 w-5" />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
//         {/* Réservations récentes */}
//         <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
//           <h1 className="text-lg font-medium">Réservations récentes</h1>
//           <p className="text-gray-500">Dernières réservations clients</p>

//           {data.recentBookings.map((b, i) => (
//             <div key={i} className="mt-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
//                   <img
//                     src={assets.listIconColored}
//                     alt=""
//                     className="h-5 w-5"
//                   />
//                 </div>
//                 <div>
//                   <p>
//                     {b.car.brand} {b.car.model}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {b.createdAt.split("T")[0]} – {b.car.model}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 font-medium">
//                 <p className="text-sm text-gray-500">
//                   {currency}
//                   {b.price}
//                 </p>
//                 <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
//                   {b.status}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Chiffre d’affaires mensuel */}
//         <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
//           <h1 className="text-lg font-medium">Chiffre d’affaires mensuel</h1>
//           <p className="text-gray-500">Revenu du mois en cours</p>
//           <p className="text-3xl mt-6 font-semibold text-primary">
//             {currency} {data.monthlyRevenue}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { axios, isOwner, currency, user } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [hasCheckedPermissions, setHasCheckedPermissions] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log("Fetching dashboard data...");
      const response = await axios.get("/api/owner/dashboard");
      console.log("Dashboard response:", response.data);

      if (response.data.success) {
        setData(response.data.dashboardData);
        toast.success("Dashboard data loaded successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error(error.response?.data?.message || error.message);

      // Si erreur d'autorisation, rediriger vers home
      if (error.response?.status === 403 || error.response?.status === 401) {
        toast.error("Accès non autorisé");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: "Nombre total de voitures",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Nombre total de réservations",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Réservations en attente",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Réservations terminées",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  // Utiliser useRef pour éviter les re-monts
  const hasInitialized = React.useRef(false);

  useEffect(() => {
    console.log("Dashboard useEffect triggered");
    console.log("user:", user);
    console.log("isOwner status:", isOwner);
    console.log("hasInitialized:", hasInitialized.current);

    // Le Layout s'occupe déjà des vérifications de permissions
    // Ici on se contente de charger les données
    if (user && user.role === "owner" && !hasInitialized.current) {
      hasInitialized.current = true;
      console.log("User is owner, fetching dashboard data");
      setHasCheckedPermissions(true);
      fetchDashboardData();
    }
  }, [user, isOwner]);

  // Supprimer le deuxième useEffect car le Layout gère déjà les redirections

  // Affichage de chargement pendant la vérification
  if (loading || user === null) {
    return (
      <div className="flex items-center justify-center flex-1 h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Chargement du tableau de bord...
          </p>
          <p className="text-sm text-gray-500 mt-2">Veuillez patienter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Tableau de bord administrateur"
        subtitle="Surveillez les performances globales de la plateforme, incluant le nombre total de voitures, les réservations, le chiffre d'affaires mensuel et les activités récentes"
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h3 className="text-xs text-gray-500">{card.title}</h3>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt={card.title} className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Réservations récentes */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Réservations récentes</h1>
          <p className="text-gray-500">Dernières réservations clients</p>

          {data.recentBookings.length > 0 ? (
            data.recentBookings.map((b, i) => (
              <div key={i} className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <img
                      src={assets.listIconColored}
                      alt=""
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    <p>
                      {b.car.brand} {b.car.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {b.createdAt.split("T")[0]} – {b.car.model}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <p className="text-sm text-gray-500">
                    {currency}
                    {b.price}
                  </p>
                  <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                    {b.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-4 text-center text-gray-500">
              <p>Aucune réservation récente</p>
            </div>
          )}
        </div>

        {/* Chiffre d'affaires mensuel */}
        <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Chiffre d'affaires mensuel</h1>
          <p className="text-gray-500">Revenu du mois en cours</p>
          <p className="text-3xl mt-6 font-semibold text-primary">
            {currency} {data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
