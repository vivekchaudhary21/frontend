import React, { useState } from 'react';
import { useBooksContext } from './BooksContext';

export const BookCreate = () => {
  const [value, setValue] = useState('');
  const { dispatch } = useBooksContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    value && dispatch({ type: 'add', payload: value });
    setValue('');
  };

  return (
    <>
      <h1>Reading Lists</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Add Book:
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <button>Add</button>
      </form>
    </>
  );
};
