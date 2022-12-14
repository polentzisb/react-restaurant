import React from "react";

function Intro() {
  return (
    <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
      <h1 className="text-4xl md:text-7xl text-white mb-1 md:mb-3 font-bold">
        Polentzi Saavedra
      </h1>
      <p className="text-base md:text-xl mb-3 font-medium text-white">
        {" "}
        Full Stack Web Developer
      </p>
      <p className="text-sm max-w-xl mb-6 font-bold text-white">
        Hola mi nombre es Polentzi Saavedra, comencé mi camino en el desarrollo
        web de forma autodidacta a principios del 2021 como un hobby. Después de
        un tiempo quise darle un enfoque más profesional y realice un Bootcamp
        enfocado en el stack MERN. Me apasiona escribir código y resolver
        problemas que simplifiquen la vida cotidiana. Me gusta trabajar en el
        Frontend para plasmar colores y formas distintivas.
      </p>
    </div>
  );
}

export default Intro;
