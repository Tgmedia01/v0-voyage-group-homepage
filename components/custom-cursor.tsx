'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to prevent flash

  useEffect(() => {
    // Detect if device has hover capability (i.e., not touch-only)
    const hasHover = window.matchMedia('(hover: hover)').matches
    setIsTouchDevice(!hasHover)

    if (!hasHover) return // Don't set up cursor on touch devices

    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      cursor.classList.add('hovering')
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('hovering')
    }

    window.addEventListener('mousemove', moveCursor)

    // Add hover effect to interactive elements
    const setupHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      return interactiveElements
    }

    const interactiveElements = setupHoverListeners()

    // Re-attach listeners on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      setupHoverListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  // Don't render on touch devices
  if (isTouchDevice) return null

  return <div ref={cursorRef} className="cursor-dot" />
}
