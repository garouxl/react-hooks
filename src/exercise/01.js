// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          autoComplete="off"
          value={name}
          onChange={handleChange}
          id="name"
        />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function Counter () {
  const [value, setValue] = React.useState(0)
  return <button onClick={() => setValue(value + 1)}>{value}</button>
}

function App() {
  return (
    <>
      <Greeting initialName="Leandro" />
      <Counter />
    </>
  )
}

export default App
