import { useEffect, useRef } from "react";

export default function ParticleBackground({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const SPACING = 10;
    const MOUSE_RADIUS = 50;
    const PUSH_FORCE = 500;
    const SPRING = 0.12;

    let particles = [];
    let cols = 0;
    let rows = 0;
    
    let mouse = { x: null, y: null };
    let scrollContainer = document.querySelector('.left-pane') || document.documentElement;

    function init() {
      // Calculate enough columns and rows to cover the screen plus a buffer
      cols = Math.ceil(canvas.width / SPACING) + 2;
      rows = Math.ceil(canvas.height / SPACING) + 2;

      particles = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          particles.push({
            worldX: c * SPACING,
            worldY: r * SPACING,
            x: c * SPACING,
            y: r * SPACING,
          });
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Increased opacity slightly for sharp definition
      ctx.fillStyle = dark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.35)";

      let scrollY = scrollContainer.scrollTop || 0;
      let mapHeight = rows * SPACING;

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // 1. Wrap around logic for infinite scrolling
        let screenYBase = p.worldY - scrollY;
        
        if (screenYBase < -SPACING) {
          let shiftRows = Math.ceil((-screenYBase - SPACING) / mapHeight);
          p.worldY += shiftRows * mapHeight;
          p.y += shiftRows * mapHeight;
        } else if (screenYBase > mapHeight - SPACING) {
          let shiftRows = Math.ceil((screenYBase - (mapHeight - SPACING)) / mapHeight);
          p.worldY -= shiftRows * mapHeight;
          p.y -= shiftRows * mapHeight;
        }

        // 2. Mouse Interaction
        let targetX = p.worldX;
        let targetY = p.worldY;
        
        // Use base position to compute distance to mouse
        let baseSx = p.worldX;
        let baseSy = p.worldY - scrollY;
        
        let dx = mouse.x - baseSx;
        let dy = mouse.y - baseSy;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS && mouse.x !== null) {
          // Eased force curve for a soft, natural push
          let force = Math.pow((MOUSE_RADIUS - distance) / MOUSE_RADIUS, 1.5); 
          let pushX = (dx / distance) * force * PUSH_FORCE;
          let pushY = (dy / distance) * force * PUSH_FORCE;
          
          targetX -= pushX;
          targetY -= pushY;
        }

        // 3. Spring physics
        p.x += (targetX - p.x) * SPRING;
        p.y += (targetY - p.y) * SPRING;

        // 4. Draw
        // Use Math.round to snap exactly to pixels, avoiding sub-pixel antialiasing blur
        let sx = Math.round(p.x);
        let sy = Math.round(p.y - scrollY);

        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    function resizeHandler() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    function mouseMoveHandler(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function mouseOutHandler() {
      mouse.x = null;
      mouse.y = null;
    }

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseout", mouseOutHandler);

    // Initial setup
    resizeHandler(); 
    animate();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseout", mouseOutHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dark]); // Re-run effect minimally when theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
