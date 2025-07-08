import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders the heading "Pomotask"', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: /Pomotask/i })
    expect(heading).toBeInTheDocument()
  })
})