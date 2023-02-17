import { useReducer, useEffect } from "react";

const fetchData = async (api) => {
  const response = await fetch(api);
  const apidata = await response.json();
  return {
    data: apidata,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA": {
      return action.payload;
    }
    default:
      return state;
  }
};

export const AsyncTodosReducer = () => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const dispatchData = async () => {
      const { data } = await fetchData(
        "https://jsonplaceholder.typicode.com/todos"
      );
      dispatch({ type: "GET_DATA", payload: data });
    };
    dispatchData();
  }, []);

  const renderTodos = () => {
    let Component;
    if (state.length) {
      Component = (
        <div
          style={{
            border: "1px solid black",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {state.map((todo) => (
            <div
              style={{
                border: "1px solid black",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={todo.id}
            >
              <p style={{ width: "80%", textAlign: "justify" }}>{todo.title}</p>
            </div>
          ))}
        </div>
      );
    } else {
      Component = <h3>Loading Todos</h3>;
    }
    return Component;
  };

  return (
    <>
      <h1>Async Todos Reducer</h1>
      {renderTodos()}
    </>
  );
};
