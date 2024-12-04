import useSWR from "swr";
import styles from "./status.module.css";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1 className={styles.title}>Status</h1>
      <UpdateAt />
    </>
  );
}
function UpdateAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>Atualizado em: {updatedAtText}</p>
      {!isLoading && data && (
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.key}>Versão:</span>
            <span className={styles.value}>
              {data.dependencies.database.version}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.key}>Máximo de conexões:</span>
            <span className={styles.value}>
              {data.dependencies.database.max_connections}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.key}>Conexões abertas:</span>
            <span className={styles.value}>
              {data.dependencies.database.opened_connections}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
