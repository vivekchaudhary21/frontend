import React from 'react';
import { BookEdit } from './Bookedit';
import { useBooksContext } from './BooksContext';

export const BookShow = ({ book }) => {
  const { dispatch } = useBooksContext();
  return (
    <div
      key={book.id}
      style={{
        border: '2px solid black',
        height: '120px',
        width: '120px',
        textAlign: 'center',
        padding: '20px 5px 0 5px',
        display: 'inline-block',
        marginRight: '5px',
      }}
    >
      <button
        onClick={() =>
          dispatch({
            type: 'delete',
            payload: book.id,
          })
        }
        style={{ marginRight: '2px' }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'edit', payload: book.id });
        }}
      >
        edit
      </button>
      <br />
      {book.edit ? <BookEdit book={book} /> : <p>{book.name}</p>}
    </div>
  );
};
