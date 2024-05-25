
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { POKEMON_DETAIL_MODAL } from '@/constant'
import { UiState } from '@/context/ui'
import useOutsideClickListener from '@/hooks/useOutsideClickListener'
import useModal from '@/hooks/useModal'
import { getOpenModal } from "@/selectors/ui"

import PokemonDetailModal from './PokemonDetailModal'

const Modal = () => {

  const state = UiState()
  const modal = getOpenModal(state)

  const { name: modalName, data: modalData, open: modalOpen = false } = modal || {}

  const modalContainer = useRef(document.createElement('div'))
  useEffect(() => {
    // be sure that modal container is in dom for portal
    const currentModalContainer = modalContainer.current
    document.body.appendChild(currentModalContainer)
    return () => {
      document.body.removeChild(currentModalContainer)
    }
  }, [])


  const [fadeIn, setFadeIn] = useState(false)
  useEffect(() => {
    if (modalOpen) {
      // fade-in effect with a delay to allow CSS transition and prevent scoll when modal is open
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        setFadeIn(true)
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
      setFadeIn(false)
    }
  }, [modalOpen])


  const modalRef = useRef(null)

  const { closeModal } = useModal({ name: modalName })

  useOutsideClickListener(modalRef, closeModal)

  const modalProps = { closeModal, ...modalData, fadeIn }

  return (
    <div>
      {modalOpen && modalName === POKEMON_DETAIL_MODAL && (
        createPortal(<PokemonDetailModal ref={modalRef} closeModal={closeModal} {...modalProps} />, modalContainer.current)
      )}
    </div>
  )
}

export default Modal
