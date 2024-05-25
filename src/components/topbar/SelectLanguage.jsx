import { useState, useRef, useEffect, useCallback } from "react"

import useLanguage from "@/hooks/useLanguage"
import useOutsideClickListener from "@/hooks/useOutsideClickListener"

import { LANGUAGE_OPTIONS } from "@/constant"

import './SelectLanguage.css'

const SelectLanguage = () => {
  const { selectedLanguage , changeLanguage} = useLanguage()
  const selectRef = useRef(null)

  const [defaultSelectText, setDefaultSelectText] = useState(selectedLanguage?.name)
  const [showOptionList, setShowOptionList] = useState(false)
  
  useOutsideClickListener(selectRef, () => setShowOptionList(false))

  useEffect(() => {
    setDefaultSelectText(selectedLanguage?.name)
  }, [selectedLanguage])


  const handleListDisplay = () => {
    setShowOptionList(!showOptionList)
  }

  const handleOptionClick = useCallback((selectedOption) => {
    changeLanguage(selectedOption)
    setShowOptionList(false)
  }, [changeLanguage])

  return (
    <div ref={selectRef} className="custom-select-container">
      <div
        className={showOptionList ? "selected-text active" : "selected-text"}
        onClick={handleListDisplay}
      >
        {defaultSelectText}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {LANGUAGE_OPTIONS.map((option) => (
            <li
              data-isselected={+(selectedLanguage.id === option.id)}
              className="custom-select-option"
              data-name={option.name}
              key={option.id}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectLanguage
