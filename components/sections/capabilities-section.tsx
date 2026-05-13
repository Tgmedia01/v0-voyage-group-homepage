'use client'

import { useRef, useEffect, useState } from 'react'
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
  const textRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState(statements[0])

  useEffect(() => {
    const section = sectionRef.current
    const textEl = textRef.current
    if (!section || !textEl) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${statements.length * 400}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          const index = Math.min(
            Math.floor(progress * statements.length),
            statements.length - 1
          )
          
          if (index !== currentIndex) {
            setCurrentIndex(index)
            
            // Animate character morph
            const targetText = statements[index]
            const chars = textEl.querySelectorAll('.morph-char')
            
            gsap.to(chars, {
              opacity: 0,
              y: -10,
              duration: 0.15,
              stagger: 0.01,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              onComplete: () => {
                setDisplayText(targetText)
              },
            })
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [currentIndex])

  useEffect(() => {
    const textEl = textRef.current
    if (!textEl) return

    const chars = textEl.querySelectorAll('.morph-char')
    chars.forEach((char) => {
      (char as HTMLElement).style.willChange = 'transform, opacity'
    })
    
    gsap.fromTo(
      chars,
      { opacity: 0, y: 10 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.15, 
        stagger: 0.01,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        onComplete: () => {
          chars.forEach((char) => {
            (char as HTMLElement).style.willChange = 'auto'
          })
        }
      }
    )
  }, [displayText])

  return (
    <section
      ref={sectionRef}
      id="section-03"
      aria-label="Capabilities"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Background images */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: currentIndex === index ? 0.3 : 0 }}
        >
          <img
            src={img}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              transform: `translateX(${(currentIndex - index) * -5}%)`,
              transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      ))}

      {/* Section number - hidden on mobile */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 hidden sm:block">
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          03 / CAPABILITIES
        </span>
      </div>

      {/* Morphing statement */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          ref={textRef}
          className="font-display text-[10vw] md:text-[6vw] lg:text-[5vw] text-foreground text-center leading-[0.95] tracking-[-0.04em] font-medium max-w-[90vw]"
          style={{ fontVariationSettings: "'wdth' 85, 'opsz' 96" }}
        >
          {displayText.split('').map((char, index) => (
            <span key={`${displayText}-${index}`} className="morph-char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {/* Progress indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 hidden sm:flex">
        {statements.map((_, index) => (
          <div
            key={index}
            className="w-8 h-px transition-colors duration-500"
            style={{
              backgroundColor: currentIndex >= index ? '#C2412E' : '#3A3A38',
            }}
          />
        ))}
      </div>
    </section>
  )
}
