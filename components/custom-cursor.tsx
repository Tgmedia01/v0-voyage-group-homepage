'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only run on devices with hover capability (not touch)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    // Smooth animation loop
    const animate = () => {
      // Lerp for smooth following
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15

      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`

      requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Start animation loop
    animate()

    window.addEventListener('mousemove', moveCursor)

    // Setup hover listeners
    const setupHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      return interactiveElements
    }

    const interactiveElements = setupHoverListeners()

    // Re-attach listeners on DOM changes
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
  }, [isVisible])

  // Check for hover capability before rendering
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  
  useEffect(() => {
    setIsTouchDevice(!window.matchMedia('(hover: hover)').matches)
  }, [])

  if (isTouchDevice) return null

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        opacity: isVisible ? 1 : 0,
        width: isHovering ? '48px' : '12px',
        height: isHovering ? '48px' : '12px',
        backgroundColor: '#EDE7DD',
        borderRadius: '50%',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.3s ease-out',
      }}
    />
  )
}
