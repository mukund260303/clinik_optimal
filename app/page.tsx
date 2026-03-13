'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Activity, Phone, MapPin, Clock, ArrowRight, Star, HeartPulse, ShieldCheck, Zap, Award, Microscope, Sparkles, Image as ImageIcon } from 'lucide-react'
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

export default function Home() {
  return (
  <div className="relative min-h-screen font-sans text-slate-900 overflow-hidden bg-white">
    {/* ================= PREMIUM 3D MEDICAL BACKGROUND ================= */}
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Main Blue Glow */}
      <div className="absolute top-[-220px] right-[-180px] w-[650px] h-[650px] bg-blue-600/60 rounded-full blur-[160px] animate-pulse"></div>

      {/* Soft Emerald Medical Glow */}
      <div className="absolute bottom-[-250px] left-[-180px] w-[550px] h-[550px] bg-emerald-400/40 rounded-full blur-[160px] animate-pulse"></div>

      {/* Center Soft Light */}
      <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px]"></div>

      {/* Premium Grid Texture */}
      <div className="absolute inset-0 opacity-[0.06] 
        bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] 
        bg-[length:42px_42px]">
      </div>

    </div>
      {/* 1. PREMIUM GLASS NAVIGATION */}
      <nav className="flex justify-between items-center px-6 md:px-20 py-6 fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-slate-200/50">
        <div className="flex items-center gap-3 group cursor-pointer">
         <div className="flex items-center justify-center">
  <Image
    src="/logo.png"
    alt="Logo"
    width={64}
    height={64}
  />

          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">Optimal<span className="text-blue-600"> Physiotherapy</span></span>
            <span className="text-[8px] font-black text-slate-400 tracking-[0.4em] uppercase mt-1 italic">Advanced Rehabilitation Center</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-12 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <a href="#services" className="hover:text-blue-600 transition-colors">Specialties</a>
          <Link href="/gallery" className="hover:text-blue-600 transition-colors flex items-center gap-2">
            <ImageIcon size={14} /> Gallery
          </Link>
          <a href="#location" className="hover:text-blue-600 transition-colors">Visit</a>
        </div>

        <Link href="/book" className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95">
            Book Now
        </Link>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 md:px-20 pt-40 pb-32 overflow-hidden bg-transparent">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-600/5 text-blue-600 px-4 py-2 rounded-full mb-8 border border-blue-600/10">
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Premier Care in Lalghati Bhopal</span>
            </div>
            
            <h1 className="text-6xl md:text-[90px] font-black leading-[0.85] tracking-tighter text-slate-900 mb-10">
              RESTORE <br /> <span className="text-blue-600">MOTION</span> <br /> REVIVE LIFE
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg leading-relaxed mb-12 italic border-l-4 border-blue-600 pl-6">
              Under the guidance of <strong> Dr. Pavan Patidar (PT) </strong> And <strong> Dr. Ravina Patidar </strong> we use advanced techniques to eliminate pain permanently.
              Optimal physiotherapy clinic provide Physiotherapy services especially for  orthopaedic and neurology condition to provide full strength and mobility , activities of Daily living etc .
We are also providing the Physiotherapy services for women health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/book" className="group bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200">
                BOOK CONSULTATION <ArrowRight size={22} className="group-hover:translate-x-2 transition" />
              </Link>
             <a 
href="tel:+919691898412"
className="bg-blue-600 text-white px-10 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200"
>
   <Phone size={22} className="text-green-400" />
</a>
            </div>
          </div>
          
         <div className="relative flex flex-col items-center gap-10">

  {/* Doctor Pavan */}
  <div className="bg-white p-6 rounded-[3rem] shadow-xl text-center max-w-[300px]">

    <img 
      src="/gallery/Dr-pavan.png"
      alt="Dr Pavan Patidar"
      className="w-36 h-36 rounded-full object-cover border-4 border-blue-600 mx-auto"
    />

    <h3 className="mt-4 text-lg font-black text-slate-900">
      Dr. Pavan Patidar (PT)
    </h3>

    <p className="text-sm text-slate-500">
      MPT (Orthopaedic)
    </p>

    <p className="text-xs text-slate-400 mt-1">
      Senior Physiotherapist • 12+ Years Experience
    </p>

    <p className="text-xs text-slate-500 mt-3">
      Expert in spine, knee, shoulder & sports injury physiotherapy
    </p>

    <p className="text-[11px] text-slate-400 mt-2 italic">
      Ex Physiotherapist – Chirayu Medical College & Hospital, Bhopal
    </p>

  </div>


  {/* Doctor Ravina */}
  <div className="bg-white p-6 rounded-[3rem] shadow-xl text-center max-w-[300px]">

    <img 
      src="/gallery/dr-Ravina.png"
      alt="Dr Ravina Patidar"
      className="w-36 h-36 rounded-full object-cover border-4 border-blue-600 mx-auto"
    />

    <h3 className="mt-4 text-lg font-black text-slate-900">
      Dr. Ravina Patidar (PT)
    </h3>

    <p className="text-sm text-slate-500">
      MPT (Neuro)
    </p>

    <p className="text-xs text-slate-400 mt-1">
      Senior Physiotherapist • 8+ Years Experience
    </p>

    <p className="text-xs text-slate-500 mt-3">
      Expert in spine, stroke, peripheral neuropathy, diabetic neuropathy & women health physiotherapy
    </p>

    <p className="text-[11px] text-slate-400 mt-2 italic">
      Ex Physiotherapist – CMAS Kohefiza Hospital, Bhopal
    </p>

  </div>

</div>
      </section>

      {/* 3. BENTO GRID STATS */}
      <section className="px-6 md:px-20 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A35] to-[#0F274F] p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
             <h4 className="text-5xl font-black mb-2 tracking-tighter italic">10+</h4>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Years Trusted Clinic</p>
          </div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
         <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
             <h4 className="text-5xl font-black mb-2 tracking-tighter italic text-white">5k+</h4>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Success Rehabilitation Stories</p>
          </div>
        <div className="md:col-span-2 relative h-[240px] rounded-[3rem] overflow-hidden group cursor-pointer">

  <Link href="/gallery" className="block w-full h-full relative">

    <div className="grid grid-cols-4 grid-rows-2 w-full h-full gap-1">

      <img src="/gallery/backpain1.jpg" className="object-cover w-full h-full col-span-2 row-span-2" />
      <img 
src="/gallery/clinic5.png" 
className="object-cover object-[00%_05%] w-full h-full" 
/>
      <img src="/gallery/clinic8.png" className="object-cover object-[90%_95%] w-full h-full" />
      <img src="/gallery/clinic9.png" className="object-cover object-[90%_95%] w-full h-full" />
      <img src="/gallery/postser.jpg" className="object-cover w-full h-full" />

    </div>

    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all">
      <p className="text-white text-sm font-black uppercase tracking-widest">
        View Clinic Gallery
      </p>
    </div>

  </Link>
</div>
  
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="px-6 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 tracking-widest">Expert Solutions</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">TREATMENT <br /> <span className="text-blue-600 italic">REDEFINED.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Sports Rehab", icon: <Zap />, img: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=600", desc: "High-performance recovery for athletes." },
              { title: "Neuro Care", icon: <Award />, img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600", desc: "Scientific protocols for Neuro-recovery." },
              { title: "Spine Sync", icon: <Microscope />, img: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=600", desc: "Precision Spine Mobilization techniques." }
            ].map((s, i) => (
              <div key={i} className="group bg-white rounded-[4rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-700">
                <div className="h-48 relative">
                   <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-blue-600">
                      {s.icon}
                   </div>
                </div>
                <div className="p-10 text-center">
                   <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{s.title}</h3>
                   <p className="text-slate-500 text-sm font-medium leading-relaxed italic">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATION (Lalghati Bhopal) */}
      <section id="location" className="px-6 md:px-20 pb-32">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl relative">
          <div className="p-16 md:p-24 text-white">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-12 italic">V i s i t <br /> <span className="text-blue-500">C l i n i c</span></h2>
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <MapPin className="text-blue-500 mt-1" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Location</p>
                  <p className="text-xl font-bold italic">Lalghati Crossroads, Bhopal, MP</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <Clock className="text-blue-500 mt-1" size={24} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Timing</p>
                  <p className="text-xl font-bold italic text-blue-500">Open Morning: 09:00AM - 01:00PM And Evening 05:00PM - 08:30PM (Mon-Sat)</p>
                </div>
              </div>
            </div>
            <Link href="/book" className="mt-16 inline-flex bg-white text-slate-900 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl">
               Reserve Your Slot
            </Link>
          </div>
          <div className="h-[500px] lg:h-auto bg-slate-800 grayscale hover:grayscale-0 transition-all duration-1000 relative">
             <iframe
    src="https://www.google.com/maps?q=Optimal%20Physiotherapy%20Clinic%20%26%20Rehabilitation%20Centre%20Lalghati%20Bhopal&output=embed"
    className="w-full h-full absolute inset-0 opacity-80 hover:opacity-100 border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
          </div>
        </div>
      </section>

      {/* 6. ENHANCED MEGA FOOTER */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 px-6 md:px-20 rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-8">
           <div className="flex items-center gap-3">

  <img 
    src="/logo.png"
    alt="Optimal Physiotherapy Logo"
    className="w-10 h-10 object-contain"
  />

  <span className="text-2xl font-black tracking-tighter uppercase italic">
    Optimal<span className="text-blue-500">Physio</span>
  </span>

</div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
              <strong>Dr. Pavan Patidar (PT)</strong> ke netrutva mein hum Bhopal ke patients ko world-class rehabilitation provide karte hain.
            </p>
            <div className="flex gap-4 mt-6">

  <a href="https://www.instagram.com/drpavanpatidar?igsh=ZDZ4ZnBuaHRyNzh3" target="_blank"
  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500 transition-all border border-white/10">
    <Instagram size={18}/>
  </a>

  <a href="https://www.facebook.com/profile.php?id=100064107486462" target="_blank"
  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10">
    <Facebook size={18}/>
  </a>

  <a href="https://www.youtube.com/@optimalphysiotherapy9860" target="_blank"
  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all border border-white/10">
    <Youtube size={18}/>
  </a>

  <a href="https://twitter.com/" target="_blank"
  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 transition-all border border-white/10">
    <Twitter size={18}/>
  </a>

</div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 italic">Quick Navigation</h4>
            <ul className="space-y-4">
              {['Treatments', 'Gallery', 'Admin Portal'].map((link) => (
                <li key={link}>
                  <Link href={link === 'Admin Portal' ? '/admin' : link === 'Gallery' ? '/gallery' : '#'} className="text-slate-400 hover:text-white transition-all inline-block font-bold text-sm uppercase tracking-wider italic">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specializations */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 italic">Specializations</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-widest italic">
              <li>Sports Rehabilitation</li>
              <li>Neuro Physiotherapy</li>
              <li>Spine Mobilization</li>
            </ul>
          </div>

          {/* Column 4: Contact Hub */}
          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 italic">Contact Hub</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-blue-500" />
                <p className="text-sm font-black">+91 96918 98412</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <MapPin size={18} className="text-blue-500" />
                <p className="font-bold">Lalghati, Bhopal, MP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">
            © 2026 Optimal Rehab Centre | Lalghati Bhopal
          </p>
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">ISO Certified Quality Care</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
