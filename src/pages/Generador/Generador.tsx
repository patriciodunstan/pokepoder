import { PoderSimple } from "./components/PoderSimple";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
export const Generador = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Generador</h1>
        <PoderSimple />
        <button
          className={styles.button}
          onClick={handleClick}
        >
          Volver
        </button>
      </div>
    </>
  );
};
