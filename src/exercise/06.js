// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

/* 
classe nativa pra usar direto no React
class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    // atualiza o estado pra na proxima mostrar a UI de fallback
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      // mostra um Fallback desejado
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
} */

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

/* 
versão com useState
  function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending', pokemon: ''})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({status: 'resolved', pokemon})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  }
  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  if (status === 'rejected') {
    throw error // Error Boundary ira resolver
  }
  throw new Error('This should be impossible')
} */

// versão com useReducer
const pokemonReducer = (state, action) => {
  const {status, pokemon, error} = state
  const {type, pokemon: newPokemon, error: newError} = action
  switch (type) {
    case 'idle':
      return {...state, status, pokemon, error}
    case 'pending':
      return {...state, status: type, pokemon: '', error}
    case 'resolved':
      return {...state, status: type, pokemon: newPokemon, error}
    case 'rejected':
      return {...state, status: type, pokemon, error: newError}
    default:
      throw new Error(`Tipo não suportado: ${action.status}`)
  }
}

function PokemonInfo({pokemonName}) {
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    dispatch({type: 'pending', pokemon: ''})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        dispatch({type: 'resolved', pokemon})
      })
      .catch(error => {
        dispatch({type: 'rejected', error})
      })
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  }
  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  if (status === 'rejected') {
    throw error // Error Boundary ira resolver
  }
  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
