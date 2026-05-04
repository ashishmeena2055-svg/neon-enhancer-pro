// worker.js - Background Process
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export const removeWatermark = async (file, masks) => {
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));

  // Multiple masks ko FFmpeg filter mein convert karna
  // delogo=x=10:y=10:w=100:h=50 aur multiple entries
  const filterStrings = masks.map(m => `delogo=x=${m.x}:y=${m.y}:w=${m.w}:h=${m.h}`).join(',');

  await ffmpeg.run('-i', 'input.mp4', '-vf', filterStrings, '-c:a', 'copy', 'output.mp4');
  
  const data = ffmpeg.FS('readFile', 'output.mp4');
  return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
};
