import { useEffect } from 'react'
import ls from 'local-storage'
import isNil from 'lodash/isNil'

const useScrollEffect = (elementType, elementId, elementAction) => {
  useEffect(() => {
    let lsKey = `rdmo.management.config.scroll.${elementType}`
    if (!isNil(elementId)) {
      lsKey += `_${elementId}`
    }
    if (!isNil(elementAction)) {
      lsKey += `_${elementAction}`
    }
    const lsValue = ls.get(lsKey, 0)

    // scroll to the right position
    setTimeout(() => window.scrollTo(0, lsValue), 0)

    // add a event handler to store the scroll position
    const handleScroll = () => {
      const lsValue = window.pageYOffset
      ls.set(lsKey, lsValue)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [elementType, elementId, elementAction])
}

export default useScrollEffect