import { useState } from "react";
import Buscador from "./components/Buscador";
import PokeInfo from "./components/PokeInfo";
import ListaPokemon from "./components/ListaPokemon";
import "./App.css";

function App() {
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [infoIsClicked, setInfoIsClicked] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col px-4 md:px-40">
      <div className="flex flex-row mt-8">
        <div className="w-full">
          <Buscador />
          <div className="mt-16">
            <ListaPokemon
              pokemonInfo={pokemonInfo}
              setPokemonInfo={setPokemonInfo}
              infoIsClicked={infoIsClicked}
              setInfoIsClicked={setInfoIsClicked}
            />
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
