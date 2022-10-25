import { useState, useEffect, useRef } from 'react';
import './App.css';

const URL =
  'https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json';

function App() {
  const [imgData, setImgData] = useState([]);
  const footerRef = useRef(null);

  useEffect(() => {
    const getData = () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          setImgData((prevData) => prevData.concat(data.items));
        });
    };

    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        console.warn('data load will happen now');
        getData();
      }
    };

    let options = {
      root: null,
      rootMargins: '5px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector('footer'));
    getData();
  }, []);

  console.log('img', imgData);
  return (
    <div className='App'>
      <header>
        <h1>Infinite Scroll | Lazy Load</h1>
        <h2>Loading images gradually as needed</h2>
      </header>
      <main>
        {imgData.length > 0 &&
          imgData.map((item, index) => (
            <figure key={index}>
              <img src={item.img} alt={item.name} />
              <figcaption>{item.name}</figcaption>
            </figure>
          ))}
      </main>
      <footer ref={footerRef}>
        <p>The Footer. &copy; 2019 Turkey Stuff Inc.</p>
      </footer>
    </div>
  );
}

export default App;
