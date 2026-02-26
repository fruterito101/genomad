'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Nucleotide colors + accent colors
const PARTICLE_COLORS = [
  '#2ECC71', // A - Verde
  '#E74C3C', // T - Rojo
  '#F1C40F', // G - Amarillo
  '#3498DB', // C - Azul
  '#FF6B9D', // Accent pink
  '#4ECDC4', // Accent cyan
  '#9B59B6', // Accent purple
]

interface ParticlesProps {
  count?: number
  spread?: number
  speed?: number
  size?: number
}

// Simple noise function for organic movement
function noise(x: number, y: number, z: number): number {
  const n = Math.sin(x * 1.5 + y * 2.3 + z * 1.7) * 
            Math.cos(y * 1.8 + z * 2.1 + x * 1.4) *
            Math.sin(z * 1.6 + x * 2.2 + y * 1.9)
  return n
}

export function Particles({ 
  count = 200, 
  spread = 12,
  speed = 0.3,
  size = 0.08
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  
  // Initial positions and velocities
  const { positions, colors, initialPositions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const initPos = new Float32Array(count * 3)
    const ph = new Float32Array(count) // Random phase offset per particle
    
    for (let i = 0; i < count; i++) {
      // Random position in sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.random() * spread
      
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      
      initPos[i * 3] = x
      initPos[i * 3 + 1] = y
      initPos[i * 3 + 2] = z
      
      // Random color from palette
      const color = new THREE.Color(PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)])
      cols[i * 3] = color.r
      cols[i * 3 + 1] = color.g
      cols[i * 3 + 2] = color.b
      
      // Random phase
      ph[i] = Math.random() * Math.PI * 2
    }
    
    return { positions: pos, colors: cols, initialPositions: initPos, phases: ph }
  }, [count, spread])

  // Animation with organic noise-based movement
  useFrame((state) => {
    if (!pointsRef.current) return
    
    const time = state.clock.elapsedTime * speed
    const positionAttribute = pointsRef.current.geometry.attributes.position
    const posArray = positionAttribute.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const phase = phases[i]
      
      // Get initial position
      const ix = initialPositions[i3]
      const iy = initialPositions[i3 + 1]
      const iz = initialPositions[i3 + 2]
      
      // Calculate noise-based offset
      const noiseScale = 0.3
      const offsetX = noise(ix * noiseScale + time, iy * noiseScale, iz * noiseScale + phase) * 0.5
      const offsetY = noise(ix * noiseScale, iy * noiseScale + time, iz * noiseScale + phase) * 0.5
      const offsetZ = noise(ix * noiseScale + phase, iy * noiseScale, iz * noiseScale + time) * 0.5
      
      // Floating motion
      const float = Math.sin(time * 2 + phase) * 0.1
      
      // Apply movement
      posArray[i3] = ix + offsetX
      posArray[i3 + 1] = iy + offsetY + float
      posArray[i3 + 2] = iz + offsetZ
    }
    
    positionAttribute.needsUpdate = true
    
    // Gentle rotation of entire system
    pointsRef.current.rotation.y += 0.001
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
