const Footer = () => (
  <footer className="w-full py-10 bg-black border-t border-cyan-900/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>
    <div className="relative z-10 text-center">
      <p className="text-gray-500 tracking-[0.5em] text-[10px] mb-2 uppercase">Core Engine Developed By</p>
      <h2 className="text-4xl font-black italic tracking-tighter text-white">
        ASH<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(6,182,212,1)]">ISH</span>
      </h2>
      <div className="mt-4 flex justify-center gap-4">
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-cyan-500"></div>
        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-cyan-500"></div>
      </div>
    </div>
  </footer>
);
