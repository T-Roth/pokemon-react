import { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";

export type Pokemon = {
  name: string;
  url?: string;
};

type ApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string>();
  const [prevPageUrl, setPrevPageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(currentPageUrl, { signal })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data: ApiResponse) => {
        setPokemonList(data.results);
        setNextPageUrl(data.next)
        setPrevPageUrl(data.previous)
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl!);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl!);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList list={pokemonList} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : undefined}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : undefined}
      />
    </>
  );
}

export default App;
