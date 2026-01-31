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
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dawit-solomon-t/",
    color: "hover:text-blue-400",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:dawit8908@gmail.com",
    color: "hover:text-purple-400",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

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
      const response = await fetch("http://localhost:5000/generate-token", {
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
      const response = await fetch("http://localhost:5000/verify-token", {
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
    <div className="space-y-1.5">
      <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${color}`}>{title}</h3>
      <div className="bg-black/80 border border-white/20 rounded-xl p-4 font-mono text-[10px] leading-relaxed overflow-x-auto shadow-inner">
        <pre className="text-neutral-300">
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
    <div className="relative h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-dot-grid opacity-30"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:max-h-[85vh]">
        
        {/* Generator Window */}
        <div className="flex-1 glass-morphism rounded-[2.5rem] p-6 md:p-8 transition-all duration-700 flex flex-col justify-between overflow-hidden">
          <div className="space-y-5">
            <div className="text-left space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                Token Engine
              </div>
              <h1 className="text-4xl font-black tracking-tighter gradient-text leading-none">Generate</h1>
            </div>

            <div className="flex flex-col gap-3">
               <div className="grid grid-cols-3 gap-3">
                {SECURITY_LEVELS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => handleLevelSelect(tier)}
                    className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-2xl transition-all duration-300 border ${
                      level.id === tier.id 
                      ? "bg-white/20 border-white/40 text-white shadow-lg scale-[1.02]" 
                      : "bg-white/[0.05] border-white/10 text-neutral-300 hover:bg-white/[0.1] hover:border-white/20"
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl ${level.id === tier.id ? `bg-gradient-to-br ${tier.color}` : "bg-neutral-800 border border-white/10"}`}>
                      {tier.icon}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${level.id === tier.id ? "text-white" : "text-neutral-200"}`}>{tier.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5 bg-black/40 rounded-[2rem] p-6 border border-white/15 shadow-inner">
               <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-[9px] font-black text-neutral-200 uppercase tracking-[0.2em]">Entropy</span>
                  <span className="font-mono text-sm font-black text-cyan-400">
                      {length}<span className="text-[9px] text-neutral-300 ml-1">BYTES</span>
                  </span>
               </div>
               <input
                  type="range"
                  min="8"
                  max="256"
                  step="4"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-cyan-400"
                />

              <button
                onClick={generateToken}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 ${
                  loading
                    ? "bg-neutral-800 text-neutral-400"
                    : "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                }`}
              >
                {loading ? "Processing..." : "Execute Generation"}
              </button>
            </div>

            <div className="relative group">
              <div 
                onClick={copyToClipboard}
                className={`transition-all duration-500 rounded-3xl border cursor-pointer border-dashed ${
                  token ? "bg-black/95 border-cyan-500/50 min-h-[120px] shadow-2xl" : "bg-white/[0.03] border-white/20 min-h-[100px]"
                } p-8 flex items-center justify-center relative overflow-hidden`}
              >
                {token ? (
                  <p className="text-xs font-mono text-white break-all text-center leading-relaxed select-none font-bold max-w-[90%]">
                    {token}
                  </p>
                ) : (
                  <span className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.3em]">Ready</span>
                )}
                {token && (
                   <div className="absolute top-3 right-5 text-[8px] font-black text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-widest bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">Copy</div>
                )}
              </div>
              {copied && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.5)]">Copied</div>
              )}
            </div>
          </div>
          <p className="text-[9px] font-black text-cyan-400/80 uppercase tracking-widest mt-6 text-center">Industrial Standard v4.2</p>
        </div>

        {/* Verifier Window */}
        <div className="flex-[1.4] glass-morphism rounded-[2.5rem] p-6 md:p-8 transition-all duration-700 flex flex-col border-white/10 overflow-hidden">
             <div className="space-y-5 h-full flex flex-col">
                <div className="text-left space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[9px] font-black uppercase tracking-[0.2em] text-purple-300">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
                        Validator
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white leading-none">Verify</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden">
                    {/* Left: Input */}
                    <div className="space-y-4 flex flex-col h-full overflow-hidden">
                        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                             <div className="flex justify-between items-center text-[9px] font-black text-neutral-300 uppercase tracking-[0.2em]">
                                <span>Input</span>
                                {verifyStatus && (
                                    <span className={verifyStatus.valid ? "text-green-400" : "text-red-400" font-bold}>
                                        {verifyStatus.valid ? "• Verified" : "• Invalid"}
                                    </span>
                                )}
                             </div>
                             <textarea
                                value={verifyToken}
                                onChange={(e) => setVerifyToken(e.target.value)}
                                className={`w-full flex-1 bg-black/80 border rounded-2xl p-6 font-mono text-xs outline-none transition-all resize-none placeholder:text-neutral-600 ${
                                    verifyStatus?.valid ? "border-green-500/50 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.1)]" : "border-white/20 text-white"
                                } focus:border-purple-500/50`}
                                placeholder="Paste token..."
                            />
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={verifying || !verifyToken}
                            className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.98] ${
                                verifying || !verifyToken
                                ? "bg-neutral-800/80 text-neutral-400"
                                : "bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-900/40"
                            }`}
                        >
                            {verifying ? "Searching..." : "Validate Signature"}
                        </button>
                    </div>

                    {/* Right: Decoded Data */}
                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                        {verifyStatus?.valid && verifyStatus.metadata ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <JsonBlock 
                                    title="Header" 
                                    data={verifyStatus.metadata.header} 
                                    color="text-red-400" 
                                    keyColor="text-red-400"
                                />
                                <JsonBlock 
                                    title="Payload" 
                                    data={verifyStatus.metadata.payload} 
                                    color="text-purple-300" 
                                    keyColor="text-purple-300"
                                />
                                
                                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center gap-3">
                                    <div className="h-6 w-6 flex items-center justify-center rounded-full bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <p className="text-[9px] text-green-300 font-black uppercase tracking-[0.2em]">Signature Match</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2.5rem] opacity-40 text-center p-8">
                                <span className="text-[9px] font-black text-neutral-200 uppercase tracking-[0.3em]">Awaiting Data</span>
                            </div>
                        )}
                    </div>
                </div>
             </div>
             <p className="text-[9px] font-bold text-purple-400/80 uppercase tracking-widest mt-6 text-center invisible lg:visible opacity-100">Verification Standard v4.2</p>
        </div>
      </div>

      {/* Shared Social Footer */}
      <footer className="relative z-10 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-neutral-300 transition-all duration-300 hover:scale-125 ${link.color}`}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
            Designed & Engineered by <span className="text-cyan-400">Dawit Solomon</span>
          </p>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
      `}} />
    </div>
  );
}

export default App;
