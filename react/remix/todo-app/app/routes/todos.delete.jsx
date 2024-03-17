import { redirect } from '@remix-run/react'
import axios from 'axios'

export function loader() {
  return redirect('/')
}

export async function action() {
  const { data } = await axios.get('http://localhost:4000/todos')
  for (let i = 0; i < data.length; i++) {
    await axios.delete(`http://localhost:4000/todos/${data[i].id}`)
  }

  return redirect('/')
}
