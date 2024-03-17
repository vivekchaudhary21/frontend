import { Form, useFetcher, useNavigation } from '@remix-run/react'
import { useEffect, useRef } from 'react'

export default function TodoInput() {
  const navigation = useNavigation()
  const isSubmitting = navigation.formMethod === 'POST'
  const inputRef = useRef()
  const fetcher = useFetcher()

  const isDeletingAll = fetcher.formMethod === 'DELETE'

  useEffect(() => {
    inputRef.current.value = ''
    inputRef.current.focus()
  }, [navigation])

  const handleDeleteAll = () => {
    fetcher.submit(null, {
      method: 'delete',
      action: `/todos/delete`,
    })
  }

  return (
    <>
      <Form className="form" method="post">
        <div className="mb-3">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            name="todo"
            required
            minLength={3}
            disabled={isSubmitting}
          />
        </div>
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Adding a todo' : 'Add'}
        </button>
        <br />
      </Form>
      <div className="delete-all mb-4">
        <button
          className="btn btn-danger"
          onClick={handleDeleteAll}
          disabled={isDeletingAll}
        >
          {isDeletingAll
            ? 'Deleting All ... Allow one second'
            : 'Delete All ❕'}
        </button>
      </div>
    </>
  )
}
