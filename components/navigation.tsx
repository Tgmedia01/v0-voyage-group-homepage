'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: '00', name: 'ARRIVAL' },
  { id: '01', name: 'THRESHOLD' },
  { id: '02', name: 'WORK' },
  { id: '03', name: 'CAPABILITIES' },
  { id: '04', name: 'DEPARTURE' },
]

export function Navigation() {
  const [currentSection, setCurrentSection] = useState(sections[0])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate which section we're in based on scroll position
      const sectionIndex = Math.min(
        Math.floor(scrollY / windowHeight),
        sections.length - 1
      )
      setCurrentSection(sections[Math.max(0, sectionIndex)])
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6">
        {/* Logotype */}
        <a 
          href="#" 
          className="font-serif text-lg md:text-xl tracking-tight text-foreground"
          data-cursor-hover
        >
          VOYAGE
        </a>

        {/* Section Indicator */}
        <div className="font-mono text-xs tracking-widest text-foreground uppercase">
          <span className="text-muted-foreground">{currentSection.id}</span>
          <span className="mx-2 text-muted-foreground">/</span>
          <span>{currentSection.name}</span>
        </div>

        {/* Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-mono text-xs tracking-widest text-foreground uppercase"
          data-cursor-hover
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background flex items-center justify-center">
          <nav className="text-center">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                onClick={() => setMenuOpen(false)}
                className="block font-serif text-4xl md:text-6xl text-foreground py-4 hover:text-accent transition-colors"
                data-cursor-hover
              >
                <span className="font-mono text-sm text-muted-foreground mr-4">
                  {section.id}
                </span>
                {section.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
