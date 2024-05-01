import { FormSelector } from "./component/FormSelector";

import styles from "./styles.module.css";

export const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <h1>Gerador de Poder Simple</h1>
        <FormSelector />
      </div>
    </>
  );
};
