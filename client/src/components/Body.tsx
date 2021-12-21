import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Map from '../objects/Map'
import Note from '../objects/Note'
import MapService from '../services/MapService'
import NoteService from '../services/NoteService'

export default function Body() {
  const {isAuthenticated, user} = useAuth0()
  const [notesState, setNotesState] = useState<Note[]>([])
  const [userIdState, setUserIdState] = useState<string | undefined>()

  useEffect(() => {
    setUserIdState(user?.sub?.replace('|', ''))
    if (isAuthenticated && !!userIdState) {
      MapService.getUserMap(userIdState)
        .then(async map => setNotesState(await NoteService.getMapNotes(map.getId)))
        .catch(() => MapService.createUserMap(new Map(userIdState)))
    }

  }, [isAuthenticated, user?.sub, userIdState])

  return <>{
    isAuthenticated ? <>{notesState.map((note, index) => (
      <div key={index}>{note.getTitle}</div>
    ))}</> : <>Login to view your notes.</>
  }</>
}
