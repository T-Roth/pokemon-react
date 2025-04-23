import { useCallback, useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import { Spinner } from "react-bootstrap";
import DetailsModal from "./DetailsModal";

export type Pokemon = {
  name: string;
  url: string;
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
  const [selected, setSelected] = useState<Pokemon | null>(null);

  const showDetailsModal = useCallback((pokemon: Pokemon) => {
    setSelected(pokemon);
  }, [selected]);

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
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
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

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <PokemonList list={pokemonList} showDetails={showDetailsModal} />
      <DetailsModal pokemon={selected} handleClose={()=> setSelected(null)} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : undefined}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : undefined}
      />
    </>
  );
}

export default App;
