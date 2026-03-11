import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Optimal Physiotherapy | Best Physiotherapy Clinic in Lalghati Bhopal",
  description:
    "Optimal Physiotherapy Clinic in Lalghati Bhopal provides advanced physiotherapy treatment for back pain, sports injury, neuro rehabilitation and mobility recovery.",
  keywords: [
    "physiotherapy bhopal",
    "physiotherapist lalghati",
    "back pain treatment bhopal",
    "sports injury physiotherapy bhopal",
    "best physiotherapy clinic bhopal"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
  style={{
    background: "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #bfdbfe 100%)"
  }}
>
        
        {/* Main Content */}
        {children}

        {/* WhatsApp Floating Button */}
        {/* Replace 9198XXXXXXXX with the doctor's real WhatsApp number */}
        <a 
          href="https://wa.me/9691898412?text=Hello%20Physio%20Bhopal,%20I%20want%20to%20book%20an%20appointment" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all z-[100] flex items-center justify-center border-4 border-white"
          title="Chat with us on WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.603 6.02L0 24l6.135-1.61a11.787 11.787 0 005.912 1.603h.005c6.634 0 12.05-5.414 12.05-12.051a11.763 11.763 0 00-3.502-8.523z"/>
          </svg>
        </a>

      </body>
    </html>
  );
}