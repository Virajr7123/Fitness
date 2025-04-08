"use client"

import { useState, useEffect } from "react"
import LoadingAnimation from "@/components/loading-animation"
import HomePage from "@/components/home-page"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Reduced to 2 seconds for faster loading

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {loading ? <LoadingAnimation onComplete={() => setLoading(false)} /> : <HomePage />}
    </main>
  )
}
