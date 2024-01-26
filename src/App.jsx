import { useState } from "react";
import Buscador from "./components/Buscador";
import PokeInfo from "./components/PokeInfo";
import ListaPokemon from "./components/ListaPokemon";
import "./App.css";

function App() {
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [infoIsClicked, setInfoIsClicked] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex flex-row mt-8">
        <div className="w-full">
          {/* <Buscador onSearch={handleSearch} /> */}
          <div className="mt-16">
            <ListaPokemon
              pokemonInfo={pokemonInfo}
              setPokemonInfo={setPokemonInfo}
              infoIsClicked={infoIsClicked}
              setInfoIsClicked={setInfoIsClicked}
              searchTerm={searchTerm}
            />
          </div>
        </div>
        <div>
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
