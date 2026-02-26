'use client'

interface BreedingChamberProps {
  isActive?: boolean
}

export function BreedingChamber({ isActive = false }: BreedingChamberProps) {
  // TODO: Implement breeding chamber with portal structure
  return (
    <group>
      {/* Portal ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.1, 16, 100]} />
        <meshStandardMaterial color={isActive ? '#4ECDC4' : '#8B8B8B'} />
      </mesh>
      
      {/* Base platform */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#1A3A3A" />
      </mesh>
    </group>
  )
}
