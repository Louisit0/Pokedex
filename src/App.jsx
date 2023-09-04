import { useState } from "react";
import Buscador from "./components/buscador";
import PokeInfo from "./components/PokeInfo";
import ListaPokemon from "./components/ListaPokemon";
import "./App.css";

function App() {
  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col px-40">
      <div className="flex flex-row gap-4 mt-8">
        <div className="w-full">
          <Buscador />
          <div className="mt-16">
            <ListaPokemon />
          </div>
        </div>
        <div className="w-1/2">
          <PokeInfo />
        </div>
      </div>
    </div>
  );
}

export default App;
