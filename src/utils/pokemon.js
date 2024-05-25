export const getPokemonName = ({ selectedLanguage, namePath, isHighLighted = false }) => {
  return isHighLighted ? namePath[selectedLanguage?.id]?.value : namePath[selectedLanguage?.id]
}