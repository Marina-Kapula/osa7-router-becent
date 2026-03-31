import { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'
import { useField } from './hooks/index.js'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a =>
        <li key={a.id}>
          <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))

  if (!anecdote) {
    return <div>Anecdote not found</div>
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>author: {anecdote.author}</div>
      <div>info: <a href={anecdote.info}>{anecdote.info}</a></div>
      <div>votes: {anecdote.votes}</div>
    </div>
  )
}

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
    <br />
    Anecdote app for Full Stack Open.
  </div>
)

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()

    addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
    })

    content.reset()
    author.reset()
    info.reset()
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
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

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    const withId = {
      ...anecdote,
      id: (Math.random() * 10000).toFixed(0),
    }

    setAnecdotes(anecdotes.concat(withId))
    setNotification(`a new anecdote '${withId.content}' created`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Router>
        <Menu />

        {notification && <div>{notification}</div>}

        <Routes>
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route
            path="/create"
            element={<CreateNew addNew={addNew} />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
        </Routes>
      </Router>

      <Footer />
    </div>
  )
}

export default App