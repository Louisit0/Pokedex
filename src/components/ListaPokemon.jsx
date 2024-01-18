import { useState, useEffect, useRef } from "react";
import ColoresTipo from "../utilities/ColoresTipo";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeInfo from "./PokeInfo";

const ListaPokemon = ({
  pokemonInfo,
  setPokemonInfo,
  infoIsClicked,
  setInfoIsClicked,
  searchTerm,
}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState({});
  const [loadedPokemonCount, setLoadedPokemonCount] = useState(50);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPokemonData(data.results);
        console.log(pokemonData);

        // Para cada Pokémon, obtén sus tipos y almacénalos en el estado
        data.results.forEach(async (pokemon) => {
          const response = await fetch(pokemon.url);
          if (response.ok) {
            const pokemonDetails = await response.json();
            const speciesUrl = pokemonDetails.species.url;
            const speciesResponse = await fetch(speciesUrl);
            if (speciesResponse.ok) {
              const speciesData = await speciesResponse.json();
              const flavorTextEntry = speciesData.flavor_text_entries.find(
                (entry) => entry.language.name === "en"
              );
              if (flavorTextEntry) {
                const flavorText = flavorTextEntry.flavor_text;

                const pokemonDetail = {
                  id: pokemonDetails.id,
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
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const mostrarDetalles = (pokemon, index) => {
    setInfoIsClicked(true);

    // Usa los detalles del Pokémon almacenados en pokemonTypes
    const pokemonDetail = pokemonTypes[pokemon.name] || {};
    setPokemonInfo({
      id: pokemonDetail.id,
      name: pokemonDetail.name,
      types: pokemonDetail.types || [],
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetail.id}.gif`,
      height: pokemonDetail.height || 0,
      weight: pokemonDetail.weight || 0,
      stats: pokemonDetail.stats,
      abilities: pokemonDetail.abilities,
      species: pokemonDetail.species,
    });
  };

  const cargarMas = () => {
    setLoadedPokemonCount((prevCount) => prevCount + 50);
  };

  // Filtra la lista completa de Pokémon en función de la búsqueda
  const filteredPokemon = Object.keys(pokemonTypes).filter((pokemonName) =>
    pokemonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-row w-full gap-4 px-4 lg:px-20 ${
        infoIsClicked ? "pointer-events-none opacity-5 select-none" : ""
      }`}
    >
      <div className="w-full">
        <InfiniteScroll
          dataLength={loadedPokemonCount}
          next={cargarMas}
          hasMore={true}
          loader={<div>Loading...</div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Ya no hay más pokemones :c</b>
            </p>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredPokemon
              .slice(0, loadedPokemonCount)
              .map((pokemonName, index) => (
                <a
                  key={index}
                  className="cursor-pointer"
                  onClick={() =>
                    mostrarDetalles(pokemonTypes[pokemonName], index)
                  }
                >
                  <div className="bg-zinc-800 p-4 rounded-xl text-center capitalize shadow-sm">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonTypes[pokemonName].id}.png`}
                      alt={pokemonName}
                      loading="lazy"
                      className="mx-auto"
                    />
                    <p className="font-bold text-gray-400">
                      #{pokemonTypes[pokemonName].id}
                    </p>
                    <h3 className="font-bold mb-2 text-zinc-100">
                      {pokemonName}
                    </h3>
                    <div className="flex flex-row justify-center gap-2">
                      {pokemonTypes[pokemonName].types.map(
                        (type, typeIndex) => (
                          <span
                            key={typeIndex}
                            className={`px-4 py-1 self-center rounded-lg font-bold text-sm ${
                              ColoresTipo[type] || "bg-gray-500"
                            }`}
                          >
                            {type}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </InfiniteScroll>

        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default ListaPokemon;
