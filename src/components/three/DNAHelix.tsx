'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Trait colors matching the app palette
const TRAIT_COLORS: Record<string, string> = {
  technical: '#3B82F6',
  creativity: '#EC4899',
  social: '#8B5CF6',
  analysis: '#06B6D4',
  empathy: '#EF4444',
  trading: '#10B981',
  teaching: '#F59E0B',
  leadership: '#F97316',
}

const TRAIT_NAMES = Object.keys(TRAIT_COLORS)

interface DNAHelixProps {
  radius?: number
  height?: number
  turns?: number
  rotationSpeed?: number
  strandColor1?: string
  strandColor2?: string
  traits?: Record<string, number>
  quality?: 'low' | 'medium' | 'high'
}

export function DNAHelix({ 
  radius = 1.8,
  height = 10,
  turns = 3,
  rotationSpeed = 0.12,
  strandColor1 = '#4ECDC4',
  strandColor2 = '#FF6B9D',
  traits,
  quality = 'high',
}: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null)
  const time = useRef(0)
  
  // Quality settings
  const segments = quality === 'high' ? 200 : quality === 'medium' ? 100 : 50
  const tubeSegments = quality === 'high' ? 128 : quality === 'medium' ? 64 : 32
  const radialSegments = quality === 'high' ? 16 : quality === 'medium' ? 12 : 8

  // Sort traits
  const sortedTraits = useMemo(() => {
    if (!traits) return TRAIT_NAMES
    return Object.entries(traits)
      .sort(([, a], [, b]) => b - a)
      .map(([name]) => name)
  }, [traits])

  const getTraitColor = (index: number): string => {
    const traitName = sortedTraits[index % sortedTraits.length]
    return TRAIT_COLORS[traitName] || '#4ECDC4'
  }

  // Generate organic helix with variable thickness
  const { strand1Geometry, strand2Geometry, basePairs } = useMemo(() => {
    // Create smooth curve points for strand 1
    const points1: THREE.Vector3[] = []
    const points2: THREE.Vector3[] = []
    const pairs: { position: THREE.Vector3; color: string; scale: number }[] = []
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = t * turns * Math.PI * 2
      const y = (t - 0.5) * height
      
      // Add organic wobble
      const wobble = Math.sin(t * Math.PI * 8) * 0.1
      const r = radius + wobble
      
      // Strand 1
      const x1 = Math.cos(angle) * r
      const z1 = Math.sin(angle) * r
      points1.push(new THREE.Vector3(x1, y, z1))
      
      // Strand 2 (offset by PI)
      const x2 = Math.cos(angle + Math.PI) * r
      const z2 = Math.sin(angle + Math.PI) * r
      points2.push(new THREE.Vector3(x2, y, z2))
      
      // Base pairs every few segments
      if (i % 8 === 0 && i > 0 && i < segments) {
        const pairIndex = Math.floor(i / 8)
        pairs.push({
          position: new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2),
          color: getTraitColor(pairIndex),
          scale: 0.8 + Math.sin(t * Math.PI) * 0.4, // Larger in middle
        })
      }
    }
    
    // Create smooth curves
    const curve1 = new THREE.CatmullRomCurve3(points1)
    const curve2 = new THREE.CatmullRomCurve3(points2)
    
    // Variable radius function - thicker in middle, thinner at ends
    const radiusFunc = (t: number) => {
      const base = 0.12
      const variation = Math.sin(t * Math.PI) * 0.06 // Thicker in middle
      const pulse = Math.sin(t * Math.PI * 20) * 0.01 // Small bumps
      return base + variation + pulse
    }
    
    // Create tube geometries with variable radius
    const geo1 = new THREE.TubeGeometry(curve1, tubeSegments, 0.15, radialSegments, false)
    const geo2 = new THREE.TubeGeometry(curve2, tubeSegments, 0.15, radialSegments, false)
    
    return { strand1Geometry: geo1, strand2Geometry: geo2, basePairs: pairs }
  }, [radius, height, turns, segments, tubeSegments, radialSegments, sortedTraits])

  // Animation with breathing effect
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    time.current += delta
    
    // Rotation
    groupRef.current.rotation.y += delta * rotationSpeed
    
    // Breathing effect
    const breath = 1 + Math.sin(time.current * 0.5) * 0.02
    groupRef.current.scale.setScalar(breath)
  })

  return (
    <group ref={groupRef}>
      {/* Strand 1 - Primary */}
      <mesh geometry={strand1Geometry}>
        <meshPhysicalMaterial 
          color={strandColor1}
          emissive={strandColor1}
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={2.0}
          iridescenceThicknessRange={[100, 800]}
          sheen={1}
          sheenRoughness={0.2}
          sheenColor={new THREE.Color(strandColor2)}
          transparent
          opacity={0.95}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Strand 2 - Secondary */}
      <mesh geometry={strand2Geometry}>
        <meshPhysicalMaterial 
          color={strandColor2}
          emissive={strandColor2}
          emissiveIntensity={0.6}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={2.0}
          iridescenceThicknessRange={[100, 800]}
          sheen={1}
          sheenRoughness={0.2}
          sheenColor={new THREE.Color(strandColor1)}
          transparent
          opacity={0.95}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Organic base pairs with glow */}
      {basePairs.map((pair, i) => (
        <group key={i} position={pair.position}>
          {/* Main connector - organic shape */}
          <mesh rotation={[0, (i * Math.PI) / 4, Math.PI / 2]}>
            <capsuleGeometry args={[0.08 * pair.scale, radius * 1.8, 8, 16]} />
            <meshPhysicalMaterial
              color={pair.color}
              emissive={pair.color}
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.1}
              clearcoat={1}
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Glow orbs at ends */}
          <mesh position={[radius * 0.9, 0, 0]}>
            <icosahedronGeometry args={[0.15 * pair.scale, 2]} />
            <meshPhysicalMaterial
              color={pair.color}
              emissive={pair.color}
              emissiveIntensity={1.2}
              metalness={0.3}
              roughness={0}
              clearcoat={1}
              transparent
              opacity={0.85}
            />
          </mesh>
          
          <mesh position={[-radius * 0.9, 0, 0]}>
            <icosahedronGeometry args={[0.15 * pair.scale, 2]} />
            <meshPhysicalMaterial
              color={pair.color}
              emissive={pair.color}
              emissiveIntensity={1.2}
              metalness={0.3}
              roughness={0}
              clearcoat={1}
              transparent
              opacity={0.85}
            />
          </mesh>
          
          {/* Inner glow core */}
          <mesh>
            <sphereGeometry args={[0.06 * pair.scale, 16, 16]} />
            <meshBasicMaterial
              color={pair.color}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
      
      {/* Floating particles around the helix */}
      <HelixParticles height={height} radius={radius} />
    </group>
  )
}

// Particles that orbit the helix
function HelixParticles({ height, radius }: { height: number; radius: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 150
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const palette = ['#4ECDC4', '#FF6B9D', '#9B59B6', '#F1C40F', '#3498DB']
    
    for (let i = 0; i < count; i++) {
      // Distribute around helix
      const t = Math.random()
      const angle = t * Math.PI * 6 + Math.random() * 0.5
      const r = radius + 0.5 + Math.random() * 2
      const y = (t - 0.5) * height * 1.2
      
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * r
      
      const color = new THREE.Color(palette[Math.floor(Math.random() * palette.length)])
      cols[i * 3] = color.r
      cols[i * 3 + 1] = color.g
      cols[i * 3 + 2] = color.b
    }
    
    return { positions: pos, colors: cols }
  }, [height, radius])
  
  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
