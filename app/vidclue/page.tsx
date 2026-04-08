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

const sleepExt: Record<number, string> = { 3: 'png', 9: 'png', 11: 'png', 13: 'png' };
const videoData: Record<string, { id: string, start?: number }> = {
  'Social Viral Edit': { id: 'WWAwu1Pj-h4', start: 248 },
  'Product Showcase': { id: '8BU2Y8z8MIg', start: 72 },
  'Storytelling Edit': { id: 'eKVKOO80stg', start: 336 },
  'Cinematic Recap': { id: 'k7L1Eco4MLQ', start: 219 },
  'Fast-paced Motion': { id: 'B_Z_31BJLFU' },
  'Brand Anthem': { id: 'bLMHeRC2msE' },
  'YouTube Highlights': { id: 'reefflmAb2E' }
};
const videoItems = Object.keys(videoData);

const brandImages: Record<string, string[]> = {
  Sleepycat: Array.from({ length: 18 }, (_, i) => `/brands/sleepcat/sleepcat_${i + 1}.${sleepExt[i + 1] ?? 'jpg'}`),
  MomCozy: Array.from({ length: 17 }, (_, i) => `/brands/momcozy/momcozy_${i + 1}.jpg`),
  Optm: ['/brands/optm/optm_1.jpg', '/brands/optm/optm_2.jpeg', '/brands/optm/optm_3.jpg'],
  Varco: Array.from({ length: 10 }, (_, i) => `/brands/varco/varco_${i + 1}.jpg`),
  'Sleepycat_logo': ['/brands/logos/sleepycat_logo.png'],
  'MomCozy_logo': ['/brands/logos/momcozy_logo_1.png', '/brands/logos/momcozy_logo_2.png'],
  'Optm_logo': ['/brands/logos/optm_logo.png'],
  'Varco_logo': ['/brands/logos/varco_logo.avif'],
  'Pen and paper': ['/brands/thumbnails/35 MCQ is not enough.jpg', '/brands/thumbnails/AI bdhayega NEET Score!.jpg'],
  'Coworker wisdom': ['/brands/thumbnails/First Win 2 jpg.jpg', '/brands/thumbnails/NEET 2026 .jpg'],
  'Multi-role explainer': ['/brands/thumbnails/Stuck in Chemistry .jpg', '/brands/thumbnails/Stuck in Physcis .jpg'],
  'Explain like I\'m five': ['/brands/thumbnails/Thumbnail 3.jpg', '/brands/thumbnails/_Only way to solve MCQs!! 2.jpg'],
};

export default function VidclueFinalPage() {
  const [isOn, setIsOn] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'BKM' | 'MOR'>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSocialAdsOpen, setIsSocialAdsOpen] = useState(true);
  const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(true);
  const [isVideosOpen, setIsVideosOpen] = useState(true);
  const [isLogosOpen, setIsLogosOpen] = useState(false);
  const [viewAllCategory, setViewAllCategory] = useState<null | 'social' | 'thumbnails' | 'videos' | 'logos'>(null);
  const [logoSlideIndex, setLogoSlideIndex] = useState(0);
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
    ...videoItems
  ];

  const currentBrand = items[currentIndex];

  // Aggregate images if in "Show All" mode
  const currentBrandImgs = (() => {
    if (viewAllCategory === 'social') return items.slice(0, 4).flatMap(it => brandImages[it] || []);
    if (viewAllCategory === 'thumbnails') return items.slice(4, 8).flatMap(it => brandImages[it] || []);
    if (viewAllCategory === 'videos') return items.slice(8).flatMap(it => [`https://img.youtube.com/vi/${videoData[it].id}/mqdefault.jpg`]);
    if (viewAllCategory === 'logos') return ['Sleepycat', 'MomCozy', 'Optm', 'Varco'].flatMap(it => brandImages[`${it}_logo`] || []);
    const itemKey = currentIndex >= 8 ? currentBrand : currentBrand;
    return brandImages[itemKey];
  })();

  const currentDisplayName = (() => {
    if (viewAllCategory === 'social') return "ALL SOCIAL + ADS";
    if (viewAllCategory === 'thumbnails') return "ALL THUMBNAILS";
    if (viewAllCategory === 'videos') return "ALL VIDEOS";
    if (viewAllCategory === 'logos') return "ALL PARTNERS";
    return currentBrand;
  })();

  useEffect(() => { setSlideIndex(0); }, [currentIndex]);

  useEffect(() => {
    if (!currentBrandImgs || currentBrandImgs.length <= 1 || viewMode === 'STATIC') return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev < currentBrandImgs.length - 1 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, currentBrandImgs, viewMode]);

  useEffect(() => {
    if (!isOn) return;
    const timer = setInterval(() => {
      setLogoSlideIndex(prev => (prev < 3 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, [isOn]);

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
    <div className="relative min-h-screen w-full flex items-center justify-center p-2 md:p-4 font-sans select-none overflow-hidden bg-white">

      {/* BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 z-10 mix-blend-multiply opacity-80 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-room.png')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white"></div>
        <div className="absolute inset-0 z-5 mix-blend-multiply opacity-10 bg-speckle"></div>
      </div>

      <div className="relative z-50 w-full h-auto md:max-w-[1100px] md:max-h-[95vh] md:aspect-[16/10] bg-[#bd4238] rounded-[20px] md:rounded-[40px] shadow-[0_60px_100px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.1)] p-3 md:p-6 flex flex-col md:flex-row transition-all duration-500 border border-black/20 pointer-events-auto gap-3 md:gap-0">

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 md:mb-4 px-1 md:px-2 relative z-[110] pointer-events-auto gap-2 md:gap-0 w-full md:w-auto">
          <div className="block md:block">
            <h1 className="text-white text-xl md:text-2xl font-black tracking-tight drop-shadow-sm">SUNIL</h1>
            <p className="text-white/70 text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 hidden md:block">Graphic Desginer & Video Editor</p>
            <p className="text-white/50 text-[9px] md:text-[10px] font-medium tracking-widest mt-1 hidden md:block">sunildesign.co@gmail.com</p>
          </div>

          <div className="flex gap-2 md:gap-5 w-full md:w-auto md:mr-[4.5rem]">
            <div className="flex gap-2 md:gap-0 flex-1 md:flex-auto">
              {(['ALL', 'BKM', 'MOR'] as const).map((label) => {
                const isActive = isOn && activeCategory === label;
                return (
                  <button
                    key={label}
                    onClick={() => toggleCategory(label)}
                    className="flex flex-col items-center gap-1 md:gap-2 group outline-none pointer-events-auto flex-1 md:flex-auto"
                  >
                    <div className={`
                      w-6 h-6 md:w-9 md:h-9 rounded-full 
                      bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a]
                      shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.5)]
                      flex items-center justify-center 
                      transition-all duration-300
                      border border-black/40
                      group-hover:border-white/20
                    `}>
                      <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#ffcc00] shadow-[0_0_10px_#ffcc00]' : 'bg-[#4a4a4a]'}`}></div>
                    </div>
                    <span className={`text-[8px] md:text-[9px] font-bold tracking-wider transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>{label}</span>
                  </button>
                );
              })}
            </div>}

            <button
              onClick={() => isOn && setViewMode(prev => prev === 'DYNAMIC' ? 'STATIC' : 'DYNAMIC')}
              className="flex flex-col items-center gap-1 md:gap-2 group outline-none md:ml-4 pointer-events-auto flex-1 md:flex-auto"
            >
              <div className="px-2 md:px-3 h-6 md:h-9 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center border border-black/40 group-hover:border-white/20">
                <span className={`text-[8px] md:text-[10px] font-black tracking-widest ${isOn ? 'text-yellow-400' : 'text-white/30'}`}>{viewMode}</span>
              </div>
              <span className="text-[8px] md:text-[9px] font-bold tracking-wider text-white/50">MODE</span>
            </button>
          </div>
        </div>

        {/* --- Main Interface Area --- */}
        <div className="flex-1 flex flex-col md:flex-row md:gap-5 relative z-[100] min-h-0 pointer-events-auto h-auto md:h-auto gap-2">

          {/* Left Sidebar */}
          <div className={`flex-[0.9] md:flex-[0.9] w-full md:w-auto rounded-2xl overflow-hidden flex flex-col border-2 border-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 relative h-64 md:h-auto ${isOn ? 'bg-[#151515]' : 'bg-[#0d0d0d]'}`}>
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
                  const previewImg = brandImages[item]?.[0];
                  return (
                    <button
                      key={idx}
                      onClick={() => { setCurrentIndex(idx); setViewAllCategory(null); }}
                      className={`w-full text-left px-6 py-3 transition-all relative flex items-center gap-4 group ${isActive && !viewAllCategory ? 'bg-white/5 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      {previewImg ? (
                        <div className={`w-10 h-7 rounded border border-white/10 overflow-hidden relative shrink-0 ${(isActive && !viewAllCategory) ? 'ring-1 ring-yellow-400/50' : ''}`}>
                          <Image src={previewImg} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full ${(isActive && !viewAllCategory) ? 'bg-yellow-400 shadow-[0_0_6px_#facc15]' : 'bg-white/20'}`} />
                      )}
                      <span className="text-xs font-medium tracking-wide truncate">{item}</span>
                      {(isActive && !viewAllCategory) && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e03e3e]" />}
                    </button>
                  );
                })}

                <div
                  className={`p-5 flex items-center justify-between mt-2 border-t border-white/5 bg-[#1a1a1a] cursor-pointer hover:bg-white/5 transition ${viewAllCategory === 'thumbnails' ? 'ring-inset ring-1 ring-yellow-500/30' : ''}`}
                  onClick={() => { setIsThumbnailsOpen(!isThumbnailsOpen); setViewAllCategory('thumbnails'); }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`text-[10px] font-bold tracking-widest uppercase ${viewAllCategory === 'thumbnails' ? 'text-yellow-400' : 'text-white/50'}`}>2. THUMBNAILS</div>
                    {isThumbnailsOpen ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                  </div>
                </div>

                {isThumbnailsOpen && items.slice(4, 8).map((item, idx) => {
                  const actualIdx = idx + 4;
                  const isActive = currentIndex === actualIdx;
                  const previewImg = brandImages[item]?.[0];
                  return (
                    <button
                      key={actualIdx}
                      onClick={() => { setCurrentIndex(actualIdx); setViewAllCategory(null); }}
                      className={`w-full text-left px-6 py-3 transition-all relative flex items-center gap-4 group ${isActive && !viewAllCategory ? 'bg-white/5 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      {previewImg ? (
                        <div className={`w-10 h-7 rounded border border-white/10 overflow-hidden relative shrink-0 ${(isActive && !viewAllCategory) ? 'ring-1 ring-yellow-400/50' : ''}`}>
                          <Image src={previewImg} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full ${(isActive && !viewAllCategory) ? 'bg-yellow-400 shadow-[0_0_6px_#facc15]' : 'bg-white/20'}`} />
                      )}
                      <span className="text-xs font-medium tracking-wide truncate">{item}</span>
                      {(isActive && !viewAllCategory) && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e03e3e]" />}
                    </button>
                  );
                })}

                <div
                  className={`p-5 flex items-center justify-between mt-2 border-t border-white/5 bg-[#1a1a1a] cursor-pointer hover:bg-white/5 transition ${viewAllCategory === 'videos' ? 'ring-inset ring-1 ring-yellow-500/30' : ''}`}
                  onClick={() => { setIsVideosOpen(!isVideosOpen); setViewAllCategory('videos'); }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`text-[10px] font-bold tracking-widest uppercase ${viewAllCategory === 'videos' ? 'text-yellow-400' : 'text-white/50'}`}>3. VIDEOS</div>
                    {isVideosOpen ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
                  </div>
                </div>

                {isVideosOpen && items.slice(8).map((item, idx) => {
                  const actualIdx = idx + 8;
                  const isActive = currentIndex === actualIdx;
                  const vid = videoData[item];
                  const previewImg = `https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`;
                  return (
                    <button
                      key={actualIdx}
                      onClick={() => { setCurrentIndex(actualIdx); setViewAllCategory(null); }}
                      className={`w-full text-left px-6 py-3 transition-all relative flex items-center gap-4 group ${isActive && !viewAllCategory ? 'bg-white/5 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      <div className={`w-10 h-7 rounded border border-white/10 overflow-hidden relative shrink-0 ${(isActive && !viewAllCategory) ? 'ring-1 ring-yellow-400/50' : ''}`}>
                        <Image src={previewImg} alt="" fill className="object-cover" unoptimized />
                      </div>
                      <span className="text-xs font-medium tracking-wide truncate">{item}</span>
                      {(isActive && !viewAllCategory) && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e03e3e]" />}
                    </button>
                  );
                })}
              </div>

              {/* Constant Logo Slideshow at Bottom */}
              <div className="mt-auto border-t border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Trusted by</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className={`w-1 h-1 rounded-full ${i === logoSlideIndex ? 'bg-yellow-400' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
                <div className="relative h-14 w-full overflow-hidden rounded-xl bg-white border border-white/10 flex items-center justify-center shadow-inner">
                  {(() => {
                    const logoItems = ['Sleepycat', 'MomCozy', 'Optm', 'Varco'];
                    const item = logoItems[logoSlideIndex];
                    const logoImg = brandImages[`${item}_logo`]?.[0];
                    if (!logoImg) return null;
                    const isOptm = item === 'Optm';
                    return (
                      <div key={item} className={`absolute inset-0 flex items-center justify-center animate-fadeIn p-2 ${isOptm ? 'bg-[#1a1a1a]' : ''}`}>
                        <div className={`relative w-full h-full ${isOptm ? 'scale-125' : ''}`}>
                          <Image src={logoImg} alt={item} fill className="object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]" sizes="150px" />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

          <div className={`flex-1 md:flex-1 w-full md:w-auto rounded-2xl overflow-hidden flex flex-col border-2 border-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] transition-colors duration-300 relative h-64 md:h-auto ${isOn ? 'bg-[#e0e0e0]' : 'bg-[#1a1a1a]'}`}>
            <div className={`h-full flex flex-col relative transition-opacity duration-300 z-0 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
              <div className="h-14 bg-[#151515] flex items-center justify-between px-5 shrink-0">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-[11px] font-bold tracking-widest uppercase opacity-90">{currentDisplayName}</span>
                  <span className="text-[11px] text-white/30">{viewAllCategory ? 'GRID' : `${slideIndex + 1}/${currentBrandImgs?.length ?? '—'}`}</span>
                </div>
              </div>

              <div className="flex-1 relative bg-[#111] shadow-inner overflow-hidden flex items-center justify-center pointer-events-auto">
                {(() => {
                  const imgs = currentBrandImgs;

                  // Check if current item is a video
                  if (!viewAllCategory && currentIndex >= 8) {
                    const vid = videoData[items[currentIndex]];
                    return (
                      <div className="w-full h-full relative p-4">
                        <iframe
                          src={`https://www.youtube.com/embed/${vid.id}?start=${vid.start || 0}&autoplay=0&rel=0`}
                          title={items[currentIndex]}
                          className="w-full h-full rounded-xl border-4 border-black/20 shadow-2xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  }

                  if (!imgs || imgs.length === 0) {
                    return (
                      <div className="h-full flex flex-col items-center justify-center">
                        <FileX size={64} className="text-neutral-400/70" strokeWidth={1.2} />
                        <p className="text-neutral-400 text-xs mt-3 font-medium">No images</p>
                      </div>
                    );
                  }

                  if (viewMode === 'STATIC' || viewAllCategory) {
                    return (
                      <div className="h-full w-full overflow-y-auto scrollbar-hide p-6 flex flex-col gap-6 relative group/static">
                        {imgs.map((imgSrc, i) => (
                          <div key={`${imgSrc}-${i}`} className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg shrink-0">
                            <Image src={imgSrc} alt="" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    );
                  }

                  const activeSrc = imgs[slideIndex];
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div key={activeSrc} className="absolute inset-0 animate-fadeIn">
                        <Image src={activeSrc} alt={`${currentBrand} ${slideIndex + 1}`} fill className="object-contain" sizes="600px" priority />
                      </div>
                      {imgs.length > 1 && (
                        <>
                          <button onClick={() => setSlideIndex(i => (i > 0 ? i - 1 : imgs.length - 1))} className="absolute left-3 z-[100] w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white pointer-events-auto"><ChevronLeft size={18} /></button>
                          <button onClick={() => setSlideIndex(i => (i < imgs.length - 1 ? i + 1 : 0))} className="absolute right-3 z-[100] w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white pointer-events-auto"><ChevronRight size={18} /></button>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-16 flex-col items-center py-2 gap-5 ml-2 relative z-[100] pb-6">
            <button onClick={() => setIsOn(!isOn)} className="w-11 h-11 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] border border-black/40 shadow-[0_4px_6px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-auto">
              <Power size={18} className={`transition-colors duration-300 ${isOn ? 'text-white' : 'text-white/30'}`} />
            </button>
            <div className="flex-1 flex flex-col items-center justify-center py-6 w-full gap-2 group">
              <div className="relative h-full w-10 bg-black/50 rounded-full border border-white/5 shadow-inner flex flex-col-reverse p-1">
                <input type="range" min="0" max={items.length - 1} step="1" value={currentIndex} onChange={(e) => { if (isOn) setCurrentIndex(parseInt(e.target.value)) }} className="absolute inset-0 opacity-0 cursor-pointer h-full w-full z-30" style={{ writingMode: 'vertical-lr', direction: 'rtl', appearance: 'none' }} />
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

        {/* Mobile Bottom Controls */}
        <div className="flex md:hidden flex-col gap-2 w-full">
          {/* Power Button & Mode - Mobile */}
          <div className="flex gap-2 items-center justify-between bg-[#1a1a1a] rounded-lg p-2">
            <button onClick={() => setIsOn(!isOn)} className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] border border-black/40 shadow-[0_4px_6px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-auto">
              <Power size={16} className={`transition-colors duration-300 ${isOn ? 'text-white' : 'text-white/30'}`} />
            </button>
            <button
              onClick={() => isOn && setViewMode(prev => prev === 'DYNAMIC' ? 'STATIC' : 'DYNAMIC')}
              className="flex-1 px-3 h-10 rounded-lg bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center border border-black/40 group-hover:border-white/20"
            >
              <span className={`text-[10px] font-black tracking-widest ${isOn ? 'text-yellow-400' : 'text-white/30'}`}>{viewMode}</span>
            </button>
          </div>

          {/* Slide Navigation - Mobile */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-2">
            <button onClick={() => setCurrentIndex(i => (i > 0 ? i - 1 : items.length - 1))} className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] border border-black/40 flex items-center justify-center pointer-events-auto">
              <ChevronUp size={16} className="text-white/50" />
            </button>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white/60">{currentIndex + 1}/{items.length}</span>
            </div>
            <button onClick={() => setCurrentIndex(i => (i < items.length - 1 ? i + 1 : 0))} className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] border border-black/40 flex items-center justify-center pointer-events-auto">
              <ChevronDown size={16} className="text-white/50" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
