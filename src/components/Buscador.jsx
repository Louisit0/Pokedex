import React, { useState } from "react";

const Buscador = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="flex flex-row justify-center fixed w-full z-50">
      <input
        type="text"
        placeholder="Busca un pokemon 🔍"
        className="w-[413px] flex border text-white border-zinc-700 rounded-3xl mx-4 lg:mx-0 px-4 py-2 backdrop-filter backdrop-blur-md bg-opacity-60 bg-zinc-800 text-sm md:text-base"
        onChange={handleChange}
        value={searchTerm}
      />
    </div>
  );
};

export default Buscador;
