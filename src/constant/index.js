// algolia
const ALGOLIA_INDEX = 'pokemon_index'
const FACET_ATTRIBUTES = [
  {
    key: 'game_versions',
    name: 'Game Versions'
  },
  {
    key: 'type',
    name: 'Type'
  },
  {
    key: 'base.Attack',
    name: 'Attack',
    slider: true
  }
]

// language options
const LANGUAGE_OPTIONS = [
  {
    id: 'english',
    name:  'English'
  },
  {
    id: 'japanese',
    name: 'Japanese'
  },
  {
    id: 'french',
    name: 'French'
  },
  {
    id: 'chinese',
    name: 'Chinese'
  }
]

// context actions
const SET_LANGUAGE = 'SET_LANGUAGE'
const SET_MODAL = 'SET_MODAL'

// modal
const POKEMON_DETAIL_MODAL = 'POKEMON_DETAIL_MODAL'

export {
  ALGOLIA_INDEX,
  FACET_ATTRIBUTES,
  LANGUAGE_OPTIONS,
  SET_LANGUAGE,
  SET_MODAL,
  POKEMON_DETAIL_MODAL
}
