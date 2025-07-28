import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
function Dashboard() {
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const currency = import.meta.env.VITE_CURRENCY;

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

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Tableau de bord administrateur"
        subtitle="Surveillez les performances globales de la plateforme, incluant le nombre total de voitures, les réservations, le chiffre d’affaires mensuel et les activités récentes"
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

          {data.recentBookings.map((b, i) => (
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
          ))}
        </div>

        {/* Chiffre d’affaires mensuel */}
        <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Chiffre d’affaires mensuel</h1>
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
