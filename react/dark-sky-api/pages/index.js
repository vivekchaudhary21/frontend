import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  const hourIdWithMaxTemperature = data.reduce(
    (acc, val) => {
      if (val.temperature > acc.temp) {
        acc.temp = val.temperature;
        acc.id = val.time;
      }
      return acc;
    },
    { temp: -100, id: 1000 }
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>Forecast for the Next 24 Hours</h1>
      <main className={styles.main}>
        {data.map((hour) => {
          return (
            <div
              key={hour.time}
              className={`${styles.hour} ${
                hour.precipProbability > 0.5 && styles.precip
              } ${hourIdWithMaxTemperature.id === hour.time && styles.hot}`}
              title={hour.summary}
            >
              {parseInt(hour.temperature).toString().concat('\u00B0')}
              <span className={styles.span}>
                {new Date(hour.time * 1000).getHours().toString().concat(':00')}
              </span>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/darkSkyApi');
  const data = await response.json();
  return {
    props: {
      data: data.hourly.data,
    },
  };
}