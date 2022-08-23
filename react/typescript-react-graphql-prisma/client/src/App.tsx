import React from 'react';
import { useUserQuery } from './types/generatedTypes';

function App() {
  const { data, loading } = useUserQuery();
  if (loading) {
    return <p>Loading...</p>;
  }

  return <div className='App'>{JSON.stringify(data?.users)}</div>;
}

export default App;
