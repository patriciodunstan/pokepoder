import { useNavigate } from "react-router-dom";
import usePokemon from "../../../hooks/usePokemon";
import styles from "./styes.module.css";
export const FormSelector = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const handleClick = () => {
    navigate("/poder-simple");
  };

  const { pokemon, loading, error } = usePokemon(
    "https://pokeapi.co/api/v2/pokemon/1"
  );
  console.log("pokemon", pokemon);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      {" "}
      {/* Aplica la clase container */}
      <div className={styles.formContainer}>
        {" "}
        {/* Aplica la clase formContainer */}
        <form
          onSubmit={handleSubmit}
          key={pokemon?.id}
        >
          <select>
            <option value="">Selecciona un Rut</option>
            <option value="">{pokemon?.id}</option>
          </select>
          <button onClick={handleClick}>Generar Poder Simple</button>
        </form>
      </div>
    </div>
  );
};
