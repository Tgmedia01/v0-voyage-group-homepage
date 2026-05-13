'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = [
  'Every',
  'property',
  'has',
  'a',
  'story.',
  'We',
  'translate',
  'it',
  'into',
  'image,',
  'motion,',
  'and',
  'feeling.',
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
          tl.fromTo(
            word,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5 },
            index * 0.3
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-01"
      className="relative min-h-screen w-full bg-background flex items-center"
    >
      {/* Pinned letterbox strip at top */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[50vh] object-cover"
          style={{ transform: 'translateY(-35%)' }}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-hotel-lobby-interior-4802-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Section number */}
      <div className="absolute top-32 md:top-40 left-6 md:left-8">
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          01 / THRESHOLD
        </span>
      </div>

      {/* Word-by-word statement */}
      <div className="w-full px-6 md:px-16 lg:px-24 pt-32 md:pt-40">
        <p className="font-serif text-[7vw] md:text-[5vw] lg:text-[4vw] leading-tight text-foreground">
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

      {/* Accent line */}
      <div className="absolute bottom-12 left-6 md:left-8 w-16 h-px bg-accent" />
    </section>
  )
}
