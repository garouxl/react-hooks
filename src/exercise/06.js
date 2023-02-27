// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
  fetchPokemon,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    const {error} = this.state
    if (error)
      return <this.props.fallback error={error} />

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    error: null,
    pokemon: null,
  })

  const {status, error, pokemon} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setState({...state, status:'pending'})
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        // setState({...state, status:'resolved', pokemon})
        setState({status: 'resolved', pokemon})
      },
      error => {
        // setState({...state, status:'rejected', error})
        setState({status: 'rejected', error})
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
    throw error
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
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
        <ErrorBoundary key={pokemonName} fallback={ErrorFallback} >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
