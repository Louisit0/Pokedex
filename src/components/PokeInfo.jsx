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

  return (
    <div
      className={`${
        infoIsClicked
          ? "fixed inset-0 bg-zinc-900 border border-zinc-800 lg:rounded-3xl z-50 flex items-center justify-center lg:w-[1000px] lg:h-[600px] m-auto"
          : "hidden"
      }`}
    >
      <div className="w-full text-center lg:relative">
        {pokemonInfo && pokemonInfo.name ? (
          <>
            {/* Tener 3 tamaños distintos:
          114 px height default, 153 px height 2da, 267 px height 3ra */}
            <div className="flex flex-row">
              <img
                src={pokemonInfo.img}
                alt={pokemonInfo.name}
                className="mx-auto object-contain h-40 lg:absolute inset-x-0 lg:top-[-125px]"
                style={{ imageRendering: "pixelated" }}
              />
              <button
                className="absolute right-0 p-3 m-3 rounded-full bg-zinc-500 md:hidden"
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

            <div className="mt-10">
              <p className="text-gray-400 font-bold">N° {pokemonInfo.id}</p>
              <h3 className="text-2xl font-bold capitalize mb-2 text-zinc-50">
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
                <h4 className="font-bold text-zinc-50">Pokedéx entry</h4>
                <p>{pokemonInfo.species.flavorText}</p>
              </div>
              <div className="grid grid-cols-2 mx-2 gap-x-4 gap-y-2">
                <h4 className="font-bold text-zinc-50">Height</h4>
                <h4 className="font-bold text-zinc-50">Weight</h4>
                <p className="p-2 rounded-2xl bg-zinc-500 text-zinc-50 px-1 py-0.5">
                  {pokemonInfo.height / 10} m
                </p>
                <p className="p-2 rounded-2xl bg-zinc-500 text-zinc-50 px-1 py-0.5">
                  {pokemonInfo.weight / 10} kg
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2 text-zinc-50">Abilities</h4>
                <ul className="flex flex-row mx-2 gap-x-4 gap-y-2">
                  {pokemonInfo.abilities.map((abilitie, index) => (
                    <li
                      className="px-1 py-0.5 rounded-2xl bg-zinc-500 capitalize w-full text-zinc-50"
                      key={index}
                    >
                      {abilitie.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2 text-zinc-50">Stats</h4>
                <ul className="flex flex-row justify-evenly gap-1">
                  {pokemonInfo.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="bg-zinc-500 rounded-full p-1 flex flex-col"
                    >
                      <li
                        style={{ fontSize: 10 }}
                        className={`w-7 h-7 flex items-center justify-center ${
                          colorStats[stat.stat.name]
                        } rounded-full text-black font-bold`}
                      >
                        {statAbbreviations[stat.stat.name]}
                      </li>
                      <li className="font-bold text-sm mt-1 text-zinc-50 mb-1">
                        {stat.base_stat}
                      </li>
                    </div>
                  ))}
                  <div className="bg-emerald-700 rounded-full p-1 flex flex-col">
                    <li
                      style={{ fontSize: 10 }}
                      className={`w-7 h-7 flex items-center justify-center rounded-full text-black font-bold bg-emerald-500`}
                    >
                      TOT{" "}
                    </li>
                    <li className="font-bold text-sm mt-1 text-zinc-50">534</li>
                  </div>
                </ul>
                <button
                  onClick={() => setInfoIsClicked(false)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Cerrar
                </button>
              </div>
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
