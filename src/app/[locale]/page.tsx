"use client";

import {
  Activity,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Layers,
  MessageSquare,
  Send,
  Target,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CeoEraApp() {
  const [step, setStep] = useState<
    "onboarding" | "analyzing" | "result" | "chat"
  >("onboarding");
  const [tiktokId, setTiktokId] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);
  const [blueprint, setBlueprint] = useState<Record<string, string> | null>(
    null,
  );

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const loadingSequence = [
    "Initializing OSINT Engine... 👁️",
    "Pinging TikTok endpoint... 📱",
    "Bypassing Reddit API blocks... 🕵️‍♀️",
    "Aggregating cross-platform psychological profile... 🧠",
    "Identifying high-margin market gaps... 🔍",
    "Structuring monetization vectors & pricing... 💸",
    "Reverse-engineering Billionaire Playbooks... 👑",
    "Compiling 3-Step Execution Plan... 🚀",
  ];

  useEffect(() => {
    if (step === "analyzing") {
      let currentStep = 0;
      const animationInterval = setInterval(() => {
        setLoadingText(loadingSequence[currentStep]);
        setProgress((currentStep + 1) * (100 / loadingSequence.length));
        currentStep++;
        if (currentStep >= loadingSequence.length)
          clearInterval(animationInterval);
      }, 800);
      return () => clearInterval(animationInterval);
    }
  }, [step]);

  useEffect(() => {
    if (step === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, step]);

  const handleStart = async () => {
    if (!tiktokId.trim() || !tiktokId.startsWith("@")) {
      alert("Please enter a valid handle starting with @ 🙄");
      return;
    }

    setStep("analyzing");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: tiktokId }),
      });

      const data = await response.json();
      setBlueprint(data);

      setTimeout(() => {
        setStep("result");
        setMessages([
          {
            role: "assistant",
            content: `Hey CEO! 💅 Your blueprint for ${data.businessName} is literally ready. Let's stop scrolling and start Phase 1. Did you open Notion or whatever tool you need yet? 🔪`,
          },
        ]);
      }, 6400);
    } catch (error) {
      console.error(error);
      alert(
        "Oops! The OSINT engine crashed. Make sure your API key is set! 🔑",
      );
      setStep("onboarding");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { role: "user", content: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          persona: blueprint,
        }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        position: "relative",
        background:
          "linear-gradient(to bottom right, #09090b, #1e1b4b, #312e81)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Darker Hacker/GenZ Blobs */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          left: "-5%",
          width: "300px",
          height: "300px",
          backgroundColor: "#a855f7",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.35,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "-5%",
          width: "350px",
          height: "350px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.25,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      ></div>

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(25px)",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "800px",
          minHeight: "600px",
        }}
      >
        {step === "onboarding" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "32px 24px",
              animation: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div style={{ marginTop: "20px", marginBottom: "32px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  backgroundColor: "rgba(168, 85, 247, 0.15)",
                  color: "#c084fc",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  fontWeight: 800,
                  marginBottom: "20px",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <Zap size={14} /> Ideas are cheap. Execution isn't.
              </div>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  color: "#f8fafc",
                  margin: "0 0 12px 0",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}
              >
                CEO
                <br />
                ERA.
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#94a3b8",
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Drop your @handle. We scan your footprint and generate an
                aggressive, 3-step action plan to build & launch your first
                high-margin digital business.
              </p>
            </div>

            <div style={{ marginTop: "auto", marginBottom: "10px" }}>
              <div style={{ position: "relative", marginBottom: "16px" }}>
                <User
                  size={20}
                  color="#64748b"
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="text"
                  value={tiktokId}
                  onChange={(e) => setTiktokId(e.target.value)}
                  placeholder="@your_handle"
                  style={{
                    width: "100%",
                    padding: "20px 20px 20px 52px",
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid #475569",
                    borderRadius: "20px",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#f8fafc",
                    outline: "none",
                    transition: "all 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#a855f7")}
                  onBlur={(e) => (e.target.style.borderColor = "#475569")}
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                />
              </div>
              <button
                type="button"
                onClick={handleStart}
                style={{
                  width: "100%",
                  padding: "20px",
                  background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                  color: "white",
                  borderRadius: "20px",
                  fontWeight: 900,
                  fontSize: "1.125rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.5)",
                  transition: "transform 0.1s",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.97)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Generate My Action Plan <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px",
              textAlign: "center",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "130px",
                height: "130px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "4px dashed rgba(51, 65, 85, 0.4)",
                  borderRadius: "50%",
                  animation: "spin 4s linear infinite reverse",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  border: "6px solid transparent",
                  borderRadius: "50%",
                  borderTopColor: "#a855f7",
                  borderLeftColor: "#3b82f6",
                  animation:
                    "spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                <Activity
                  color="#f8fafc"
                  size={44}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(248,250,252,0.5))",
                  }}
                />
              </div>
            </div>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#a855f7",
                margin: "0 0 20px 0",
                minHeight: "60px",
                fontFamily: '"Courier New", Courier, monospace',
                letterSpacing: "-0.02em",
                textShadow: "0 0 10px rgba(168,85,247,0.3)",
              }}
            >
              &gt; {loadingText}
            </h2>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "rgba(30,41,59,0.8)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #a855f7, #3b82f6)",
                  width: `${progress}%`,
                  transition: "width 0.4s ease-out",
                }}
              ></div>
            </div>
          </div>
        )}

        {step === "result" && blueprint && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              overflowY: "auto",
              animation: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                textAlign: "left",
                marginBottom: "24px",
                marginTop: "12px",
              }}
            >
              <p
                style={{
                  color: "#3b82f6",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  margin: "0 0 8px 0",
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                }}
              >
                TARGET IDENTIFIED: {tiktokId}
              </p>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#f8fafc",
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                {blueprint.epiphanyMoment}
              </h2>
            </div>

            {/* Core Business Concept Box */}
            <div
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#a855f7",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "16px",
                }}
              >
                The Product
              </div>
              <h3
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "#f8fafc",
                  margin: "0 0 8px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                {blueprint.businessName}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#cbd5e1",
                  margin: "0 0 16px 0",
                  lineHeight: 1.5,
                }}
              >
                {blueprint.productToBuild}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      margin: "0 0 4px 0",
                      textTransform: "uppercase",
                    }}
                  >
                    Pricing Model
                  </p>
                  <p
                    style={{
                      color: "#10b981",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <DollarSign size={14} /> {blueprint.pricingStrategy}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    borderLeft: "1px solid rgba(255,255,255,0.1)",
                    paddingLeft: "16px",
                  }}
                >
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      margin: "0 0 4px 0",
                      textTransform: "uppercase",
                    }}
                  >
                    Marketing Muse
                  </p>
                  <p
                    style={{
                      color: "#3b82f6",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Target size={14} /> {blueprint.billionaireMuse}
                  </p>
                </div>
              </div>
            </div>

            {/* 3-Step Action Plan */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: "#f8fafc",
                  margin: "0 0 16px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2 color="#10b981" /> 3-Step Action Plan
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      color: "#a855f7",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                    }}
                  >
                    01
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "#f8fafc",
                        margin: "0 0 6px 0",
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    >
                      Build
                    </h4>
                    <p
                      style={{
                        color: "#94a3b8",
                        margin: 0,
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {blueprint.actionPlanPhase1}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      color: "#3b82f6",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                    }}
                  >
                    02
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "#f8fafc",
                        margin: "0 0 6px 0",
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    >
                      Traffic
                    </h4>
                    <p
                      style={{
                        color: "#94a3b8",
                        margin: 0,
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {blueprint.actionPlanPhase2}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    background: "rgba(255,255,255,0.03)",
                    padding: "16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      color: "#10b981",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                    }}
                  >
                    03
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "#f8fafc",
                        margin: "0 0 6px 0",
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    >
                      Scale
                    </h4>
                    <p
                      style={{
                        color: "#94a3b8",
                        margin: 0,
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {blueprint.actionPlanPhase3}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "auto",
              }}
            >
              <button
                type="button"
                onClick={() => setStep("chat")}
                style={{
                  width: "100%",
                  padding: "20px",
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
                  borderRadius: "20px",
                  fontWeight: 900,
                  fontSize: "1.125rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 10px 25px -5px rgba(248, 250, 252, 0.2)",
                  transition: "transform 0.1s",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.97)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <MessageSquare size={20} fill="#0f172a" /> Start Executing with
                AI
              </button>
              <button
                type="button"
                onClick={resetApp}
                style={{
                  width: "100%",
                  padding: "16px",
                  backgroundColor: "transparent",
                  color: "#64748b",
                  borderRadius: "20px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Nah, scan another profile
              </button>
            </div>
          </div>
        )}

        {/* Step 4: iMessage Style AI Chat */}
        {step === "chat" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f8fafc",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                zIndex: 20,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "900",
                      fontSize: "1.2rem",
                      boxShadow: "0 4px 10px rgba(168,85,247,0.3)",
                    }}
                  >
                    AI
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#10b981",
                      border: "2px solid white",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Hype Wingman
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 600,
                    }}
                  >
                    CEO Era Co-founder
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep("result")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                View Plan
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                backgroundColor: "#f1f5f9",
              }}
            >
              <div style={{ textAlign: "center", margin: "8px 0 16px 0" }}>
                <span
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    color: "#64748b",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  Today, Action Mode Active
                </span>
              </div>
              {messages.map((msg, idx) => (
                <div
                  key={`msg-${idx}`}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "75%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 18px",
                      borderRadius: "22px",
                      backgroundColor:
                        msg.role === "user" ? "#3b82f6" : "#e2e8f0",
                      color: msg.role === "user" ? "#ffffff" : "#0f172a",
                      borderBottomRightRadius:
                        msg.role === "user" ? "4px" : "22px",
                      borderBottomLeftRadius:
                        msg.role === "user" ? "22px" : "4px",
                      fontSize: "1rem",
                      lineHeight: 1.4,
                      fontWeight: 500,
                      boxShadow:
                        msg.role === "user"
                          ? "0 4px 12px rgba(59,130,246,0.3)"
                          : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#94a3b8",
                      marginTop: "4px",
                      fontWeight: 600,
                      padding: "0 4px",
                    }}
                  >
                    {msg.role === "user" ? "Read" : ""}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "14px 20px",
                    borderRadius: "22px",
                    backgroundColor: "#e2e8f0",
                    borderBottomLeftRadius: "4px",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <span className="dot-typing" style={{ animationDelay: "0s" }}>
                    ●
                  </span>
                  <span
                    className="dot-typing"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ●
                  </span>
                  <span
                    className="dot-typing"
                    style={{ animationDelay: "0.4s" }}
                  >
                    ●
                  </span>
                </div>
              )}
              <div ref={chatEndRef} style={{ height: "1px" }} />
            </div>

            <div
              style={{
                padding: "16px 20px",
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                borderTop: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about Phase 1..."
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  color: "#0f172a",
                  borderRadius: "999px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#cbd5e1")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor:
                    isTyping || !inputMessage.trim() ? "#cbd5e1" : "#3b82f6",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  boxShadow:
                    isTyping || !inputMessage.trim()
                      ? "none"
                      : "0 4px 10px rgba(59,130,246,0.3)",
                }}
              >
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .dot-typing {
          color: #94a3b8;
          font-size: 10px;
          animation: blink 1.4s infinite both;
        }
        @keyframes blink {
          0% { opacity: 0.2; transform: scale(0.8); }
          20% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(0.8); }
        }
      `,
        }}
      />
    </div>
  );
}
