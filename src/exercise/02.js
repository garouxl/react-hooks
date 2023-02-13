import * as React from 'react'

function useLocalStorageState(key, defaultValue, {
  serialize = JSON.stringify,
  deserialize = JSON.parse
} = {}) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) 
      return deserialize(valueInLocalStorage)
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue 
  })

  const prevKeyValue = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyValue.current
    if (prevKey !== key) {
      window.localStorage.removeItem(key)
    }
    prevKeyValue.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
