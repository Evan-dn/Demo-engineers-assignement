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

export {
  ALGOLIA_INDEX,
  FACET_ATTRIBUTES
}
