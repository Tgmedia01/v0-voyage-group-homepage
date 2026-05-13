'use client'

import { CustomCursor } from '@/components/custom-cursor'
import { Navigation } from '@/components/navigation'
import { SmoothScroll } from '@/components/smooth-scroll'
import { HeroSection } from '@/components/sections/hero-section'
import { ThresholdSection } from '@/components/sections/threshold-section'
import { WorkSection } from '@/components/sections/work-section'
import { CapabilitiesSection } from '@/components/sections/capabilities-section'
import { DepartureSection } from '@/components/sections/departure-section'

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      
      <main>
        {/* 00 — ARRIVAL */}
        <HeroSection />
        
        {/* 01 — THRESHOLD */}
        <ThresholdSection />
        
        {/* 02 — SELECTED WORK */}
        <WorkSection />
        
        {/* 03 — CAPABILITIES */}
        <CapabilitiesSection />
        
        {/* 04 — DEPARTURE */}
        <DepartureSection />
      </main>
    </SmoothScroll>
  )
}
