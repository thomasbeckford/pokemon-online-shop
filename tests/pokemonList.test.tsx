import { render, screen } from '@testing-library/react'
import PokemonList from '../components/PokemonList'
import '@testing-library/jest-dom/extend-expect'

describe('PokemonList', () => {
  test('renders error message when there is an API error', () => {
    const errorData = { error: true }
    render(<PokemonList data={errorData} />)

    const errorMessage = screen.getByText('Something went wrong with the API.')
    expect(errorMessage).toBeInTheDocument()
  })

  test('renders no results message when there are no results', () => {
    const emptyData = { results: [] }
    render(<PokemonList data={emptyData} />)

    const noResultsMessage = screen.getByText('No results found.')
    expect(noResultsMessage).toBeInTheDocument()
  })

  test('renders Pokemon names when there are results', () => {
    const pokemonData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4' },
      ],
    }
    render(<PokemonList data={pokemonData} />)

    const pokemonNames = screen.getAllByRole('link', {
      name: /bulbasaur|charmander/i,
    })
    expect(pokemonNames).toHaveLength(2)
  })
})
