"use client"

import { useEffect, useRef } from "react"

export default function FootballNet({ className = "" }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 640) return
    if (!mountRef.current) return

    const mount = mountRef.current

    import("three").then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      const getSize = () => ({ w: mount.clientWidth, h: mount.clientHeight })
      let { w, h } = getSize()
      renderer.setSize(w, h)
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100)
      camera.position.set(0, 0, 12)

      const COLS = 42
      const ROWS = 28
      const NET_W = 20
      const NET_H = 12

      const posArr = []
      const uvArr = []

      for (let row = 0; row <= ROWS; row++) {
        for (let col = 0; col <= COLS; col++) {
          posArr.push(
            (col / COLS) * NET_W - NET_W / 2,
            (row / ROWS) * NET_H - NET_H / 2,
            0
          )
          uvArr.push(col / COLS, row / ROWS)
        }
      }

      const idxArr = []
      for (let row = 0; row <= ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          idxArr.push(row * (COLS + 1) + col, row * (COLS + 1) + col + 1)
        }
      }
      for (let col = 0; col <= COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          idxArr.push(row * (COLS + 1) + col, (row + 1) * (COLS + 1) + col)
        }
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3))
      geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvArr, 2))
      geo.setIndex(idxArr)

      const vertexShader = /* glsl */`
        uniform float uTime;
        uniform vec2  uMouse;    // -1..1, smoothed
        uniform float uGust;     // 0..1, slow LFO for gust pulses

        varying vec2 vUv;

        // ── Helpers ──────────────────────────────────────────
        // Value noise from two overlapping sine pairs
        float vnoise(vec2 p) {
          return sin(p.x * 3.3 + uTime * 0.5) * cos(p.y * 2.1 + uTime * 0.4)
               + sin(p.x * 1.7 - uTime * 0.7) * sin(p.y * 3.6 + uTime * 0.3);
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          // ── Pin constraints ──────────────────────────────
          // Top edge is crossbar — loose pin (still has a little sway)
          // pow < 1.0 = curve bends up, so even near the top there is motion
          float pinFactor  = pow(1.0 - uv.y, 0.65);  // 0 at top, 1 at bottom

          // Side posts: softer release so edges still flutter noticeably
          float sideFactor = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x);
          sideFactor = mix(0.4, 1.0, sideFactor); // min 0.4 at posts, not fully pinned

          float wf = pinFactor * sideFactor; // combined wind factor

          // ── Gust modulation ──────────────────────────────
          // uGust makes the wind breathe — calm → strong → calm
          float gustScale = 0.7 + uGust * 1.3; // range 0.7..2.0

          // ── Primary billow (Z axis — net blows back) ─────
          // Three layered wave systems: large slow + medium + high-freq
          float b1 = sin(pos.x * 0.40 + uTime * 0.80 + uMouse.x * 1.5) * 1.40;
          float b2 = sin(pos.x * 0.90 + uTime * 1.50 + 2.1)             * 0.65;
          float b3 = sin(pos.x * 1.80 + uTime * 2.20 - 1.3)             * 0.35;

          // Vertical contribution — cross-waves for 2-D turbulence
          float bV = cos(pos.y * 0.55 + uTime * 0.95 + uMouse.y * 1.0)  * 0.50;
          float bV2= sin(pos.y * 1.20 + uTime * 1.70)                    * 0.25;

          // Noise turbulence — breaks periodicity
          float turb = vnoise(vec2(pos.x * 0.28, pos.y * 0.28)) * 0.55
                     + vnoise(vec2(pos.x * 0.55, pos.y * 0.55)) * 0.25;

          float totalZ = (b1 + b2 + b3 + bV + bV2 + turb) * gustScale;
          pos.z -= totalZ * wf; // negative Z = away from viewer

          // ── Lateral sway (X axis) ────────────────────────
          float swayX  = sin(pos.y * 0.40 + uTime * 0.70 + uMouse.x * 0.9) * 0.30;
          float swayX2 = cos(pos.x * 0.55 + uTime * 1.10)                   * 0.12;
          pos.x += (swayX + swayX2) * wf * gustScale * 0.6;

          // ── Vertical ripple (Y axis) ─────────────────────
          float swayY  = cos(pos.x * 0.50 + uTime * 0.80 + uMouse.y * 0.7) * 0.20;
          float swayY2 = sin(pos.y * 0.70 + uTime * 1.30)                   * 0.10;
          pos.y += (swayY + swayY2) * wf * gustScale * 0.5;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `

      const fragmentShader = /* glsl */`
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          // Soft vignette fade at all edges
          float ex = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
          float ey = smoothstep(0.0, 0.03, vUv.y) * smoothstep(1.0, 0.97, vUv.y);
          float alpha = ex * ey * uOpacity;

          // Accent green #3bf073
          gl_FragColor = vec4(0.231, 0.941, 0.451, alpha);
        }
      `

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uGust: { value: 0.5 },
          uOpacity: { value: 0.18 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      })

      const net = new THREE.LineSegments(geo, mat)
      net.rotation.x = -0.1
      scene.add(net)

      const mouse = { x: 0, y: 0 }
      const onMouse = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener("mousemove", onMouse, { passive: true })

      let raf
      let t = 0
      let prev = performance.now()

      const animate = (now) => {
        raf = requestAnimationFrame(animate)
        const dt = Math.min((now - prev) / 1000, 0.05)
        prev = now
        t += dt

        mat.uniforms.uTime.value = t

        const mu = mat.uniforms.uMouse.value
        mu.x += (mouse.x - mu.x) * 0.05
        mu.y += (mouse.y - mu.y) * 0.05

        mat.uniforms.uGust.value = (Math.sin(t * 0.38) * 0.5 + 0.5)

        renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(animate)

      const onResize = () => {
        ; ({ w, h } = getSize())
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener("resize", onResize)

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("mousemove", onMouse)
        window.removeEventListener("resize", onResize)
        geo.dispose()
        mat.dispose()
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    })
  }, [])

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
