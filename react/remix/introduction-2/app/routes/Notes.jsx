import NewNote, { links as newNoteStyles } from '~/components/NewNote'

export default function Notes() {
  return <NewNote />
}

export function links() {
  return [...newNoteStyles()]
}
