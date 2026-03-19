'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Phone, MapPin, Clock, ArrowRight,
  ShieldCheck, Zap, Award, Microscope,
  Menu, X,
  Image as ImageIcon, Instagram, Facebook, Youtube, Twitter
} from 'lucide-react'

import HeroSlider from '@/components/HeroSlider'
import AnimatedCounter from '@/components/AnimatedCounter'
import MarqueeBanner from '@/components/MarqueeBanner'
import AboutSection from '@/components/AboutSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import YoutubeSection from '@/components/YoutubeSection'
import FAQSection from '@/components/FAQSection'
import BookingForm from '@/components/BookingForm'
import ShortsSection from '@/components/ShortsSection'
import ScrollProgress from '@/components/ScrollProgress'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen font-sans text-slate-900 overflow-x-hidden bg-white">

      <ScrollProgress />

      {/* NAV */}
      <nav className={`flex justify-between items-center px-6 md:px-20 py-4 fixed top-8 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg shadow-slate-100/80 py-3' : 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50'}`}>
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={scrolled ? 48 : 56} height={scrolled ? 48 : 56} className="transition-all duration-300" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter uppercase leading-none">Optimal<span className="text-blue-600"> Physiotherapy</span></span>
            <span className="text-[8px] font-black text-slate-400 tracking-[0.4em] uppercase mt-0.5 italic">Advanced Rehabilitation Center</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <Link href="/gallery" className="hover:text-blue-600 transition-colors flex items-center gap-1.5"><ImageIcon size={12} />Gallery</Link>
          <a href="#location" className="hover:text-blue-600 transition-colors">Visit</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden sm:block bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all">Book Now</Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-72 bg-white z-[200] shadow-2xl flex flex-col p-8 pt-20">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center"><X size={20} /></button>
          <div className="flex flex-col gap-6 mt-4">
            {[{ label: 'Home', href: '#' }, { label: 'About', href: '#about' }, { label: 'Services', href: '#services' }, { label: 'Gallery', href: '/gallery' }, { label: 'Location', href: '#location' }].map(link => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-slate-700 font-black text-sm uppercase tracking-[0.2em] border-b border-slate-100 pb-4 hover:text-blue-600 transition-colors">{link.label}</a>
            ))}
            <Link href="/book" onClick={() => setMenuOpen(false)} className="bg-blue-600 text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all mt-4">Book Appointment</Link>
            <a href="tel:+919691898412" className="bg-slate-900 text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"><Phone size={14} /> +91 96918 98412</a>
          </div>
        </motion.div>
      )}
      {menuOpen && <div className="fixed inset-0 bg-black/40 z-[150]" onClick={() => setMenuOpen(false)} />}

      {/* 1. HERO */}
      <div className="pt-[100px]"><HeroSlider /></div>

      {/* 2. MARQUEE */}
      <MarqueeBanner />

      {/* 3. COUNTERS */}
      <AnimatedCounter />

      {/* 4. ABOUT — Vision, Mission, Doctors */}
      <div id="about"><AboutSection /></div>

      {/* 5. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 6. GALLERY BANNER */}
      <section className="px-4 sm:px-6 md:px-20 py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="relative h-[220px] sm:h-[280px] md:h-[360px] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden group cursor-pointer">
            <Link href="/gallery" className="block w-full h-full relative">
              <div className="grid grid-cols-4 grid-rows-2 w-full h-full gap-1">
                <Image src="/gallery/awards2.webp" alt="Optimal Physiotherapy Award Bhopal" fill className="object-cover object-center" />
                <Image src="/gallery/clinic11.webp" alt="Optimal Physiotherapy Clinic" fill className="object-cover object-center" />
                <Image src="/gallery/recaption.webp" alt="Physiotherapy Reception Bhopal" fill className="object-cover object-center" />
                <Image src="/gallery/seminar.webp" alt="Physiotherapy Seminar Bhopal" fill className="object-cover object-center" />
                <Image src="/gallery/advance_equipment.jpg" alt="Advanced Physiotherapy Equipment" fill className="object-cover object-center" />
              </div>
              <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center gap-3 group-hover:bg-black/50 transition-all">
                <p className="text-white text-lg md:text-2xl font-black uppercase tracking-widest">View Clinic Gallery</p>
                <span className="bg-white/20 border border-white/30 text-white text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full backdrop-blur-sm">See All Photos →</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7. SERVICES */}
      <section id="services" className="px-6 md:px-20 py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col items-center text-center mb-20">
            <span className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Expert Solutions</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">TREATMENT <br /><span className="text-blue-600 italic">REDEFINED.</span></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Sports Rehab', icon: <Zap />, img: '/gallery/service1.jpeg', desc: 'High-performance recovery for athletes. ACL, shoulder, knee & return-to-sport programs.', wa: 'Sports Rehabilitation', pos: 'object-center' },
              { title: 'Neuro Care', icon: <Award />, img: '/gallery/service2.jpeg', desc: 'Scientific protocols for stroke recovery, neuropathy & neuro-rehabilitation.', wa: 'Neuro Physiotherapy', pos: 'object-center' },
              { title: 'Spine Sync', icon: <Microscope />, img: '/gallery/service3.jpeg', desc: 'Precision spine mobilization for back pain, disc issues & postural correction.', wa: 'Spine Treatment', pos: 'object-top' },
              { title: "Women's Health", icon: <ShieldCheck />, img: '/gallery/service4.jpeg', desc: 'Prenatal, postnatal & pelvic floor rehabilitation tailored for women.', wa: "Women's Health Physiotherapy", pos: 'object-top' },
              { title: 'Post-Surgical', icon: <Award />, img: '/gallery/service_5.png', desc: 'Structured rehab following joint replacements & orthopedic surgeries.', wa: 'Post-Surgical Rehabilitation', pos: 'object-center' },
              { title: 'Pediatric Physio', icon: <Zap />, img: '/gallery/service6.jpeg', desc: 'Gentle therapy for children with developmental delays & musculoskeletal conditions.', wa: 'Pediatric Physiotherapy', pos: 'object-center' },
            ].map((s, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1}>
                <div className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700">
                  <div className="relative w-full" style={{paddingBottom: '75%'}}>
                    <Image src={s.img} alt={s.title} fill className={`${s.pos} object-cover group-hover:scale-105 transition duration-700`} unoptimized />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-blue-600 z-10">{s.icon}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-black mb-3 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{s.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed italic mb-5">{s.desc}</p>
                    <a href={`https://wa.me/919691898412?text=Hello%20Optimal%20Physiotherapy%2C%20I%20want%20to%20book%20for%20${encodeURIComponent(s.wa)}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all">
                      Book Now <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* 9. YOUTUBE */}
      <YoutubeSection />

      {/* 10. SHORTS */}
      <ShortsSection />

      {/* 11. BOOKING FORM */}
      <BookingForm />

      {/* 11. FAQ */}
      <FAQSection />

      {/* 12. LOCATION */}
      <section id="location" className="px-4 sm:px-6 md:px-20 pb-16 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[2rem] md:rounded-[5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          <Reveal className="p-8 sm:p-12 md:p-24 text-white">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase mb-8 md:mb-12 italic">V i s i t <br /><span className="text-blue-500">C l i n i c</span></h2>
            <div className="space-y-10">
              <div className="flex items-start gap-6"><MapPin className="text-blue-500 mt-1 shrink-0" size={24} /><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Location</p><p className="text-xl font-bold italic">Lalghati Crossroads, Bhopal, MP</p></div></div>
              <div className="flex items-start gap-6"><Clock className="text-blue-500 mt-1 shrink-0" size={24} /><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Timing</p><p className="text-lg font-bold italic text-blue-400">Morning: 9:00AM – 1:00PM</p><p className="text-lg font-bold italic text-blue-400">Evening: 5:00PM – 8:30PM (Mon–Sat)</p></div></div>
              <div className="flex items-start gap-6"><Phone className="text-blue-500 mt-1 shrink-0" size={24} /><div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Phone</p><a href="tel:+919691898412" className="text-xl font-bold italic hover:text-blue-400 transition-colors">+91 96918 98412</a></div></div>
            </div>
            <Link href="/book" className="mt-16 inline-flex bg-white text-slate-900 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl">Reserve Your Slot</Link>
          </Reveal>
          <div className="h-[280px] sm:h-[380px] lg:h-auto bg-slate-800 relative">
            <iframe src="https://www.google.com/maps?q=Optimal%20Physiotherapy%20Clinic%20%26%20Rehabilitation%20Centre%20Lalghati%20Bhopal&output=embed"
              className="w-full h-full absolute inset-0 opacity-80 hover:opacity-100 border-0 transition-opacity" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-slate-900 text-white pt-14 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 md:px-20 rounded-t-[2rem] md:rounded-t-[6rem] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Optimal Physiotherapy Logo" width={40} height={40} className="object-contain" />
              <span className="text-2xl font-black tracking-tighter uppercase italic">Optimal<span className="text-blue-500">Physio</span></span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed italic"><strong>Dr. Pavan Patidar (PT)</strong> ke netrutva mein hum Bhopal ke patients ko world-class rehabilitation provide karte hain.</p>
            <div className="flex gap-4 mt-6">
              {[
                { href: 'https://www.instagram.com/drpavanpatidar?igsh=ZDZ4ZnBuaHRyNzh3', icon: <Instagram size={18} />, hover: 'hover:bg-pink-500' },
                { href: 'https://www.facebook.com/profile.php?id=100064107486462', icon: <Facebook size={18} />, hover: 'hover:bg-blue-600' },
                { href: 'https://www.youtube.com/@optimalphysiotherapy9860', icon: <Youtube size={18} />, hover: 'hover:bg-red-600' },
                { href: 'https://twitter.com/', icon: <Twitter size={18} />, hover: 'hover:bg-sky-500' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full bg-white/5 flex items-center justify-center ${s.hover} transition-all border border-white/10`}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 italic">Quick Navigation</h4>
            <ul className="space-y-4">
              {[{ label: 'About Us', href: '#about' }, { label: 'Services', href: '#services' }, { label: 'Gallery', href: '/gallery' }, { label: 'Book Appointment', href: '/book' }, { label: 'Admin Portal', href: '/admin' }].map(link => (
                <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-white transition-all inline-block font-bold text-sm uppercase tracking-wider italic">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 italic">Specializations</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-widest italic">
              {['Sports Rehabilitation', 'Neuro Physiotherapy', 'Spine Mobilization', "Women's Health", 'Post-Surgical Rehab', 'Pediatric Physio'].map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 italic">Contact Hub</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4"><Phone size={18} className="text-blue-500 shrink-0" /><a href="tel:+919691898412" className="text-sm font-black hover:text-blue-400 transition-colors">+91 96918 98412</a></div>
              <div className="flex items-start gap-4"><MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" /><p className="font-bold text-xs text-slate-300">Lalghati Crossroads, Bhopal, MP</p></div>
              <div className="flex items-start gap-4"><Clock size={18} className="text-blue-500 shrink-0 mt-0.5" /><p className="font-bold text-xs text-slate-300">Mon–Sat: 9AM–1PM &<br />5PM–8:30PM</p></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">© 2026 Optimal Rehab Centre | Lalghati Bhopal</p>
          <div className="flex items-center gap-2 text-slate-600"><ShieldCheck size={14} /><span className="text-[9px] font-black uppercase tracking-widest">ISO Certified Quality Care</span></div>
        </div>
      </footer>

    </div>
  )
}
