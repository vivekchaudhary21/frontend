import { useLoaderData } from '@remix-run/react'
import Todo from './Todo'

export default function TodoList() {
  const todos = useLoaderData()

  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  )
}
