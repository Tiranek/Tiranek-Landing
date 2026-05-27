"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0., 1.); }
`;

const FRAG_DESKTOP = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

vec3 palette(float t) {
  vec3 a = vec3(0.92, 0.96, 0.93);
  vec3 b = vec3(0.06, 0.12, 0.08);
  vec3 c = vec3(0.10, 0.18, 0.12);
  vec3 d = vec3(0.30, 0.55, 0.38);
  return a + b * cos(6.28318 * (c * t + d));
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0., 1.);
  return mix(b, a, h) - k*h*(1.-h);
}

float blob(vec2 p, vec2 center, float r, float t, float phase) {
  float angle = atan(p.y - center.y, p.x - center.x);
  float wobble = 1.0
    + 0.18*sin(3.*angle + t*0.7 + phase)
    + 0.10*sin(5.*angle - t*0.5 + phase*1.3)
    + 0.06*sin(7.*angle + t*0.3 + phase*2.1);
  return length(p - center) - r * wobble;
}

mat2 rot(float a) { return mat2(cos(a),-sin(a),sin(a),cos(a)); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / min(u_res.x, u_res.y);
  vec2 mouse = (u_mouse - 0.5*u_res) / min(u_res.x, u_res.y);
  float t = u_time * 0.4;

  vec2 p = uv + mouse * 0.08;

  vec2 c1 = vec2(sin(t*0.7)*0.5,        cos(t*0.5)*0.35);
  vec2 c2 = vec2(cos(t*0.6+1.2)*0.45,   sin(t*0.8+0.5)*0.4);
  vec2 c3 = vec2(sin(t*0.4+2.1)*0.3,    cos(t*0.9+1.7)*0.3);
  vec2 c4 = vec2(cos(t*0.5+0.8)*0.55,   sin(t*0.6+2.3)*0.25);

  float d1 = blob(p, c1, 0.28, t, 0.0);
  float d2 = blob(p, c2, 0.32, t, 1.5);
  float d3 = blob(p, c3, 0.22, t, 3.0);
  float d4 = blob(p, c4, 0.25, t, 4.5);

  float field = smin(smin(d1, d2, 0.18), smin(d3, d4, 0.15), 0.20);

  float n = 0.0;
  vec2 q = p;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    q = rot(t*0.2 + float(i)*0.7) * q;
    n += amp * (sin(q.x*3.5 + t) * cos(q.y*3.5 - t*0.7));
    q *= 1.8;
    amp *= 0.5;
  }

  float mask = smoothstep(0.02, -0.12, field + n*0.04);
  float edge = smoothstep(0.0, 0.06, abs(field + n*0.03) - 0.02);
  float rim  = (1.0 - edge) * smoothstep(0.06, 0.0, abs(field + n*0.03));

  vec3 bg  = vec3(0.96, 0.98, 0.96);
  vec3 col = palette(field * 0.5 + n * 0.15 + t * 0.1);
  col = mix(bg, col, mask * 0.55);
  col -= vec3(0.02, 0.10, 0.04) * rim * 0.5;

  float scanline = sin(gl_FragCoord.y * 1.5 + t * 2.0) * 0.004 + 0.004;
  col -= scanline * vec3(0.02, 0.08, 0.04);

  float vgn = 1.0 - 0.18 * dot(uv*1.1, uv*1.1);
  col *= vgn;

  col = pow(clamp(col, 0.0, 1.0), vec3(1.05));

  float fadeY = gl_FragCoord.y / u_res.y;
  float bottomFade = smoothstep(0.0, 0.32, fadeY);
  col = mix(vec3(0.957, 0.953, 0.937), col, bottomFade);

  gl_FragColor = vec4(col, 1.0);
}
`;

const FRAG_MOBILE = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;

vec3 palette(float t) {
  vec3 a = vec3(0.92, 0.96, 0.93);
  vec3 b = vec3(0.06, 0.12, 0.08);
  vec3 c = vec3(0.10, 0.18, 0.12);
  vec3 d = vec3(0.30, 0.55, 0.38);
  return a + b * cos(6.28318 * (c * t + d));
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(b-a)/k, 0., 1.);
  return mix(b, a, h) - k*h*(1.-h);
}

float blob(vec2 p, vec2 center, float r, float t, float phase) {
  float angle = atan(p.y - center.y, p.x - center.x);
  float wobble = 1.0
    + 0.15*sin(3.*angle + t*0.7 + phase)
    + 0.08*sin(5.*angle - t*0.5 + phase*1.3);
  return length(p - center) - r * wobble;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / min(u_res.x, u_res.y);
  float t = u_time * 0.3;

  vec2 c1 = vec2(sin(t*0.7)*0.5,      cos(t*0.5)*0.35);
  vec2 c2 = vec2(cos(t*0.6+1.2)*0.45, sin(t*0.8+0.5)*0.4);
  vec2 c3 = vec2(sin(t*0.4+2.1)*0.3,  cos(t*0.9+1.7)*0.3);

  float d1 = blob(uv, c1, 0.28, t, 0.0);
  float d2 = blob(uv, c2, 0.32, t, 1.5);
  float d3 = blob(uv, c3, 0.22, t, 3.0);

  float field = smin(smin(d1, d2, 0.18), d3, 0.15);

  float mask = smoothstep(0.02, -0.10, field);

  vec3 bg  = vec3(0.96, 0.98, 0.96);
  vec3 col = palette(field * 0.5 + t * 0.1);
  col = mix(bg, col, mask * 0.55);

  col = clamp(col, 0.0, 1.0);

  float fadeY = gl_FragCoord.y / u_res.y;
  col = mix(vec3(0.957, 0.953, 0.937), col, smoothstep(0.0, 0.32, fadeY));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

export default function ShadesBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = isMobile ? Math.min(window.devicePixelRatio, 1) : window.devicePixelRatio;
    const frameInterval = isMobile ? 50 : 0;

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const frag = isMobile ? FRAG_MOBILE : FRAG_DESKTOP;

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = !isMobile ? gl.getUniformLocation(prog, "u_mouse") : null;

    let handleMouseMove;
    if (!isMobile) {
      handleMouseMove = (e) => {
        mouseRef.current.x = e.clientX * dpr;
        mouseRef.current.y = canvas.height - e.clientY * dpr;
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const frame = (ts) => {
      rafRef.current = requestAnimationFrame(frame);

      if (frameInterval > 0 && ts - lastFrameRef.current < frameInterval) return;
      lastFrameRef.current = ts;

      if (!startRef.current) startRef.current = ts;
      const t = (ts - startRef.current) / 1000;

      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) {
        gl.uniform2f(
          uMouse,
          mouseRef.current.x || canvas.width / 2,
          mouseRef.current.y || canvas.height / 2
        );
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ display: "block" }}
    />
  );
}