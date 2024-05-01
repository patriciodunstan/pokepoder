import { useEffect, useState } from "react";
import { PokemonRoot } from "../interface/Pokemon";

function usePokemon(url: string) {
  const [pokemon, setPokemon] = useState<PokemonRoot>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log("pokemon data", data);
        setPokemon(data);
        setLoading(loading);
      };
      fetchPokemon();
    } catch (error: unknown) {
      setError((error as Error).message);
      setLoading(!loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { pokemon, loading, error };
}

export default usePokemon;
