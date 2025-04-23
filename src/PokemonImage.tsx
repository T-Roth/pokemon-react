import LazyImage from "./LazyImage";

type PokemonImageProps = {
    name: string;
}

export default function PokemonImage({name}: PokemonImageProps) {
    const url = `https://img.pokemondb.net/artwork/${name}.jpg`;
    return <LazyImage src={url} width={100} height={100} />
}