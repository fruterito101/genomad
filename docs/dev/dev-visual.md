# 🎨 DEV-VISUAL: Tickets de Implementación Visual

## Epic: Rediseño Visual 3D de Genomad

**Objetivo:** Implementar experiencia visual 3D inspirada en Active Theory
**Referencia:** `docs/dev/VISUAL-ANALYSIS-ACTIVETHEORY.md`
**Rama base:** `dev`
**Stack:** React Three Fiber + Drei + Three.js

---

## 📊 Estado de Fases

| Fase | Nombre | Estado | Tickets |
|------|--------|--------|---------|
| 0 | Setup & Dependencias | ⏳ Pendiente | 2 |
| 1 | Escena Base | ⏳ Pendiente | 4 |
| 2 | ADN Doble Hélice | ⏳ Pendiente | 5 |
| 3 | Sistema de Partículas | ⏳ Pendiente | 3 |
| 4 | Agent Cards 3D | ⏳ Pendiente | 4 |
| 5 | Breeding Chamber | ⏳ Pendiente | 4 |
| 6 | Polish & Optimización | ⏳ Pendiente | 4 |

**Total:** 26 tickets

---

## Fase 0: Setup & Dependencias

### Ticket 0.1: Instalar dependencias Three.js
**Branch:** `feat/visual-setup-deps`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ninguna

**Scope:**
- Instalar `three`, `@react-three/fiber`, `@react-three/drei`
- Instalar `@types/three` como devDependency
- Verificar compatibilidad con React 19

**Archivos tocados:**
- `package.json`
- `bun.lockb`

**Verificación:**
```bash
bun install
bun run build  # Sin errores de tipos
```

**Criterio de éxito:** Build exitoso con dependencias instaladas

---

### Ticket 0.2: Crear estructura de carpetas 3D
**Branch:** `feat/visual-folder-structure`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ticket 0.1

**Scope:**
- Crear carpeta `src/components/three/`
- Crear archivos base con exports vacíos
- Crear archivo de configuración de escena

**Archivos a crear:**
```
src/components/three/
├── index.tsx           # Barrel exports
├── Scene.tsx           # Contenedor principal
├── DNAHelix.tsx        # Placeholder
├── Particles.tsx       # Placeholder
├── AgentCard3D.tsx     # Placeholder
├── BreedingChamber.tsx # Placeholder
├── shaders/            # Carpeta para shaders GLSL
│   └── index.ts
└── hooks/              # Hooks específicos de 3D
    └── usePerformance.ts
```

**Verificación:**
```bash
bun run lint
bun run build
```

**Criterio de éxito:** Estructura creada, imports funcionando

---

## Fase 1: Escena Base

### Ticket 1.1: Crear componente Scene base
**Branch:** `feat/visual-scene-base`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ticket 0.2

**Scope:**
- Canvas de R3F con configuración base
- Cámara perspectiva con posición inicial
- Luces básicas (ambient + directional)
- Color de fondo: #0A0A0F

**Archivos tocados:**
- `src/components/three/Scene.tsx`

**Código base:**
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas>
      <color attach="background" args={['#0A0A0F']} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      {children}
    </Canvas>
  )
}
```

**Verificación:**
```bash
bun run dev  # Verificar canvas negro visible
bun run build
```

**Criterio de éxito:** Canvas renderiza sin errores

---

### Ticket 1.2: Implementar fog volumétrico
**Branch:** `feat/visual-fog`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 1.1

**Scope:**
- Agregar fog exponencial a la escena
- Color: gradiente de #0A0A0F a #1A3A3A
- Densidad ajustable via props

**Archivos tocados:**
- `src/components/three/Scene.tsx`

**Verificación:**
```bash
bun run dev  # Fog visible al alejarse
bun run build
```

---

### Ticket 1.3: Crear hook usePerformance
**Branch:** `feat/visual-performance-hook`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 0.2

**Scope:**
- Detectar capacidad del dispositivo
- Retornar nivel de calidad: 'high' | 'medium' | 'low'
- Detectar: GPU, RAM, móvil/desktop
- Guardar preferencia en localStorage

**Archivos tocados:**
- `src/components/three/hooks/usePerformance.ts`

**Lógica:**
```typescript
export function usePerformance() {
  // Detectar WebGL capabilities
  // Detectar devicePixelRatio
  // Detectar memoria disponible
  // Retornar nivel de calidad
}
```

**Verificación:**
```bash
bun run lint
bun run build
```

---

### Ticket 1.4: Integrar Scene en Landing Hero
**Branch:** `feat/visual-hero-integration`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 1.1

**Scope:**
- Importar Scene en Hero.tsx
- Posicionar como fondo absoluto
- Mantener contenido existente encima
- Lazy loading con Suspense

**Archivos tocados:**
- `src/components/landing/Hero.tsx`

**Verificación:**
```bash
bun run dev  # Hero con fondo 3D
bun run build
```

---

## Fase 2: ADN Doble Hélice

### Ticket 2.1: Geometría base de la hélice
**Branch:** `feat/visual-dna-geometry`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ticket 1.1

**Scope:**
- Crear geometría procedural de doble hélice
- Parámetros: radio, altura, vueltas, puntos por vuelta
- Dos cadenas helicoidales (strands)
- Conexiones entre strands (base pairs)

**Archivos tocados:**
- `src/components/three/DNAHelix.tsx`

**Parámetros:**
```typescript
interface DNAHelixProps {
  radius?: number      // Radio de la hélice (default: 1)
  height?: number      // Altura total (default: 10)
  turns?: number       // Número de vueltas (default: 3)
  pointsPerTurn?: number // Puntos por vuelta (default: 20)
  color1?: string      // Color strand 1
  color2?: string      // Color strand 2
}
```

**Verificación:**
```bash
bun run dev  # Doble hélice visible estática
bun run build
```

---

### Ticket 2.2: Animación de rotación del ADN
**Branch:** `feat/visual-dna-rotation`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ticket 2.1

**Scope:**
- Rotación continua en eje Y
- Velocidad configurable
- useFrame para animación fluida
- Opción de pausar rotación

**Archivos tocados:**
- `src/components/three/DNAHelix.tsx`

**Verificación:**
```bash
bun run dev  # ADN rotando suavemente
```

---

### Ticket 2.3: Material iridiscente para ADN
**Branch:** `feat/visual-dna-material`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 2.1

**Scope:**
- MeshPhysicalMaterial con iridiscencia
- Efecto de refracción sutil
- Transparencia parcial
- Emissive glow en los nucleótidos

**Archivos tocados:**
- `src/components/three/DNAHelix.tsx`

**Colores nucleótidos:**
```typescript
const NUCLEOTIDE_COLORS = {
  A: '#2ECC71', // Adenina - Verde
  T: '#E74C3C', // Timina - Rojo
  G: '#F1C40F', // Guanina - Amarillo
  C: '#3498DB', // Citosina - Azul
}
```

---

### Ticket 2.4: Mapeo de traits a colores del ADN
**Branch:** `feat/visual-dna-traits`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 2.3

**Scope:**
- Recibir array de traits como prop
- Mapear cada trait a color de nucleótido
- Highlight de genes dominantes
- Tooltip on hover (futuro)

**Archivos tocados:**
- `src/components/three/DNAHelix.tsx`

**Props adicionales:**
```typescript
interface DNAHelixProps {
  // ... anteriores
  traits?: string[]    // Array de traits del agente
  highlightDominant?: boolean
}
```

---

### Ticket 2.5: Efecto glow/bloom en ADN
**Branch:** `feat/visual-dna-bloom`
**Prioridad:** 🟢 Baja
**Dependencias:** Ticket 2.3

**Scope:**
- EffectComposer de postprocessing
- Bloom effect sutil
- Solo en elementos emissivos
- Ajustable por nivel de calidad

**Archivos tocados:**
- `src/components/three/Scene.tsx`
- `src/components/three/DNAHelix.tsx`

---

## Fase 3: Sistema de Partículas

### Ticket 3.1: Sistema de partículas básico
**Branch:** `feat/visual-particles-base`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ticket 1.1

**Scope:**
- Points geometry con BufferGeometry
- Posiciones aleatorias en espacio 3D
- Cantidad configurable (50-500)
- Tamaños variables

**Archivos tocados:**
- `src/components/three/Particles.tsx`

**Props:**
```typescript
interface ParticlesProps {
  count?: number        // Cantidad (default: 200)
  spread?: number       // Dispersión espacial
  colors?: string[]     // Paleta de colores
  minSize?: number
  maxSize?: number
}
```

---

### Ticket 3.2: Animación orgánica de partículas
**Branch:** `feat/visual-particles-animation`
**Prioridad:** 🔴 Crítica
**Dependencias:** Ticket 3.1

**Scope:**
- Movimiento con Perlin/Simplex noise
- Velocidad variable por partícula
- Floating effect natural
- useFrame optimizado

**Archivos tocados:**
- `src/components/three/Particles.tsx`

---

### Ticket 3.3: Colores de nucleótidos en partículas
**Branch:** `feat/visual-particles-colors`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 3.2

**Scope:**
- Aplicar paleta ATGC a partículas
- Distribución aleatoria de colores
- Transiciones de color suaves
- Match con paleta del ADN

**Archivos tocados:**
- `src/components/three/Particles.tsx`

**Colores:**
```typescript
const PARTICLE_COLORS = [
  '#2ECC71', // A
  '#E74C3C', // T
  '#F1C40F', // G
  '#3498DB', // C
  '#FF6B9D', // Accent pink
  '#4ECDC4', // Accent cyan
]
```

---

## Fase 4: Agent Cards 3D

### Ticket 4.1: Card 3D básica
**Branch:** `feat/visual-card3d-base`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 1.1

**Scope:**
- Plane geometry con bordes redondeados
- MeshPhysicalMaterial glassmorphism
- Recibir textura/contenido como prop
- Posicionable en espacio 3D

**Archivos tocados:**
- `src/components/three/AgentCard3D.tsx`

---

### Ticket 4.2: Sistema de carrusel 3D
**Branch:** `feat/visual-card3d-carousel`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 4.1

**Scope:**
- Múltiples cards en disposición 3D
- Card activa al frente, resto atrás
- Navegación con scroll/flechas
- Animación de transición

**Archivos tocados:**
- `src/components/three/AgentCard3D.tsx`
- `src/components/three/CardCarousel.tsx` (nuevo)

---

### Ticket 4.3: Integración con datos de agentes
**Branch:** `feat/visual-card3d-data`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 4.2

**Scope:**
- Consumir datos reales de agentes
- Renderizar stats en la card
- Imagen/avatar del agente
- Nombre y generación

**Archivos tocados:**
- `src/components/three/AgentCard3D.tsx`

---

### Ticket 4.4: Efectos hover en cards
**Branch:** `feat/visual-card3d-hover`
**Prioridad:** 🟢 Baja
**Dependencias:** Ticket 4.1

**Scope:**
- Raycast para detectar hover
- Scale up suave on hover
- Glow/highlight del borde
- Cursor pointer

**Archivos tocados:**
- `src/components/three/AgentCard3D.tsx`

---

## Fase 5: Breeding Chamber

### Ticket 5.1: Estructura del portal
**Branch:** `feat/visual-chamber-structure`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 1.1

**Scope:**
- Geometría de anillo/portal
- Pilares cilíndricos
- Material metálico
- Posicionamiento central

**Archivos tocados:**
- `src/components/three/BreedingChamber.tsx`

---

### Ticket 5.2: Animación de fusión de ADN
**Branch:** `feat/visual-chamber-fusion`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 5.1, Ticket 2.1

**Scope:**
- Dos ADNs entrando desde los lados
- Animación de aproximación
- Fusión en el centro
- Timeline con GSAP o manual

**Archivos tocados:**
- `src/components/three/BreedingChamber.tsx`

---

### Ticket 5.3: Efecto de "nacimiento"
**Branch:** `feat/visual-chamber-birth`
**Prioridad:** 🟢 Baja
**Dependencias:** Ticket 5.2

**Scope:**
- Explosión de partículas al fusionar
- Nuevo ADN aparece del centro
- Efecto de luz intensa momentánea
- Sonido opcional (solo preparar hook)

**Archivos tocados:**
- `src/components/three/BreedingChamber.tsx`

---

### Ticket 5.4: Integración en página de Breeding
**Branch:** `feat/visual-chamber-integration`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 5.3

**Scope:**
- Importar BreedingChamber en breeding page
- Conectar con estado de breeding
- Trigger animación al confirmar breed
- Mostrar resultado al completar

**Archivos tocados:**
- `src/app/breeding/page.tsx`

---

## Fase 6: Polish & Optimización

### Ticket 6.1: LOD (Level of Detail)
**Branch:** `feat/visual-lod`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 1.3

**Scope:**
- Reducir partículas en móvil
- Simplificar geometría ADN en low-end
- Desactivar postprocessing si necesario
- Usar usePerformance hook

**Archivos tocados:**
- Todos los componentes three/

---

### Ticket 6.2: Lazy loading de escenas
**Branch:** `feat/visual-lazy`
**Prioridad:** 🟡 Media
**Dependencias:** Ticket 1.4

**Scope:**
- Cargar escena 3D solo cuando visible
- Intersection Observer
- Suspense con fallback
- Preload de assets críticos

**Archivos tocados:**
- `src/components/three/Scene.tsx`
- `src/components/landing/Hero.tsx`

---

### Ticket 6.3: Versión Lite (CSS fallback)
**Branch:** `feat/visual-lite`
**Prioridad:** 🟢 Baja
**Dependencias:** Ticket 6.1

**Scope:**
- Crear DNAHelixLite con CSS 3D
- Detector de soporte WebGL
- Auto-switch a versión lite si no soporta
- Mantener estética similar

**Archivos tocados:**
- `src/components/three/DNAHelixLite.tsx` (nuevo)
- `src/components/three/index.tsx`

---

### Ticket 6.4: Testing de rendimiento
**Branch:** `feat/visual-perf-test`
**Prioridad:** 🟢 Baja
**Dependencias:** Ticket 6.1

**Scope:**
- Medir FPS en diferentes dispositivos
- Documentar benchmarks
- Ajustar defaults según resultados
- Crear matriz de compatibilidad

**Archivos tocados:**
- `docs/dev/PERFORMANCE-BENCHMARKS.md` (nuevo)

---

## 📈 Grafo de Dependencias

```
Fase 0
  0.1 (deps) ──→ 0.2 (structure)
                    │
Fase 1              ▼
  ┌─────────────→ 1.1 (scene base)
  │                 │
  │    ┌────────────┼────────────┐
  │    ▼            ▼            ▼
  │  1.2 (fog)   1.3 (perf)   1.4 (hero)
  │                 │
Fase 2              │
  │    ┌────────────┘
  │    ▼
  └──→ 2.1 (dna geometry)
         │
         ├──→ 2.2 (rotation)
         │
         └──→ 2.3 (material) ──→ 2.4 (traits) ──→ 2.5 (bloom)
         
Fase 3
  1.1 ──→ 3.1 (particles) ──→ 3.2 (animation) ──→ 3.3 (colors)

Fase 4
  1.1 ──→ 4.1 (card3d) ──→ 4.2 (carousel) ──→ 4.3 (data)
                │
                └──→ 4.4 (hover)

Fase 5
  1.1 + 2.1 ──→ 5.1 (chamber) ──→ 5.2 (fusion) ──→ 5.3 (birth) ──→ 5.4 (integration)

Fase 6
  All ──→ 6.1 (lod) ──→ 6.2 (lazy) ──→ 6.3 (lite) ──→ 6.4 (perf test)
```

---

## 🏃 Orden de Ejecución Recomendado

**Sprint 1 (Base):** 0.1 → 0.2 → 1.1 → 1.3 → 1.4
**Sprint 2 (ADN):** 2.1 → 2.2 → 2.3 → 2.4
**Sprint 3 (Partículas):** 3.1 → 3.2 → 3.3 → 1.2
**Sprint 4 (Cards):** 4.1 → 4.2 → 4.3
**Sprint 5 (Chamber):** 5.1 → 5.2 → 5.3 → 5.4
**Sprint 6 (Polish):** 2.5 → 4.4 → 6.1 → 6.2 → 6.3 → 6.4

---

## 📝 Notas

- **Priorizar:** Tickets 0.x, 1.x, 2.1-2.3 son críticos para MVP visual
- **Paralelizables:** Fase 3 y 4 pueden correr en paralelo después de Fase 1
- **Nice-to-have:** Tickets con prioridad 🟢 pueden posponerse
- **Testing:** Verificar en Chrome, Firefox, Safari, móvil después de cada fase

---

*Documento creado: 2026-02-26*
*Basado en: cracked-dev workflow*
*Para: Genomad Visual Redesign*
