// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [state, setState] = React.useState({
    status:'idle',
    error: null,
    pokemon: null,
  })

  const {status, error, pokemon} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setState({...state, status:'pending'})
    setState({status:'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        // setState({...state, status:'resolved', pokemon})
        setState({status:'resolved', pokemon})
      },
      error => {
        // setState({...state, status:'rejected', error})
        setState({status:'rejected', error})
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'submit a pokemon'
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
