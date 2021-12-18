import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Map from '../objects/Map'
import Note from '../objects/Note'
import MapService from '../services/MapService'
import NoteService from '../services/NoteService'

export default function Body() {
  const { isAuthenticated, user } = useAuth0()
  const [notesState, setNotesState] = useState<Note[]>([])

  useEffect(() => {

    if (isAuthenticated)
      MapService.getUserMap('test')
        .catch(() => MapService.createUserMap(new Map('test')))
        .then(async map => setNotesState(await NoteService.getMapNotes(map.getId)))

  }, [isAuthenticated, user?.email])

  return <>{
    isAuthenticated ? <>{notesState.map((note, index) => (
      <div key={index}>{note.getTitle}</div>
    ))}</> : <>Login to view your notes.</>
  }</>
}
