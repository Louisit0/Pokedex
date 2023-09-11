import React from "react";
import ColoresTipo from "../utilities/ColoresTipo";

const PokeInfo = ({ pokemonInfo }) => {
  const statAbbreviations = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

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
            <div className="grid grid-cols-2 mx-2 gap-x-4 gap-y-2">
              <h4 className="font-bold">Height</h4>
              <h4 className="font-bold">Weight</h4>
              <p className="p-2 rounded-2xl bg-gray-100">
                {pokemonInfo.height}m
              </p>
              <p className="p-2 rounded-2xl bg-gray-100">
                {pokemonInfo.weight}kg
              </p>
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Abilities</h4>
              <ul className="grid grid-cols-2 mx-2 gap-x-4 gap-y-2">
                {pokemonInfo.abilities.map((abilitie, index) => (
                  <li
                    className="p-2 rounded-2xl bg-gray-100 capitalize"
                    key={index}
                  >
                    {abilitie.ability.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Stats</h4>
              <ul className="flex flex-row justify-evenly">
                {pokemonInfo.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="bg-gray-100 rounded-2xl p-1">
                    <li
                      className="p-2 bg-blue-400 rounded-full text-white font-bold"
                      style={{ fontSize: 12 }}
                      key={statIndex}
                    >
                      {statAbbreviations[stat.stat.name]}
                    </li>
                    <li className="font-bold text-sm mt-1" key={statIndex}>
                      {stat.base_stat}
                    </li>
                  </div>
                ))}
              </ul>
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
