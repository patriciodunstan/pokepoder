import { useEffect, useState } from "react";
import { PokedexesRoot } from "../interface/Pokedex";

function usePokedexes(url: string) {
  const [pokedexes, setPokedexes] = useState<PokedexesRoot>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fetchPokemon = async () => {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        console.log("pokedexes data", data);
        setPokedexes(data);
        setLoading(false);
      };
      fetchPokemon();
    } catch (error: unknown) {
      setError((error as Error).message);
      setLoading(!loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { pokedexes, loading, error };
}

export default usePokedexes;
