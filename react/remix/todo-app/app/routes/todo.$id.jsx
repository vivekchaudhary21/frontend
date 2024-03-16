import { Link, useLoaderData, Form, redirect } from '@remix-run/react'
import axios from 'axios'
import styles from '~/styles/edit-todo.css'

export default function EditTodo() {
  const { todo } = useLoaderData()
  return (
    <div className="edit-form">
      <Form method="patch" className="form">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Your todo
          </label>
          <input className="form-control" defaultValue={todo} name="todo" />
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
  const { data } = await axios.get(`http://localhost:4000/todos/${params.id}`)
  return data
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
