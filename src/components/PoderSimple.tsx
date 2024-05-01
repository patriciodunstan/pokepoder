import { useEffect, useState } from "react";
import usePokemon from "../hooks/usePokemon";
import usePokedexes from "../hooks/usePokedexes";
import { PokemonRoot } from "../interface/Pokemon";
import { PokedexesRoot } from "../interface/Pokedex";

export const PoderSimple = () => {
  const [pokemonData, setPokemonData] = useState<PokemonRoot>();
  const [pokedexData, setPokedexData] = useState<PokedexesRoot>();
  const {
    pokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemon("https://pokeapi.co/api/v2/pokemon/1");
  console.log("pokemon", pokemon);
  const {
    pokedexes,
    loading: pokedexesLoading,
    error: pokedexesError,
  } = usePokedexes("https://pokeapi.co/api/v2/pokedex");
  console.log("pokedexes", pokedexes);

  useEffect(() => {
    if (pokemon) {
      setPokemonData({
        name: pokemon.name,
        id: pokemon.id,
      });
    }
  }, []);

  useEffect(() => {
    if (pokedexes) {
      setPokedexData({
        name: pokedexes.name,
      });
    }
  }, []);

  if (pokemonLoading || pokedexesLoading) {
    return <p>Loading...</p>;
  }

  if (pokemonError || pokedexesError) {
    return <p>Error: {pokemonError || pokedexesError}</p>;
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <h2>PODER SIMPLE</h2>
      <p>
        Yo, {pokemonData?.name}, chileno(a), mayor de edad, domiciliado(a) en{" "}
        {pokedexData?.name}, con cédula de identidad número {pokemonData?.id},
        otorgo poder simple a Globant, chileno(a), mayor de edad, domiciliado(a)
        en {pokedexData?.name}, para que me represente y gestione en todos los
        actos y contratos relacionados con el ámbito del poder, por ejemplo:
        gestiones bancarias, trámites administrativos, representación legal,
        etc.
      </p>
      <p>
        Este poder se otorga con todas las facultades necesarias para que el
        apoderado pueda actuar en mi nombre, realizar cobros, firmar documentos,
        presentar y retirar documentos, y en general, ejercer todos los actos y
        contratos necesarios para el cumplimiento de los fines del presente
        poder.
      </p>
      <p>
        Se otorga este poder en la ciudad de {pokedexData?.name}, con fecha{" "}
        {currentDate}.
      </p>
      <hr />
    </div>
  );
};
