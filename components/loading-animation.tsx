"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SplitText from "./split-text"
import { Canvas } from "@react-three/fiber"
import { Physics, useBox, usePlane } from "@react-three/cannon"
import { Environment } from "@react-three/drei"

// Dumbbell component with better 3D model
function Dumbbell(props) {
  const [ref, api] = useBox(() => ({
    mass: 10,
    position: [0, 15, 0], // Start higher for longer fall
    rotation: [0.1, 0.1, 0.1],
    ...props,
  }))

  // Create a more realistic dumbbell
  return (
    <mesh ref={ref} castShadow receiveShadow>
      {/* Center bar */}
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 5, 32]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Grip texture */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 3, 32]} />
          <meshStandardMaterial color="#222" metalness={0.5} roughness={0.8} opacity={0.9} transparent />
        </mesh>

        {/* Left weight plate 1 - largest */}
        <mesh position={[-2.7, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.4, 32]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Left weight plate 2 */}
        <mesh position={[-2.3, 0, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Left weight plate 3 */}
        <mesh position={[-1.9, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Left collar */}
        <mesh position={[-1.5, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Right weight plate 1 - largest */}
        <mesh position={[2.7, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.4, 32]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Right weight plate 2 */}
        <mesh position={[2.3, 0, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.3, 32]} />
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Right weight plate 3 */}
        <mesh position={[1.9, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Right collar */}
        <mesh position={[1.5, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </mesh>
  )
}

// Floor component
function Floor(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
    ...props,
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#111" />
    </mesh>
  )
}

// Dust particle effect
function DustEffect({ active }) {
  const particlesRef = useRef()
  const count = 200 // More particles for better effect
  const positions = useRef(new Float32Array(count * 3))
  const sizes = useRef(new Float32Array(count))
  const colors = useRef(new Float32Array(count * 3))

  useEffect(() => {
    if (active && particlesRef.current) {
      // Initialize particles in a circular pattern around impact point
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 5
        const height = Math.random() * 3

        positions.current[i * 3] = Math.cos(angle) * radius
        positions.current[i * 3 + 1] = height
        positions.current[i * 3 + 2] = Math.sin(angle) * radius

        // Random sizes for more natural look
        sizes.current[i] = Math.random() * 0.3 + 0.1

        // Grayscale colors with slight variation
        const shade = Math.random() * 0.3 + 0.5
        colors.current[i * 3] = shade
        colors.current[i * 3 + 1] = shade
        colors.current[i * 3 + 2] = shade
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.geometry.attributes.size.needsUpdate = true
      particlesRef.current.geometry.attributes.color.needsUpdate = true
    }
  }, [active, count])

  return active ? (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes.current} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={count} array={colors.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors sizeAttenuation transparent opacity={0.8} />
    </points>
  ) : null
}

export default function LoadingAnimation({ onComplete }) {
  const [impact, setImpact] = useState(false)
  const [showText, setShowText] = useState(false)

  // Optimize the loading animation for better performance
  // Update the useEffect in LoadingAnimation component to make it faster
  useEffect(() => {
    // Trigger impact after dumbbell falls (shorter time)
    const impactTimer = setTimeout(() => {
      setImpact(true)
    }, 1000) // Reduced time for faster animation

    // Show text after impact
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 1200) // Show text sooner

    return () => {
      clearTimeout(impactTimer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
          <Physics gravity={[0, -5, 0]}>
            {" "}
            {/* Increased gravity for faster fall */}
            <Dumbbell />
            <Floor />
          </Physics>
          <DustEffect active={impact} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Text Animation */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <SplitText
                text="ARUN FITNESS AND TRAINING"
                className="text-4xl md:text-6xl font-bold tracking-wider"
                delay={20} // Much faster animation
                onLetterAnimationComplete={onComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
