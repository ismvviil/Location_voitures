import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";

function NavBarOwner() {
  const user = dummyUserData;
  return (
    <div
      className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 bg-white
    border-b border-borderColor relative transition-all"
    >
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="h-20 w-20" />
      </Link>
      <p>Bienvenue, {user.name || "Owner"} </p>
    </div>
  );
}

export default NavBarOwner;
