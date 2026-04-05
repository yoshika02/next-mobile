'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Power, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Search, 
  Menu, 
  Bookmark, 
  MoreVertical,
  Shuffle,
  FileX
} from 'lucide-react';

const sleepExt: Record<number, string> = {3:'png', 9:'png', 11:'png', 13:'png'};
const brandImages: Record<string, string[]> = {
  Sleepycat: Array.from({ length: 18 }, (_, i) => `/brands/sleepcat/sleepcat_${i + 1}.${sleepExt[i + 1] ?? 'jpg'}`),
  MomCozy:  Array.from({ length: 17 }, (_, i) => `/brands/momcozy/momcozy_${i + 1}.jpg`),
  Optm:     ['/brands/optm/optm_1.jpg', '/brands/optm/optm_2.jpeg', '/brands/optm/optm_3.jpg'],
  Varco:    Array.from({ length: 10 }, (_, i) => `/brands/varco/varco_${i + 1}.jpg`),
  'Sleepycat_logo': ['/brands/logos/sleepycat_logo.png'],
  'MomCozy_logo': ['/brands/logos/momcozy_logo_1.png', '/brands/logos/momcozy_logo_2.png'],
  'Optm_logo': ['/brands/logos/optm_logo.png'],
  'Varco_logo': ['/brands/logos/varco_logo.avif'],
};

export default function VidcluePage() {
  const [isOn, setIsOn] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'BKM' | 'MOR'>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isSocialAdsOpen, setIsSocialAdsOpen] = useState(true);
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(true);
  const [isLogosOpen, setIsLogosOpen] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'DYNAMIC' | 'STATIC'>('DYNAMIC');

  const items = [
    'Sleepycat', 
    'MomCozy',   
    'Optm',      
    'Varco',     
    'Pen and paper', 
    'Coworker wisdom', 
    'Multi-role explainer', 
    'Explain like I\'m five', 
    'Sleepycat', 
    'MomCozy',   
    'Optm',      
    'Varco'      
  ];

  const currentBrand = items[currentIndex];
  const itemKey = currentIndex >= 8 ? `${currentBrand}_logo` : currentBrand;
  const currentBrandImgs = brandImages[itemKey];

  useEffect(() => { setSlideIndex(0); }, [currentIndex]);

  useEffect(() => {
    if (!currentBrandImgs || currentBrandImgs.length <= 1 || viewMode === 'STATIC') return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev < currentBrandImgs.length - 1 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, currentBrandImgs, viewMode]);

  const toggleCategory = (cat: 'ALL' | 'BKM' | 'MOR') => {
    if (!isOn) return;
    setActiveCategory(cat);
    
    // Automatically switch mode based on category as per user request
    if (cat === 'BKM') setViewMode('STATIC');
    else setViewMode('DYNAMIC');
    
    // Automatically set first available item in category
    const first = items.map((item, originalIdx) => ({ item, originalIdx })).find(({ originalIdx }) => {
      if (cat === 'ALL') return true;
      if (cat === 'BKM') return originalIdx % 2 === 0;
      if (cat === 'MOR') return originalIdx % 2 !== 0;
      return true;
    });
    if (first) setCurrentIndex(first.originalIdx);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans select-none overflow-hidden bg-white">
      
      {/* BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 z-10 mix-blend-multiply opacity-80 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-room.png')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white"></div>
        <div className="absolute inset-0 z-5 mix-blend-multiply opacity-10 bg-speckle"></div>
      </div>

      <div className="relative z-50 w-full max-w-[1100px] max-h-[95vh] aspect-[16/10] bg-[#bd4238] rounded-[40px] shadow-[0_60px_100px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.1)] p-6 flex flex-col transition-all duration-500 border border-black/20 pointer-events-auto">
        
        <div className="absolute inset-0 z-0 pointer-events-none rounded-[40px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-80 z-20"></div>
          <div 
            className="absolute inset-0 z-10 mix-blend-soft-light opacity-[0.5]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          ></div>
        </div>

        {/* --- Top Control Bar --- */}
        <div className="flex justify-between items-start mb-4 px-2 relative z-[110] pointer-events-auto">
          <div>
            <h1 className="text-white text-2xl font-black tracking-tight drop-shadow-sm">SUNIL</h1>
            <p className="text-white/70 text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5">Graphic Desginer & Video Editor</p>
          </div>

          <div className="flex gap-5 mr-[4.5rem]">
            {(['ALL', 'BKM', 'MOR'] as const).map((label) => {
              const isActive = isOn && activeCategory === label;
              return (
                <button 
                  key={label} 
                  onClick={() => toggleCategory(label)}
                  className="flex flex-col items-center gap-2 group outline-none pointer-events-auto"
                >
                  <div className={`
                    w-9 h-9 rounded-full 
                    bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a]
                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.5)]
                    flex items-center justify-center 
                    transition-all duration-300
                    border border-black/40
                    group-hover:border-white/20
                  `}>
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#ffcc00] shadow-[0_0_10px_#ffcc00]' : 'bg-[#4a4a4a]'}`}></div>
                  </div>
                  <span className={`text-[9px] font-bold tracking-wider transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>{label}</span>
                </button>
              );
            })}

            <button 
              onClick={() => isOn && setViewMode(prev => prev === 'DYNAMIC' ? 'STATIC' : 'DYNAMIC')}
              className="flex flex-col items-center gap-2 group outline-none ml-4 pointer-events-auto"
            >
              <div className="px-3 h-9 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center border border-black/40 group-hover:border-white/20">
                <span className={`text-[10px] font-black tracking-widest ${isOn ? 'text-yellow-400' : 'text-white/30'}`}>{viewMode}</span>
              </div>
              <span className="text-[9px] font-bold tracking-wider text-white/50">MODE</span>
            </button>
          </div>
        </div>

        {/* --- Main Interface Area --- */}
        <div className="flex-1 flex gap-5 relative z-[100] min-h-0 pointer-events-auto">
          
          {/* Left Sidebar */}
          <div className={`flex-[0.9] rounded-2xl overflow-hidden flex flex-col border-2 border-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 relative ${isOn ? 'bg-[#151515]' : 'bg-[#0d0d0d]'}`}>
             <div className={`h-full flex flex-col transition-opacity duration-300 relative z-0 ${isOn ? 'opacity-100' : 'opacity-20'}`}>
                <div 
                  className="p-5 flex items-center justify-between border-b border-white/5 pr-6 bg-[#1a1a1a] cursor-pointer hover:bg-white/5 transition"
                  onClick={() => setIsSocialAdsOpen(!isSocialAdsOpen)}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-white/50 text-[10px] font-bold tracking-widest uppercase">1. SOCIAL + ADS</div>
                    {isSocialAdsOpen ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide pb-4 relative">
                  {isSocialAdsOpen && items.slice(0, 4).map((item, idx) => {
                    const isActive = currentIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-full text-left px-6 py-4 transition-all relative flex items-center gap-4 group ${
                          isActive ? 'bg-white/5 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-yellow-400 shadow-[0_0_6px_#facc15]' : 'bg-white/20'}`} />
                        <span className="text-sm font-medium tracking-wide">{item}</span>
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e03e3e]" />}
                      </button>
                    );
                  })}

                  <div 
                    className="p-5 flex items-center justify-between mt-2 border-t border-white/5 bg-[#1a1a1a] cursor-pointer hover:bg-white/5 transition"
                    onClick={() => setIsThumbnailsOpen(!isThumbnailsOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-white/50 text-[10px] font-bold tracking-widest uppercase">2. THUMBNAILS</div>
                      {isThumbnailsOpen ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                    </div>
                  </div>
                  
                  {isThumbnailsOpen && items.slice(4, 8).map((item, idx) => {
                    const actualIdx = idx + 4;
                    const isActive = currentIndex === actualIdx;
                    return (
                      <button
                        key={actualIdx}
                        onClick={() => setCurrentIndex(actualIdx)}
                        className={`w-full text-left px-6 py-4 transition-all relative flex items-center gap-4 group ${
                          isActive ? 'bg-white/5 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-yellow-400' : 'bg-white/20'}`} />
                        <span className="text-sm font-medium tracking-wide">{item}</span>
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e03e3e]" />}
                      </button>
                    );
                  })}

                  <div 
                    className="p-5 flex items-center justify-between mt-2 border-t border-white/5 bg-[#1a1a1a] cursor-pointer hover:bg-white/5 transition"
                    onClick={() => setIsLogosOpen(!isLogosOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-white/50 text-[10px] font-bold tracking-widest uppercase">3. LOGOS</div>
                      {isLogosOpen ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                    </div>
                  </div>
                  
                  {isLogosOpen && items.slice(8).map((item, idx) => {
                    const actualIdx = idx + 8;
                    const isActive = currentIndex === actualIdx;
                    return (
                      <button
                        key={actualIdx}
                        onClick={() => setCurrentIndex(actualIdx)}
                        className={`w-full text-left px-6 py-4 transition-all relative flex items-center gap-4 group ${
                          isActive ? 'bg-white/5 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-yellow-400' : 'bg-white/20'}`} />
                        <span className="text-sm font-medium tracking-wide">{item}</span>
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e03e3e]" />}
                      </button>
                    );
                  })}
                </div>
             </div>
          </div>

          {/* Right Screen Area */}
          <div className={`flex-1 rounded-2xl overflow-hidden flex flex-col border-2 border-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] transition-colors duration-300 relative ${isOn ? 'bg-[#e0e0e0]' : 'bg-[#1a1a1a]'}`}>
            <div className={`h-full flex flex-col relative transition-opacity duration-300 z-0 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
              <div className="h-14 bg-[#151515] flex items-center justify-between px-5 shrink-0">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-[11px] font-bold tracking-widest uppercase opacity-90">{items[currentIndex]}</span>
                  <span className="text-[11px] text-white/30">{slideIndex + 1}/{currentBrandImgs?.length ?? '—'}</span>
                </div>
                <div className="flex gap-4 text-white/40">
                   <Bookmark size={16} />
                   <MoreVertical size={16} />
                </div>
              </div>

              <div className="flex-1 relative bg-[#111] shadow-inner overflow-hidden flex items-center justify-center pointer-events-auto">
                {(() => {
                  const imgs = currentBrandImgs;
                  if (!imgs || imgs.length === 0) {
                    return (
                      <div className="h-full flex flex-col items-center justify-center">
                        <FileX size={64} className="text-neutral-400/70" strokeWidth={1.2} />
                        <p className="text-neutral-400 text-xs mt-3 font-medium">No images</p>
                      </div>
                    );
                  }

                  if (viewMode === 'STATIC') {
                    return (
                      <div className="h-full w-full overflow-y-auto scrollbar-hide p-6 flex flex-col gap-6 relative group/static">
                        {imgs.map((src, i) => (
                          <div key={i} className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg shrink-0">
                            <Image src={src} alt={currentBrand} fill className="object-cover" />
                          </div>
                        ))}
                        <div className="sticky bottom-0 left-0 right-0 flex justify-center pb-2 pointer-events-none">
                           <div className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-xl animate-bounce">
                              SCROLL TO SEE MORE
                           </div>
                        </div>
                      </div>
                    );
                  }

                  const src = imgs[slideIndex];
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div key={src} className="absolute inset-0 animate-fadeIn">
                        <Image src={src} alt={`${currentBrand} ${slideIndex + 1}`} fill className="object-contain" sizes="600px" priority />
                      </div>
                      {imgs.length > 1 && (
                        <>
                          <button onClick={() => setSlideIndex(i => (i > 0 ? i - 1 : imgs.length - 1))} className="absolute left-3 z-[100] w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white pointer-events-auto"><ChevronLeft size={18} /></button>
                          <button onClick={() => setSlideIndex(i => (i < imgs.length - 1 ? i + 1 : 0))} className="absolute right-3 z-[100] w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white pointer-events-auto"><ChevronRight size={18} /></button>
                        </>
                      )}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {imgs.map((_, i) => (
                          <button key={i} onClick={() => setSlideIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === slideIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`} />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Right Navigation Strip */}
          <div className="w-16 flex flex-col items-center py-2 gap-5 ml-2 relative z-[100] pb-6">
            <button onClick={() => setIsOn(!isOn)} className="w-11 h-11 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] border border-black/40 shadow-[0_4px_6px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-auto">
              <Power size={18} className={`transition-colors duration-300 ${isOn ? 'text-white' : 'text-white/30'}`} />
            </button>
            <div className="flex-1 flex flex-col items-center justify-center py-6 w-full gap-2 group">
              <div className="relative h-full w-10 bg-black/50 rounded-full border border-white/5 shadow-inner flex flex-col-reverse p-1">
                <input type="range" min="0" max={items.length - 1} step="1" value={currentIndex} onChange={(e) => { if(isOn) setCurrentIndex(parseInt(e.target.value)) }} className="absolute inset-0 opacity-0 cursor-pointer h-full w-full z-30" style={{ writingMode: 'vertical-lr', direction: 'rtl', appearance: 'none' }} />
                <div className="absolute inset-x-2 bottom-4 top-4 pointer-events-none flex flex-col justify-between py-1 px-1">
                  {items.map((_, i) => (
                    <div key={i} className={`w-full h-[2px] transition-all duration-300 ${i === currentIndex ? 'bg-yellow-400' : 'bg-white/10'}`}></div>
                  ))}
                </div>
                <div className="absolute left-1 right-1 h-8 rounded-full bg-gradient-to-b from-[#555] to-[#222] border border-white/20 pointer-events-none transition-all duration-150 z-20 flex items-center justify-center" style={{ bottom: `${4 + (currentIndex / (items.length - 1)) * 78}%`, }}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isOn ? 'bg-yellow-400 shadow-[0_0_12px_#ffcc00]' : 'bg-neutral-600'}`}></div>
                </div>
              </div>
              <div className="text-[9px] font-black text-white/40 tracking-widest uppercase mt-1">BRAND SLIDE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}