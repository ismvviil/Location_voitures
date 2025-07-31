import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ManageCars() {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOwnerCars = async () => {
    try {
      setLoading(true);
      console.log("Fetching owner cars..."); // Debug log

      const { data } = await axios.get("/api/owner/cars");
      console.log("Cars response:", data); // Debug log

      if (data.success) {
        setCars(data.cars || []);
        console.log("Cars loaded:", data.cars?.length || 0); // Debug log

        if (!data.cars || data.cars.length === 0) {
          // toast.error(
          //   "Aucune voiture trouvée. Ajoutez votre première voiture !"
          // );
        } else {
          toast.success(data.message || "Voitures chargées avec succès");
        }
      } else {
        toast.error(data.message || "Erreur lors du chargement des voitures");
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error); // Debug log
      toast.error(
        error.response?.data?.message || error.message || "Erreur de connexion"
      );
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post(`/api/owner/toggle-car`, { carId });
      if (data.success) {
        // Mettre à jour l'état local

        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour", error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      console.log("Deleting car:", carId);

      const confirm = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette voiture ? Cette action est irréversible."
      );

      if (!confirm) return;

      // ✅ Envoyer l'objet avec carId correctement
      const { data } = await axios.post("/api/owner/delete-car", { carId });

      console.log("Delete response:", data);

      if (data.success) {
        toast.success(data.message);
        // Recharger la liste des voitures
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Gérer les voitures"
        subtitle="Consultez toutes les voitures listées, mettez à jour leurs détails ou retirez-les de la plateforme de réservation."
      />

      <div
        className="max-w-3xl w-full rounded-md overflow-hidden border 
    border-borderColor mt-6"
      >
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Voiture</th>
              <th className="p-3 font-medium max-md:hidden">Catégorie</th>
              <th className="p-3 font-medium">Prix</th>
              <th className="p-3 font-medium max-md:hidden">Statut</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="w-12 h-12 aspect-square 
                rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} places • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{car.category}</td>

                <td className="p-3">
                  {currency}
                  {car.pricePerDay}/jour
                </td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvaliable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {car.isAvaliable ? "Disponible" : "Indisponible"}
                  </span>
                </td>

                <td className="flex items-center p-3">
                  <img
                    onClick={() => toggleAvailability(car._id)}
                    src={
                      car.isAvaliable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt=""
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt=""
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageCars;
