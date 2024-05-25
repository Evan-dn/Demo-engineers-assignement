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

export {
  ALGOLIA_INDEX,
  FACET_ATTRIBUTES,
  LANGUAGE_OPTIONS,
  SET_LANGUAGE
}
