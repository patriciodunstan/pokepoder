import { useEffect, useState } from "react";
import usePokemon from "../../../hooks/usePokemon";
import usePokedexes from "../../../hooks/usePokedexes";
import { PokemonRoot } from "../../../interface/Pokemon";
import { PokedexesRoot } from "../../../interface/Pokedex";
import styles from "./style.module.css";

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
  } = usePokedexes("https://pokeapi.co/api/v2/pokedex/4");
  console.log("pokedexes", pokedexes);

  useEffect(() => {
    if (pokemon) {
      setPokemonData({
        abilities: pokemon.abilities,
        base_experience: pokemon.base_experience,
        cries: pokemon.cries,
        forms: pokemon.forms,
        game_indices: pokemon.game_indices,
        height: pokemon.height,
        held_items: pokemon.held_items,
        id: pokemon.id,
        is_default: pokemon.is_default,
        location_area_encounters: pokemon.location_area_encounters,
        moves: pokemon.moves,
        name: pokemon.name,
        order: pokemon.order,
        past_abilities: pokemon.past_abilities,
        past_types: pokemon.past_types,
        species: pokemon.species,
        sprites: pokemon.sprites,
        stats: pokemon.stats,
        types: pokemon.types,
        weight: pokemon.weight,
      });
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokedexes) {
      setPokedexData({
        Root: pokedexes.Root,
        descriptions: pokedexes.descriptions,
        id: pokedexes.id,
        is_main_series: pokedexes.is_main_series,
        name: pokedexes.name,
        names: pokedexes.names,
        pokemon_entries: pokedexes.pokemon_entries,
        region: pokedexes.region,
        version_groups: pokedexes.version_groups,
      });
    }
  }, [pokedexes]);

  if (pokemonLoading || pokedexesLoading) {
    return <p>Loading...</p>;
  }

  if (pokemonError || pokedexesError) {
    return <p>Error: {pokemonError || pokedexesError}</p>;
  }

  function capitalizeName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>PODER SIMPLE</h2>
      <div className={styles.section}>
        <p>
          Yo, <b>{capitalizeName(pokemonData?.name ?? "")}</b>, chileno(a),
          mayor de edad, domiciliado(a) en{" "}
          <b>{capitalizeName(pokedexData?.name ?? "")}</b>, con cédula de
          identidad número <b>{pokemonData?.id}</b>, otorgo poder simple a
          Global, chileno(a), mayor de edad, domiciliado(a) en{" "}
          <b>{capitalizeName(pokedexData?.name ?? "")}</b>, par a que me
          represente y gestione en todos los actos y contratos relacionados con
          el ámbito del poder, por ejemplo: gestiones bancarias, trámites
          administrativos, representación legal, etc.
        </p>
        <p>
          Este poder se otorga con todas las facultades necesarias para que el
          apoderado pueda actuar en mi nombre, realizar cobros, firmar
          documentos, presentar y retirar documentos, y en general, ejercer
          todos los actos y contratos necesarios para el cumplimiento de los
          fines del presente poder.
        </p>
        <p>
          Se otorga este poder en la ciudad de{" "}
          <b>{capitalizeName(pokedexData?.name ?? "")}</b>, con fecha{" "}
          <b>{currentDate}</b>.
        </p>
      </div>

      <hr className={styles.hrDivider} />

      <div className={styles.sectionFirm}>
        <hr className={styles.hrFirm} />
        <p>
          <b>{capitalizeName(pokemonData?.name ?? "")}</b>
        </p>
        <p>
          <b>Rut: {pokemonData?.id}</b>
        </p>
      </div>
    </div>
  );
};
