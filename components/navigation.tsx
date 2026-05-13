'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: '00', name: 'ARRIVAL', href: '#section-00' },
  { id: '01', name: 'THRESHOLD', href: '#section-01' },
  { id: '02', name: 'WORK', href: '#section-02' },
  { id: '03', name: 'CAPABILITIES', href: '#section-03' },
  { id: '04', name: 'DEPARTURE', href: '#section-04' },
]

const menuLinks = [
  { name: 'WORK', href: '#section-02' },
  { name: 'SERVICES', href: '#section-03' },
  { name: 'JOURNAL', href: '#' },
  { name: 'ABOUT', href: '#section-01' },
  { name: 'CONTACT', href: '#section-04' },
]

export function Navigation() {
  const [currentSection, setCurrentSection] = useState(sections[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionProgress, setSectionProgress] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Calculate which section we're in based on scroll position
      const sectionIndex = Math.min(
        Math.floor(scrollY / windowHeight),
        sections.length - 1
      )
      setCurrentSection(sections[Math.max(0, sectionIndex)])

      // Calculate progress within current section
      const sectionStart = sectionIndex * windowHeight
      const sectionEnd = Math.min((sectionIndex + 1) * windowHeight, docHeight)
      const progress = Math.min(
        Math.max((scrollY - sectionStart) / (sectionEnd - sectionStart), 0),
        1
      )
      setSectionProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // Animate links in sequence
      linksRef.current.forEach((link, index) => {
        if (link) {
          gsap.fromTo(
            link,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.08,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }
          )
        }
      })
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference pointer-events-none">
        <div className="flex items-center justify-between px-6 py-6 md:px-8 md:py-8">
          {/* Logo - top left */}
          <a 
            href="#" 
            className="font-display text-lg md:text-xl tracking-[-0.02em] text-foreground font-medium pointer-events-auto"
            style={{ fontVariationSettings: "'wdth' 85, 'opsz' 96" }}
            data-cursor-hover
          >
            VOYAGE
          </a>

          {/* Section Indicator - top centre */}
          <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-foreground uppercase hidden sm:block">
            <span className="text-muted-foreground">{currentSection.id}</span>
            <span className="mx-3 text-muted-foreground">/</span>
            <span>{currentSection.name}</span>
          </div>

          {/* Menu Toggle - top right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-mono text-[10px] tracking-[0.2em] text-foreground uppercase pointer-events-auto"
            data-cursor-hover
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {/* Progress line - top right, hidden on mobile */}
        <div className="absolute top-6 right-24 md:top-8 md:right-28 w-16 hidden sm:block">
          <div className="section-progress" style={{ '--progress': `${sectionProgress * 100}%` } as React.CSSProperties}>
            <div 
              className="absolute left-0 top-0 h-full bg-foreground transition-all duration-100"
              style={{ width: `${sectionProgress * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {menuOpen && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-background flex items-center"
        >
          <nav className="w-full px-6 md:px-16 lg:px-24">
            {menuLinks.map((link, index) => (
              <a
                key={link.name}
                ref={(el) => { linksRef.current[index] = el }}
                href={link.href}
                onClick={handleLinkClick}
                className="block font-display text-[14vw] md:text-[12vw] text-foreground leading-[0.95] tracking-[-0.04em] font-medium opacity-0 hover:text-accent transition-colors duration-300"
                style={{ 
                  fontVariationSettings: "'wdth' 85, 'opsz' 96",
                  marginBottom: '4vh',
                }}
                data-cursor-hover
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
