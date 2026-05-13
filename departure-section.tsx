'use client'

import { useState } from 'react'

export function DepartureSection() {
  const [copied, setCopied] = useState(false)
  const email = 'hello@thevoyagegroup.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      id="section-04"
      aria-label="Departure — Contact"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&w=1920&q=75"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay - reduced to 40% */}
        <div className="absolute inset-0 bg-background/40" />
      </div>



      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h2 
          className="font-display text-[16vw] md:text-[8vw] lg:text-[7vw] text-foreground text-center leading-[0.88] tracking-[-0.05em] font-bold mb-16"
          style={{ fontVariationSettings: "'wdth' 80, 'opsz' 96" }}
        >
          Begin the next chapter.
        </h2>

        {/* Email button */}
        <button
          onClick={handleCopyEmail}
          className="group relative font-mono text-[10px] md:text-xs tracking-[0.2em] text-foreground hover:text-accent transition-colors duration-300"
          data-cursor-hover
        >
          <span className={`transition-opacity duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>
            {email.toUpperCase()}
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
          >
            COPIED
          </span>
        </button>

        {/* Or divider and calendar link */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            OR
          </span>
          <a
            href="https://calendly.com/voyage"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-foreground hover:text-accent transition-colors duration-300"
            data-cursor-hover
          >
            BOOK A CALL — CALENDLY.COM/VOYAGE
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 px-6 md:px-8">
        <div className="flex items-center justify-center">
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            VOYAGE — INDEX 2026
          </span>
        </div>
      </footer>
    </section>
  )
}
