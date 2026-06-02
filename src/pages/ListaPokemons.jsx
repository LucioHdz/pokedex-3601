import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ListPlus, ScanSearch } from "lucide-react";

//Se ejecuta JavaScript

const ListaPokemons = () => {

    // Se ejecuta JSX

    const URL = "https://pokeapi.co/api/v2/pokemon/";
    const [pokemons, setPokemons] = useState([]);
    const [filtroPokemons, setFiltroPokemons] = useState([]);
    const [next, setNext] = useState(null);


    const obtenerPokemons = async (url) => {
        try {
            const resultado = await fetch(url);
            const datosPokemon = await resultado.json();
            setPokemons([...pokemons, ...datosPokemon.results]);
            setFiltroPokemons([...pokemons, ...datosPokemon.results]);
            setNext(datosPokemon.next);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        obtenerPokemons(URL);
    }, []);


    const eventoBusqueda = (e) => {
        const pokemonBusqueda = e.target.value;

        const listaNueva = pokemons.filter(pkm => pkm.name.includes(pokemonBusqueda.trim()))
        setFiltroPokemons(listaNueva)
        if (pokemonBusqueda.trim() == "") setFiltroPokemons(pokemons)
    }

    return (
        <section>
            <div className=" flex justify-center mb-10">
                <form className="flex  border-2 border-red-900 px-2">
                    <input type="text" placeholder="Buscar un pokemon..."
                        onChange={eventoBusqueda}
                        className="outline-none"
                    />
                    <ScanSearch className="text-red-900" />
                </form>
            </div>


            <ul className="flex flex-wrap w-full justify-center gap-2">
                {filtroPokemons.map((pokemon, indice) => (
                    <Card
                        key={pokemon.name}
                        url={pokemon.url}
                        nombre={pokemon.name}
                        noPokemon={indice + 1}
                        pokemon = {pokemon}
                        
                    />
                )
                )}
            </ul>
            <div className="flex w-full justify-center my-10">
                {
                    next &&
                    <button onClick={() => obtenerPokemons(next)}
                        className=" flex gap-1 bg-red-900 text-white px-2 py-1 rounded shadow cursor-pointer"> <ListPlus /> Mostrar mas</button>
                }
            </div>
        </section>
    )
}
export default ListaPokemons