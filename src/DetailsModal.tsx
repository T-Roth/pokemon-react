import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { Pokemon } from "./App";
import { useEffect, useState } from "react";

type Ability = {
  name: string;
};

type Move = {
  name: string;
};

type Stat = {
    name: string;
}

type ApiDetailsResponse = {
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string } }[];
    moves: { move: { name: string } }[];
    cries: { latest: string; legacy: string };
};

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
        <Tabs
          defaultActiveKey="stats"
          id="details-tabs"
          className="mb-3"
          fill
        >
        <Tab eventKey="stats" title="Stats">
            {details?.stats.map(({base_stat, stat}) => {
              return (
                <div className="stat" key={stat.name}>
                  {stat.name}: {base_stat}
                </div>
              );
            })}
          </Tab> 
          <Tab eventKey="activities" title="Activities">
            {details?.abilities.map(({ ability }) => {
              return (
                <div className="activity" key={ability.name}>
                  {ability.name}
                </div>
              );
            })}
          </Tab>
          <Tab eventKey="moves" title="Moves">
            {details?.moves.map(({ move }) => {
              return (
                <div className="move" key={move.name}>
                  {move.name}
                </div>
              );
            })}
          </Tab>
          <Tab eventKey="cries" title="Cries">
            <audio
              controls
              ref={(audio) => {
                if (audio) audio.volume = 0.5; // Set volume to 50%
              }}
            >
              <track default kind="captions" />
              <source src={details?.cries.latest} type="audio/ogg" />
            </audio>
            <audio
              controls
              ref={(audio) => {
                if (audio) audio.volume = 0.5; // Set volume to 50%
              }}
            >
              <track default kind="captions" />
              <source src={details?.cries.legacy} type="audio/ogg" />
            </audio>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
