'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Timecode } from '@/components/timecode'
import { TypewriterText } from '@/components/typewriter-text'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    // Create letterbox effect on scroll
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const inset = progress * 35 // Crop to 35% from top and bottom
          video.style.clipPath = `inset(${inset}% 0 ${inset}% 0)`
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-00"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <div
        ref={videoRef}
        className="absolute inset-0 letterbox"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-hotel-lobby-interior-4802-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Main Headline - Types in after 800ms */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <TypewriterText
          text="We make hospitality unforgettable."
          delay={800}
          className="font-serif text-[8vw] md:text-[6vw] lg:text-[5vw] text-foreground text-center leading-tight"
        />
      </div>

      {/* Bottom Left - Timecode */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
        <Timecode />
      </div>

      {/* Bottom Right - Section Indicator */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right">
        <div className="font-mono text-xs tracking-widest text-foreground">
          00 / 04
        </div>
        <div className="font-mono text-xs tracking-widest text-muted-foreground uppercase mt-1">
          ARRIVAL
        </div>
      </div>
    </section>
  )
}
