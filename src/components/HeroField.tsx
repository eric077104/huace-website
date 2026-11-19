"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Lightweight seeded pixel field. The static CSS glow is visible before the canvas initializes. */
export default function HeroField({ compact = false, mobileQuiet = false }: { compact?: boolean; mobileQuiet?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isQuietMobile = () => mobileQuiet && window.matchMedia("(max-width: 767px)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let width = 0, height = 0, dpr = 1, frame = 0, last = 0, time = 0, visible = false;
    let offscreen: HTMLCanvasElement, base: CanvasRenderingContext2D | null;
    let cells: { x: number; y: number; a: number; phase: number; period: number }[] = [];
    let comets: { row: number; x: number; speed: number; len: number }[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let seed = 11;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const cellSize = () => window.innerWidth < 900 ? 20 : 24;
    const paintBase = () => {
      const cell = cellSize();
      offscreen = document.createElement("canvas"); offscreen.width = Math.ceil(width * dpr); offscreen.height = Math.ceil(height * dpr);
      base = offscreen.getContext("2d"); if (!base) return;
      base.setTransform(dpr, 0, 0, dpr, 0, 0);
      const focusX = compact ? width * .74 : width * .76, focusY = compact ? height * .52 : height * .5;
      const glow = base.createRadialGradient(focusX, focusY, 0, focusX, focusY, Math.max(width, height) * .55);
      glow.addColorStop(0, "rgba(37,99,235,.38)"); glow.addColorStop(.45, "rgba(6,182,212,.07)"); glow.addColorStop(1, "rgba(6,182,212,0)");
      base.fillStyle = glow; base.fillRect(0, 0, width, height);
      base.fillStyle = "rgba(255,255,255,.05)";
      for (let x = 0; x < width; x += cell) for (let y = 0; y < height; y += cell) base.fillRect(x, y, 1, 1);
      base.strokeStyle = "rgba(255,255,255,.035)"; base.lineWidth = 1;
      for (let x = 0; x < width; x += cell * 4) { base.beginPath(); base.moveTo(x + .5, 0); base.lineTo(x + .5, height); base.stroke(); }
      for (let y = 0; y < height; y += cell * 4) { base.beginPath(); base.moveTo(0, y + .5); base.lineTo(width, y + .5); base.stroke(); }
      // Converging low-contrast data paths.
      for (let i = 0; i < (isQuietMobile() ? 0 : 8); i++) {
        const y = height * (.14 + i * .1); const endY = focusY + (i - 3.5) * 10;
        const g = base.createLinearGradient(0, y, focusX, endY); g.addColorStop(0, "rgba(37,99,235,0)"); g.addColorStop(1, "rgba(6,182,212,.5)");
        base.strokeStyle = g; base.lineWidth = 1; base.beginPath(); base.moveTo(0, y); base.bezierCurveTo(width * .34, y, width * .5, endY, focusX, endY); base.stroke();
      }
      cells = []; const cols = Math.ceil(width / cell), rows = Math.ceil(height / cell), diag = Math.hypot(width, height);
      for (let gx = 0; gx < cols; gx++) for (let gy = 0; gy < rows; gy++) {
        const x = gx * cell, y = gy * cell, d = Math.hypot(x - focusX, y - focusY) / diag;
        const density = isQuietMobile() ? .2 : .62, sigma = isQuietMobile() ? .28 : .34;
        const chance = Math.exp(-3 * d * d / (sigma * sigma)) * density;
        if (random() < chance && (compact ? y > focusY + 24 : x > width * .5)) cells.push({ x, y, a: .08 + random() * .5, phase: random() * Math.PI * 2, period: 3 + random() * 3 });
      }
      const count = isQuietMobile() ? 0 : window.innerWidth < 900 ? 8 : 16; comets = [];
      for (let i = 0; i < count; i++) comets.push({ row: Math.floor(random() * rows), x: random() * width, speed: 60 + random() * 80, len: 4 + random() * 10 });
    };
    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const fps = window.innerWidth < 900 ? 30 : 60;
      if (!reduce && now - last < 1000 / fps) { frame = requestAnimationFrame(draw); return; }
      const dt = Math.min(.05, (now - (last || now)) / 1000); last = now; time += dt;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height); if (base) ctx.drawImage(offscreen, 0, 0, width, height);
      const cell = cellSize();
      for (const p of cells) {
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        const breath = reduce ? 1 : .75 + .25 * Math.sin(time * Math.PI * 2 / p.period + p.phase);
        const alpha = Math.min(.9, p.a * breath + (fine && d < 120 ? .35 * (1 - d / 120) : 0));
        ctx.fillStyle = `rgba(37,${Math.round(99 + 83 * p.y / Math.max(height, 1))},${Math.round(235 - 21 * p.y / Math.max(height, 1))},${alpha})`;
        ctx.fillRect(p.x + 3, p.y + 3, cell - 5, cell - 5);
      }
      if (!reduce) for (const c of comets) {
        c.x += c.speed * dt; if (c.x > width + 20) c.x = -c.len * cell;
        const y = c.row * cell; if (!compact && c.x < width * .5) continue; if (compact && y < height * .52 + 24) continue;
        for (let i = 0; i < c.len; i++) { const a = .55 * (1 - i / c.len); ctx.fillStyle = `rgba(6,182,212,${a})`; ctx.fillRect(c.x - i * cell, y + 3, cell - 5, cell - 5); }
        ctx.shadowColor = "#06B6D4"; ctx.shadowBlur = 12; ctx.fillStyle = "rgba(249,250,251,.9)"; ctx.fillRect(c.x + 3, y + 3, cell - 5, cell - 5); ctx.shadowBlur = 0;
      }
      if (!reduce && visible) frame = requestAnimationFrame(draw);
    };
    const resize = () => { width = canvas.clientWidth; height = canvas.clientHeight; dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = Math.ceil(width * dpr); canvas.height = Math.ceil(height * dpr); paintBase(); draw(performance.now()); };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); };
    const onVisibility = () => { if (document.hidden) { if (frame) cancelAnimationFrame(frame); frame = 0; } else if (visible && !reduce && !frame) frame = requestAnimationFrame(draw); };
    const onPointer = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointer.tx = e.clientX - r.left; pointer.ty = e.clientY - r.top; pointer.x += (pointer.tx - pointer.x) * .15; pointer.y += (pointer.ty - pointer.y) * .15; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !frame && !reduce) frame = requestAnimationFrame(draw); else if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; } });
    observer.observe(canvas); window.addEventListener("resize", onResize); document.addEventListener("visibilitychange", onVisibility);
    if (fine) canvas.addEventListener("pointermove", onPointer);
    resize();
    return () => { cancelAnimationFrame(frame); clearTimeout(resizeTimer); observer.disconnect(); window.removeEventListener("resize", onResize); document.removeEventListener("visibilitychange", onVisibility); canvas.removeEventListener("pointermove", onPointer); };
  }, [compact, mobileQuiet]);
  return <canvas ref={canvasRef} className="field-canvas" aria-hidden="true" />;
}

export function GrowthLoop({ calm = false }: { calm?: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || (calm && window.matchMedia("(max-width: 767px)").matches)) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % 4), 3000);
    return () => window.clearInterval(timer);
  }, [calm]);
  const nodes = [["Strategy", "策略"], ["Content", "內容與創意"], ["Performance", "成效行銷"], ["AI & Digital", "AI 與數位應用"]];
  return <div className="loop" aria-label="Strategy、Content、Performance、AI & Digital 成長循環">
    <svg className={calm ? "calm-loop-svg" : ""} viewBox="0 0 500 500" aria-hidden="true"><circle className="loop-outer" cx="250" cy="250" r="190" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1"/><circle className="loop-main" cx="250" cy="250" r="144" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1"/><circle className="loop-inner" cx="250" cy="250" r="101" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" strokeDasharray="2 6"/><circle className="loop-arc" cx="250" cy="250" r="144" fill="none" stroke="url(#loop-gradient)" strokeWidth="2" strokeDasharray="226 679" strokeDashoffset={calm ? -226 : -active * 226} /><defs><linearGradient id="loop-gradient"><stop stopColor="#2563EB"/><stop offset="1" stopColor="#06B6D4"/></linearGradient></defs><g className={calm ? "packet-ring" : ""}>{Array.from({length:8},(_,i)=><rect className="loop-packet" key={i} x={250+144*Math.cos(i*Math.PI/4)-3} y={250+144*Math.sin(i*Math.PI/4)-3} width="6" height="6" fill={i===active?"#67E8F9":"rgba(147,197,253,.55)"}/>)}</g></svg>
    <div className={`core ${calm ? "calm-core" : ""}`}><Image src="/brand/hc-mark-white.svg" width={112} height={112} alt=""/><span>GROWTH SYSTEM</span></div>
    {nodes.map(([name, label], i) => <div key={name} className={`node ${active === i ? "is-active" : ""}`} style={{ left: i === 1 ? "90%" : i === 3 ? "10%" : "50%", top: i === 0 ? "5%" : i === 2 ? "95%" : "50%", transition: "transform .4s,opacity .4s" }}><span className="idx">0{i + 1}</span><div><div className="nm">{name}</div><div className="zh">{label}</div></div></div>)}
  </div>;
}
