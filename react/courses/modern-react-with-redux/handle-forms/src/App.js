import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { AsyncTodosReducer } from "./AsyncTodosReducer";

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const newBook = {
        name: action.payload,
        id: uuidv4(),
        edit: false,
      };
      return [newBook, ...state];
    }

    case "delete": {
      return state.filter((book) => book.id !== action.payload);
    }

    case "edit": {
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

    case "onTodoInputSave": {
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

    case "onTodoInputCancel": {
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

function App() {
  const [value, setValue] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");
  const [state, dispatch] = useReducer(reducer, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    value && dispatch({ type: "add", payload: value });
    setValue("");
  };

  return (
    <div>
      <h1>Reading Lists</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Add Book:
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <button>Add</button>
      </form>
      <br />
      {state.map((book) => (
        <div
          key={book.id}
          style={{
            border: "2px solid black",
            height: "120px",
            width: "120px",
            textAlign: "center",
            padding: "20px 5px 0 5px",
            display: "inline-block",
            marginRight: "5px",
          }}
        >
          <button
            onClick={() =>
              dispatch({
                type: "delete",
                payload: book.id,
              })
            }
            style={{ marginRight: "2px" }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setEditTodoInput(book.name);
              dispatch({ type: "edit", payload: book.id });
            }}
          >
            edit
          </button>
          <br />
          {!book.edit ? (
            <p>{book.name}</p>
          ) : (
            <p>
              <input
                style={{ width: "100%" }}
                defaultValue={book.name}
                value={editTodoInput}
                onChange={(e) => setEditTodoInput(e.target.value)}
              />
              <button
                onClick={() =>
                  dispatch({
                    type: "onTodoInputSave",
                    payload: { id: book.id, name: editTodoInput },
                  })
                }
              >
                Save
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "onTodoInputCancel", payload: book.id })
                }
              >
                Cancel
              </button>
            </p>
          )}
        </div>
      ))}
      <AsyncTodosReducer />
    </div>
  );
}

export default App;
