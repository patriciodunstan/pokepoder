import React, { useState, useEffect } from "react";

function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon names");
        }
        const data = await response.json();
        const names = data.results.map(
          (pokemon: { name: string }) => pokemon.name
        );
        setPokemonNames(names);
      } catch (error) {
        console.error("Error fetching Pokémon names:", error);
      }
    };

    fetchPokemonNames();
  }, []);

  const fetchPokemonData = async (pokemonName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchPokemonData(selectedPokemon);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPokemon(event.target.value);
  };

  return (
    <div>
      <h2>Search for a Pokémon</h2>
      <form onSubmit={handleFormSubmit}>
        <select
          value={selectedPokemon}
          onChange={handleDropdownChange}
        >
          <option value="">Select a Pokémon</option>
          {pokemonNames.map((name, index) => (
            <option
              key={index}
              value={name}
            >
              {name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : pokemonData ? (
        <div>
          <h3>{(pokemonData as any).name}</h3>
          <img
            src={(pokemonData as any).sprites.front_default}
            alt={(pokemonData as any).name}
          />
          <p>Height: {(pokemonData as any).height}</p>
          <p>Weight: {(pokemonData as any).weight}</p>
        </div>
      ) : (
        <div>Enter a Pokémon name to search</div>
      )}
    </div>
  );
}

export default PokemonInfo;
