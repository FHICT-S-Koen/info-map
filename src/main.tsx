/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import NavBar from './components/NavBar'
import Canvas from './components/Canvas'

const app = () => <>
  <NavBar />
  <Canvas />
</>

render(app,
	document.getElementById('root') as HTMLElement
)
