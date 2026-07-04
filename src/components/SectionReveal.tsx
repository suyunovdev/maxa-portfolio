import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionReveal({ children, className = '', id }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  )
}
