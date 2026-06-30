import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useReveal(opts = {}) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: opts.y ?? 28 },
        {
          opacity: 1, y: 0,
          duration: opts.duration ?? 0.75,
          ease: opts.ease ?? 'power3.out',
          delay: opts.delay ?? 0,
          scrollTrigger: { trigger: ref.current, start: opts.start ?? 'top 83%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])
  return ref
}

export function useStaggerReveal(childSelector, opts = {}) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll(childSelector),
        { opacity: 0, y: opts.y ?? 24 },
        {
          opacity: 1, y: 0,
          duration: opts.duration ?? 0.6,
          stagger: opts.stagger ?? 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: opts.start ?? 'top 82%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])
  return ref
}
