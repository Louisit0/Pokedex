import { useState, useEffect } from "react";
import ColoresTipo from "../utilities/ColoresTipo";

const ListaPokemon = ({ pokemonInfo, setPokemonInfo }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState({});

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=30"
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
            setPokemonTypes((prevTypes) => ({
              ...prevTypes,
              [pokemon.name]: pokemonDetails.types.map(
                (type) => type.type.name
              ),
            }));
          }
        });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  const mostrarDetalles = (pokemon, index) => {
    setPokemonInfo({
      id: index + 1,
      name: pokemon.name,
      types: pokemonTypes[pokemon.name] || [],
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
        index + 1
      }.gif`,
    });
    console.log("pokemonInfo: ", pokemon);
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-4 gap-5">
        {pokemonData.map((pokemon, index) => (
          <a
            key={index}
            className="cursor-pointer"
            onClick={() => mostrarDetalles(pokemon, index)}
          >
            <div className="bg-white p-4 rounded-xl text-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={pokemon.name}
                className="mx-auto"
              />
              <p className="font-bold text-gray-400">#{index + 1}</p>
              <h3 className="font-bold mb-2">{pokemon.name}</h3>
              <div className="flex flex-row justify-evenly">
                {pokemonTypes[pokemon.name] &&
                  pokemonTypes[pokemon.name].map((type, typeIndex) => (
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
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ListaPokemon;
