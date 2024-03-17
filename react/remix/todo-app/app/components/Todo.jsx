/* eslint-disable react/prop-types */
import { useNavigate, useFetcher } from '@remix-run/react'

function Todo({ todo }) {
  const navigate = useNavigate()

  const fetcher = useFetcher()
  const isDeleting = fetcher.state !== 'idle'

  const handleEdit = () => {
    navigate(`/todos/${todo.id}`)
  }

  const handleDelete = () => {
    fetcher.submit(
      { id: todo },
      {
        method: 'delete',
        action: `/todos/${todo.id}`,
      }
    )
  }

  return (
    <>
      <div className="card mb-3">
        <div
          className="card-body flex"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <p className="card-text m-0">{todo.todo}</p>
          <div>
            <button
              type="button"
              className="btn btn-success btn-sm px-4"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              disabled={isDeleting}
              className="btn btn-danger btn-sm ms-3 px-3"
              onClick={handleDelete}
            >
              {isDeleting ? 'Deleting' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
