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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury hospitality interior"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Section number */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          04 / DEPARTURE
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h2 className="font-serif text-[8vw] md:text-[5vw] lg:text-[4vw] text-foreground text-center mb-12">
          Begin the next chapter.
        </h2>

        <button
          onClick={handleCopyEmail}
          className="group relative font-mono text-sm tracking-widest text-foreground hover:text-accent transition-colors"
          data-cursor-hover
        >
          <span className={copied ? 'opacity-0' : 'opacity-100'}>
            {email}
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
          >
            copied
          </span>
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 px-6 md:px-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            Voyage. — A studio for hospitality.
          </span>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">
            2024
          </span>
        </div>
      </footer>
    </section>
  )
}
