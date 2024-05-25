import { useCallback } from 'react'
import { UiDispatch } from '@/context/ui'
import { SET_MODAL } from '@/constant'

const useModal = ({ name, modalData }) => {
  const dispatch = UiDispatch()

  const closeModal = useCallback(() => {
    dispatch({
      type: SET_MODAL,
      payload: {
        name,
        open: false
      }
    })
  }, [dispatch, name])

  const openModal = useCallback(() => {
    dispatch({
      type: SET_MODAL,
      payload: {
        name,
        open: true,
        data: { ...modalData }

      }
    })
  }, [dispatch, name, modalData])

  return { closeModal, openModal }
}

export default useModal
