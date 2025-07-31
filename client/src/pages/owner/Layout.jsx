// import React, { useEffect } from "react";
// import NavBarOwner from "../../components/owner/NavBarOwner";
// import SideBar from "../../components/owner/SideBar";
// import { Outlet } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";

// function Layout() {
//   const { isOwner, navigate } = useAppContext();

//   useEffect(() => {
//     navigate("/");
//   }, [isOwner]);

//   return (
//     <div className="flex flex-col">
//       <NavBarOwner />

//       <div className="flex">
//         <SideBar />
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;

import React, { useEffect } from "react";
import NavBarOwner from "../../components/owner/NavBarOwner";
import SideBar from "../../components/owner/SideBar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function Layout() {
  const { isOwner, navigate, user } = useAppContext();

  useEffect(() => {
    console.log("Layout useEffect - isOwner:", isOwner, "user:", user);

    // Seulement rediriger si l'utilisateur n'est PAS owner
    // Et attendre que les données utilisateur soient chargées
    if (user !== null && isOwner === false) {
      console.log("User is not owner, redirecting from layout");
      navigate("/");
    }
  }, [isOwner, user, navigate]);

  // Afficher un état de chargement pendant que les données se chargent
  if (user === null) {
    return (
      <div className="flex flex-col">
        <NavBarOwner />
        <div className="flex">
          <SideBar />
          <div className="flex items-center justify-center flex-1 h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg font-medium text-gray-700">
                Vérification des permissions...
              </p>
              <p className="text-sm text-gray-500 mt-2">Chargement en cours</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas owner, ne pas rendre le layout
  if (!isOwner) {
    return (
      <div className="flex flex-col">
        <NavBarOwner />
        <div className="flex">
          <SideBar />
          <div className="flex items-center justify-center flex-1 h-screen">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-700">
                Accès non autorisé
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Redirection en cours...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <NavBarOwner />

      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
