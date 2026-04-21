'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false)
  const contactoRef = useRef<Element | null>(null)
  const contactoVisible = useRef(false)

  useEffect(() => {
    // Show after 300px scroll
    const handleScroll = () => {
      const past300 = window.scrollY > 300
      setVisible(past300 && !contactoVisible.current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Hide when #contacto is in view
    const contactoEl = document.getElementById('contacto')
    if (contactoEl) {
      contactoRef.current = contactoEl
      const observer = new IntersectionObserver(
        ([entry]) => {
          contactoVisible.current = entry.isIntersecting
          setVisible(window.scrollY > 300 && !entry.isIntersecting)
        },
        { threshold: 0.1 }
      )
      observer.observe(contactoEl)
      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 bg-[#1A1A1A]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between gap-4">

            {/* Isotipo MC — desktop only */}
            <div className="hidden md:flex items-center shrink-0">
              <Image
                src="/images/brand/isotipo/magiclean-mc.webp"
                alt="MagiClean"
                width={1670}
                height={975}
                className="h-7 w-auto"
              />
            </div>

            {/* CTA */}
            <a
              href="#contacto"
              className="flex items-center justify-center gap-2 bg-[#0076FF] hover:bg-[#0052CC] text-white px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors duration-200 w-full md:w-auto"
            >
              Solicitar cotización
              <ArrowRight size={13} className="shrink-0" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
