const video = document.getElementById('mainVideo');
const canvas = document.getElementById('maskCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('videoUpload');
let masks = [];

// --- NAYA ADDITION: Default Video Load ---
window.addEventListener('load', () => {
    // Agar aapne GitHub mein '38461.mp4' rakhi hai toh ye auto load hogi
    video.src = '38461.mp4'; 
    video.classList.remove('hidden');
    canvas.classList.remove('hidden');
    document.getElementById('drop-zone').classList.add('hidden');
    
    video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log("Default Video Loaded: 38461.mp4");
    };
});
// ----------------------------------------

upload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    video.src = url;
    // ... baki ka code wahi rahega
});

// Manual Multi-Mask Selection Logic
let isDrawing = false;
canvas.onmousedown = (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    masks.push({ 
        x: (e.clientX - rect.left) * (canvas.width/rect.width), 
        y: (e.clientY - rect.top) * (canvas.height/rect.height), 
        w: 0, h: 0 
    });
};

canvas.onmousemove = (e) => {
    if(!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const current = masks[masks.length - 1];
    current.w = ((e.clientX - rect.left) * (canvas.width/rect.width)) - current.x;
    current.h = ((e.clientY - rect.top) * (canvas.height/rect.height)) - current.y;
    drawMasks();
};

window.onmouseup = () => isDrawing = false;

function drawMasks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00f3ff'; // Neon Cyan
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]); // Dash line for pro look
    masks.forEach(m => {
        ctx.strokeRect(m.x, m.y, m.w, m.h);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
        ctx.fillRect(m.x, m.y, m.w, m.h);
    });
}
