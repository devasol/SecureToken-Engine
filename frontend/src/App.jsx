import { useState } from "react";

const SECURITY_LEVELS = [
  {
    id: "low",
    name: "Basic",
    length: 16,
    color: "from-blue-500 to-cyan-400",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    id: "med",
    name: "Pro",
    length: 48,
    color: "from-indigo-500 to-purple-500",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "high",
    name: "Ultra",
    length: 128,
    color: "from-cyan-500 to-blue-600",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a9.994 9.994 0 009-5.122m-8.914.493L12 15m0 0l-1.543 4.414c-.053.151-.115.3-.186.446m3.914-4.493L12 15m0 0L9.457 19.457M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 0V4m0 0a1.5 1.5 0 00-3 0V6m3 0V4" />
      </svg>
    ),
  },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/devasol",
    color: "hover:text-cyan-400",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dawit-solomon-t/",
    color: "hover:text-blue-400",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:dawit8908@gmail.com",
    color: "hover:text-purple-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [level, setLevel] = useState(SECURITY_LEVELS[1]);
  const [length, setLength] = useState(48);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const [verifyToken, setVerifyToken] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(null); 
  const [verifying, setVerifying] = useState(false);

  const handleLevelSelect = (newLevel) => {
    setLevel(newLevel);
    setLength(newLevel.length);
  };

  const generateToken = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/generate-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxLength: length, securityTier: level.name }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setToken(data.data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verifyToken) return;
    setVerifying(true);
    setVerifyStatus(null);
    try {
      const response = await fetch(`${API_URL}/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verifyToken }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setVerifyStatus({
          valid: data.data.isValid,
          message: data.data.message,
          metadata: data.data.metadata
        });
      }
    } catch (err) {
      setVerifyStatus({ valid: false, message: "Connection Error. Failed to verify." });
    } finally {
      setVerifying(false);
    }
  };

  const copyToClipboard = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const JsonBlock = ({ title, data, color, keyColor }) => (
    <div className="space-y-3">
      <h3 className={`text-[10px] font-black uppercase tracking-[0.25em] ${color}`}>{title}</h3>
      <div className="bg-black/80 border border-white/20 rounded-xl p-4 md:p-6 font-mono text-[11px] md:text-xs leading-relaxed overflow-x-auto shadow-inner relative group/json">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
        <pre className="text-neutral-300 relative z-10">
          {Object.entries(data).map(([key, val], i) => (
            <div key={key}>
              <span className={keyColor}>"{key}"</span>:{" "}
              <span className="text-white font-bold">
                {typeof val === "string" ? `"${val}"` : val}
                {i < Object.entries(data).length - 1 ? "," : ""}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen lg:h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-dot-grid opacity-30"></div>

      {/* Main Hub Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8 lg:max-h-[85vh]">
        
        {/* Generator Window */}
        <div className="w-full flex-1 glass-morphism rounded-[3rem] p-8 md:p-10 transition-all duration-700 flex flex-col shadow-2xl overflow-hidden border-white/10">
          <div className="flex-1 flex flex-col space-y-8">
            <div className="text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                Token Engine
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter gradient-text leading-tight">Generate</h1>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {SECURITY_LEVELS.map((tier) => (
                    <button
                        key={tier.id}
                        onClick={() => handleLevelSelect(tier)}
                        className={`flex flex-col items-center justify-center gap-3 py-5 px-3 rounded-[2rem] transition-all duration-500 border ${
                            level.id === tier.id 
                            ? "bg-white/20 border-white/50 text-white shadow-[0_15px_30px_rgba(0,0,0,0.3)] scale-[1.05]" 
                            : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                        }`}
                    >
                        <div className={`p-2.5 rounded-xl ${level.id === tier.id ? `bg-gradient-to-br ${tier.color} shadow-lg shadow-cyan-500/20` : "bg-neutral-800 border border-white/10"}`}>
                            {tier.icon}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${level.id === tier.id ? "text-white" : "text-neutral-400"}`}>{tier.name}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-8 bg-black/40 rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-inner">
               <div className="flex justify-between items-end border-b border-white/10 pb-5">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em]">Entropy Density</span>
                  <span className="font-mono text-lg font-black text-cyan-400 shadow-cyan-400/20 drop-shadow-sm">
                      {length}<span className="text-[10px] text-neutral-500 ml-1">BYTES</span>
                  </span>
               </div>
               <input
                  type="range"
                  min="8"
                  max="256"
                  step="4"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
                />

              <button
                onClick={generateToken}
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 ${
                  loading
                    ? "bg-neutral-800 text-neutral-500 border border-white/5"
                    : "bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.01]"
                }`}
              >
                {loading ? "Decrypting Matrix..." : "Execute Generation"}
              </button>
            </div>

            <div className="relative group/token">
              <div 
                onClick={copyToClipboard}
                className={`transition-all duration-700 rounded-[2.5rem] border cursor-pointer ${
                  token ? "bg-black/95 border-cyan-500/40 min-h-[140px] shadow-2xl border-solid" : "bg-white/[0.02] border-white/10 border-dashed min-h-[120px]"
                } p-8 flex items-center justify-center relative overflow-hidden`}
              >
                {token ? (
                    <p className="text-xs md:text-sm font-mono text-white/90 break-all text-center leading-relaxed select-none font-bold max-w-[90%] tracking-tight">
                        {token}
                    </p>
                ) : (
                    <div className="flex flex-col items-center gap-2 opacity-30">
                        <div className="h-2 w-12 bg-white/20 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Standby</span>
                    </div>
                )}
                {token && (
                   <div className="absolute top-5 right-7 text-[9px] font-black text-cyan-400 opacity-60 group-hover/token:opacity-100 transition-opacity uppercase tracking-widest bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-500/20 backdrop-blur-md">Copy</div>
                )}
              </div>
              {copied && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black px-6 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(34,197,94,0.6)] animate-in fade-in zoom-in duration-500">Copied</div>
              )}
            </div>
          </div>
          <p className="text-[10px] font-black text-cyan-400/40 uppercase tracking-[0.4em] mt-8 text-center border-t border-white/5 pt-6">Industrial Standard v4.2</p>
        </div>

        {/* Verifier Window */}
        <div className="w-full flex-[1.4] glass-morphism rounded-[3rem] p-8 md:p-10 transition-all duration-700 flex flex-col shadow-2xl border-white/10 overflow-hidden">
             <div className="flex-1 flex flex-col space-y-8">
                <div className="text-left space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
                        Cloud Validator
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">Verify</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 overflow-hidden">
                    {/* Left: Input */}
                    <div className="space-y-6 flex flex-col h-full overflow-hidden">
                        <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                             <div className="flex justify-between items-center text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">
                                <span>Input Payload</span>
                                {verifyStatus && (
                                    <div className="flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${verifyStatus.valid ? "bg-green-500" : "bg-red-500"}`}></span>
                                        <span className={(verifyStatus.valid ? "text-green-400" : "text-red-400") + " font-black tracking-widest text-[9px]"}>
                                            {verifyStatus.valid ? "SUCCESS" : "FAILED"}
                                        </span>
                                    </div>
                                )}
                             </div>
                             <textarea
                                value={verifyToken}
                                onChange={(e) => setVerifyToken(e.target.value)}
                                className={`w-full h-40 md:h-56 bg-black/60 border rounded-[2rem] p-7 md:p-8 font-mono text-xs md:text-sm outline-none transition-all resize-none placeholder:text-white/10 shadow-inner ${
                                    verifyStatus?.valid ? "border-green-500/40 text-green-300 shadow-[0_0_40px_rgba(34,197,94,0.1)]" : "border-white/10 text-white/80"
                                } focus:border-purple-500/40 custom-scrollbar`}
                                placeholder="Paste encrypted stream..."
                            />
                        </div>

                        {/* Intelligence Hub */}
                        <div className="flex flex-col gap-6 p-6 md:p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 shadow-xl relative overflow-hidden group/intel">
                            <div className="absolute -top-4 -right-4 h-24 w-24 opacity-[0.03] group-hover/intel:opacity-[0.06] transition-opacity">
                                <svg className="h-full w-full text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
                            </div>
                            
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.4em]">Intelligence Node</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[9px] font-bold text-green-400/80 uppercase tracking-widest">Live Link</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-cyan-400 font-mono tracking-tighter">
                                        {verifyToken ? (verifyToken.length * 4) : 0}<span className="text-[8px] text-neutral-500 ml-1">B-SEC</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="space-y-2.5 p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Entropy</span>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${!verifyToken ? 'text-neutral-700' : 'text-white'}`}>
                                        {!verifyToken ? "Link Idle" : (verifyToken.length > 64 ? "Extreme" : "Compliant")}
                                    </p>
                                </div>
                                <div className="space-y-2.5 p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Integrity</span>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${!verifyToken ? 'text-neutral-700' : 'text-white'}`}>
                                        {!verifyToken ? "Pending" : (verifyToken.length > 32 ? "High-Tier" : "Low-Tier")}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 mt-1 relative z-10">
                                <div className="flex justify-between text-[8px] font-black text-white/30 uppercase tracking-[0.25em]">
                                    <span>Sync Strength</span>
                                    <span>{verifyToken ? Math.min(100, (verifyToken.length / 128) * 100).toFixed(0) : 0}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                                        style={{ width: `${verifyToken ? Math.min(100, (verifyToken.length / 128) * 100) : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={verifying || !verifyToken}
                            className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] transition-all duration-500 active:scale-[0.98] ${
                                verifying || !verifyToken
                                ? "bg-neutral-800/50 text-neutral-600 border border-white/5"
                                : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_20px_40px_rgba(147,51,234,0.3)] hover:scale-[1.01]"
                            }`}
                        >
                            {verifying ? "Tunneling Connection..." : "Validate Signature"}
                        </button>
                    </div>

                    {/* Right: Decoded Data */}
                    <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar flex-1 pb-4">
                        {verifyStatus?.valid && verifyStatus.metadata ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-12 duration-1000">
                                <JsonBlock 
                                    title="Protocol Header" 
                                    data={verifyStatus.metadata.header} 
                                    color="text-red-400/80" 
                                    keyColor="text-red-400"
                                />
                                <JsonBlock 
                                    title="Identity Payload" 
                                    data={verifyStatus.metadata.payload} 
                                    color="text-purple-300/80" 
                                    keyColor="text-purple-300"
                                />
                                
                                <div className="p-6 rounded-[2rem] bg-green-500/10 border border-green-500/30 flex items-center gap-5 shadow-2xl relative overflow-hidden group/success">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/[0.02] to-transparent"></div>
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 text-black shadow-[0_0_25px_rgba(34,197,94,0.5)] relative z-10">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-[11px] text-green-400 font-black uppercase tracking-[0.3em]">Signature Match</p>
                                        <p className="text-[9px] text-green-600 font-bold uppercase tracking-[0.2em] mt-1">Protocol Execution Secure</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] opacity-30 text-center p-12 group/wait">
                                <div className="mb-6 transform group-hover/wait:scale-110 transition-transform duration-700">
                                    <svg className="w-16 h-16 mx-auto text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                </div>
                                <span className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em] leading-loose">
                                    System Awaiting<br/>
                                    Inbound Data<br/>
                                    Stream
                                </span>
                            </div>
                        )}
                    </div>
                </div>
             </div>
             <p className="text-[10px] font-bold text-purple-400/40 uppercase tracking-[0.4em] mt-8 text-center border-t border-white/5 pt-6 invisible lg:visible opacity-100">Verification Standard v4.2.0</p>
        </div>
      </div>

      {/* Shared Social Footer */}
      <footer className="relative z-10 mt-16 py-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-12">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white/40 transition-all duration-500 hover:text-white hover:scale-150 ${link.color} relative group/social`}
                title={link.name}
              >
                <div className="absolute -inset-4 bg-white/0 group-hover/social:bg-white/5 rounded-full blur-xl transition-all duration-500"></div>
                <span className="relative z-10">{link.icon}</span>
              </a>
            ))}
          </div>
          <div className="text-center space-y-2">
             <p className="text-[12px] font-black uppercase tracking-[0.6em] text-white/30">
                Designed & Engineered by <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">Dawit Solomon</span>
             </p>
             <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
