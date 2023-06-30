export interface PokemonDetail {
  name: string
  abilities: { ability: { name: string } }[]
}

export interface IPokemonDetailPage {
  params: {
    pokemonName: string
  }
}

export interface PaginationProps {
  offset: number
  pageSize: number
  data: any
  handlePreviousPage: () => void
  handleNextPage: () => void
}
export interface Pokemon {
  name: string
  url: string
}

export interface PokemonListProps {
  data: any
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}
