import React from "react";

const PokeInfo = () => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm bottom-0 fixed w-96 flex justify-center items-center"
      style={{ height: "82vh" }}
    >
      <div className="w-1/2 text-center">
        <h3 className="text-lg text-gray-400">
          Selecciona un pokemon para mostrar aquí
        </h3>
      </div>
    </div>
  );
};

export default PokeInfo;
