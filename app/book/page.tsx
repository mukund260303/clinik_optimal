'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, Phone, User, ArrowRight, ShieldCheck, Zap, Download, Home } from 'lucide-react'
import Link from 'next/link'
import { jsPDF } from 'jspdf'

export default function BookingPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    date: '', time: '', phone: '', patient_name: '', area: 'General'
  })

  // 12-Hour Time Format Helper
  const formatTime12h = (time24: string) => {
    if (!time24) return ''
    const [h, m] = time24.split(':')
    const hours = parseInt(h)
    const suffix = hours >= 12 ? 'PM' : 'AM'
    const hours12 = ((hours + 11) % 12 + 1)
    return `${hours12}:${m} ${suffix}`
  }

  // Professional PDF Receipt Logic
  const downloadPDF = () => {
    const doc = new jsPDF();
    const time12 = formatTime12h(formData.time);

    // --- Header Section (Letterhead) ---
    doc.setFillColor(15, 23, 42); // Deep Navy Blue
    doc.rect(0, 0, 210, 50, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("OPTIMAL PHYSIOTHERAPY", 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Advanced Rehab & Clinical Excellence Center", 105, 35, { align: 'center' });

    // --- Receipt Info ---
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 160, 65);
    doc.text(`RECEIPT NO: OP-${Math.floor(1000 + Math.random() * 9000)}`, 20, 65);

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75); 

    // --- Table Content ---
    const rows = [
      ["PATIENT NAME", formData.patient_name.toUpperCase()],
      ["CONTACT NO", formData.phone],
      ["PAIN REGION", formData.area.toUpperCase()],
      ["APPOINTMENT DATE", formData.date],
      ["SCHEDULED TIME", time12],
      ["CONSULTANT", "Dr. Pavan Patidar"],
      ["LOCATION", "Lalghati, Bhopal"]
    ];

    let yPos = 90;
    rows.forEach(([label, value]) => {
      doc.setFillColor(248, 250, 252);
      doc.rect(20, yPos - 7, 60, 12, 'F');
      doc.setTextColor(71, 85, 105);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(label, 25, yPos);

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(value, 85, yPos);
      yPos += 14;
    });

    // --- Footer ---
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 210, 190, 210);
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.text("VERIFIED APPOINTMENT", 105, 225, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Note: This is a digital receipt for clinical record at Optimal Physiotherapy.", 105, 235, { align: 'center' });
    
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 285, 210, 12, 'F');

    doc.save(`Optimal_Receipt_${formData.patient_name}.pdf`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('appointments').insert([{ 
      patient_name: formData.patient_name,
      phone: formData.phone,
      date: formData.date, 
      time: formatTime12h(formData.time), 
      service: formData.area,
      status: 'pending' 
    }])
    if (!error) setSubmitted(true)
    else alert("Database Error: " + error.message)
    setLoading(false)
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-slate-900/50 p-12 rounded-[3.5rem] border border-blue-500/20 backdrop-blur-3xl text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">Booking Successful</h2>
        <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-10 text-center">Optimal Physiotherapy Center</p>
        
        <div className="bg-black/40 rounded-3xl border border-white/5 overflow-hidden mb-10 text-left italic">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr><td className="p-5 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5">Patient</td><td className="p-5 font-bold uppercase italic text-white">{formData.patient_name}</td></tr>
              <tr><td className="p-5 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5">Area</td><td className="p-5 text-red-500 font-black italic">{formData.area}</td></tr>
              <tr><td className="p-5 font-black text-blue-500 uppercase text-[9px] tracking-widest bg-white/5">Schedule</td><td className="p-5 font-bold">{formData.date} | {formatTime12h(formData.time)}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
            <button onClick={downloadPDF} className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                <Download size={16} /> Download PDF Receipt
            </button>
            <Link href="/" className="flex-1 flex items-center justify-center gap-3 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">
                <Home size={16} /> Return Home
            </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-10">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[4rem] shadow-2xl overflow-hidden border-[12px] border-white relative">
        {/* LEFT: MEDICAL POSTER */}
        <div className="lg:col-span-5 bg-[#030712] relative min-h-[500px] lg:min-h-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125 mix-blend-lighten" alt="anatomy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          <div className="absolute bottom-12 left-10 right-10 z-10 text-white text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 bg-blue-600/20 w-fit px-4 py-1.5 rounded-full border border-blue-500/30 mx-auto md:mx-0">
               <Zap className="text-blue-500 fill-blue-500" size={12} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Clinical Unit</span>
            </div>
            <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9] mb-8">Optimal <br /> <span className="text-blue-600">Physiotherapy</span></h2>
          </div>
        </div>

        {/* RIGHT: BLUE FORM */}
        <div className="lg:col-span-7 p-10 md:p-20 bg-slate-950 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-blue-500" size={24} />
                <h3 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">Register <span className="text-blue-600">Now.</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest ml-1 italic">Patient Name</label>
                <input 
                  required type="text" 
                  value={formData.patient_name} 
                  onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                  className="w-full px-6 py-5 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-sm text-white transition-all shadow-inner" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest ml-1 italic">WhatsApp No.</label>
                <input 
                  required type="tel" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-6 py-5 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-sm text-white transition-all shadow-inner" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-blue-300/60 tracking-widest ml-1 italic">Treatment Area</label>
              <select required value={formData.area} className="w-full p-5 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-sm text-blue-100 appearance-none" onChange={(e) => setFormData({...formData, area: e.target.value})}>
                <option value="General" className="bg-slate-900">Select Region</option>
                <option value="Cervical Spine" className="bg-slate-900">Cervical (Neck)</option>
                <option value="Shoulder" className="bg-slate-900">Shoulder</option>
                <option value="Lumbar" className="bg-slate-900">Lumbar (Back)</option>
                <option value="Knee" className="bg-slate-900">Knee Rehab</option>
                <option value="Ankle" className="bg-slate-900">Ankle / Foot</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <input required type="date" value={formData.date} className="w-full p-5 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-sm text-white [color-scheme:dark]" onChange={(e) => setFormData({...formData, date: e.target.value})} />
               <input required type="time" value={formData.time} className="w-full p-5 bg-blue-950/20 border-2 border-blue-900/30 focus:border-blue-500 rounded-[1.5rem] outline-none font-bold text-sm text-white [color-scheme:dark]" onChange={(e) => setFormData({...formData, time: e.target.value})} />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-500 transition-all italic italic">
                {loading ? 'Processing...' : 'Confirm Appointment'}
            </button>
            <p className="text-center mt-8 text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] italic opacity-60">Dr. Pavan Patidar • Lalghati Bhopal</p>
          </form>
        </div>
      </div>
    </div>
  )
}