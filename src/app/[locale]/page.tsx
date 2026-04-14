"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Search, Activity, Rocket, User, DollarSign, MousePointerClick } from "lucide-react";

export default function CeoEraApp() {
  const [step, setStep] = useState<"onboarding" | "analyzing" | "result">("onboarding");
  const [tiktokId, setTiktokId] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);

  // 시뮬레이션용 스크래핑/분석 과정 텍스트
  const loadingSequence = [
    "Locating TikTok profile... 📱",
    "Analyzing your aesthetic & vibe... ✨",
    "Cross-referencing Reddit late-night rants... 🕵️‍♀️",
    "Scanning Pinterest boards for micro-trends... 📌",
    "Calculating monetization vectors... 💸",
    "Structuring your CEO blueprint... 🚀",
  ];

  // 로딩 시뮬레이션
  useEffect(() => {
    if (step === "analyzing") {
      let currentStep = 0;
      
      const interval = setInterval(() => {
        setLoadingText(loadingSequence[currentStep]);
        setProgress((currentStep + 1) * (100 / loadingSequence.length));
        currentStep++;

        if (currentStep >= loadingSequence.length) {
          clearInterval(interval);
          setTimeout(() => setStep("result"), 800); // Wait a bit at 100%
        }
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleStart = () => {
    if (!tiktokId.trim() || !tiktokId.startsWith("@")) {
      alert("Please enter a valid TikTok ID starting with @ 🙄");
      return;
    }
    setStep("analyzing");
  };

  const resetApp = () => {
    setTiktokId("");
    setStep("onboarding");
    setProgress(0);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(to bottom right, #e0e7ff, #c7d2fe, #a78bfa)', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Background Blobs for Gen Z Aesthetic */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', backgroundColor: '#34d399', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4, mixBlendMode: 'multiply' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '350px', height: '350px', backgroundColor: '#f472b6', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4, mixBlendMode: 'multiply' }}></div>

      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'rgba(255, 255, 255, 0.90)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', overflow: 'hidden', position: 'relative', zIndex: 10, minHeight: '650px', display: 'flex', flexDirection: 'column' }}>
        
        {/* Step 1: Onboarding */}
        {step === "onboarding" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ marginTop: '40px', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#f3e8ff', color: '#9333ea', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles size={16} /> Monetize your vibe
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.04em', lineHeight: 1 }}>CEO ERA</h1>
              <p style={{ fontSize: '1.125rem', color: '#64748b', fontWeight: 500, margin: 0 }}>Drop your TikTok. We'll scan your digital footprint and build your 6-figure online business plan.</p>
            </div>
            
            <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <User size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  value={tiktokId}
                  onChange={(e) => setTiktokId(e.target.value)}
                  placeholder="@your_tiktok_id"
                  style={{ width: '100%', padding: '18px 18px 18px 48px', backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '20px', fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              <button 
                onClick={handleStart}
                style={{ width: '100%', padding: '18px', backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', fontWeight: 800, fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '8px', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)', transition: 'transform 0.1s', boxSizing: 'border-box', justifyContent: 'center' }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Enter my CEO Era <ArrowRight size={20} />
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '16px', fontWeight: 500 }}>*Public accounts only. We scan your vibe, not your DMs.</p>
            </div>
          </div>
        )}

        {/* Step 2: AI Analyzing (Scraping Simulation) */}
        {step === "analyzing" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', inset: 0, border: '6px solid #f1f5f9', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', inset: 0, border: '6px solid #8b5cf6', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                <Search className="animate-pulse" color="#8b5cf6" size={40} />
              </div>
            </div>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', minHeight: '60px' }}>
              {loadingText}
            </h2>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: '#8b5cf6', width: \`\${progress}%\`, transition: 'width 0.5s ease-out' }}></div>
            </div>
            <p style={{ marginTop: '12px', fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>OSINT Engine Active...</p>
          </div>
        )}

        {/* Step 3: Reveal Result */}
        {step === "result" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', animation: 'fadeIn 0.5s ease-out', overflowY: 'auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '24px', marginTop: '8px' }}>
              <p style={{ color: '#64748b', fontWeight: 700, fontSize: '0.875rem', margin: '0 0 4px 0' }}>TARGET IDENTIFIED: {tiktokId}</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>Your aesthetic is basically a business. 💅</h2>
            </div>

            {/* Vibe Summary Profile */}
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Vibe Analysis</h3>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#334155', margin: 0, lineHeight: 1.4 }}>
                "Cozy Gamer Girl who complains about back pain on Reddit but has a pristine desk setup on TikTok."
              </p>
            </div>

            {/* Business Blueprint */}
            <div style={{ backgroundColor: '#fff', border: '2px solid #8b5cf6', borderRadius: '24px', padding: '24px', position: 'relative', boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.2)' }}>
              <div style={{ position: 'absolute', top: '-16px', right: '20px', backgroundColor: '#8b5cf6', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 800, display: 'flex', gap: '4px', alignItems: 'center' }}>
                <DollarSign size={16} /> Best Match
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>Digital Notion Templates</h3>
              <p style={{ color: '#8b5cf6', fontWeight: 700, margin: '0 0 16px 0', fontSize: '0.875rem' }}>Niche: Cozy Productivity</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#f3e8ff', padding: '8px', borderRadius: '12px', color: '#9333ea' }}><MousePointerClick size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#1e293b', margin: '0 0 2px 0' }}>Step 1: The Product</p>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Sell an aesthetic "Life OS" Notion template. Your followers already ask about your desk.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#f3e8ff', padding: '8px', borderRadius: '12px', color: '#9333ea' }}><Activity size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#1e293b', margin: '0 0 2px 0' }}>Step 2: The Funnel</p>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Put a Stan Store link in your bio. Post 7-second aesthetic TikToks of you typing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button style={{ width: '100%', padding: '18px', backgroundColor: '#8b5cf6', color: 'white', borderRadius: '20px', fontWeight: 800, fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)' }}>
                <Rocket size={20} /> Auto-Generate Store
              </button>
              <button 
                onClick={resetApp}
                style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#64748b', borderRadius: '20px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}
              >
                Scan another ID
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}} />
    </main>
  );
}