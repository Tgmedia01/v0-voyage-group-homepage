'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statements = [
  'We make films.',
  'We make films that sell rooms.',
  'We make brands.',
  'We make brands that outlast trends.',
  'We make Voyage.',
]

const backgroundImages = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=75',
  'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=1920&q=75',
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const bgRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])
  const currentIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const pendingIndexRef = useRef<number | null>(null)

  // Build character spans imperatively
  const buildCharacterSpans = (text: string) => {
    const container = textContainerRef.current
    if (!container) return

    container.innerHTML = ''
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.className = 'morph-char inline-block'
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.opacity = '1'
      span.style.transform = 'translateY(0)'
      container.appendChild(span)
    })
  }

  // Run a single morph to a target index; queues if already animating
  const morphTo = (targetIndex: number) => {
    if (isAnimatingRef.current) {
      // Latest target wins — overwrite pending
      pendingIndexRef.current = targetIndex
      return
    }

    const textContainer = textContainerRef.current
    const counter = counterRef.current
    if (!textContainer || !counter) return

    isAnimatingRef.current = true
    currentIndexRef.current = targetIndex

    // Update counter
    counter.textContent = `0${targetIndex + 1} / 0${statements.length}`

    // Cross-fade background images
    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        bg.style.opacity = i === targetIndex ? '0.3' : '0'
      }
    })

    // Update progress indicators
    progressRefs.current.forEach((bar, i) => {
      if (bar) {
        bar.style.backgroundColor = i <= targetIndex ? '#C2412E' : '#3A3A38'
      }
    })

    // Morph animation: fade out current characters
    const currentChars = textContainer.querySelectorAll('.morph-char')
    gsap.to(currentChars, {
      y: -24,
      opacity: 0,
      duration: 0.28,
      stagger: 0.015,
      ease: 'power3.in',
      onComplete: () => {
        // Swap text in DOM directly
        buildCharacterSpans(statements[targetIndex])

        // Fade in new characters
        const newChars = textContainer.querySelectorAll('.morph-char')
        gsap.fromTo(
          newChars,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.32,
            stagger: 0.015,
            ease: 'power3.out',
            onComplete: () => {
              isAnimatingRef.current = false
              // If a more recent target was queued during the animation, fire it now
              if (pendingIndexRef.current !== null && pendingIndexRef.current !== currentIndexRef.current) {
                const next = pendingIndexRef.current
                pendingIndexRef.current = null
                morphTo(next)
              } else {
                pendingIndexRef.current = null
              }
            },
          }
        )
      },
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    const textContainer = textContainerRef.current
    const counter = counterRef.current
    if (!section || !textContainer || !counter) return

    // Initial build
    buildCharacterSpans(statements[0])

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${statements.length * 400}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          const targetIndex = Math.min(
            Math.floor(progress * statements.length),
            statements.length - 1
          )

          if (targetIndex !== currentIndexRef.current) {
            morphTo(targetIndex)
          }
        },
      })
    }, section)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-03"
      aria-label="Capabilities"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Background images with cross-fade */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          ref={(el) => { bgRefs.current[index] = el }}
          className="absolute inset-0"
          style={{ 
            opacity: index === 0 ? 0.3 : 0,
            transition: 'opacity 1200ms ease-out',
          }}
        >
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              transform: 'scale(1.1)',
              transition: 'transform 3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      ))}

      {/* Counter - top right of morphing text area */}
      <div className="absolute top-8 right-8 md:top-12 md:right-16">
        <span 
          ref={counterRef}
          className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
        >
          01 / 05
        </span>
      </div>

      {/* Morphing statement */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          ref={textContainerRef}
          className="font-display text-[12vw] md:text-[7vw] lg:text-[6vw] text-foreground text-center leading-[0.88] tracking-[-0.05em] font-bold max-w-[92vw]"
          style={{ fontVariationSettings: "'wdth' 80, 'opsz' 96" }}
          aria-live="polite"
        />
      </div>

      {/* Progress indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex gap-2">
        {statements.map((_, index) => (
          <div
            key={index}
            ref={(el) => { progressRefs.current[index] = el }}
            className="w-8 h-px transition-colors duration-500"
            style={{
              backgroundColor: index === 0 ? '#C2412E' : '#3A3A38',
            }}
          />
        ))}
      </div>
    </section>
  )
}
