import { useState, lazy, Suspense } from "react";
import Buscador from "./components/Buscador";
import PokeInfo from "./components/PokeInfo";
import ListaPokemon from "./components/ListaPokemon";
import "./App.css";

// Implementacion del lazy loading...
const LazyPokemonList = lazy(() => import("./components/ListaPokemon"));

function App() {
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [infoIsClicked, setInfoIsClicked] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="h-screen w-full flex flex-col px-4 md:px-40">
      <div className="flex flex-row mt-8">
        <div className="w-full">
          <Buscador onSearch={handleSearch} />
          <div className="mt-16">
            <Suspense fallback={<div>Loading...</div>}>
              <ListaPokemon
                pokemonInfo={pokemonInfo}
                setPokemonInfo={setPokemonInfo}
                infoIsClicked={infoIsClicked}
                setInfoIsClicked={setInfoIsClicked}
                searchTerm={searchTerm}
              />
            </Suspense>
          </div>
        </div>
        <div className="md:w-1/2">
          <PokeInfo
            pokemonInfo={pokemonInfo}
            infoIsClicked={infoIsClicked}
            setInfoIsClicked={setInfoIsClicked}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
