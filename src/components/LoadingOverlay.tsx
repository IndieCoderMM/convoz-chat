import styles from "../styles/loader.module.css";

const LoadingOverlay = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-dark-900 opacity-75">
      <div className={`${styles.loader}`}></div>
      <h2 className="mt-8 text-center text-xl font-semibold text-white">
        Loading...
      </h2>
      <p className="w-1/3 text-center text-white">
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default LoadingOverlay;
