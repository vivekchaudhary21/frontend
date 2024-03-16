import { Form, useNavigation } from '@remix-run/react'
import { useEffect, useRef } from 'react'

export default function TodoInput() {
  const navigation = useNavigation()
  const submitting = navigation.state !== 'idle'
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    inputRef.current.value = ''
  }, [navigation])

  return (
    <Form className="form" method="post">
      <div className="mb-3">
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          name="todo"
          required
          minLength={3}
        />
      </div>
      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Adding a todo' : 'Add'}
      </button>
    </Form>
  )
}
