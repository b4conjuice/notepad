import Link from 'next/link'

import Page from '../../components/Page'
import Checklist from '../../components/Checklist'
import Skeleton from '../../components/styles/Skeleton'
import { searchNotes } from '../../lib/api'
import useUser from '../../lib/useUser'

export default () => {
  const path =
    typeof window !== 'undefined' ? window.location.pathname.slice(1) : ''
  const [, id] = path.split('/')

  const user = useUser({ redirectTo: `/login?next=/checklists/${id}` })
  const author = user?.email
  const { data: notes, revalidate } = searchNotes({ author, _id: id })
  if (!notes)
    return (
      <Page full>
        <main>
          <Skeleton height="100vh" />
        </main>
      </Page>
    )
  const note = notes[0]
  if (!note)
    return (
      <Page>
        <main>
          <p>you are not authorized to see this checklist</p>
          <Link href="/notes">back to notes</Link>
        </main>
      </Page>
    )
  if (!note.title.startsWith('[ '))
    return (
      <Page>
        <main>
          <p>this note is not a checklist</p>
          <Link href="/notes">back to notes</Link>
        </main>
      </Page>
    )
  return (
    <Page title={note.title.replace('[ ', '')}>
      <Checklist note={note} revalidate={revalidate} />
    </Page>
  )
}
