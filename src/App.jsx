import { useState } from "react";
import Buscador from "./components/buscador";
import PokeInfo from "./components/PokeInfo";
import ListaPokemon from "./components/ListaPokemon";
import "./App.css";

function App() {
  const [pokemonInfo, setPokemonInfo] = useState({});

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col px-4 md:px-40">
      <div className="flex flex-row mt-8">
        <div className="w-full">
          <Buscador />
          <div className="mt-16">
            <ListaPokemon
              pokemonInfo={pokemonInfo}
              setPokemonInfo={setPokemonInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
