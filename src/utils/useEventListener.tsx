// source: https://usehooks.com/useEventListener/
import { useEffect, useRef } from 'react'

function useEventListener(eventName: string, handler: any, element = window) {
  // Create a ref that stores handler

  const savedHandler = useRef()

  // Update ref.current value if handler changes.

  // This allows our effect below to always get latest handler ...

  // ... without us needing to pass it in effect deps array ...

  // ... and potentially cause effect to re-run every render.

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener

      // On

      const isSupported = element && element.addEventListener

      if (!isSupported) return

      // Create event listener that calls handler function stored in ref

      //@ts-ignore
      const eventListener = (event: any) => savedHandler && savedHandler.current && savedHandler.current(event)

      // Add event listener

      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup

      return () => {
        console.log('cleaning up listener')
        element.removeEventListener(eventName, eventListener)
      }
    },

    [eventName, element] // Re-run if eventName or element changes
  )
}

export default useEventListener
