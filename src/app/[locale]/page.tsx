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

  // OSINT 감성을 살린 텍스트로 업데이트
  const loadingSequence = [
    "Initializing OSINT Engine... 👁️",
    "Pinging TikTok endpoint... 📱",
    "Bypassing Reddit API blocks... 🕵️‍♀️",
    "Scanning GitHub repositories... 💻",
    "Verifying Instagram/Snapchat footprint... 📸",
    "Aggregating cross-platform psychological profile... 🧠",
    "Generating monetization vectors... 💸",
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
      }, 900); // 속도를 조금 높임
      return () => clearInterval(animationInterval);
    }
  }, [step]); // removed loadingSequence from deps to prevent re-renders

  const handleStart = async () => {
    if (!tiktokId.trim() || !tiktokId.startsWith("@")) {
      alert("Please enter a valid handle starting with @ 🙄");
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
          { role: 'assistant', content: `Hey CEO! 💅 Just finished scanning your entire digital footprint across all platforms. Your '${data.niche}' vibe is basically a goldmine. What do you think about the ${data.businessTitle} idea? Let's brainstorm how to actually launch this.` }
        ]);
      }, 7200);
      
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b, #312e81)', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Darker Hacker Vibe Blobs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', backgroundColor: '#8b5cf6', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3, mixBlendMode: 'screen' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '350px', height: '350px', backgroundColor: '#10b981', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2, mixBlendMode: 'screen' }}></div>

      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden', position: 'relative', zIndex: 10, height: '700px', display: 'flex', flexDirection: 'column' }}>
        
        {step === "onboarding" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px' }}>
            <div style={{ marginTop: '40px', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 700, marginBottom: '16px', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                <Activity size={16} /> Cross-Platform OSINT
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px 0', letterSpacing: '-0.04em', lineHeight: 1 }}>CEO ERA</h1>
              <p style={{ fontSize: '1.125rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>Drop your @handle. We scan your entire digital footprint across TikTok, Reddit, GitHub, and IG to build your custom business blueprint.</p>
            </div>
            
            <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <User size={20} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  value={tiktokId}
                  onChange={(e) => setTiktokId(e.target.value)}
                  placeholder="@your_username"
                  style={{ width: '100%', padding: '18px 18px 18px 48px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', borderRadius: '20px', fontSize: '1.125rem', fontWeight: 600, color: '#f8fafc', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                />
              </div>
              <button 
                type="button"
                onClick={handleStart}
                style={{ width: '100%', padding: '18px', backgroundColor: '#8b5cf6', color: 'white', borderRadius: '20px', fontWeight: 800, fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' }}
              >
                Scan My Footprint <Search size={20} />
              </button>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', inset: 0, border: '6px solid rgba(51, 65, 85, 0.5)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', inset: 0, border: '6px solid #10b981', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                <Activity className="animate-pulse" color="#10b981" size={40} />
              </div>
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e2e8f0', margin: '0 0 16px 0', minHeight: '60px', fontFamily: 'monospace' }}>
              &gt; {loadingText}
            </h2>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: '#10b981', width: `${progress}%`, transition: 'width 0.5s ease-out' }}></div>
            </div>
          </div>
        )}

        {step === "result" && blueprint && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', overflowY: 'auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '24px', marginTop: '8px' }}>
              <p style={{ color: '#10b981', fontWeight: 700, fontSize: '0.875rem', margin: '0 0 4px 0', fontFamily: 'monospace' }}>TARGET IDENTIFIED: {tiktokId}</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#f8fafc', margin: 0, lineHeight: 1.1 }}>Your aesthetic is a business. 💅</h2>
            </div>

            <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', borderRadius: '24px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Cross-Platform Vibe Analysis</h3>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: '#e2e8f0', margin: 0, lineHeight: 1.5 }}>"{blueprint.personaSummary}"</p>
            </div>

            <div style={{ backgroundColor: '#1e293b', border: '2px solid #8b5cf6', borderRadius: '24px', padding: '24px', position: 'relative', boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.2)' }}>
              <div style={{ position: 'absolute', top: '-16px', right: '20px', backgroundColor: '#8b5cf6', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 800, display: 'flex', gap: '4px', alignItems: 'center' }}>
                <DollarSign size={16} /> Best Match
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc', margin: '0 0 4px 0' }}>{blueprint.businessTitle}</h3>
              <p style={{ color: '#a78bfa', fontWeight: 700, margin: '0 0 16px 0', fontSize: '0.875rem' }}>Niche: {blueprint.niche}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', padding: '8px', borderRadius: '12px', color: '#a78bfa' }}><MousePointerClick size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#f8fafc', margin: '0 0 4px 0' }}>Step 1: The Product</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0, lineHeight: 1.4 }}>{blueprint.step1}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', padding: '8px', borderRadius: '12px', color: '#a78bfa' }}><Activity size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#f8fafc', margin: '0 0 4px 0' }}>Step 2: OSINT Funnel</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0, lineHeight: 1.4 }}>{blueprint.step2}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => setStep("chat")}
                style={{ width: '100%', padding: '18px', backgroundColor: '#10b981', color: '#0f172a', borderRadius: '20px', fontWeight: 900, fontSize: '1.125rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
              >
                <MessageSquare size={20} /> Build this with AI Wingman
              </button>
              <button 
                type="button"
                onClick={resetApp}
                style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#64748b', borderRadius: '20px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}
              >
                Scan another target
              </button>
            </div>
          </div>
        )}

        {step === "chat" && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(15, 23, 42, 0.9)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(to top right, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>AI</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>Hype Wingman</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>● Connected via OSINT link</p>
                </div>
              </div>
              <button type="button" onClick={() => setStep("result")} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 700 }}>Back</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
              {messages.map((msg, idx) => (
                <div key={`msg-${idx}`} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '20px', backgroundColor: msg.role === 'user' ? '#8b5cf6' : '#1e293b', color: msg.role === 'user' ? '#fff' : '#e2e8f0', border: msg.role === 'user' ? 'none' : '1px solid #334155', borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px', borderBottomLeftRadius: msg.role === 'user' ? '20px' : '4px', fontSize: '0.9375rem', lineHeight: 1.5, boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '20px', backgroundColor: '#1e293b', border: '1px solid #334155', borderBottomLeftRadius: '4px', color: '#94a3b8', fontFamily: 'monospace' }}>
                  &gt; Calculating response...
                </div>
              )}
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask how to get your first client..."
                style={{ flex: 1, padding: '14px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '999px', fontSize: '0.9375rem', outline: 'none' }}
              />
              <button 
                type="button"
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                style={{ width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#10b981', color: '#0f172a', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: (isTyping || !inputMessage.trim()) ? 0.5 : 1 }}
              >
                <Send size={18} style={{ marginLeft: '2px', fontWeight: 'bold' }} />
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