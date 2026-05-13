'use client'

import { useEffect, useRef, useState, CSSProperties } from 'react'
import gsap from 'gsap'

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
  style?: CSSProperties
}

export function TypewriterText({ text, delay = 800, className = '', style }: TypewriterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible || !containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.char')
    
    gsap.fromTo(
      chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.04,
        ease: 'none',
      }
    )
  }, [isVisible])

  if (!isVisible) {
    return <div className={className} style={{ ...style, visibility: 'hidden' }}>{text}</div>
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {text.split('').map((char, index) => (
        <span key={index} className="char opacity-0">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
