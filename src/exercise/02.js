// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect} from 'react'

function useLocalStorage(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    // se default value for uma função complicada, sera chamada apenas uma vez
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key){
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName)

  function handleChange(event) {
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

// outro app

function initializer() {
  console.log('entrou')
  return window.localStorage.getItem('value') || 0
}

function Counter() {
  const [value, setValue] = React.useState(initializer)
  useEffect(() => {
    if (value === 10) {
      window.localStorage.setItem('value', value)
    }
  }, [value])
  return (
    <>
      <button disabled={value >= 10} onClick={() => setValue(value + 1)}>
        {value}
      </button>
      {value >= 10 && <strong>Já foram 10 clicks</strong>}
    </>
  )
}

function App() {
  return (
    <>
      <Greeting />
      <Counter />
    </>
  )
}

export default App
