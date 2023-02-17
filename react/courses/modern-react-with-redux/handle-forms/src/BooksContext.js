import React, { useContext, useReducer, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BooksContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const newBook = {
        name: action.payload,
        id: uuidv4(),
        edit: false,
      };
      return [newBook, ...state];
    }

    case 'delete': {
      return state.filter((book) => book.id !== action.payload);
    }

    case 'edit': {
      return state.map((book) => {
        if (book.id === action.payload) {
          return {
            ...book,
            edit: true,
          };
        }
        return book;
      });
    }

    case 'onTodoInputSave': {
      return state.map((book) => {
        if (book.id === action.payload.id) {
          return {
            ...book,
            edit: false,
            name: action.payload.name,
          };
        }
        return book;
      });
    }

    case 'onTodoInputCancel': {
      return state.map((book) => {
        if (book.id === action.payload) {
          return {
            ...book,
            edit: false,
          };
        }
        return book;
      });
    }

    default:
      return state;
  }
};
const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};

const useBooksContext = () => useContext(BooksContext);

export { BooksContextProvider, useBooksContext };
