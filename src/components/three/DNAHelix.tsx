'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

interface DNAHelixProps {
  radius?: number
  height?: number
  turns?: number
  rotationSpeed?: number
}

export function DNAHelix({ 
  radius = 1, 
  height = 8, 
  turns = 2,
  rotationSpeed = 0.2 
}: DNAHelixProps) {
  const groupRef = useRef<Group>(null)
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  // TODO: Implement full DNA helix geometry
  // Placeholder: simple torus to verify setup
  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[radius, 0.1, 16, 100]} />
        <meshStandardMaterial color="#4ECDC4" />
      </mesh>
    </group>
  )
}
