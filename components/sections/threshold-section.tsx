'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = [
  'We',
  'don\'t',
  'make',
  'content.',
  'We',
  'make',
  'the',
  'language',
  'a',
  'brand',
  'uses',
  'to',
  'speak',
  'to',
  'the',
  'world.',
]

export function ThresholdSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Pin the section and animate words on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${words.length * 100}`,
          pin: true,
          scrub: 0.5,
        },
      })

      wordsRef.current.forEach((word, index) => {
        if (word) {
          // Add will-change during animation
          word.style.willChange = 'transform, opacity'
          tl.fromTo(
            word,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            index * 0.3
          )
        }
      })

      // Remove will-change after animation completes
      tl.eventCallback('onComplete', () => {
        wordsRef.current.forEach((word) => {
          if (word) word.style.willChange = 'auto'
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-01"
      aria-label="Threshold — Our Position"
      className="relative min-h-screen w-full bg-background flex items-end pb-24 md:pb-32"
    >
      {/* Pinned letterbox strip at top */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-[50vh] object-cover"
          style={{ transform: 'translateY(-35%)' }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-hotel-lobby-interior-4802-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Mono label above statement */}
      <div className="absolute top-32 md:top-40 left-6 md:left-8">
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          — A POSITION
        </span>
      </div>

      {/* Word-by-word statement - positioned in lower-left quadrant */}
      <div className="w-full max-w-4xl px-6 md:px-16 lg:px-24">
        <p 
          className="font-display text-[10vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-[-0.04em] font-medium text-foreground"
          style={{ fontVariationSettings: "'wdth' 85, 'opsz' 96" }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => { wordsRef.current[index] = el }}
              className="inline-block mr-[0.25em] opacity-0"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
