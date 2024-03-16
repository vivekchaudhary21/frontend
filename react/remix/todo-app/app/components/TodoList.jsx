import { useLoaderData } from '@remix-run/react'

export default function TodoList() {
  const todos = useLoaderData()

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <div className="card mb-3">
            <div
              className="card-body flex"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <p className="card-text m-0">{todo.todo}</p>
              <div>
                <a href="/" className="card-link">
                  Edit
                </a>
                <a href="/" className="card-link">
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
