import React from 'react';
import { BookCreate } from './BookCreate';
import { BookList } from './BookList';
import { BooksContextProvider } from './BooksContext';

function App() {
  return (
    <BooksContextProvider>
      <BookCreate />
      <br />
      <BookList />
    </BooksContextProvider>
  );
}

export default App;
