import styles from '../styles/Home.module.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
