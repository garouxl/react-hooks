// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import { useState } from 'react'

function Greeting(): number {
  const [name, setName] = useState('Leandro')

  function handleChange({target: {value}}) {
    setName(value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
