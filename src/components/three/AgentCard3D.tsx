'use client'

interface AgentCard3DProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function AgentCard3D({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: AgentCard3DProps) {
  // TODO: Implement 3D card with agent data
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[2, 1.2]} />
      <meshPhysicalMaterial 
        color="#1A3A3A" 
        transparent 
        opacity={0.8}
        roughness={0.1}
      />
    </mesh>
  )
}
