import { redirect } from '@remix-run/react'
import { v4 as createId } from 'uuid'
import axios from 'axios'

import TodoInput from '~/components/TodoInput'
import TodoList from '~/components/TodoList'
import styles from '~/styles/main.css'

export default function Index() {
  return (
    <div className="container">
      <TodoInput />
      <TodoList />
    </div>
  )
}

export async function loader() {
  const { data } = await axios.get('http://localhost:4000/todos')
  return data
}

export async function action({ request }) {
  const formData = await request.formData()
  const { todo } = Object.fromEntries(formData)
  const newTodo = {
    id: createId(),
    todo,
  }

  try {
    await axios.post('http://localhost:4000/todos', newTodo)
  } catch (error) {
    console.log(error)
  }

  return redirect('/')
}

export const links = () => [
  {
    href: styles,
    rel: 'stylesheet',
  },
]
