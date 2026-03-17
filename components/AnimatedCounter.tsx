'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Patients', emoji: '😊' },
  { value: 10, suffix: '+', label: 'Years Experience', emoji: '📅' },
  { value: 4.9, suffix: '', label: 'Star Rating', emoji: '⭐', isDecimal: true },
  { value: 20, suffix: '+', label: 'Combined Exp.', emoji: '📋' },
]

function Counter({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    // Start animation when in view OR after 1 second (fallback for Vercel)
    const fallback = setTimeout(() => setStarted(true), 1000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (!inView && !started) return
    let start = 0
    const step = 16
    const increment = value / (1800 / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, started, value, isDecimal])

  return (
    <span ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 tracking-tight">
      {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </span>
  )
}

export default function AnimatedCounter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-10 md:py-16 px-4 sm:px-6 md:px-20 bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl px-3 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center px-2 sm:px-4 py-3 gap-1.5 cursor-default"
            >
              <motion.span
                className="text-2xl md:text-3xl mb-1"
                animate={inView ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
              >
                {stat.emoji}
              </motion.span>
              <Counter value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
