import { Pokemon } from "./App";
import PokemonImage from "./PokemonImage";

type PokemonListProps = {
  list: Pokemon[];
  showDetails: (pokemon: Pokemon) => void;
};
export default function PokemonList({ list, showDetails }: PokemonListProps) {
  return (
    <div>
      {list.map((pokemon) => {
        return (
          <div
            key={pokemon.name}
            className="pokemonCard"
            onClick={() => showDetails(pokemon)}
          >
            <PokemonImage name={pokemon.name} />
            <span className="name">{pokemon.name}</span>
          </div>
        );
      })}
    </div>
  );
}
