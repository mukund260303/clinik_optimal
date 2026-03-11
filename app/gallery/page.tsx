'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Activity, ArrowLeft, ImageIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function GalleryPage() {
  const [dbImages, setDbImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 12 Professional Placeholder Photos (Jab tak aap admin se aur na daal dein)
  const fallbackImages = [
    { id: 'f1', image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', caption: 'Professional Assessment', category: 'Expertise' },
    { id: 'f2', image_url: '/gallery/sports_injuries.jpg', caption: 'Sports Injury Rehab', category: 'Sports' },
    { id: 'f3', image_url:'/gallery/advance_equipment.jpg', caption: 'Advanced Equipment', category: 'Clinic' },
    { id: 'f4', image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8', caption: 'Neuro Rehabilitation', category: 'Neuro' },
    { id: 'f5', image_url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9', caption: 'Spine Mobilization', category: 'Treatment' },
    { id: 'f6', image_url: '/gallery/posture_correction.jpg', caption: 'Posture Correction', category: 'Care' },
    { id: 'f7', image_url: '/gallery/clinic5.png', caption: 'Manual Therapy', category: 'Expertise' },
    { id: 'f8', image_url: '/gallery/consultation_area.jpg', caption: 'Clinic Consultation Area', category: 'Clinic' },
    { id: 'f9', image_url: '/gallery/pediatric_care.jpeg', caption: 'Pediatric Care', category: 'Care' },
    { id: 'f10', image_url: '/gallery/joint_pain.jpg', caption: 'Joint Recovery', category: 'Treatment' },
    { id: 'f11', image_url: '/gallery/Therapeutic Exercise.jpg', caption: 'Therapeutic Exercise', category: 'Sports' },
    { id: 'f12', image_url: '/gallery/clinic8.png', caption: 'Modern Treatment Bay', category: 'Clinic' },
  ]

  useEffect(() => {
    async function fetchImages() {
      const { data } = await supabase.from('clinic_gallery').select('*').order('id', { ascending: false })
      setDbImages(data || [])
      setLoading(false)
    }
    fetchImages()
  }, [])

  const allImages = [...dbImages, ...fallbackImages]

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">
      {/* Header Navigation */}
      <nav className="p-6 md:px-16 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <Link href="/" className="flex items-center gap-2 group p-2 hover:bg-slate-50 rounded-xl transition">
          <ArrowLeft className="group-hover:-translate-x-1 transition text-blue-600" size={20} />
          <span className="font-black uppercase text-[10px] tracking-widest">Home</span>
        </Link>
        <div className="flex items-center gap-3">
           <Activity className="text-blue-600 shadow-sm" size={24} />
           <span className="font-black tracking-tighter uppercase text-xl">Optimal<span className="text-blue-600 italic">Moments</span></span>
        </div>
        <Link href="/book" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 transition">
          Book Session
        </Link>
      </nav>

      {/* Main Content */}
      <section className="p-6 md:p-20 max-w-[1400px] mx-auto">
        <div className="mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <ImageIcon size={200} />
          </div>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Visual Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            RECOVERY <br /> <span className="text-blue-600 font-outline-1 italic">IN FOCUS.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] italic">
            Optimal Rehab Center | Lalghati Bhopal
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-slate-100 rounded-[3rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {allImages.map((img, idx) => (
              <div 
                key={img.id} 
                className="relative group overflow-hidden rounded-[2.5rem] bg-white border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-700 break-inside-avoid"
              >
                <img 
                  src={`${img.image_url}?auto=format&fit=crop&q=80&w=800`} 
                  alt={img.caption} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 p-8">
   <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
      <span className="text-[10px] font-bold uppercase tracking-widest block">
         {img.category}
      </span>
      <span className="text-sm font-black uppercase leading-tight">
         {img.caption}
      </span>
   </div>
</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}