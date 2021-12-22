import { render, screen } from '@testing-library/react'
import Body from '../components/Body'

test('should equal rendered text before login', () => {
  render(<Body />)
  expect(screen.getByText('Login to view your notes.')).toBeInTheDocument()
})

// test('should show notes when logged in', () => {
//   const bodyComponent = shallow(<Body />);
//   expect(screen.getByText('Login to view your notes.')).toBeInTheDocument()
// })
