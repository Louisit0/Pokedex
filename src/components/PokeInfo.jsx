import React from "react";
import ColoresTipo from "../utilities/ColoresTipo";

const PokeInfo = ({ pokemonInfo }) => {
  console.log(pokemonInfo);
  return (
    <div
      className="bg-white rounded-xl shadow-sm bottom-0 fixed w-96 flex justify-center items-start"
      style={{ height: "86vh" }}
    >
      <div className="w-full text-center">
        {pokemonInfo && pokemonInfo.name ? (
          <>
            {/* Tener 3 tamaños distintos:
          114 px height default, 153 px height 2da, 267 px height 3ra */}
            <img
              src={pokemonInfo.img}
              alt={pokemonInfo.name}
              className="mx-auto object-contain h-64"
              style={{ imageRendering: "pixelated" }}
            />
            <p className="text-gray-400 font-bold">N° {pokemonInfo.id}</p>
            <h3 className="text-2xl font-bold capitalize mb-2">
              {pokemonInfo.name}
            </h3>
            <div className="flex flex-row justify-center gap-2">
              {pokemonInfo.types.map((type, typeIndex) => (
                <span
                  key={typeIndex}
                  className={`px-4 py-1 self-center rounded-lg font-bold capitalize text-sm ${
                    ColoresTipo[type] || "bg-gray-500"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p>Selecciona un Pokémon✨</p>
        )}
      </div>
    </div>
  );
};

export default PokeInfo;
