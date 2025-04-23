import { Pokemon } from "./App";
import PokemonImage from "./PokemonImage";

type PokemonListProps = {
    list: Pokemon[];
}
export default function PokemonList({list}: PokemonListProps) {
    return (
        <div>
            {list.map(pokemon => {
                return (
                    <div  key={pokemon.name} className="pokemonCard">
                        {/* <PokemonImage name={pokemon.name} /> */}
                        <span className="name">{pokemon.name}</span>
                    </div>
                );
            })}
        </div>
    ); 
}