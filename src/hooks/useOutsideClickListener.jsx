import { useEffect } from "react"

const useOutsideClickListener = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside, { capture: true })

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true })
    }
  }, [ref, callback])
}

export default useOutsideClickListener
