import { useCallback, useEffect } from 'react'
import { UiDispatch, UiState } from '@/context/ui'
import { SET_LANGUAGE } from '@/constant'

const useLanguage = () => {
  const { selectedLanguage } = UiState()
  const dispatch = UiDispatch()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    const isEqual = storedLanguage === JSON.stringify(selectedLanguage)

    if (storedLanguage && !isEqual) {
      dispatch({ type: SET_LANGUAGE, payload: { selectedLanguage: JSON.parse(storedLanguage) } })
    }
  }, [dispatch, selectedLanguage])

  const changeLanguage = useCallback((newLanguage) => {
    dispatch({ type: SET_LANGUAGE, payload: { selectedLanguage: newLanguage } })
    localStorage.setItem('language', JSON.stringify(newLanguage))
  }, [dispatch])

  return { selectedLanguage, changeLanguage }
}

export default useLanguage
