import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets, cityList } from "../../assets/assets";

function AddCar() {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const currency = import.meta.env.VITE_CURRENCY;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Ajouter une nouvelle voiture"
        subtitle="Remplissez les détails pour publier une nouvelle voiture à louer, y compris les tarifs, la disponibilité et les spécifications du véhicule."
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Image du véhicule */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">
            Téléchargez une photo de votre voiture
          </p>
        </div>

        {/* Marque et Modèle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div className="flex flex-col w-full">
            <label htmlFor="">Marque</label>
            <input
              type="text"
              placeholder="ex. BMW, Mercedes, Audi..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="">Modèle</label>
            <input
              type="text"
              placeholder="ex. X5, E-Class..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Année, Prix, Catégorie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <div className="flex flex-col w-full">
            <label htmlFor="">Année</label>
            <input
              type="number"
              placeholder="2005"
              required
              className="p-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="">Prix par jour ({currency})</label>
            <input
              type="number"
              placeholder="400"
              required
              className="p-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="">Catégorie</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Choisir une catégorie</option>
              <option value="Sedan">Berline</option>
              <option value="SUV">SUV</option>
              <option value="Van">Fourgonnette</option>
            </select>
          </div>
        </div>

        {/* Transmission, Carburant, Sièges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <div className="flex flex-col w-full">
            <label htmlFor="">Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Choisir une transmission</option>
              <option value="Automatic">Automatique</option>
              <option value="Manual">Manuelle</option>
              <option value="Semi-Automatic">Semi-automatique</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="">Type de carburant</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Choisir un type de carburant</option>
              <option value="Gas">Gaz</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Essence</option>
              <option value="Electric">Électrique</option>
              <option value="Hybrid">Hybride</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="">Nombre de sièges</label>
            <input
              type="number"
              placeholder="4"
              required
              className="p-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Localisation */}
        <div className="flex flex-col w-full">
          <label htmlFor="">Ville</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          >
            <option value="">Choisir une ville</option>
            {cityList.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label htmlFor="">Description</label>
          <textarea
            rows={5}
            placeholder="ex. Un SUV de luxe avec un intérieur spacieux et un moteur puissant"
            required
            className="p-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className="flex items-center gap-2 px-2 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="" />
          Publier la voiture
        </button>
      </form>
    </div>
  );
}

export default AddCar;
