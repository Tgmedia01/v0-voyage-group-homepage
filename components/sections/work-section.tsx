'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    name: 'The Marais',
    client: 'Maison de Luxe',
    location: 'Paris, France',
    year: '2024',
    deliverables: ['Brand Film', 'Photography', 'Social Content'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '02',
    name: 'Amalfi Dreams',
    client: 'Costa Luxury Resorts',
    location: 'Positano, Italy',
    year: '2024',
    deliverables: ['Campaign', 'Direction', 'Edit'],
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '03',
    name: 'Nordic Silence',
    client: 'Fjord Hotels',
    location: 'Bergen, Norway',
    year: '2023',
    deliverables: ['Documentary', 'Stills', 'Brand'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '04',
    name: 'Desert Bloom',
    client: 'Sahara Collection',
    location: 'Marrakech, Morocco',
    year: '2023',
    deliverables: ['Film', 'Art Direction', 'Content'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titlesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

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

      // Parallax effect on project titles
      titlesRef.current.forEach((title) => {
        if (title) {
          gsap.to(title, {
            x: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${totalWidth}`,
              scrub: 1,
              containerAnimation: scrollTween,
            },
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-02"
      className="relative overflow-hidden bg-background"
    >
      {/* Section header */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          02 / SELECTED WORK
        </span>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container h-screen"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-screen h-screen flex items-center px-6 md:px-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metadata */}
              <div className="flex flex-col justify-center lg:pl-8">
                {/* Project number */}
                <span className="font-mono text-xs tracking-widest text-muted-foreground mb-4">
                  {project.id} / {String(projects.length).padStart(2, '0')}
                </span>

                {/* Project name with parallax */}
                <div
                  ref={(el) => { titlesRef.current[index] = el }}
                  className="overflow-hidden"
                >
                  <h3 className="font-serif text-[12vw] lg:text-[8vw] leading-none text-foreground">
                    {project.name}
                  </h3>
                </div>

                {/* Credits block */}
                <div className="mt-8 lg:mt-12 space-y-3 font-mono text-xs tracking-wide">
                  <div className="flex">
                    <span className="text-muted-foreground w-24">CLIENT</span>
                    <span className="text-foreground">{project.client}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-24">LOCATION</span>
                    <span className="text-foreground">{project.location}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-24">YEAR</span>
                    <span className="text-foreground">{project.year}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-24">SCOPE</span>
                    <span className="text-foreground">
                      {project.deliverables.join(' / ')}
                    </span>
                  </div>
                </div>

                {/* Accent line */}
                <div className="mt-8 w-12 h-px bg-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
