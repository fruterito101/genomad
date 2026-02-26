'use client'

import { useState, useEffect } from 'react'

export type PerformanceLevel = 'high' | 'medium' | 'low'

interface PerformanceConfig {
  particleCount: number
  enablePostProcessing: boolean
  enableShadows: boolean
  dpr: number // device pixel ratio
}

const PERFORMANCE_CONFIGS: Record<PerformanceLevel, PerformanceConfig> = {
  high: {
    particleCount: 500,
    enablePostProcessing: true,
    enableShadows: true,
    dpr: 2,
  },
  medium: {
    particleCount: 200,
    enablePostProcessing: true,
    enableShadows: false,
    dpr: 1.5,
  },
  low: {
    particleCount: 50,
    enablePostProcessing: false,
    enableShadows: false,
    dpr: 1,
  },
}

export function usePerformance() {
  const [level, setLevel] = useState<PerformanceLevel>('medium')
  const [config, setConfig] = useState<PerformanceConfig>(PERFORMANCE_CONFIGS.medium)

  useEffect(() => {
    // Check localStorage for user preference
    const saved = localStorage.getItem('genomad-performance')
    if (saved && (saved === 'high' || saved === 'medium' || saved === 'low')) {
      setLevel(saved)
      setConfig(PERFORMANCE_CONFIGS[saved])
      return
    }

    // Auto-detect performance level
    const detectLevel = (): PerformanceLevel => {
      // Check if mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) return 'low'

      // Check device memory (if available)
      const nav = navigator as Navigator & { deviceMemory?: number }
      if (nav.deviceMemory && nav.deviceMemory < 4) return 'low'
      if (nav.deviceMemory && nav.deviceMemory >= 8) return 'high'

      // Check hardware concurrency
      if (navigator.hardwareConcurrency < 4) return 'low'
      if (navigator.hardwareConcurrency >= 8) return 'high'

      return 'medium'
    }

    const detected = detectLevel()
    setLevel(detected)
    setConfig(PERFORMANCE_CONFIGS[detected])
  }, [])

  const setPerformanceLevel = (newLevel: PerformanceLevel) => {
    localStorage.setItem('genomad-performance', newLevel)
    setLevel(newLevel)
    setConfig(PERFORMANCE_CONFIGS[newLevel])
  }

  return {
    level,
    config,
    setPerformanceLevel,
  }
}
