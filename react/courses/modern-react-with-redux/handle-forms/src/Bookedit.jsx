import React, { useState } from 'react';
import { useBooksContext } from './BooksContext';

export const BookEdit = ({ book }) => {
  const { dispatch } = useBooksContext();
  const [editTodoInput, setEditTodoInput] = useState(book.name);
  return (
    <p>
      <input
        style={{ width: '100%' }}
        value={editTodoInput}
        onChange={(e) => setEditTodoInput(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch({
            type: 'onTodoInputSave',
            payload: { id: book.id, name: editTodoInput },
          })
        }
      >
        Save
      </button>
      <button
        onClick={() =>
          dispatch({ type: 'onTodoInputCancel', payload: book.id })
        }
      >
        Cancel
      </button>
    </p>
  );
};
