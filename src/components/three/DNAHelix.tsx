'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Trait colors matching the app palette
const TRAIT_COLORS: Record<string, string> = {
  technical: '#3B82F6',   // Blue
  creativity: '#EC4899',  // Pink
  social: '#8B5CF6',      // Purple
  analysis: '#06B6D4',    // Cyan
  empathy: '#EF4444',     // Red
  trading: '#10B981',     // Green
  teaching: '#F59E0B',    // Amber
  leadership: '#F97316',  // Orange
}

// Default nucleotide colors (fallback)
const NUCLEOTIDE_COLORS = {
  A: '#2ECC71',
  T: '#E74C3C',
  G: '#F1C40F',
  C: '#3498DB',
}

const TRAIT_NAMES = Object.keys(TRAIT_COLORS)

interface DNAHelixProps {
  radius?: number
  height?: number
  turns?: number
  pointsPerTurn?: number
  rotationSpeed?: number
  strandColor1?: string
  strandColor2?: string
  // NEW: traits mapping
  traits?: Record<string, number>
  highlightDominant?: boolean
}

export function DNAHelix({ 
  radius = 1.5,
  height = 8,
  turns = 2.5,
  pointsPerTurn = 12,
  rotationSpeed = 0.15,
  strandColor1 = '#4ECDC4',
  strandColor2 = '#FF6B9D',
  traits,
  highlightDominant = true,
}: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Sort traits by value to find dominant ones
  const sortedTraits = useMemo(() => {
    if (!traits) return TRAIT_NAMES
    return Object.entries(traits)
      .sort(([, a], [, b]) => b - a)
      .map(([name]) => name)
  }, [traits])

  // Get color for a trait based on its value
  const getTraitColor = (traitName: string, index: number): string => {
    if (traits && TRAIT_COLORS[traitName]) {
      return TRAIT_COLORS[traitName]
    }
    // Fallback to nucleotide colors
    const keys = Object.keys(NUCLEOTIDE_COLORS) as (keyof typeof NUCLEOTIDE_COLORS)[]
    return NUCLEOTIDE_COLORS[keys[index % 4]]
  }

  // Get emissive intensity based on trait value (higher = brighter)
  const getEmissiveIntensity = (traitName: string): number => {
    if (!traits || !highlightDominant) return 0.6
    const value = traits[traitName] || 50
    // Scale from 0.3 to 1.0 based on value (0-100)
    return 0.3 + (value / 100) * 0.7
  }
  
  // Generate helix points
  const { strand1Points, strand2Points, basePairs } = useMemo(() => {
    const totalPoints = Math.floor(turns * pointsPerTurn)
    const strand1: THREE.Vector3[] = []
    const strand2: THREE.Vector3[] = []
    const pairs: { start: THREE.Vector3; end: THREE.Vector3; traitName: string; index: number }[] = []
    
    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints
      const angle = t * turns * Math.PI * 2
      const y = (t - 0.5) * height
      
      // Strand 1
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      strand1.push(new THREE.Vector3(x1, y, z1))
      
      // Strand 2 (offset by PI)
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      strand2.push(new THREE.Vector3(x2, y, z2))
      
      // Base pairs - map to traits
      if (i % 2 === 0) {
        const traitIndex = Math.floor(i / 2) % sortedTraits.length
        const traitName = sortedTraits[traitIndex]
        pairs.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
          traitName,
          index: i,
        })
      }
    }
    
    return { strand1Points: strand1, strand2Points: strand2, basePairs: pairs }
  }, [radius, height, turns, pointsPerTurn, sortedTraits])

  // Create tube geometry from points
  const strand1Geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(strand1Points)
    return new THREE.TubeGeometry(curve, 64, 0.1, 12, false)
  }, [strand1Points])

  const strand2Geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(strand2Points)
    return new THREE.TubeGeometry(curve, 64, 0.1, 12, false)
  }, [strand2Points])
  
  // Animation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      {/* Strand 1 - Iridescent material */}
      <mesh geometry={strand1Geometry}>
        <meshPhysicalMaterial 
          color={strandColor1}
          emissive={strandColor1}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Strand 2 - Iridescent material */}
      <mesh geometry={strand2Geometry}>
        <meshPhysicalMaterial 
          color={strandColor2}
          emissive={strandColor2}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Base pairs with trait-based colors */}
      {basePairs.map((pair, i) => {
        const midpoint = pair.start.clone().lerp(pair.end, 0.5)
        const direction = pair.end.clone().sub(pair.start).normalize()
        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction)
        
        const color = getTraitColor(pair.traitName, pair.index)
        const emissiveIntensity = getEmissiveIntensity(pair.traitName)
        
        return (
          <group key={i}>
            {/* Connecting rung */}
            <mesh position={midpoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.05, 0.05, pair.start.distanceTo(pair.end), 8]} />
              <meshPhysicalMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={emissiveIntensity}
                metalness={0.7}
                roughness={0.2}
                clearcoat={0.5}
              />
            </mesh>
            
            {/* Nucleotide sphere 1 */}
            <mesh position={pair.start}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshPhysicalMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={emissiveIntensity + 0.2}
                metalness={0.5}
                roughness={0.1}
                clearcoat={1}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Nucleotide sphere 2 */}
            <mesh position={pair.end}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshPhysicalMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={emissiveIntensity + 0.2}
                metalness={0.5}
                roughness={0.1}
                clearcoat={1}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
