import {
  Link,
  useLoaderData,
  Form,
  redirect,
  json,
  useRouteError,
} from '@remix-run/react'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import styles from '~/styles/edit-todo.css'

export default function EditTodo() {
  const { todo } = useLoaderData()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className="edit-form">
      <Form method="patch" className="form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Your todo
          </label>
          <input
            ref={inputRef}
            className="form-control"
            defaultValue={todo}
            name="todo"
          />
        </div>

        <button className="btn btn-primary me-3">Submit</button>
        <Link to="/">
          <button className="btn btn-primary">Cancel</button>
        </Link>
      </Form>
    </div>
  )
}

export async function loader({ params }) {
  try {
    const { data } = await axios.get(`http://localhost:4000/todos/${params.id}`)
    return data
  } catch (error) {
    throw json(
      { message: `There is no todo with this id ${params.id}` },
      { status: 401 }
    )
  }
}

export async function action({ request, params }) {
  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const todo = Object.fromEntries(formData)
    await axios.patch(`http://localhost:4000/todos/${params.id}`, todo)
  }
  if (request.method === 'DELETE') {
    await axios.delete(`http://localhost:4000/todos/${params.id}`)
  }
  return redirect('/')
}

export function links() {
  return [
    {
      href: styles,
      rel: 'stylesheet',
    },
  ]
}

export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{Error}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {error.status}
          </h6>
          <p className="card-text">{error.data.message}</p>
        </div>
      </div>
    </div>
  )
}
