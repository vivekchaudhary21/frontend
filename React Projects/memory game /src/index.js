import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

ReactDOM.render(
  <React.StrictMode>
    <App cardImages={cardImages} />
  </React.StrictMode>,
  document.getElementById('root')
);
