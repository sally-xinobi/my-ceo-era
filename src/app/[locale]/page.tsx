"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Search, Activity, Rocket, User, DollarSign, MousePointerClick, Send, MessageSquare } from "lucide-react";

export default function CeoEraApp() {
  const [step, setStep] = useState<"onboarding" | "analyzing" | "result" | "chat">("onboarding");
  const [tiktokId, setTiktokId] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);
  const [blueprint, setBlueprint] = useState<any>(null);
  
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const loadingSequence = [
    "Locating TikTok profile... 📱",
    "Analyzing your aesthetic & vibe... ✨",
    "Cross-referencing Reddit late-night rants... 🕵️‍♀️",
    "Scanning Pinterest boards for micro-trends... 📌",
    "Calculating monetization vectors... 💸",
    "Structuring your CEO blueprint... 🚀",
  ];

  useEffect(() => {
    if (step === "analyzing") {
      let currentStep = 0;
      const animationInterval = setInterval(() => {
        setLoadingText(loadingSequence[currentStep]);
        setProgress((currentStep + 1) * (100 / loadingSequence.length));
        currentStep++;
        if (currentStep >= loadingSequence.length) clearInterval(animationInterval);
      }, 1000);
      return () => clearInterval(animationInterval);
    }
  }, [step, loadingSequence]);

  const handleStart = async () => {
    if (!tiktokId.trim() || !tiktokId.startsWith("@")) {
      alert("Please enter a valid TikTok ID starting with @ 🙄");
      return;
    }
    
    setStep("analyzing");

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle: tiktokId })
      });
      
      const data = await response.json();
      setBlueprint(data);
      
      setTimeout(() => {
        setStep("result");
        setMessages([
          { role: 'assistant', content: `Hey CEO! 💅 Just finished scanning your digital footprint. Your '${data.niche}' vibe is basically a goldmine. What do you think about the ${data.businessTitle} idea? Let's brainstorm how to actually launch this.` }
        ]);
      }, 6500);
      
    } catch (error) {
      console.error(error);
      alert("Oops! The OSINT engine crashed. Make sure your OpenAI API key is set! 🔑");
      setStep("onboarding");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages,
          persona: blueprint 
        })
      });
      
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const resetApp = () => {
    setTiktokId("");
    setBlueprint(null);
    setMessages([]);
    setStep("onboarding");
    setProgress(0);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(to bottom right, #e0e7ff, #c7d2fe, #a78bfa)', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', backgroundColor: '#34d399', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4, mixBlendMode: 'multiply' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '350px', height: '350px', backgroundColor: '#f472b6', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4, mixBlendMode: 'multiply' }}></div>

      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'rgba(255, 255, 255, 0.90)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', overflow: 'hidden', position: 'relative', zIndex: 10, height: '700px', display: 'flex', flexDirection: 'column' }}>
        
        {step === "onboarding" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px' }}>
            <div style={{ marginTop: '40px', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#f3e8ff', color: '#9333ea', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 700, marginBottom: '16px' }}>
                <Sparkles size={16} /> Monetize your vibe
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.04em', lineHeight: 1 }}>CEO ERA</h1>
              <p style={{ fontSize: '1.125rem', color: '#64748b', fontWeight: 500, margin: 0 }}>Drop your TikTok. We'll scan your digital footprint and build your online business plan.</p>
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
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                />
              </div>
              <button 
                type="button"
                onClick={handleStart}
                style={{ width: '100%', padding: '18px', backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', fontWeight: 800, fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)' }}
              >
                Enter my CEO Era <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', inset: 0, border: '6px solid #f1f5f9', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', inset: 0, border: '6px solid #8b5cf6', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                <Search color="#8b5cf6" size={40} />
              </div>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', minHeight: '60px' }}>
              {loadingText}
            </h2>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: '#8b5cf6', width: `${progress}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
          </div>
        )}

        {step === "result" && blueprint && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', overflowY: 'auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '24px', marginTop: '8px' }}>
              <p style={{ color: '#64748b', fontWeight: 700, fontSize: '0.875rem', margin: '0 0 4px 0' }}>TARGET IDENTIFIED: {tiktokId}</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>Your aesthetic is a business. 💅</h2>
            </div>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Vibe Analysis</h3>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#334155', margin: 0, lineHeight: 1.4 }}>"{blueprint.personaSummary}"</p>
            </div>

            <div style={{ backgroundColor: '#fff', border: '2px solid #8b5cf6', borderRadius: '24px', padding: '24px', position: 'relative', boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.2)' }}>
              <div style={{ position: 'absolute', top: '-16px', right: '20px', backgroundColor: '#8b5cf6', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 800, display: 'flex', gap: '4px', alignItems: 'center' }}>
                <DollarSign size={16} /> Best Match
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>{blueprint.businessTitle}</h3>
              <p style={{ color: '#8b5cf6', fontWeight: 700, margin: '0 0 16px 0', fontSize: '0.875rem' }}>Niche: {blueprint.niche}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#f3e8ff', padding: '8px', borderRadius: '12px', color: '#9333ea' }}><MousePointerClick size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#1e293b', margin: '0 0 2px 0' }}>Step 1: The Product</p>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{blueprint.step1}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#f3e8ff', padding: '8px', borderRadius: '12px', color: '#9333ea' }}><Activity size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#1e293b', margin: '0 0 2px 0' }}>Step 2: The Funnel</p>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>{blueprint.step2}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => setStep("chat")}
                style={{ width: '100%', padding: '18px', backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', fontWeight: 800, fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.4)' }}
              >
                <MessageSquare size={20} /> Build this with my Wingman
              </button>
              <button 
                type="button"
                onClick={resetApp}
                style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#64748b', borderRadius: '20px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}
              >
                Scan another ID
              </button>
            </div>
          </div>
        )}

        {step === "chat" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(to top right, #8b5cf6, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>AI</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Hype Wingman</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Online</p>
                </div>
              </div>
              <button type="button" onClick={() => setStep("result")} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 700 }}>Back</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#f8fafc' }}>
              {messages.map((msg, idx) => (
                <div key={`msg-${idx}`} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '20px', backgroundColor: msg.role === 'user' ? '#8b5cf6' : '#fff', color: msg.role === 'user' ? '#fff' : '#334155', border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0', borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px', borderBottomLeftRadius: msg.role === 'user' ? '20px' : '4px', fontSize: '0.9375rem', lineHeight: 1.5, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '20px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderBottomLeftRadius: '4px', color: '#cbd5e1' }}>
                  Thinking...
                </div>
              )}
            </div>

            <div style={{ padding: '16px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask how to get your first client..."
                style={{ flex: 1, padding: '14px 16px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '999px', fontSize: '0.9375rem', outline: 'none' }}
              />
              <button 
                type="button"
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#8b5cf6', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: (isTyping || !inputMessage.trim()) ? 0.5 : 1 }}
              >
                <Send size={18} style={{ marginLeft: '2px' }} />
              </button>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}