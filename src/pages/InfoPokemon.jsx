import { useContext, useEffect, useState } from "react"
import { PageContext } from "../context/PageContext"
import { LayoutDashboard } from "lucide-react"

const InfoPokemon = () => {
  const {
    pokemonSeleccionado,
    setPokemonSeleccionado
  } = useContext(PageContext)

  const [pokemon, setPokemon] = useState();

  const leerInfoPokemon = async () => {
    const respuesta = await fetch(pokemonSeleccionado.url);
    const info = await respuesta.json();
    setPokemon(info);
  }

  useEffect(() => {
    return () => {
      leerInfoPokemon()
    }
  }, [])


  const pokemonTypesColors = {
    normal: "bg-stone-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-500",
    fighting: "bg-red-700",
    poison: "bg-purple-600",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ghost: "bg-violet-700",
    dragon: "bg-indigo-700",
    dark: "bg-zinc-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-300",
    stellar: "bg-teal-400",
    unknown: "bg-gray-500",
  }



  return (
    <div className="p-4 flex justify-between">
      <button
        className=" text-red-900 border rounded border-red-900 px-2 py-1 flex gap-1 h-fit"
        onClick={() => setPokemonSeleccionado(null)} >
        <LayoutDashboard />
        Regresar
      </button>
      <section >
        {pokemon && (
          <>
            <h1 className=" text-xl font-bold capitalize text-center">{pokemonSeleccionado.name}</h1>
            <div className=" text-xl font-bold text-slate-600 flex gap-1">
              #{pokemon.id}
              <div className={` rounded-[100%]  p-4 flex justify-center items-center ${pokemonTypesColors[pokemon.types[0].type.name]}`} >
                <img
                  className="w-[150px] h-[150px]"
                  src={pokemon.sprites.other.dream_world.front_default} />
              </div>
            </div>
            <div>
              {/* info pokemon */}
              {pokemon.stats.map((stat, i) => {
                return (
                  <div key={i} className="w-full"  >
                    <p className="text-sm text-slate-600 capitalize flex justify-between">{stat.stat.name}
                      <span>{stat.base_stat}</span></p>
                    <div className="w-full bg-gray-200 h-4 rounded-xl">
                      <div className={` h-full rounded-xl ${pokemonTypesColors[pokemon.types[0].type.name]}` }
                        style={{
                          width: `${stat.base_stat/200*100}%`
                        }}
                       ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </section>
      {/* tipos */}
      <section className=" pe-7">
        <p>Tipos: </p>
        <ul className=" flex gap-2">
          {pokemon && pokemon.types.map((type,i)=>{
            return (
              <li key={i}
                className={`rounded px-2 py-1 text-white ${pokemonTypesColors[type.type.name]} text-center font-bold capitalize `}
              
              >{type.type.name}</li>
            )
          })}

        </ul>
        <p>Peso: </p>
        <p>{pokemon && (pokemon.weight/10)} kg</p>
      </section>
    </div>
  )
}
export default InfoPokemon