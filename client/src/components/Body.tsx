import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Map from '../objects/Map'
import Note from '../objects/Note'
import MapService from '../services/MapService'

export default function Body() {
  const { isAuthenticated, user } = useAuth0()
  const [mapState, setMapState] = useState<Map>()
  const [notesState, setNotesState] = useState<Note[]>([new Note('test', 'test')])

  useEffect(() => {

    if (isAuthenticated)
      (async () => setMapState(
        await MapService.getUserMap(`${user?.email}`)
          .catch(async () => await MapService.createUserMap(new Map(`${user?.email}`)))
      ))()

  }, [isAuthenticated, user?.email])

  return <>{
    isAuthenticated ? <>{notesState.map((note, index) => (
      <div key={index}>{note.getTitle}</div>
    ))}</> : <>Login to view your notes.</>
  }</>
}
