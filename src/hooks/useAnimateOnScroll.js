import { useEffect, useRef } from 'react'

/**
 * Fires `callback` once when the element enters the viewport.
 * Returns a ref to attach to the target element.
 */
const DEFAULT_OPTIONS = { threshold: 0.5 }

export function useAnimateOnScroll(callback, options = DEFAULT_OPTIONS) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback(el)
        obs.disconnect()
      }
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [callback, options])

  return ref
}
