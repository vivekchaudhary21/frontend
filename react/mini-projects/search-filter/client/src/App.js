import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Table';
// import { Users } from './users';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:4000';

  // const getFilteredData = () => {
  //   if (query) {
  //     const fileteredData = Users.filter(
  //       (user) =>
  //         user.first_name.toLowerCase().includes(query.toLowerCase()) ||
  //         user.last_name.toLowerCase().includes(query.toLowerCase()) ||
  //         user.email.toLowerCase().includes(query.toLowerCase())
  //     );
  //     return fileteredData;
  //   } else {
  //     return [];
  //   }
  // };

  // const filteredItem = getFilteredData(query);

  useEffect(() => {
    async function getData() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }

    async function getFilteredData() {
      const fileteredData = data.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query.toLowerCase()) ||
          user.last_name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setData(fileteredData);
    }

    if (query.length === 0) getData();
    if (query.length > 2) getFilteredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (loading) {
    return (
      <div className='app'>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className='app'>
      <h1>Search Bar</h1>
      <input
        type='text'
        className='search'
        value={query}
        onChange={(e) => setQuery(e?.target?.value)}
      />
      <Table data={data} />
    </div>
  );
}

export default App;
