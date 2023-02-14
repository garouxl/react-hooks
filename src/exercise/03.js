// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const Name = () => {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

const FavoriteAnimal = ({animal, onAnimalChange}) => (
  <div>
    <label htmlFor="animal">Favorite Animal: </label>
    <input
      id="animal"
      value={animal}
      onChange={event => onAnimalChange(event.target.value)}
    />
  </div>
)

const Display = ({animal}) => <div>{`Your favorite animal is: ${animal}!`}</div>

const App = () => {
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display animal={animal} />
    </form>
  )
}

export default App
