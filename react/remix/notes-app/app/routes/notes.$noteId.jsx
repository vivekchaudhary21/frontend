import { Link, json, useLoaderData } from '@remix-run/react'

import styles from '~/styles/note-details.css'
import { getStoredNotes } from '../data/notes'

export default function NoteDetailsPage() {
  const note = useLoaderData()
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  )
}

export async function loader({ params }) {
  const notes = await getStoredNotes()
  const note = notes.find((rec) => rec.id === params.noteId)
  if (!note)
    throw json(`Error while fetching note details with ${params.noteId}`, {
      status: 404,
    })
  return note
}

export function meta({ data }) {
  return [
    {
      title: `${data.title}`,
    },
  ]
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
