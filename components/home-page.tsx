"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dumbbell, ChevronRight, Menu, X, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AshText from "./ash-text"
import TrueFocus from "./true-focus"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.9])
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 100])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">ARUN FITNESS</span>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink href="https://www.instagram.com/virajr7123/">About</NavLink>
              <NavLink href="https://www.instagram.com/virajr7123/">Services</NavLink>
              <NavLink href="https://www.instagram.com/virajr7123/">Programs</NavLink>
              <NavLink href="https://www.instagram.com/virajr7123/">Testimonials</NavLink>
              <NavLink href="https://www.instagram.com/virajr7123/">Contact</NavLink>
            </nav>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 py-2 bg-zinc-900 flex flex-col space-y-3">
                <NavLink href="https://www.instagram.com/virajr7123/" onClick={() => setIsMenuOpen(false)}>
                  About
                </NavLink>
                <NavLink href="https://www.instagram.com/virajr7123/" onClick={() => setIsMenuOpen(false)}>
                  Services
                </NavLink>
                <NavLink href="https://www.instagram.com/virajr7123/" onClick={() => setIsMenuOpen(false)}>
                  Programs
                </NavLink>
                <NavLink href="https://www.instagram.com/virajr7123/" onClick={() => setIsMenuOpen(false)}>
                  Testimonials
                </NavLink>
                <NavLink href="https://www.instagram.com/virajr7123/" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Main background image - Changed to the woman with rope image */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}>
          <Image
            src="/images/fitness-rope.jpeg"
            alt="Fitness background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}>
              <AshText threshold={0.2}>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                  Transform Your Body, <br />
                  <span className="text-zinc-400">Transform Your Life</span>
                </h1>
              </AshText>
            </motion.div>

            <motion.p className="text-xl md:text-2xl mb-8 text-zinc-300" variants={fadeIn}>
              <SimpleDecrypt
                text="Personal training with a focus on your unique fitness journey"
                className="text-white"
              />
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeIn}>
              <Button size="lg" className="bg-zinc-100 text-black hover:bg-zinc-200 group">
                <span className="text-black font-medium">Start Your Journey</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ChevronRight className="ml-2 h-4 w-4 text-black" />
                </motion.span>
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-400 hover:bg-zinc-800 text-white">
                <span className="text-white font-medium">Learn More</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <ChevronRight className="h-10 w-10 rotate-90" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="relative h-[500px] w-full">
              <Image
                src="/images/arun-teaching.jpeg"
                alt="Arun Fitness Trainer"
                fill
                className="rounded-lg object-cover object-center"
                priority
              />
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">About Arun Fitness</h2>
              <div className="text-zinc-300 space-y-4">
                <SimpleDecrypt
                  text="I'm Arun — a Physics educator from IIT and a certified personal trainer, blending science with strength to help people transform both their body and mindset. Over the years, I've taught hundreds of students how to understand complex concepts with ease — and now, I bring that same clarity and care into fitness. I know what it feels like to want change but not know where to start. Whether you're a student buried in books or someone who's never stepped into a gym, I'm here to tell you: building a strong, healthy body isn't just possible — it's simple when you have the right guidance. At Arun Fitness, we don't just count reps. We build habits, confidence, and connection. You don't need fancy machines or perfect genetics — you just need someone who truly gets your struggles and stands beside you like a friend, a mentor, and a trainer who actually cares. Let's begin, together."
                  className="text-white"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <TrueFocus
              sentence="STAY FOCUSED KEEP TRAINING"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              <SimpleDecrypt text="Our Services" className="text-white" />
            </motion.h2>
            <motion.p variants={fadeIn} className="text-zinc-300 max-w-2xl mx-auto">
              Comprehensive fitness solutions tailored to your individual needs and goals
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              title="Personal Training"
              description="One-on-one sessions designed specifically for your body, goals, and schedule."
              icon={<Dumbbell className="h-12 w-12" />}
            />
            <ServiceCard
              title="Nutrition Planning"
              description="Custom meal plans that complement your training and help you achieve optimal results."
              icon={<Dumbbell className="h-12 w-12" />}
            />
            <ServiceCard
              title="Group Sessions"
              description="High-energy group workouts that combine motivation, community, and results."
              icon={<Dumbbell className="h-12 w-12" />}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              <AshText threshold={0.4}>Ready to Transform Your Body?</AshText>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-zinc-300 max-w-2xl mx-auto mb-8">
              Take the first step towards a healthier, stronger you. Schedule a free consultation today.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button
                size="lg"
                className="bg-zinc-100 hover:bg-zinc-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-black font-medium">Get Started Now</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-6 w-6" />
                <span className="font-bold text-lg">ARUN FITNESS</span>
              </div>
              <p className="text-zinc-400">Transforming bodies and lives through personalized fitness training.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Pacefic Wallah Andheri</li>
                <li>info@arunfitness.com</li>
              </ul>
              <div className="mt-4">
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.instagram.com/virajr7123/"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/virajr7123/"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/virajr7123/"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500">
            <p>&copy; {new Date().getFullYear()} Arun Fitness and Training. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Fix the SimpleDecrypt function to make the animation much faster
function SimpleDecrypt({ text, className = "" }) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let currentText = ""
    let currentIndex = 0
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+"
    const finalText = text
    const interval = 2 // Ultra fast animation

    // Function to get a random character
    const getRandomChar = () => characters.charAt(Math.floor(Math.random() * characters.length))

    // Create a scrambled version of the text
    const getScrambledText = () => {
      let scrambled = ""
      for (let i = 0; i < finalText.length; i++) {
        if (i < currentIndex) {
          scrambled += finalText[i]
        } else if (finalText[i] === " ") {
          scrambled += " "
        } else {
          scrambled += getRandomChar()
        }
      }
      return scrambled
    }

    // Initial scrambled text
    setDisplayText(getScrambledText())

    // Animation timer
    const timer = setInterval(() => {
      if (currentIndex < finalText.length) {
        // Reveal multiple characters at once for longer texts
        const charsToReveal = finalText.length > 100 ? 10 : 2
        currentIndex = Math.min(currentIndex + charsToReveal, finalText.length)
        currentText = finalText.substring(0, currentIndex)
        setDisplayText(getScrambledText())
      } else {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, text])

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  )
}

function NavLink({ href, children, onClick = () => {} }) {
  return (
    <Link href={href} className="text-zinc-300 hover:text-white transition-colors" onClick={onClick}>
      {children}
    </Link>
  )
}

function ServiceCard({ title, description, icon }) {
  return (
    <motion.div
      className="bg-zinc-900 p-8 rounded-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 },
        },
      }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="mb-4 text-zinc-100">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  )
}
