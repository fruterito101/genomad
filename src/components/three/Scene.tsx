'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'

interface SceneProps {
  children?: React.ReactNode
  className?: string
}

export function Scene({ children, className }: SceneProps) {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <color attach="background" args={['#0A0A0F']} />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls enableZoom={false} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
