import { useState } from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <a href="#" style={padding}>anecdotes</a>
      <a href="#" style={padding}>create new</a>
      <a href="#" style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a =>
        <li key={a.id}>
          {a.content}
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an incident.
    </em>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for Full Stack Open.
  </div>
)

const App = () => {
  const [anecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'https://stackify.com/premature-optimization-evil/',
      votes: 0,
      id: 2,
    },
  ])

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <Footer />
    </div>
  )
}

export default App
