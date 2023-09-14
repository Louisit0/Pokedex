import { useState, useEffect } from "react";
import ColoresTipo from "../utilities/ColoresTipo";
import PokeInfo from "./PokeInfo";

const ListaPokemon = ({
  pokemonInfo,
  setPokemonInfo,
  infoIsClicked,
  setInfoIsClicked,
}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState({});
  const [limitRender, setLimitRender] = useState(50);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limitRender}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setPokemonData(data.results);

        // Para cada Pokémon, obtén sus tipos y almacénalos en el estado
        data.results.forEach(async (pokemon) => {
          const response = await fetch(pokemon.url);
          if (response.ok) {
            const pokemonDetails = await response.json();
            console.log(pokemonDetails);

            // Obtén la URL de la especie
            const speciesUrl = pokemonDetails.species.url;

            // Realiza una solicitud para obtener los detalles de la especie
            const speciesResponse = await fetch(speciesUrl);
            if (speciesResponse.ok) {
              const speciesData = await speciesResponse.json();

              // Encuentra la entrada de texto en el idioma "en" (inglés)
              const flavorTextEntry = speciesData.flavor_text_entries.find(
                (entry) => entry.language.name === "en"
              );

              if (flavorTextEntry) {
                const flavorText = flavorTextEntry.flavor_text;
                console.log(flavorText);

                // Almacena los detalles del Pokémon en una variable local
                const pokemonDetail = {
                  name: pokemonDetails.name,
                  types: pokemonDetails.types.map((type) => type.type.name),
                  height: pokemonDetails.height,
                  weight: pokemonDetails.weight,
                  stats: pokemonDetails.stats,
                  abilities: pokemonDetails.abilities,
                  species: {
                    name: speciesData.name,
                    url: speciesUrl,
                    flavorText: flavorText,
                  },
                };
                setPokemonTypes((prevTypes) => ({
                  ...prevTypes,
                  [pokemon.name]: pokemonDetail,
                }));
              }
            }
          }
        });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [limitRender]);

  const mostrarDetalles = (pokemon, index) => {
    setInfoIsClicked(true);
    console.log("isClicked??: " + infoIsClicked);

    // Usa los detalles del Pokémon almacenados en pokemonTypes
    const pokemonDetail = pokemonTypes[pokemon.name] || {};
    setPokemonInfo({
      id: index + 1,
      name: pokemonDetail.name,
      types: pokemonDetail.types || [],
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
        index + 1
      }.gif`,
      height: pokemonDetail.height || 0,
      weight: pokemonDetail.weight || 0,
      stats: pokemonDetail.stats,
      abilities: pokemonDetail.abilities,
      species: pokemonDetail.species,
    });
    console.log("pokemonInfo: ", pokemon);
  };

  const cargarMas = () => {
    setLimitRender((prevLimit) => prevLimit + 50);
    console.log("Cargando más: ", limitRender);
  };

  return (
    <div className="h-screen flex flex-row w-full gap-4">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-100">
          {pokemonData.map((pokemon, index) => (
            <a
              key={index}
              className="cursor-pointer"
              onClick={() => mostrarDetalles(pokemon, index)}
            >
              <div className="bg-white p-4 rounded-xl text-center capitalize shadow-sm">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                  alt={pokemon.name}
                  className="mx-auto"
                />
                <p className="font-bold text-gray-400">#{index + 1}</p>
                <h3 className="font-bold mb-2">{pokemon.name}</h3>
                <div className="flex flex-row justify-center gap-2">
                  {pokemonTypes[pokemon.name] &&
                    pokemonTypes[pokemon.name].types.map((type, typeIndex) => (
                      <span
                        key={typeIndex}
                        className={`px-4 py-1 self-center rounded-lg font-bold text-sm ${
                          ColoresTipo[type] || "bg-gray-500"
                        }`}
                      >
                        {type}
                      </span>
                    ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={cargarMas}
            className="py-2 px-8 bg-blue-900 font-bold rounded-2xl text-white my-10 w-1/2"
          >
            Cargar más
          </button>
        </div>
      </div>
      {/* Futuro: que cargue a medida que scrolleas */}
    </div>
  );
};

export default ListaPokemon;
