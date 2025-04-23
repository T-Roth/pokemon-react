import { Button, Modal } from "react-bootstrap";
import { Pokemon } from "./App";
import { useEffect, useState } from "react";

type Ability = {
    name: string;
}
type ApiDetailsResponse = {
    abilities: {ability: Ability}[];
}

type DetailsModalProps = {
  pokemon: Pokemon | null;
  handleClose: () => void;
};

export default function DetailsModal({
  pokemon,
  handleClose,
}: DetailsModalProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<ApiDetailsResponse>();

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    if (pokemon == null) return;

    fetch(pokemon!.url, { signal })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data: ApiDetailsResponse) => {
        setDetails(data);
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
  }, [pokemon]);

  if (!pokemon) return;

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
            details?.abilities.map(({ability})=> {
                return (
                    <div key={ability.name}>
                        {ability.name}
                    </div>
                );
            })
        }

      </Modal.Body>
    </Modal>
  );
}
