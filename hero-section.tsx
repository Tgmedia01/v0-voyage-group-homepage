'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { MaskRevealText } from '@/components/mask-reveal-text'

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
          video.style.willChange = progress > 0 && progress < 1 ? 'clip-path' : 'auto'
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-00"
      aria-label="Arrival — Welcome to Voyage"
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
          preload="metadata"
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=75"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-hotel-lobby-interior-4802-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Main Headline - Mask reveal */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="sr-only">We make hospitality unforgettable — Voyage, a studio for hospitality brands</h1>
        <MaskRevealText
          text="We make hospitality unforgettable."
          delay={600}
          className="font-display text-[16vw] md:text-[9vw] lg:text-[8vw] text-foreground text-center leading-[0.88] tracking-[-0.055em] font-bold"
          style={{ fontVariationSettings: "'wdth' 80, 'opsz' 96" }}
        />
      </div>

      {/* Bottom Right - Section Indicator - hidden on mobile */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right hidden sm:block">
        <div className="font-mono text-[10px] tracking-[0.2em] text-foreground">
          00 / 04
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-1">
          ARRIVAL
        </div>
      </div>
    </section>
  )
}
