import styles from "./LoadingComponent.module.css"
const LoadingComponent = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loding}></div>
    </div>
  );
};

export default LoadingComponent;
