import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <div className={styles.error}>{error}</div>;
}