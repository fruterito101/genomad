// GLSL Shaders for Three.js components

// Particle vertex shader
export const particleVertexShader = /* glsl */ `
  uniform float time;
  varying vec3 vPosition;
  
  void main() {
    vPosition = position;
    vec3 pos = position;
    pos.y += sin(time + position.x) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 3.0;
  }
`

// Particle fragment shader
export const particleFragmentShader = /* glsl */ `
  varying vec3 vPosition;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    gl_FragColor = vec4(1.0, 0.42, 0.62, 1.0 - dist * 2.0);
  }
`

// Glitch effect shader (for text)
export const glitchFragmentShader = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  
  void main() {
    float offset = sin(time * 50.0) * intensity * 0.02;
    vec4 r = texture2D(tDiffuse, vUv + vec2(offset, 0.0));
    vec4 g = texture2D(tDiffuse, vUv);
    vec4 b = texture2D(tDiffuse, vUv - vec2(offset, 0.0));
    gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
  }
`
