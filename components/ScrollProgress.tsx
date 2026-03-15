'use client'
import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

// Animation variants — BookMyRehab style
export const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 50 },           visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -40 },          visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -60 },          visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 60 },           visible: { opacity: 1, x: 0 } },
  fadeIn:    { hidden: { opacity: 0 },                  visible: { opacity: 1 } },
  scaleUp:   { hidden: { opacity: 0, scale: 0.85 },     visible: { opacity: 1, scale: 1 } },
  scaleDown: { hidden: { opacity: 0, scale: 1.1 },      visible: { opacity: 1, scale: 1 } },
  flipUp:    { hidden: { opacity: 0, rotateX: 20, y: 40 }, visible: { opacity: 1, rotateX: 0, y: 0 } },
  slideUp:   { hidden: { opacity: 0, y: 80 },           visible: { opacity: 1, y: 0 } },
  blurUp:    { hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } },
}

type VariantKey = keyof typeof variants

interface ScrollRevealProps {
  children?: ReactNode
  variant?: VariantKey
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  margin?: string
}

// Single element reveal
export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  className = '',
  once = true,
  margin = '-80px',
}: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: margin as any })

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children container — each child animates one by one
interface StaggerProps {
  children: ReactNode
  staggerDelay?: number
  childVariant?: VariantKey
  childDuration?: number
  className?: string
  margin?: string
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  childVariant = 'fadeUp',
  childDuration = 0.55,
  className = '',
  margin = '-60px',
}: StaggerProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: margin as any })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={variants[childVariant]}
              transition={{ duration: childDuration, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div variants={variants[childVariant]} transition={{ duration: childDuration }}>{children}</motion.div>
      }
    </motion.div>
  )
}

// Line reveal — text line by line
export function LineReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.05, ease: 'easeOut' }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Number count-up on scroll
export function CountUp({ value, suffix = '', prefix = '', duration = 2, className = '' }: {
  value: number; suffix?: string; prefix?: string; duration?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useRef(0)

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        onUpdate={() => {}}
      >
        {prefix}
        <motion.span
          initial="0"
          animate={inView ? String(value) : '0'}
        />
        {suffix}
      </motion.span>
    </motion.span>
  )
}

export default ScrollReveal
