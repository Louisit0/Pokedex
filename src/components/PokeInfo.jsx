import ColoresTipo from "../utilities/ColoresTipo";

const PokeInfo = ({ pokemonInfo, infoIsClicked, setInfoIsClicked }) => {
  const statAbbreviations = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const colorStats = {
    hp: "bg-green-400",
    attack: "bg-red-400",
    defense: "bg-orange-400",
    "special-attack": "bg-yellow-400",
    "special-defense": "bg-purple-400",
    speed: "bg-blue-400",
  };

  const closeInfo = () => {
    setInfoIsClicked(false);
    console.log("cerrando");
  };

  console.log(pokemonInfo);
  return (
    // <div
    //   className="hidden bg-white rounded-xl shadow-sm md:bottom-0 md:right-36 md:fixed w-96 md:flex justify-center items-start"
    //   style={{ height: "86vh" }}
    // >
    <div
      className={`${
        infoIsClicked
          ? "fixed bg-white bottom-0 right-0 px-4 h-full md:w-1/4 md:mx-4 md:mt-24 md:rounded-t-2xl md:shadow-sm md:mr-40"
          : "hidden"
      }`}
    >
      <div className="w-full text-center">
        {pokemonInfo && pokemonInfo.name ? (
          <>
            {/* Tener 3 tamaños distintos:
          114 px height default, 153 px height 2da, 267 px height 3ra */}
            <div className="flex flex-row">
              <img
                src={pokemonInfo.img}
                alt={pokemonInfo.name}
                className="mx-auto object-contain h-40 mt-10 md:mt-0"
                style={{ imageRendering: "pixelated" }}
              />
              <button
                className="absolute right-0 p-3 m-3 rounded-full bg-slate-100 md:hidden"
                onClick={closeInfo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
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
            <div className="my-4 text-gray-400">
              <h4 className="font-bold text-black">Pokedéx entry</h4>
              <p>{pokemonInfo.species.flavorText}</p>
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
              <h4 className="font-bold mb-2">Abilities</h4>
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
              <h4 className="font-bold mb-2">Stats</h4>
              <ul className="flex flex-row justify-evenly">
                {pokemonInfo.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="bg-gray-100 rounded-2xl p-1">
                    <li
                      className={`p-2 ${
                        colorStats[stat.stat.name]
                      } rounded-full text-white font-bold`}
                      style={{ fontSize: 12 }}
                    >
                      {statAbbreviations[stat.stat.name]}
                    </li>
                    <li className="font-bold text-sm mt-1">{stat.base_stat}</li>
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
