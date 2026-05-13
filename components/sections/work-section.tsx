'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    name: 'The Marais',
    client: 'Maison de Luxe',
    location: 'Paris, France',
    year: '2024',
    scope: 'Brand Film / Photography / Social Content',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=75',
  },
  {
    id: '02',
    name: 'Amalfi Dreams',
    client: 'Costa Luxury Resorts',
    location: 'Positano, Italy',
    year: '2024',
    scope: 'Campaign / Direction / Edit',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=75',
  },
  {
    id: '03',
    name: 'Nordic Silence',
    client: 'Fjord Hotels',
    location: 'Bergen, Norway',
    year: '2023',
    scope: 'Documentary / Stills / Brand',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=75',
  },
  {
    id: '04',
    name: 'Desert Bloom',
    client: 'Sahara Collection',
    location: 'Marrakech, Morocco',
    year: '2023',
    scope: 'Film / Art Direction / Content',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=75',
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titlesRef = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container || isMobile) return

    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth

      // Main horizontal scroll
      const scrollTween = gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Parallax effect on project titles - increased to -300
      titlesRef.current.forEach((title) => {
        if (title) {
          title.style.willChange = 'transform'
          gsap.to(title, {
            x: -300,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${totalWidth}`,
              scrub: 1,
              containerAnimation: scrollTween,
              onLeave: () => { if (title) title.style.willChange = 'auto' },
              onLeaveBack: () => { if (title) title.style.willChange = 'auto' },
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  // Mobile: Vertical stack layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="section-02"
        aria-label="Selected Work"
        className="relative bg-background py-24"
      >
        {/* Section header */}
        <div className="px-6 mb-16">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            02 / SELECTED WORK
          </span>
        </div>

        {/* Vertical project stack */}
        <div className="space-y-24">
          {projects.map((project) => (
            <article key={project.id} className="relative px-6">
              {/* Project name - massive, overlapping */}
              <h2 
                className="font-display text-[20vw] leading-[0.95] tracking-[-0.02em] font-semibold text-foreground relative z-10 -mb-[8vw]"
                style={{ fontVariationSettings: "'wdth' 100, 'opsz' 96" }}
              >
                {project.name}
              </h2>

              {/* Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.name} — ${project.client}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Credits strip below image */}
              <div className="mt-6 font-mono text-[10px] tracking-[0.1em] text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
                <span>{project.client}</span>
                <span className="text-muted">/</span>
                <span>{project.location}</span>
                <span className="text-muted">/</span>
                <span>{project.year}</span>
                <span className="text-muted">/</span>
                <span>{project.scope}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  // Desktop: Horizontal scroll layout
  return (
    <section
      ref={sectionRef}
      id="section-02"
      aria-label="Selected Work"
      className="relative overflow-hidden bg-background"
    >


      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container h-screen"
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="flex-shrink-0 w-screen h-screen relative flex items-center justify-center"
          >
            {/* Image - 60% of frame */}
            <div className="relative w-[60vw] h-[70vh] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.name} — ${project.client}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>

            {/* Project name - massive, overlapping image */}
            <div
              ref={(el) => { titlesRef.current[index] = el }}
              className="absolute left-8 md:left-16 bottom-[20vh]"
            >
              <h2 
                className="font-display text-[16vw] md:text-[14vw] lg:text-[12vw] leading-[0.95] tracking-[-0.02em] font-semibold text-foreground"
                style={{ fontVariationSettings: "'wdth' 100, 'opsz' 96" }}
              >
                {project.name}
              </h2>
            </div>

            {/* Credits strip below image */}
            <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16">
              <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground flex items-center gap-6">
                <span>{project.client}</span>
                <span className="text-muted">|</span>
                <span>{project.location}</span>
                <span className="text-muted">|</span>
                <span>{project.year}</span>
                <span className="text-muted">|</span>
                <span>{project.scope}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
