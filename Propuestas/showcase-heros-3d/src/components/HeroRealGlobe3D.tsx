import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DESTINATIONS_HERO, type DestinationHero } from "../data";
import { 
  Globe2, 
  Plane, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Building2, 
  Maximize2,
  Compass,
  RotateCw
} from "lucide-react";

// Coordinates for destinations
interface GeoPoint {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  color: string;
}

const ORIGIN_MADRID: GeoPoint = {
  id: "madrid",
  name: "Madrid (Central Operativa)",
  country: "España",
  lat: 40.4168,
  lng: -3.7038,
  color: "#1F82D2"
};

const DEST_COORDS: GeoPoint[] = [
  { id: "egipto-leyendas", name: "El Cairo & Nilo", country: "Egipto", lat: 30.0444, lng: 31.2357, color: "#D4AF37" },
  { id: "japon-imperial", name: "Tokio & Kioto", country: "Japón", lat: 35.6762, lng: 139.6503, color: "#E11D48" },
  { id: "uzbekistan-seda", name: "Samarcanda", country: "Uzbekistán", lat: 39.6542, lng: 66.9597, color: "#0284C7" },
  { id: "turquia-magica", name: "Estambul & Capadocia", country: "Turquía", lat: 38.6431, lng: 34.8289, color: "#EA580C" },
  { id: "mar-rojo-buceo", name: "Mar Rojo (Sharm)", country: "Egipto", lat: 27.9158, lng: 34.3299, color: "#059669" },
  { id: "tailandia-paraiso", name: "Bangkok & Krabi", country: "Tailandia", lat: 13.7563, lng: 100.5018, color: "#8B5CF6" }
];

// Convert Lat/Lng to 3D Vector3 on Sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate 3D quadratic bezier curve arc for flight path
function createFlightArc(start: THREE.Vector3, end: THREE.Vector3, altitude: number): THREE.QuadraticBezierCurve3 {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const distance = start.distanceTo(end);
  mid.normalize().multiplyScalar(start.length() + Math.min(distance * 0.4, altitude));
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

export default function HeroRealGlobe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>("egipto-leyendas");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const activeDestination = DESTINATIONS_HERO.find(d => d.id === selectedId) || DESTINATIONS_HERO[0];

  // Target rotation reference for smooth camera lerp
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: -0.8 });
  const globeGroupRef = useRef<THREE.Group | null>(null);

  // Rotate globe to face selected destination
  const focusOnDestination = (destId: string) => {
    setSelectedId(destId);
    setAutoRotate(false);
    const dest = DEST_COORDS.find(d => d.id === destId);
    if (!dest) return;

    // Convert lat/lng to sphere rotation angles
    const targetY = -((dest.lng + 90) * Math.PI) / 180;
    const targetX = (dest.lat * Math.PI) / 180 * 0.5;
    targetRotationRef.current = { x: targetX, y: targetY };
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 260;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Master Globe Group
    const globeRadius = 80;
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    // Base Sphere with deep navy shader look
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x050d1a,
      emissive: 0x020712,
      shininess: 25,
      transparent: true,
      opacity: 0.95,
    });
    const baseSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(baseSphere);

    // Glowing Atmospheric Outer Halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.15, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.12, 0.51, 0.82, 1.0) * intensity * 1.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // 3. Procedural Lat/Long Coordinate Rings & Starfield
    const gridHelperGroup = new THREE.Group();
    for (let lat = -60; lat <= 60; lat += 30) {
      const radiusAtLat = globeRadius * Math.cos((lat * Math.PI) / 180);
      const y = globeRadius * Math.sin((lat * Math.PI) / 180);
      const ringGeo = new THREE.RingGeometry(radiusAtLat - 0.2, radiusAtLat, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x1F82D2, opacity: 0.12, transparent: true, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      gridHelperGroup.add(ring);
    }
    globeGroup.add(gridHelperGroup);

    // Particle Cloud (Continents & Nodes)
    const particleCount = 2400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius * 1.006;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.cos(phi);
      particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 1.4,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particleMesh);

    // 4. Madrid Origin Pin
    const madridPos = latLngToVector3(ORIGIN_MADRID.lat, ORIGIN_MADRID.lng, globeRadius);
    const madridPinGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const madridPinMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const madridPin = new THREE.Mesh(madridPinGeo, madridPinMat);
    madridPin.position.copy(madridPos);
    globeGroup.add(madridPin);

    // Pulse Ring for Madrid
    const ringGeo = new THREE.RingGeometry(2.8, 4.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const madridRing = new THREE.Mesh(ringGeo, ringMat);
    madridRing.position.copy(madridPos);
    madridRing.lookAt(madridPos.clone().multiplyScalar(2));
    globeGroup.add(madridRing);

    // 5. Destination Pins and Glowing 3D Arcs
    const animatedFlights: { curve: THREE.QuadraticBezierCurve3; spark: THREE.Mesh; progress: number }[] = [];

    DEST_COORDS.forEach((dest) => {
      const destPos = latLngToVector3(dest.lat, dest.lng, globeRadius);

      // Destination Pin
      const pinGeo = new THREE.SphereGeometry(2.4, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(dest.color) });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(destPos);
      globeGroup.add(pin);

      // Outer Beacon Halo Ring
      const bRingGeo = new THREE.RingGeometry(2.8, 4.5, 32);
      const bRingMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(dest.color), side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
      const bRing = new THREE.Mesh(bRingGeo, bRingMat);
      bRing.position.copy(destPos);
      bRing.lookAt(destPos.clone().multiplyScalar(2));
      globeGroup.add(bRing);

      // Flight Arc Curve
      const arc = createFlightArc(madridPos, destPos, 28);
      const points = arc.getPoints(60);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(dest.color),
        transparent: true,
        opacity: 0.65,
        linewidth: 2,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Traveling Flight Sparkle (Animated packet)
      const sparkGeo = new THREE.SphereGeometry(1.4, 8, 8);
      const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const spark = new THREE.Mesh(sparkGeo, sparkMat);
      globeGroup.add(spark);

      animatedFlights.push({
        curve: arc,
        spark: spark,
        progress: Math.random(),
      });
    });

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x1F82D2, 2.5);
    dirLight1.position.set(150, 100, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x76ca2a, 1.2);
    dirLight2.position.set(-150, -80, -100);
    scene.add(dirLight2);

    // 7. Interactive Drag controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setAutoRotate(false);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;
      targetRotationRef.current.x = Math.max(-1.1, Math.min(1.1, targetRotationRef.current.x));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // 8. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (autoRotate && !isDragging) {
        targetRotationRef.current.y += 0.002;
      }

      // Smooth lerp to target rotation
      globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.06;
      globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.06;

      // Animate flight particles along arcs
      animatedFlights.forEach((flight) => {
        flight.progress = (flight.progress + 0.008) % 1;
        const point = flight.curve.getPointAt(flight.progress);
        flight.spark.position.copy(point);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Initial positioning to show Egypt
    focusOnDestination("egipto-leyendas");

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-[88vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#030712] via-[#050e20] to-[#020617] text-white select-none">
      
      {/* 1. TOP BAR */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-xs font-semibold text-blue-300">
            <Globe2 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span>3D WEBGL ENGINE (THREE.JS EN DIRECTO)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif text-white mt-1">
            Red Aérea y Grandes Viajes en Tiempo Real
          </h2>
          <p className="text-xs text-slate-400">
            Arrastra con el ratón para girar el globo terráqueo en 3D libre o pulsa en cualquier destino
          </p>
        </div>

        {/* Destination Quick Selector Chips */}
        <div className="flex flex-wrap gap-2">
          {DEST_COORDS.map((dest) => (
            <button
              key={dest.id}
              onClick={() => focusOnDestination(dest.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedId === dest.id
                  ? "bg-white text-slate-950 shadow-xl scale-105"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dest.color }} />
              <span>{dest.country}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. SPLIT STAGE: 3D GLOBE CANVAS (CENTER/LEFT) + B2B FLIGHT PANEL (RIGHT) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow">
        
        {/* THREE.JS WEBGL CANVAS CONTAINER */}
        <div className="lg:col-span-7 h-[420px] sm:h-[500px] lg:h-[560px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 bg-black/30 shadow-2xl">
          <div ref={mountRef} className="w-full h-full" />
          
          {/* Controls overlay hint */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-slate-400 pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              ✦ Haz clic y arrastra para rotar la Tierra en 3D
            </span>
            <button 
              onClick={() => setAutoRotate(!autoRotate)}
              className="pointer-events-auto bg-black/60 hover:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3 h-3 text-sky-400" />
              <span>{autoRotate ? "Rotación: On" : "Rotación: Pausada"}</span>
            </button>
          </div>
        </div>

        {/* ACTIVE DESTINATION EXPEDITION CARD */}
        <div className="lg:col-span-5 text-left">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-5">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span 
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white inline-block mb-2"
                  style={{ backgroundColor: activeDestination.accentColor }}
                >
                  Ruta Directa desde Madrid
                </span>
                <h3 className="text-2xl font-bold font-serif text-white leading-tight">
                  {activeDestination.title}
                </h3>
              </div>
            </div>

            {/* Flight Route Details */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Origen Vuelo:</span>
                <strong className="text-emerald-400 font-bold">Madrid Barajas (MAD)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Operación:</span>
                <strong className="text-white truncate max-w-[200px]">{activeDestination.flights}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Estancia:</span>
                <strong className="text-white">{activeDestination.duration}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Categoría Hoteles:</span>
                <strong className="text-white truncate max-w-[200px]">{activeDestination.hotels}</strong>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 text-xs text-slate-300">
              {activeDestination.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Price & B2B Booking */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Mayorista Desde</span>
                <span className="text-3xl font-black text-white font-sans">
                  {activeDestination.price} <span className="text-sm font-semibold text-amber-400">{activeDestination.currency}</span>
                </span>
              </div>

              <button className="bg-gradient-to-r from-[#1F82D2] to-[#52A72B] hover:brightness-110 text-white font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 cursor-pointer">
                <span>Ver Disponibilidad</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* 3. FOOTER GUARANTEE */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 pb-6 flex justify-between items-center text-xs text-slate-400 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Vuelos chárter exclusivos y cupos garantizados para agencias asociadas</span>
        </div>
        <span className="text-slate-500 hidden sm:inline">WebGL 3D Core • Renderizado por GPU a 60 FPS</span>
      </div>

    </div>
  );
}
