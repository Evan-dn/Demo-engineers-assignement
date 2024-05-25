import PropTypes from 'prop-types'
import { createContext, useContext, useReducer } from 'react'

import { SET_LANGUAGE, LANGUAGE_OPTIONS } from '@/constant'

const UiStateContext = createContext()
const UiDispatchContext = createContext()

const INITIAL_STATE = {
  selectedLanguage: LANGUAGE_OPTIONS[0], // english by default
  modals: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      return {
        ...state,
        selectedLanguage: action.payload.selectedLanguage,
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <UiStateContext.Provider value={state}>
      <UiDispatchContext.Provider value={dispatch}>{children}</UiDispatchContext.Provider>
    </UiStateContext.Provider>
  )
}

UiProvider.propTypes = {
  children: PropTypes.element
}

const UiState = () => {
  const context = useContext(UiStateContext)
  return context || {}
}

const UiDispatch = () => {
  const context = useContext(UiDispatchContext)
  return context || (() => { })
}

export { UiProvider, UiState, UiDispatch }
