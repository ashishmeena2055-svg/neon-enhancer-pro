import React, { useRef, useState, useEffect } from 'react';

export default function VideoProAI() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rects, setRects] = useState([]); // Multiple Watermark Selections
  const [isDrawing, setIsDrawing] = useState(false);

  // Manual Selection Logic
  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setRects([...rects, { x: offsetX, y: offsetY, w: 0, h: 0, id: Date.now() }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const lastRect = rects[rects.length - 1];
    lastRect.w = offsetX - lastRect.x;
    lastRect.h = offsetY - lastRect.y;
    setRects([...rects.slice(0, -1), lastRect]);
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-black shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]">
      <video ref={videoRef} className="w-full" src="/your-video.mp4" />
      
      {/* Selection Overlay */}
      <canvas 
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
      />

      <div className="absolute bottom-4 left-4 flex gap-2">
        {rects.map(r => (
          <span key={r.id} className="bg-cyan-500 text-[10px] px-2 py-1 rounded text-black font-bold">
            MASK-{r.id.toString().slice(-3)}
          </span>
        ))}
      </div>
    </div>
  );
}
