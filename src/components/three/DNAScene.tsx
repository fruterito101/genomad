'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Three.js
const Scene = dynamic(() => import('./Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
})

const DNAHelix = dynamic(() => import('./DNAHelix').then(mod => ({ default: mod.DNAHelix })), {
  ssr: false,
})

const Particles = dynamic(() => import('./Particles').then(mod => ({ default: mod.Particles })), {
  ssr: false,
})

interface DNASceneProps {
  className?: string
  showParticles?: boolean
}

export function DNAScene({ className = '', showParticles = true }: DNASceneProps) {
  return (
    <div className={`w-full h-full min-h-[300px] ${className}`}>
      <Suspense fallback={<DNAFallback />}>
        <Scene className="w-full h-full">
          <DNAHelix />
          {showParticles && <Particles count={100} spread={15} />}
        </Scene>
      </Suspense>
    </div>
  )
}

// Fallback mientras carga
function DNAFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background/50 rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading 3D...</span>
      </div>
    </div>
  )
}
