import { useState } from "react";
import "./App.css";

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

function App() {
  const [level, setLevel] = useState(SECURITY_LEVELS[1]);
  const [length, setLength] = useState(48);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

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
        body: JSON.stringify({ maxLength: length }),
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

  const copyToClipboard = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-dot-grid opacity-20"></div>

      <div className="relative z-10 w-full max-w-xl glass-morphism rounded-[2rem] p-6 md:p-10 transition-all duration-700">
        <div className="space-y-6">
          {/* Header - More Compact */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold uppercase tracking-[0.15em] text-cyan-400">
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></span>
              Secure Engine
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight gradient-text">
              TokenGen
            </h1>
          </div>

          {/* Compact Security Selector */}
          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Security Tier</span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{level.name} Mode</span>
             </div>
             <div className="grid grid-cols-3 gap-2">
              {SECURITY_LEVELS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleLevelSelect(tier)}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl transition-all duration-300 border ${
                    level.id === tier.id 
                    ? "bg-white/10 border-white/20 text-white shadow-lg" 
                    : "bg-white/[0.02] border-white/5 text-neutral-500 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${level.id === tier.id ? `bg-gradient-to-br ${tier.color}` : "bg-neutral-800"} transition-colors`}>
                    {tier.icon}
                  </div>
                  <span className="text-xs font-bold hidden md:inline">{tier.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Simple Slider & Generate */}
          <div className="space-y-4">
             <div className="flex justify-between items-end px-1">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Length</span>
                <span className="font-mono text-sm font-bold text-white bg-white/5 px-2 py-0.5 rounded-lg border border-white/10">
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
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
              />

            <button
              onClick={generateToken}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 ${
                loading
                  ? "bg-neutral-800 text-neutral-600"
                  : "bg-white text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Token
                </div>
              )}
            </button>
          </div>

          {/* Compact Result Area */}
          <div className="relative group">
            <div className={`transition-all duration-500 rounded-2xl border ${
                token ? "bg-black/60 border-cyan-500/30 min-h-[100px]" : "bg-white/[0.02] border-white/5 min-h-[80px]"
              } p-6 flex items-center justify-center relative overflow-hidden`}>
              
              {token ? (
                <p className="text-xs font-mono text-cyan-400 break-all text-center leading-relaxed max-w-[90%]">
                  {token}
                </p>
              ) : (
                <span className="text-neutral-700 text-[10px] font-bold uppercase tracking-widest">
                  Ready to output
                </span>
              )}

              {token && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            
            {copied && (
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                    <span className="text-[8px] font-black text-green-400 uppercase tracking-[0.2em] animate-pulse">Copied to Clipboard</span>
                </div>
            )}
          </div>

          {/* Minimal Footer */}
          <div className="pt-4 flex items-center justify-center gap-6 opacity-40">
            <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">AES-256 Ready</p>
            <div className="w-1 h-1 rounded-full bg-neutral-700"></div>
            <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Node.js Crypto</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
