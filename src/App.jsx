import React, { useState } from "react"
import Header from "./components/Header"
import ListaPokemons from "./pages/ListaPokemons"
import InfoPokemon from "./pages/InfoPokemon";
import { PageContext } from "./context/PageContext";

const App = () => {
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

  return (
    <>
      <Header />
      <PageContext.Provider value={{
        pokemonSeleccionado,
        setPokemonSeleccionado
      }} >

        {pokemonSeleccionado ?
          <InfoPokemon /> :
          <ListaPokemons />
        }
      </PageContext.Provider>
    </>
  )
}
export default App