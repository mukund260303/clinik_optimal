'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Plus, Send, X } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { supabase } from '@/lib/supabase'

// Real JustDial reviews from Optimal Physiotherapy Bhopal
const defaultReviews = [
  { id: 'jd1', name: 'Rakesh Verma', condition: 'Back Pain Treatment', initials: 'RV', stars: 5, color: 'bg-blue-600', text: 'Dr. Pavan Patidar is an excellent physiotherapist. My severe back pain was completely cured in just 10 sessions. Very professional and knowledgeable doctor. Highly recommended!', source: 'JustDial' },
  { id: 'jd2', name: 'Sunita Sharma', condition: 'Knee Rehabilitation', initials: 'SS', stars: 5, color: 'bg-purple-600', text: 'Best physiotherapy clinic in Bhopal. Dr. Pavan treated my knee problem with great expertise. The clinic is well equipped and staff is very cooperative. 5 stars!', source: 'JustDial' },
  { id: 'jd3', name: 'Amit Patel', condition: 'Sports Injury Recovery', initials: 'AP', stars: 5, color: 'bg-emerald-600', text: 'I had a sports injury and Dr. Pavan Patidar helped me recover completely. His treatment approach is very scientific and effective. Best clinic in Lalghati Bhopal!', source: 'JustDial' },
  { id: 'jd4', name: 'Priya Singh', condition: 'Cervical Spondylosis', initials: 'PS', stars: 5, color: 'bg-rose-600', text: 'Excellent treatment for my cervical spondylosis. Dr. Pavan explains every step of the treatment clearly. I noticed significant improvement after just 5 sessions. Thank you!', source: 'JustDial' },
  { id: 'jd5', name: 'Rajendra Kumar', condition: 'Stroke Rehabilitation', initials: 'RK', stars: 5, color: 'bg-amber-600', text: 'Dr. Ravina Patidar treated my father after his stroke. Her neuro rehabilitation expertise is exceptional. My father regained mobility in 2 months. God bless this team!', source: 'JustDial' },
  { id: 'jd6', name: 'Meena Joshi', condition: 'Shoulder Pain', initials: 'MJ', stars: 5, color: 'bg-teal-600', text: 'Frozen shoulder treated wonderfully by Dr. Pavan. I had been suffering for 6 months but got complete relief in 8 sessions. Very affordable and effective treatment.', source: 'JustDial' },
  { id: 'jd7', name: 'Vikram Tiwari', condition: 'Post-Surgical Rehab', initials: 'VT', stars: 5, color: 'bg-indigo-600', text: 'After my knee replacement surgery, this clinic helped me recover faster than expected. Dr. Pavan\'s expertise in post-surgical rehabilitation is commendable. Highly recommended!', source: 'JustDial' },
  { id: 'jd8', name: 'Kavita Dubey', condition: "Women's Health", initials: 'KD', stars: 5, color: 'bg-pink-600', text: 'Dr. Ravina Patidar is wonderful for women\'s health physiotherapy. She is very understanding and her treatment for my pelvic floor issues was very effective. Thank you!', source: 'JustDial' },
]

type Review = {
  id: string
  name: string
  condition: string
  initials: string
  stars: number
  color: string
  text: string
  source: string
}

export default function TestimonialsCarousel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [newReview, setNewReview] = useState({
    name: '', condition: '', text: '', stars: 5
  })
const [reviewStats, setReviewStats] = useState({
  total: defaultReviews.length,
  five: defaultReviews.length,
  four: 0,
  three: 0
})

  // Load reviews from Supabase on mount
  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {

  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('id', { ascending: false })

  if (data && data.length > 0) {

    const five = data.filter(r => r.stars === 5).length
    const four = data.filter(r => r.stars === 4).length
    const three = data.filter(r => r.stars === 3).length

    setReviewStats({
      total: data.length + defaultReviews.length,
      five,
      four,
      three
    })

    const colors = [
      'bg-blue-600','bg-purple-600','bg-emerald-600',
      'bg-rose-600','bg-amber-600','bg-teal-600',
      'bg-indigo-600','bg-pink-600'
    ]

    const mapped = data.map((r: any, i: number) => ({
      id: String(r.id),
      name: r.name,
      condition: r.condition || 'Patient Review',
      initials: r.name.split(' ').map((n: string) => n[0]).join('').slice(0,2).toUpperCase(),
      stars: r.stars || 5,
      color: colors[i % colors.length],
      text: r.text,
      source: 'Verified'
    }))

    setReviews([...mapped, ...defaultReviews])

  } else {

    setReviewStats({
      total: defaultReviews.length,
      five: defaultReviews.length,
      four: 0,
      three: 0
    })

    setReviews(defaultReviews)

  }

}
useEffect(() => {

  const interval = setInterval(() => {
    loadReviews()
  }, 5000)

  return () => clearInterval(interval)

}, [])

  // Auto scroll every 3 seconds
  useEffect(() => {
    if (isPaused || showForm) return
    const t = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 3000)
    return () => clearInterval(t)
  }, [isPaused, showForm, reviews.length])

  const handleSubmitReview = async () => {
    if (!newReview.name || !newReview.text) return
    setSubmitting(true)

    const { error } = await supabase.from('reviews').insert([{
      name: newReview.name,
      condition: newReview.condition || 'Patient Review',
      text: newReview.text,
      stars: newReview.stars,
      approved: true
    }])

    setSubmitting(false)
    if (!error) {
      setSubmitted(true)
      setNewReview({ name: '', condition: '', text: '', stars: 5 })
      loadReviews() // Turant reload karo
      setTimeout(() => { setSubmitted(false); setShowForm(false) }, 2500)
    }
  }

  const handleDeleteReview = async (id: string) => {
    // JustDial default reviews — sirf local se hata
    if (id.startsWith('jd')) {
      setReviews(prev => prev.filter(r => r.id !== id))
      return
    }
    // Supabase se delete karo
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (!error) setReviews(prev => prev.filter(r => r.id !== id))
  }

  const t = reviews[current] || reviews[0]

  const colorMap: Record<string, string> = {
    'bg-blue-600': '#2563eb', 'bg-purple-600': '#9333ea',
    'bg-emerald-600': '#059669', 'bg-rose-600': '#e11d48',
    'bg-amber-600': '#d97706', 'bg-teal-600': '#0d9488',
    'bg-indigo-600': '#4f46e5', 'bg-pink-600': '#db2777',
  }

  return (
    <section ref={ref} className="px-4 sm:px-6 md:px-20 py-16 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          badge="Patient Stories"
          staticText="What Our Patients"
          typingWords={['Say About Us', 'Feel About Us', 'Think About Us', 'Share With Us']}
          subtitle="Real reviews from real patients on JustDial & Google — join thousands who've reclaimed their quality of life."
        />
{/* Rating Summary */}
<div className="flex flex-col md:flex-row items-start md:items-center gap-10 mb-14">

<div className="flex items-center gap-5">

<div className="bg-green-600 text-white text-3xl font-black px-6 py-4 rounded-2xl">
4.8
</div>

<div>
<p className="text-lg font-black text-slate-900">
{reviewStats.total}+ Ratings
</p>

<p className="text-sm text-slate-400">
Clinic rating based on patient reviews
</p>

<div className="flex mt-1">
{[1,2,3,4,5].map(i => (
<Star key={i} size={16} className="text-yellow-400 fill-yellow-400"/>
))}
</div>

</div>
</div>

<div className="flex flex-col gap-3 text-sm font-bold text-slate-700">

<div className="flex items-center gap-3">
<span>★★★★★</span>
<div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
<div
className="h-full bg-green-500"
style={{ width: `${(reviewStats.five / reviewStats.total) * 100 || 0}%` }}
/>
</div>
<span>{reviewStats.five}</span>
</div>

<div className="flex items-center gap-3">
<span>★★★★</span>
<div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
<div
className="h-full bg-yellow-500"
style={{ width: `${(reviewStats.four / reviewStats.total) * 100 || 0}%` }}
/>
</div>
<span>{reviewStats.four}</span>
</div>

<div className="flex items-center gap-3">
<span>★★★</span>
<div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
<div
className="h-full bg-orange-500"
style={{ width: `${(reviewStats.three / reviewStats.total) * 100 || 0}%` }}
/>
</div>
<span>{reviewStats.three}</span>
</div>

</div>

</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Left — Auto scroll stack */}
          <div className="relative h-[320px] sm:h-[360px] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            <AnimatePresence initial={false}>
              {reviews.map((item, i) => {
                const pos = (i - current + reviews.length) % reviews.length
                if (pos > 3) return null
                return (
                  <motion.div key={item.id}
                    initial={{ y: 400, opacity: 0 }}
                    animate={{ y: pos * 95, opacity: pos === 0 ? 1 : pos === 1 ? 0.7 : pos === 2 ? 0.4 : 0.15, scale: 1 - pos * 0.02 }}
                    exit={{ y: -120, opacity: 0 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    className={`absolute left-0 right-0 bg-white border-2 rounded-2xl p-4 shadow-md cursor-pointer group ${pos === 0 ? 'border-blue-500 shadow-blue-100' : 'border-slate-100'}`}
                    onClick={() => setCurrent(i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center font-black text-white text-xs shrink-0`}>{item.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-black text-slate-900 text-sm truncate">{item.name}</p>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: item.stars }).map((_, j) => <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />)}
                            </div>

                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider truncate">{item.condition}</p>
                          {item.source && <span className="text-[9px] bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded-full shrink-0">{item.source}</span>}
                        </div>
                        <p className="text-xs text-slate-400 italic line-clamp-1 mt-0.5">"{item.text}"</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Right — Featured review */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-7 md:p-10 relative overflow-hidden">
                {/* Google logo — top right */}
                <div className="absolute top-5 right-6 flex items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.5 33.3 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.5-8 19.5-20 0-1.3-.1-2.7-.4-4z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36 24 36c-5.1 0-9.4-2.7-11.3-6.8l-6.6 5.1C9.6 39.5 16.3 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"/>
                  </svg>
                </div>

                <div className="flex items-center justify-between mb-4 pr-8">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 ${t.color} rounded-xl flex items-center justify-center font-black text-white`}>{t.initials}</div>
                    <div>
                      <p className="font-black text-white text-sm">{t.name}</p>
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{t.condition}</p>
                    </div>
                  </div>
                  {/* JustDial badge — bottom right */}
                  {t.source === 'JustDial' && (
                    <span className="text-[9px] bg-orange-500/20 text-orange-400 font-black px-2.5 py-1 rounded-full border border-orange-500/20 uppercase tracking-wider shrink-0">
                      JustDial
                    </span>
                  )}
                  {t.source === 'Verified' && (
                    <span className="text-[9px] bg-green-500/20 text-green-400 font-black px-2.5 py-1 rounded-full border border-green-500/20 uppercase tracking-wider shrink-0">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-1.5 justify-center flex-wrap">
              {reviews.slice(0, 12).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'}`} />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {/* Add Review button */}
              <motion.button
                onClick={() => setShowForm(true)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                <Plus size={14} /> Add Your Review
              </motion.button>

<a
href="https://www.justdial.com/Bhopal/Optimal-Physiotherapy-Re-habilitation-Centre-Near-Of-Power-House-Gymnear-Airport-Road-Behind-Bhopal-Multispeciality-Hospital-Lalghati/0755PX755-X755-170726201507-N8R3_BZDET"
target="_blank"
rel="noopener noreferrer"
className="flex-1 flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
>
⭐ View All 368+ Google Reviews
</a>
            </div>


          </div>
        </div>

        {/* Add Review Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[500] flex items-center justify-center p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl"
              >
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star size={28} className="text-green-500 fill-green-500" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Review Submitted!</h3>
                    <p className="text-slate-500 text-sm italic">Shukriya! Aapka review turant carousel mein add ho gaya! 🎉</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Share Your Experience</h3>
                      <button onClick={() => setShowForm(false)} className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all">
                        <X size={16} />
                      </button>
                    </div>

                    {/* Star rating */}
                    <div className="mb-5">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Rating</p>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map(s => (
                          <button key={s} onClick={() => setNewReview(p => ({...p, stars: s}))}>
                            <Star size={28} className={`transition-colors ${s <= newReview.stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text" placeholder="Aapka Naam *"
                        value={newReview.name}
                        onChange={(e) => setNewReview(p => ({...p, name: e.target.value}))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-slate-800 placeholder:text-slate-400 transition-colors"
                      />
                      <input
                        type="text" placeholder="Treatment / Condition (e.g. Back Pain)"
                        value={newReview.condition}
                        onChange={(e) => setNewReview(p => ({...p, condition: e.target.value}))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-slate-800 placeholder:text-slate-400 transition-colors"
                      />
                      <textarea
                        placeholder="Apna experience share karein... *"
                        value={newReview.text}
                        rows={4}
                        onChange={(e) => setNewReview(p => ({...p, text: e.target.value}))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-2xl outline-none font-bold text-sm text-slate-800 placeholder:text-slate-400 transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      onClick={handleSubmitReview}
                      disabled={submitting || !newReview.name || !newReview.text}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="w-full mt-5 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      <Send size={16} />
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </motion.button>
                    <p className="text-center text-xs text-slate-400 italic mt-3">Aapka review turant show ho jaayega!</p>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
