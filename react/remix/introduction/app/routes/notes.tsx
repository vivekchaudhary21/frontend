import type { LinksFunction } from '@remix-run/node'
import NewNote, { links as newNoteStyles } from '~/components/NewNote'

export default () => {
  return (
    <div id="main">
      <NewNote />
    </div>
  )
}

export const links: LinksFunction = () => [...newNoteStyles()]
