import React from "react";
import logo from "/logo.png";

const Header = () => {
  return (
    <header className="w-full flex items-center p-4 bg-gray-800 text-white">
      <img src={logo} alt="EHotelDB Logo" className="h-12 mr-4" />
      <h1 className="text-xl">EHotelDB</h1>
    </header>
  );
};

export default Header;