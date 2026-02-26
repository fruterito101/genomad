'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars, Float } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'

interface SceneProps {
  children?: React.ReactNode
  className?: string
  enableEffects?: boolean
  quality?: 'low' | 'medium' | 'high'
}

export function Scene({ 
  children, 
  className,
  enableEffects = true,
  quality = 'high',
}: SceneProps) {
  const bloomIntensity = quality === 'high' ? 0.6 : quality === 'medium' ? 0.4 : 0.2
  
  return (
    <div className={className}>
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={quality === 'high' ? [1, 2] : [1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Deep space background */}
          <color attach="background" args={['#030308']} />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#030308', 8, 35]} />
          
          {/* Stars background */}
          <Stars 
            radius={50} 
            depth={50} 
            count={quality === 'high' ? 3000 : 1000} 
            factor={3} 
            saturation={0.5} 
            fade 
            speed={0.5}
          />
          
          {/* Camera */}
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, 14]} 
            fov={45}
          />
          
          {/* Cinematic Lighting */}
          <ambientLight intensity={0.15} />
          
          {/* Key light - warm */}
          <spotLight 
            position={[10, 15, 10]} 
            angle={0.4}
            penumbra={1}
            intensity={2} 
            color="#ffffff"
            castShadow={quality === 'high'}
          />
          
          {/* Fill light - cyan */}
          <pointLight 
            position={[-8, 0, -5]} 
            intensity={1} 
            color="#4ECDC4"
            distance={20}
          />
          
          {/* Rim light - pink */}
          <pointLight 
            position={[5, -10, 8]} 
            intensity={0.8} 
            color="#FF6B9D"
            distance={15}
          />
          
          {/* Top accent */}
          <pointLight 
            position={[0, 12, 0]} 
            intensity={0.5} 
            color="#9B59B6"
            distance={20}
          />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 2.8}
          />
          
          {/* Float effect wrapper */}
          <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            {children}
          </Float>
          
          {/* Postprocessing */}
          {enableEffects && (
            <EffectComposer>
              <Bloom 
                intensity={bloomIntensity}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
                mipmapBlur
                radius={0.8}
              />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new THREE.Vector2(0.0008, 0.0008)}
              />
              <Vignette
                offset={0.3}
                darkness={0.6}
                blendFunction={BlendFunction.NORMAL}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
