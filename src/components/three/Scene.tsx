'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'

interface SceneProps {
  children?: React.ReactNode
  className?: string
  enableFog?: boolean
  fogColor?: string
  fogNear?: number
  fogFar?: number
  enableBloom?: boolean
  bloomIntensity?: number
}

export function Scene({ 
  children, 
  className,
  enableFog = true,
  fogColor = '#0A0A0F',
  fogNear = 5,
  fogFar = 25,
  enableBloom = true,
  bloomIntensity = 0.5,
}: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Background color */}
          <color attach="background" args={[fogColor]} />
          
          {/* Fog for depth */}
          {enableFog && (
            <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
          )}
          
          {/* Camera */}
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, 12]} 
            fov={50}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            color="#ffffff"
          />
          <directionalLight 
            position={[-10, -10, -5]} 
            intensity={0.3} 
            color="#4ECDC4"
          />
          <pointLight 
            position={[0, 5, 0]} 
            intensity={0.5} 
            color="#FF6B9D" 
          />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          
          {children}
          
          {/* Postprocessing - Bloom */}
          {enableBloom && (
            <EffectComposer>
              <Bloom 
                intensity={bloomIntensity}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
