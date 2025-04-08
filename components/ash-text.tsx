"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"

export default function AshText({ children, threshold = 0.5 }) {
  const ref = useRef(null)
  const [charArray, setCharArray] = useState([])
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    if (typeof children === "string") {
      setCharArray(children.split(""))
    }
  }, [children])

  return (
    <motion.div ref={ref} className="relative">
      <span className="opacity-0">{children}</span>
      <motion.div className="absolute top-0 left-0 w-full">
        {charArray.map((char, i) => (
          <AshChar key={i} char={char} scrollYProgress={scrollYProgress} delay={i * 0.01} threshold={threshold} />
        ))}
      </motion.div>
    </motion.div>
  )
}

function AshChar({ char, scrollYProgress, delay, threshold }) {
  const y = useMotionValue(0)
  const opacity = useMotionValue(1)

  const yRange = useTransform(scrollYProgress, [threshold - 0.1, threshold], [0, -20])
  const opacityRange = useTransform(scrollYProgress, [threshold - 0.1, threshold], [1, 0])

  useEffect(() => {
    const unsubscribeY = yRange.onChange((latest) => {
      y.set(latest)
    })

    const unsubscribeOpacity = opacityRange.onChange((latest) => {
      opacity.set(latest)
    })

    return () => {
      unsubscribeY()
      unsubscribeOpacity()
    }
  }, [yRange, opacityRange, y, opacity])

  return (
    <motion.span
      style={{
        y,
        opacity,
        display: "inline-block",
        position: "relative",
        filter: "url(#ash-filter)",
        transformOrigin: "center bottom",
      }}
      transition={{ delay }}
    >
      {char === " " ? "\u00A0" : char}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="ash-filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={useTransform(scrollYProgress, [threshold - 0.1, threshold], [0, 2])}
            />
            <feColorMatrix
              type="matrix"
              values={`1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 ${useTransform(scrollYProgress, [threshold - 0.1, threshold], [1, 0.5])} 0`}
            />
          </filter>
        </defs>
      </svg>
    </motion.span>
  )
}
