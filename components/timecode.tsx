'use client'

import { useState, useEffect } from 'react'

export function Timecode() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, frames: 0 })

  useEffect(() => {
    const startTime = Date.now()
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const totalSeconds = Math.floor(elapsed / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      const frames = Math.floor((elapsed % 1000) / (1000 / 24)) // 24fps

      setTime({ hours, minutes, seconds, frames })
    }, 1000 / 24) // Update at 24fps

    return () => clearInterval(interval)
  }, [])

  const pad = (num: number) => num.toString().padStart(2, '0')

  return (
    <span className="font-mono text-xs tracking-widest tabular-nums">
      {pad(time.hours)}
      <span className="timecode-colon">:</span>
      {pad(time.minutes)}
      <span className="timecode-colon">:</span>
      {pad(time.seconds)}
      <span className="timecode-colon">:</span>
      {pad(time.frames)}
    </span>
  )
}
