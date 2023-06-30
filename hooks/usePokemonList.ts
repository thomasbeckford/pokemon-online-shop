import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import { Pokemon, PokemonListResponse } from '@/types'
import { useState, useEffect } from 'react'

export const usePokemonList = (
  pageSize: number,
  offset: number,
  selectedAbilities: any[],
  debouncedSelectedValue: string | number | null
) => {
  const [results, setResults] = useState<Pokemon[] | PokemonListResponse[]>([])

  const filterBy =
    typeof debouncedSelectedValue === 'string'
      ? debouncedSelectedValue.toLowerCase()
      : debouncedSelectedValue

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon'
  const filteredApiUrl = `${apiUrl}/${filterBy}?limit=${pageSize}&offset=${offset}`
  const { data, error } = useSWR<any>(filteredApiUrl, fetcher)

  useEffect(() => {
    if (data?.results) {
      setResults(data.results)
    } else if (data?.name) {
      setResults([data])
    }

    if (error) {
      console.error('Failed to load Pokémon list')
    }
  }, [data, error])

  const lastSelectedAbility = selectedAbilities[selectedAbilities.length - 1]

  useEffect(() => {
    if (lastSelectedAbility?.length) {
      const fetchFilteredResults = async () => {
        const filteredResultsPromises: Promise<Pokemon | null>[] = results.map(
          async (pokemon: any) => {
            const fetchPokemon = async () => {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
              )
              const data = await response.json()
              return data
            }

            const pokemonDetails = await fetchPokemon()

            if (
              pokemonDetails &&
              matchesSelectedAbilities(pokemonDetails, lastSelectedAbility)
            ) {
              return pokemonDetails
            }
            return null
          }
        )

        const filteredResults = await Promise.all(filteredResultsPromises)
        setResults(filteredResults.filter(Boolean) as Pokemon[])
      }

      fetchFilteredResults()
    } else {
      setResults(data?.results || [])
    }
  }, [selectedAbilities])

  if (error) {
    return {
      error: true,
      results: [],
    }
  }

  return {
    error: false,
    results,
  }
}

const matchesSelectedAbilities = (
  pokemon: any,
  lastSelectedAbility: string[]
) => {
  if (pokemon.abilities.length === 0) {
    return false
  }

  const pokemonAbilities = pokemon.abilities.map(
    (ability: any) => ability.ability.name
  )

  const matches = pokemonAbilities.filter((ability: any) =>
    lastSelectedAbility.includes(ability)
  )

  return matches.length === lastSelectedAbility.length
}
