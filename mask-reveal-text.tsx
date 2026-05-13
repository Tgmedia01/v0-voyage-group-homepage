'use client'

import { useEffect, useRef, CSSProperties } from 'react'
import gsap from 'gsap'

interface MaskRevealTextProps {
  text: string
  delay?: number
  className?: string
  style?: CSSProperties
  as?: 'div' | 'h1' | 'h2'
}

/**
 * Reveals text using a clip-path mask that sweeps from left to right.
 * The text is split into lines (assumes manual line breaks via <br /> if needed),
 * each masked by an inset clip-path that animates open. Feels cinematic — a
 * frame being uncovered — rather than the typewriter "AI tell."
 */
export function MaskRevealText({
  text,
  delay = 400,
  className = '',
  style,
  as = 'div',
}: MaskRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Start fully clipped (hidden behind a right-side mask)
    gsap.set(el, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 1,
    })

    // Sweep the mask open from left to right
    const tween = gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.4,
      delay: delay / 1000,
      ease: 'expo.out',
    })

    return () => {
      tween.kill()
    }
  }, [delay])

  const Tag = as
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement & HTMLHeadingElement>} className={className} style={style}>
      {text}
    </Tag>
  )
}
