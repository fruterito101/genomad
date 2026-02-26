# 🧬 Análisis Visual: Active Theory → Genomad

## Objetivo
Extraer técnicas visuales de activetheory.net para aplicarlas al estilo de Genomad.

---

## 📸 CAPTURA 1: Portfolio View (Magic Leap)

### Elementos Identificados:
1. **Spine/Vértebra Central**
   - Modelo 3D orgánico tipo columna vertebral
   - Material: cristal/metal con reflejos iridiscentes
   - Textura: subsurface scattering (SSS) para efecto translúcido

2. **Partículas Flotantes**
   - Colores: Rosa (#FF6B9D), Cyan (#4ECDC4), Púrpura (#9B59B6)
   - Tamaños variables (3-15px equivalentes)
   - Movimiento: flotación orgánica con noise
   - Densidad: ~500-1000 partículas visibles

3. **Cards 3D (Proyectos)**
   - Bordes redondeados (border-radius ~20px)
   - Efecto glassmorphism sutil
   - Sombra volumétrica
   - Rotación en eje Y (parallax 3D)

4. **Tipografía**
   - Font: Monospace/Terminal style
   - "MAGIC LEAP" con efecto glitch/scan lines
   - Color: blanco con variaciones RGB (chromatic aberration)

5. **UI Overlay (Izquierda)**
   - Menú estático: "WHAT ARE YOU LOOKING FOR?"
   - Items con prefijo "->" (terminal aesthetic)
   - Botón "ASK ME ANYTHING..." con borde pill

6. **Navegación (Derecha Superior)**
   - Toggle "WORK / CONTACT" con slider central
   - Controles "<< >>" para navegación
   - Texto pequeño indicador de posición

### Técnicas Three.js:
```javascript
// Partículas GPU
const particles = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: particleVertex,
    fragmentShader: particleFragment
  })
);

// Cards como planos 3D
const card = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.2),
  new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.9,
    roughness: 0.1
  })
);
```

---

## 📸 CAPTURA 2: Finding Love (Card Centrada)

### Elementos Nuevos:
1. **Card Principal al Centro**
   - Textura de fondo: arte abstracto colorido
   - Título limpio "FINDING LOVE"
   - Icono circular con cruz (⊕)

2. **Figura Humanoide (Arriba)**
   - Silueta 3D tipo escultura digital
   - Material similar al spine (iridiscente)
   - Posición: flotando sobre las cards

3. **Profundidad de Cards**
   - Card frontal: opacidad 100%, blur 0
   - Cards laterales: opacidad 70%, blur sutil
   - Efecto de carrusel 3D

---

## 📸 CAPTURA 3: Transición/Glitch State

### Elementos Únicos:
1. **Texto en Transición**
   - "FINDING LOVE" descomponiéndose
   - Efecto: letras separándose con offset RGB
   - Glitch horizontal visible

2. **Estado Intermedio**
   - Blend entre dos cards
   - Partículas más densas en zona de transición

---

## 📸 CAPTURA 4: World Brush (Card Oscura)

### Elementos:
1. **Card con Fondo Oscuro**
   - Contraste con cards coloridas anteriores
   - Logo "@" de World Brush
   - Tipografía bold

2. **Spine Más Visible**
   - Mejor iluminación del modelo
   - Se aprecia la geometría detallada
   - Cables/tubos conectando secciones

---

## 📸 CAPTURA 5: Transición al Portal

### Elementos:
1. **Estructura Metálica**
   - Gazebo/jaula circular
   - Barras verticales finas
   - Cables curvos colgando

2. **Ambiente Oscuro**
   - Fog volumétrico
   - Luz ambiental mínima
   - Sensación de profundidad/abismo

---

## 📸 CAPTURA 6: El Portal Final

### Elementos Principales:
1. **Estructura del Portal**
   - Anillo superior con cables
   - Pilares metálicos
   - Base circular con plataforma

2. **Esfera de Partículas (Centro)**
   - ~2000-5000 partículas
   - Forma esférica pero orgánica
   - Colores: verde/cyan/rosa/blanco
   - Movimiento: rotación + breathing

3. **Terreno Rocoso**
   - Geometría irregular
   - Material: roca con normal maps
   - Ambient occlusion fuerte

4. **Agua/Reflejo**
   - Superficie reflectante abajo
   - Refracción sutil
   - Color oscuro con highlights

---

## 🎨 PALETA DE COLORES EXTRAÍDA

| Nombre | Hex | Uso |
|--------|-----|-----|
| Deep Black | #0A0A0F | Fondo principal |
| Cyber Teal | #1A3A3A | Gradiente fondo |
| Particle Pink | #FF6B9D | Partículas accent |
| Particle Cyan | #4ECDC4 | Partículas primario |
| Particle Purple | #9B59B6 | Partículas secundario |
| Glass White | #FFFFFF20 | Glassmorphism |
| Metal Gray | #8B8B8B | Estructuras metálicas |
| Water Dark | #001e0f | Agua/reflejos |

---

## 🧬 APLICACIÓN A GENOMAD

### Concepto: "Laboratorio Genético Digital"

| Active Theory | Genomad Equivalente |
|---------------|---------------------|
| Spine/Vértebra | **Doble Hélice de ADN** |
| Cards de proyectos | **Cards de Agentes** |
| Portal final | **Cámara de Breeding** |
| Partículas random | **Nucleótidos flotantes (A,T,G,C)** |
| Figura humanoide | **Silueta de Agente evolucionando** |
| Agua reflectante | **Líquido amniótico/nutritivo** |

### Elementos Únicos para Genomad:

1. **ADN Central (reemplaza Spine)**
   - Doble hélice girando lentamente
   - Cada "peldaño" representa un trait
   - Colores de traits mapeados a nucleótidos
   - Brillo/glow en genes dominantes

2. **Agent Cards 3D**
   - Previews 3D de agentes
   - Stats como overlay
   - Efecto de "incubación" (partículas saliendo)
   - Hover: zoom + stats detallados

3. **Breeding Chamber (Portal)**
   - Dos ADNs entrando de los lados
   - Fusión en el centro
   - Explosión de partículas al crear hijo
   - El resultado aparece en esfera central

4. **Partículas = Genes**
   - A (Adenina) = Verde #2ECC71
   - T (Timina) = Rojo #E74C3C
   - G (Guanina) = Amarillo #F1C40F
   - C (Citosina) = Azul #3498DB

5. **Ambiente**
   - Estética: Laboratorio + Orgánico + Sci-Fi
   - Fog volumétrico verde/cyan
   - Luces de "microscopio"
   - Grid de fondo tipo TRON

---

## 📦 STACK TÉCNICO RECOMENDADO

### Librerías Core:
- **Three.js** - Motor 3D
- **React Three Fiber** - Three.js en React
- **Drei** - Helpers para R3F
- **GSAP** - Animaciones complejas
- **Leva** - Debug de parámetros

### Shaders Necesarios:
1. Particle system shader (GPU)
2. Glitch/chromatic aberration
3. Hologram/scan lines
4. Water reflection
5. Volumetric fog
6. DNA helix generator

---

## 🚀 FASES DE IMPLEMENTACIÓN

### Fase 1: Base (2-3 días)
- [ ] Setup React Three Fiber
- [ ] Fondo con gradiente + fog
- [ ] Sistema de partículas básico
- [ ] Cámara con OrbitControls

### Fase 2: ADN Central (3-4 días)
- [ ] Geometría de doble hélice
- [ ] Animación de rotación
- [ ] Mapeo de colores por trait
- [ ] Efecto glow en genes

### Fase 3: Agent Cards (2-3 días)
- [ ] Cards 3D en carrusel
- [ ] Scroll navigation
- [ ] Hover effects
- [ ] Integración con datos reales

### Fase 4: Breeding Chamber (4-5 días)
- [ ] Estructura del portal
- [ ] Animación de fusión de ADN
- [ ] Sistema de partículas avanzado
- [ ] Efectos de "nacimiento"

### Fase 5: Polish (2-3 días)
- [ ] Postprocessing (bloom, DOF)
- [ ] Responsive/mobile
- [ ] Performance optimization
- [ ] Sound design integration

---

*Documento creado: 2026-02-26*
*Basado en análisis de: activetheory.net*
*Para proyecto: Genomad*
