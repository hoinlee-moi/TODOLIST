import styles from "./LoadingComponent.module.css"
const LoadingComponent = ({className}) => {
  return (
    <div className={`${className?styles.todoLoadingContainer:styles.loadingContainer}`}>
      <div className={`${className?styles.todoLoading:styles.loding}`}></div>
    </div>
  );
};

export default LoadingComponent;
