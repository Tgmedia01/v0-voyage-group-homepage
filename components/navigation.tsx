'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  { name: 'WORK', href: '#section-02', description: '01 — Selected projects' },
  { name: 'SERVICES', href: '#section-03', description: '02 — What we make' },
  { name: 'JOURNAL', href: '#', description: '03 — Writing & field notes' },
  { name: 'STUDIO', href: '#section-01', description: '04 — Who we are' },
  { name: 'CONTACT', href: '#section-04', description: '05 — Begin a conversation' },
]

export function Navigation() {
  const [currentSection, setCurrentSection] = useState(sections[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [sectionProgress, setSectionProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const linksContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    
    sections.forEach((section) => {
      const element = document.querySelector(`#section-${section.id}`)
      if (!element) return
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setCurrentSection(section)
            }
          })
        },
        { threshold: [0.3, 0.5, 0.7], rootMargin: '-10% 0px -10% 0px' }
      )
      
      observer.observe(element)
      observers.push(observer)
    })

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / docHeight, 1)
      setSectionProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      observers.forEach(obs => obs.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Menu open/close animation
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      
      const overlay = overlayRef.current
      const line = lineRef.current
      const linksContainer = linksContainerRef.current
      
      if (overlay && line && linksContainer) {
        // Slide overlay from top
        gsap.fromTo(
          overlay,
          { y: '-100%' },
          { 
            y: '0%', 
            duration: 0.7, 
            ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
          }
        )
        
        // Horizontal line sweep
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          { 
            scaleX: 1, 
            duration: 0.4, 
            delay: 0.2,
            ease: 'power2.out',
          }
        )
        
        // Animate links
        const links = linksContainer.querySelectorAll('.menu-link-item')
        gsap.fromTo(
          links,
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.06,
            delay: 0.3,
            ease: 'power3.out',
          }
        )
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current
    if (overlay && menuOpen) {
      gsap.to(overlay, {
        y: '-100%',
        duration: 0.7,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        onComplete: () => setMenuOpen(false),
      })
    }
  }, [menuOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen, closeMenu])

  const handleLinkClick = () => {
    closeMenu()
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference pointer-events-none">
        <div className="flex items-center justify-between px-6 py-6 md:px-8 md:py-8">
          {/* Logo - top left */}
          <a 
            href="#" 
            className="font-display text-lg md:text-xl tracking-[-0.02em] text-foreground font-bold pointer-events-auto"
            style={{ fontVariationSettings: "'wdth' 80, 'opsz' 96" }}
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
            onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
            className="font-mono text-[10px] tracking-[0.2em] text-foreground uppercase pointer-events-auto group flex items-center gap-2"
            data-cursor-hover
          >
            <span className="relative">
              <span className={menuOpen ? 'hidden' : 'block'}>INDEX</span>
              <span className={menuOpen ? 'block' : 'hidden'}>CLOSE</span>
              {/* Hover underline */}
              <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300 ease-out" />
            </span>
            <span className="text-muted-foreground">
              {menuOpen ? '/ ESC' : '/ 05'}
            </span>
          </button>
        </div>

        {/* Progress line - top right, hidden on mobile */}
        <div className="absolute top-6 right-32 md:top-8 md:right-36 w-16 hidden sm:block">
          <div className="h-px bg-muted relative">
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
          className="fixed inset-0 z-40 bg-background"
          style={{ transform: 'translateY(-100%)' }}
        >
          {/* Horizontal sweep line */}
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 right-0 h-px bg-muted"
            style={{ transform: 'scaleX(0)' }}
          />

          {/* Menu content */}
          <div 
            ref={linksContainerRef}
            className="h-full flex flex-col justify-center px-6 md:px-[8vw]"
          >
            <nav className="relative">
              {menuLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="menu-link-item relative opacity-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-baseline gap-4 md:gap-6"
                    data-cursor-hover
                  >
                    {/* Number prefix */}
                    <span 
                      className="font-mono text-[12px] text-muted-foreground transition-transform duration-400"
                      style={{ 
                        transform: hoveredIndex === index ? 'translateX(8px)' : 'translateX(0)',
                      }}
                    >
                      0{index + 1}
                    </span>
                    
                    {/* Link text */}
                    <span 
                      className="font-display text-[16vw] md:text-[11vw] leading-[1.1] tracking-[-0.045em] font-bold text-foreground"
                      style={{ fontVariationSettings: "'wdth' 80, 'opsz' 96" }}
                    >
                      {link.name}
                    </span>
                  </a>
                  
                  {/* Hover description - desktop only */}
                  <div 
                    className="hidden md:block absolute left-[4.5rem] -bottom-6 overflow-hidden"
                    style={{ height: hoveredIndex === index ? '20px' : '0' }}
                  >
                    <span 
                      className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground block transition-all duration-300"
                      style={{ 
                        transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(10px)',
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                    >
                      {link.description}
                    </span>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-muted px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Email - bottom left */}
            <a 
              href="mailto:hello@thevoyagegroup.com"
              className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              data-cursor-hover
            >
              HELLO@THEVOYAGEGROUP.COM
            </a>
            
            {/* Socials - bottom right */}
            <div className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors" data-cursor-hover>INSTAGRAM</a>
              <span className="text-muted">/</span>
              <a href="#" className="hover:text-foreground transition-colors" data-cursor-hover>LINKEDIN</a>
              <span className="text-muted">/</span>
              <a href="#" className="hover:text-foreground transition-colors" data-cursor-hover>VIMEO</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
