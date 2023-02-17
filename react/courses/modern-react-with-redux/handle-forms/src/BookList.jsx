import React from 'react';
import { BookShow } from './BookShow';
import { useBooksContext } from './BooksContext';

export const BookList = () => {
  const { state } = useBooksContext();

  return (
    <>
      {state.map((book) => (
        <BookShow key={book.id} book={book} />
      ))}
    </>
  );
};
