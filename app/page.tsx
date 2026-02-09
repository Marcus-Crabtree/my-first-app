"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Animated Grid Background - BIG GRID extending to horizon */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.8) 25%, rgba(34, 211, 238, 0.8) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.8) 75%, rgba(34, 211, 238, 0.8) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(34, 211, 238, 0.8) 25%, rgba(34, 211, 238, 0.8) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.8) 75%, rgba(34, 211, 238, 0.8) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '200px 200px',
          backgroundPosition: '0 0',
          animation: 'gridMove 15s linear infinite',
          transform: 'perspective(800px) rotateX(75deg)',
          transformOrigin: 'center center'
        }}
      />

      {/* Horizon Line - Curved to look more natural */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80 shadow-[0_0_20px_rgba(34,211,238,1)]"
        style={{
          width: '200%',
          borderRadius: '50%',
          transform: 'translateX(-50%) translateY(0px)',
          clipPath: 'inset(0 25% 0 25%)'
        }}
      />

      {/* Tokyo-Style City Skyline - Buildings spanning entire width with depth */}
      <div className="absolute top-1/2 left-0 right-0 h-96 flex items-end justify-start gap-0 -translate-y-full z-10" style={{perspective: '1000px'}}>
        {/* Building 1 - Short */}
        <div className="w-20 h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black border-r-2 border-cyan-800 relative shadow-[8px_0_20px_rgba(0,0,0,0.9),-2px_0_10px_rgba(6,182,212,0.3)]">
          {/* Neon edge light */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-60"></div>
          {/* Window lights */}
          <div className="absolute top-6 left-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-14 left-4 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-30 left-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-6 right-4 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-14 right-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-22 right-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.3s'}}></div>
          {/* Neon antenna on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 2 - Medium */}
        <div className="w-24 h-64 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-18 left-5 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-28 left-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-38 left-5 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-48 left-5 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-58 left-5 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-8 right-5 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-18 right-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-28 right-5 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-38 right-5 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.9s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/3 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
          <div className="absolute -top-4 right-1/3 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Building 3 - SUPER TALL (Tokyo Skytree-like) with MAXIMUM DEPTH */}
        <div className="w-32 h-96 bg-gradient-to-br from-gray-700 via-gray-900 to-black border-r-4 border-cyan-700 relative shadow-[12px_0_40px_rgba(0,0,0,1),-4px_0_20px_rgba(6,182,212,0.5)]">
          {/* Neon top light */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
          {/* Vertical neon strips */}
          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-cyan-600 to-transparent opacity-70 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-cyan-500 via-cyan-700 to-transparent opacity-60 shadow-[0_0_10px_rgba(34,211,238,0.7)]"></div>
          {/* Right edge glow */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent opacity-80"></div>
          {/* Window lights with enhanced glow */}
          <div className="absolute top-10 left-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-22 left-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-34 left-6 w-3 h-3 bg-orange-300 animate-twinkle shadow-[0_0_12px_rgba(253,186,116,1)]" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-46 left-6 w-3 h-3 bg-yellow-300 animate-twinkle shadow-[0_0_12px_rgba(253,224,71,1)]" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-58 left-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-70 left-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-82 left-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-10 right-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-22 right-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-34 right-6 w-3 h-3 bg-yellow-300 animate-twinkle shadow-[0_0_12px_rgba(253,224,71,1)]" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-46 right-6 w-3 h-3 bg-orange-400 animate-twinkle shadow-[0_0_12px_rgba(251,146,60,1)]" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-58 right-6 w-3 h-3 bg-yellow-400 animate-twinkle shadow-[0_0_12px_rgba(250,204,21,1)]" style={{animationDelay: '2.3s'}}></div>
          <div className="absolute top-70 right-6 w-3 h-3 bg-orange-300 animate-twinkle shadow-[0_0_12px_rgba(253,186,116,1)]" style={{animationDelay: '0.6s'}}></div>
          {/* Tall antenna with pulsing lights */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_30px_rgba(34,211,238,1)] animate-pulse"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Building 4 - Medium */}
        <div className="w-22 h-56 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-48 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-18 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-28 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 5 - Tall */}
        <div className="w-28 h-72 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-22 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle shadow-[0_0_10px_rgba(253,224,71,0.8)]" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-34 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle shadow-[0_0_10px_rgba(253,186,116,0.8)]" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-46 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle shadow-[0_0_10px_rgba(250,204,21,0.8)]" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-58 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-10 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle shadow-[0_0_10px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-22 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-34 right-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle shadow-[0_0_10px_rgba(253,224,71,0.8)]" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-46 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle shadow-[0_0_10px_rgba(251,146,60,0.8)]" style={{animationDelay: '2.2s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 6 - Short */}
        <div className="w-18 h-44 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-6 left-3 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-14 left-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-22 left-3 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-30 left-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-38 left-3 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-6 right-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 7 - Medium-Tall */}
        <div className="w-24 h-68 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-20 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-30 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-40 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-50 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-60 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-20 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-30 right-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          {/* Medium antenna */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 8 - Short */}
        <div className="w-20 h-52 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 animate-twinkle shadow-[0_0_8px_rgba(253,224,71,0.8)]" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle shadow-[0_0_8px_rgba(253,186,116,0.8)]" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-orange-400 animate-twinkle shadow-[0_0_8px_rgba(251,146,60,0.8)]" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-18 right-4 w-2 h-2 bg-yellow-400 animate-twinkle shadow-[0_0_8px_rgba(250,204,21,0.8)]" style={{animationDelay: '0.7s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 9 - Medium */}
        <div className="w-24 h-60 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-22 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 10 - Tall */}
        <div className="w-26 h-76 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-12 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-26 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-54 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-68 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-12 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-26 right-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-1 h-7 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 11 - Short */}
        <div className="w-18 h-46 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-3 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-18 left-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-28 left-3 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-38 left-3 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-8 right-3 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.2s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 12 - Very Tall */}
        <div className="w-30 h-88 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-12 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-26 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-40 left-6 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-54 left-6 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-68 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-82 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-12 right-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-26 right-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          {/* Very tall antenna */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_30px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 13 - Medium */}
        <div className="w-22 h-58 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 14 - Short */}
        <div className="w-20 h-50 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 15 - Tall */}
        <div className="w-26 h-70 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-12 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-26 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          <div className="absolute top-54 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-12 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-26 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          {/* Medium antenna */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 16 - Medium */}
        <div className="w-24 h-62 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 17 - Short */}
        <div className="w-22 h-48 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 18 - Tall */}
        <div className="w-28 h-74 bg-gray-900 border border-cyan-900 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="absolute top-10 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-24 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-38 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-52 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-66 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-10 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-24 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 19 - Medium */}
        <div className="w-24 h-58 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.3s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 20 - Very Tall */}
        <div className="w-32 h-92 bg-gray-900 border-2 border-cyan-900 relative shadow-[0_0_40px_rgba(0,0,0,0.9)]">
          <div className="absolute top-12 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-26 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-40 left-6 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-54 left-6 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-68 left-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-82 left-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-12 right-6 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-26 right-6 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-40 right-6 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          {/* Super tall antenna */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-1 h-9 bg-gradient-to-t from-cyan-700 to-cyan-300 shadow-[0_0_25px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-11 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-200 rounded-full shadow-[0_0_35px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 21 - Short */}
        <div className="w-20 h-46 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-6 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-16 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-26 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-36 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-6 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 22 - Medium-Tall */}
        <div className="w-26 h-66 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-24 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-38 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.6s'}}></div>
          <div className="absolute top-52 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-10 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          {/* Medium antenna */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 23 - Medium */}
        <div className="w-24 h-56 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-10 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-22 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-34 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-46 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.9s'}}></div>
          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 24 - Tall */}
        <div className="w-28 h-80 bg-gray-900 border border-cyan-900 relative shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          <div className="absolute top-12 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-26 left-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-40 left-5 w-2.5 h-2.5 bg-yellow-300 animate-twinkle" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-54 left-5 w-2.5 h-2.5 bg-orange-300 animate-twinkle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute top-68 left-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-12 right-5 w-2.5 h-2.5 bg-orange-400 animate-twinkle" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-26 right-5 w-2.5 h-2.5 bg-yellow-400 animate-twinkle" style={{animationDelay: '2.3s'}}></div>
          {/* Tall antenna */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-1 h-7 bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>

        {/* Building 25 - Short */}
        <div className="w-22 h-50 bg-gray-900 border border-cyan-900 relative">
          <div className="absolute top-8 left-4 w-2 h-2 bg-yellow-300 animate-twinkle" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-18 left-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-28 left-4 w-2 h-2 bg-yellow-400 animate-twinkle" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-38 left-4 w-2 h-2 bg-orange-300 animate-twinkle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute top-8 right-4 w-2 h-2 bg-orange-400 animate-twinkle" style={{animationDelay: '1.1s'}}></div>
          {/* Small antenna */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>
        </div>
      </div>

      {/* Shooting Stars - Behind buildings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stars from left and center */}
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar1" style={{top: '-5%', left: '20%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar2" style={{top: '-5%', left: '50%'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar3" style={{top: '-5%', left: '35%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar4" style={{top: '-5%', left: '65%'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar5" style={{top: '-5%', left: '10%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-200 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar6" style={{top: '-5%', left: '80%'}}></div>
        {/* Stars from right side */}
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar7" style={{top: '-5%', left: '90%'}}></div>
        <div className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,1)] animate-shootingStar8" style={{top: '-5%', left: '95%'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-shootingStar9" style={{top: '-5%', left: '85%'}}></div>
      </div>

      {/* Content */}
      <div className="text-center space-y-8 p-8 z-10 relative">
        {/* Main heading with TRON glow effect */}
        <h1 className="text-6xl font-bold text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.9)]">
          HELLO WORLD
        </h1>

        {/* Subheading */}
        <h2 className="text-3xl text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.7)]">
          Welcome to the Grid
        </h2>

        {/* Description text */}
        <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
          Racing through the digital frontier on a light cycle!
        </p>

        {/* Glowing border box */}
        <div className="border-2 border-cyan-400 p-6 mt-8 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
          <p className="text-cyan-100 text-lg">
            The grid is moving beneath you!
          </p>
        </div>
      </div>

      {/* CSS Animations - Grid movement, twinkling lights, and building depth */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 200px;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        /* Shooting Stars Animations - Coming from top, streaking down and to the left */
        @keyframes shootingStar1 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-80vw, 45vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar2 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-70vw, 40vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar3 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-75vw, 42vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar4 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-65vw, 38vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar5 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-85vw, 48vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar6 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-60vw, 35vh) rotate(135deg);
            opacity: 0;
          }
        }

        .animate-shootingStar1 {
          animation: shootingStar1 3s linear infinite;
          animation-delay: 0s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar2 {
          animation: shootingStar2 2.5s linear infinite;
          animation-delay: 1.5s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar3 {
          animation: shootingStar3 3.2s linear infinite;
          animation-delay: 0.8s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar4 {
          animation: shootingStar4 2.8s linear infinite;
          animation-delay: 2.2s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar5 {
          animation: shootingStar5 3.5s linear infinite;
          animation-delay: 0.3s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar6 {
          animation: shootingStar6 2.7s linear infinite;
          animation-delay: 1.8s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        /* Additional shooting stars from the right */
        @keyframes shootingStar7 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-90vw, 50vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar8 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-95vw, 48vh) rotate(135deg);
            opacity: 0;
          }
        }

        @keyframes shootingStar9 {
          0% {
            transform: translate(0, 0) rotate(135deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-85vw, 46vh) rotate(135deg);
            opacity: 0;
          }
        }

        .animate-shootingStar7 {
          animation: shootingStar7 3.3s linear infinite;
          animation-delay: 0.5s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar8 {
          animation: shootingStar8 2.9s linear infinite;
          animation-delay: 2s;
          box-shadow: 0 0 8px rgba(34, 211, 238, 1), 20px -20px 15px rgba(34, 211, 238, 0.5), 40px -40px 8px rgba(34, 211, 238, 0.2);
        }

        .animate-shootingStar9 {
          animation: shootingStar9 3.1s linear infinite;
          animation-delay: 1.2s;
          box-shadow: 0 0 10px rgba(34, 211, 238, 1), 30px -30px 20px rgba(34, 211, 238, 0.5), 60px -60px 10px rgba(34, 211, 238, 0.2);
        }

        /* Add architectural floor lines to make buildings look realistic */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2)) {
          background-image:
            /* Horizontal floor lines */
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 18px,
              rgba(55, 65, 81, 0.5) 18px,
              rgba(55, 65, 81, 0.5) 20px
            ),
            /* Vertical column lines for depth */
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 18px,
              rgba(31, 41, 55, 0.3) 18px,
              rgba(31, 41, 55, 0.3) 19px
            ),
            /* Main gradient */
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.3) 100%),
            linear-gradient(135deg, #4b5563 0%, #374151 20%, #1f2937 60%, #000000 100%) !important;
        }

        /* MASSIVE 3D DEPTH for all buildings - 200% more! */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2)) {
          background:
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.3) 100%),
            linear-gradient(135deg, #4b5563 0%, #374151 20%, #1f2937 60%, #000000 100%) !important;
          box-shadow:
            /* Main depth shadow - much stronger */
            15px 0 50px rgba(0, 0, 0, 1),
            10px 0 30px rgba(0, 0, 0, 0.9),
            /* Cyan atmospheric glow on left */
            -4px 0 25px rgba(6, 182, 212, 0.5),
            -8px 0 40px rgba(6, 182, 212, 0.3),
            /* Inner shadows for dimension */
            inset -4px 0 20px rgba(6, 182, 212, 0.3),
            inset 4px 0 15px rgba(0, 0, 0, 0.5) !important;
          border-right: 3px solid rgba(34, 211, 238, 0.8) !important;
          border-left: 1px solid rgba(107, 114, 128, 0.3) !important;
          position: relative;
          transform: perspective(1000px) rotateY(-1deg);
        }

        /* Top neon strip with stronger glow */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2))::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(34, 211, 238, 0.3) 20%,
            rgba(34, 211, 238, 1) 50%,
            rgba(34, 211, 238, 0.3) 80%,
            transparent 100%);
          box-shadow:
            0 0 15px rgba(34, 211, 238, 1),
            0 0 30px rgba(34, 211, 238, 0.5);
        }

        /* Enhanced right edge glow with floor lines */
        div[class*="bg-gray-900"]:not(:has(p)):not(:has(h1)):not(:has(h2))::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background:
            repeating-linear-gradient(
              180deg,
              rgba(34, 211, 238, 1) 0%,
              rgba(34, 211, 238, 0.8) 5%,
              rgba(34, 211, 238, 0.2) 10%,
              rgba(34, 211, 238, 0.2) 30%
            );
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </div>
  );
}
