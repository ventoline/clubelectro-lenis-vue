/**
 * useScene.ts
 * WebGPU balloon-physics scene.
 *
 * Objects:
 *  1. Large torus knot          — procedural, always present
 *  2. Suzanne monkey head       — public/models/suzanne.gltf
 *  3. Labubu                    — public/models/labubu.gltf
 *  4. Gear                      — public/models/gear.gltf
 *  5. Toupie (spinning top)     — public/models/toupie.gltf
 *
 * Each GLTF shows a lightweight wireframe placeholder while loading.
 * Collision is enabled across all objects.
 *
 * Performance:
 *  - Scratch Vector3s pre-allocated (zero per-frame GC)
 *  - Bounds cached, recomputed only on resize
 *  - setAnimationLoop() for correct WebGPU frame pacing
 */
import { onMounted, onUnmounted, type Ref } from "vue";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";
import { lenisRef } from "./useLenis";

/* ── Physics constants ───────────────────────────────────────────────── */
const BUOYANCY = 0.00022;
const ATTRACT_K = 0.00096;
const DAMPING = 0.9578;
const SCROLL_K = 0.00047;
const DRIFT_AMP = 0.000018;
const MOUSE_PUSH = 0.00006;
const BOUNCE = 0.55;

interface Body {
  mesh: THREE.Object3D;
  radius: number;
  vel: THREE.Vector3;
  rotVel: THREE.Vector3;
  phase: number;
}

function metalMat(color = 0x888888) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.25,
    metalness: 0.7,
  });
}

function makeBody(obj: THREE.Object3D, radius: number): Body {
  return {
    mesh: obj,
    radius,
    vel: new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.008,
      0,
    ),
    rotVel: new THREE.Vector3(
      (Math.random() - 0.5) * 0.006,
      (Math.random() - 0.5) * 0.009,
      (Math.random() - 0.5) * 0.004,
    ),
    phase: Math.random() * Math.PI * 2,
  };
}

export function useScene(canvasRef: Ref<HTMLCanvasElement | null>) {
  let renderer: WebGPURenderer | null = null;

  async function setup() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    /* ── Renderer ──────────────────────────────────────────────────── */
    renderer = new WebGPURenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    await renderer.init();

    /* ── Scene & camera ────────────────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    /* ── Stats — Shift+P ───────────────────────────────────────────── */
    const stats = new Stats();
    stats.dom.style.cssText =
      "position:fixed;top:68px;left:8px;z-index:9999;display:none;opacity:0.85;pointer-events:none;";
    document.body.appendChild(stats.dom);
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "P")
        stats.dom.style.display =
          stats.dom.style.display === "none" ? "block" : "none";
    };
    document.addEventListener("keydown", onKey);

    /* ── Lighting ──────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const keyLight = new THREE.DirectionalLight(0xc8ff57, 5.0);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x6688ff, 3.0);
    fillLight.position.set(-5, -2, 1);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, -3, -3);
    scene.add(rimLight);

    const bodies: Body[] = [];
    const loader = new GLTFLoader();

    /* ── 1. Large torus knot (procedural) ─────────────────────────── */
    const knotMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.35, 180, 18, 2, 3),
      metalMat(0x0000008),
    );
    knotMesh.scale.setScalar(1);
    knotMesh.position.set(0.3, 0.0, 0);
    scene.add(knotMesh);
    bodies.push(makeBody(knotMesh, 1));

    /* ── GLTF helper ───────────────────────────────────────────────── */
    function loadGLTF(
      path: string,
      targetScale: number, // desired world-space size (longest axis)
      x: number,
      y: number,
      radius: number,
      placeholderGeo: THREE.BufferGeometry,
    ): Body {
      // Wireframe placeholder floats immediately
      const ph = new THREE.Mesh(
        placeholderGeo,
        new THREE.MeshStandardMaterial({
          color: 0x888888,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        }),
      );
      ph.position.set(x, y, (Math.random() - 0.5) * 0.4);
      scene.add(ph);
      const body = makeBody(ph, radius);
      bodies.push(body);

      loader.load(
        path,
        (gltf) => {
          const root = gltf.scene;

          // Strip all textures — apply same material as the torus knot
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).material = metalMat(0x00008);
            }
          });

          // Auto-scale to targetScale on longest axis
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const max = Math.max(size.x, size.y, size.z);
          root.scale.setScalar(targetScale / max);

          // Centre pivot
          box.setFromObject(root);
          const centre = box.getCenter(new THREE.Vector3());
          root.position.sub(centre);

          // Wrap in a group so position is the pivot
          const group = new THREE.Group();
          group.add(root);
          group.position.copy(ph.position);

          scene.remove(ph);
          scene.add(group);
          body.mesh = group;
        },
        undefined,
        (err) => console.warn(`Failed to load ${path}`, err),
      );

      return body;
    }

    /* ── 2. Suzanne ────────────────────────────────────────────────── */
    loadGLTF(
      "/site-models/suze.glb",
      2,
      1.0,
      1,
      0.8,
      new THREE.IcosahedronGeometry(0.7, 1),
    );

    /* ── 3. Labubu ─────────────────────────────────────────────────── */
    loadGLTF(
      "/site-models/laboubou.glb",
      4,
      3.0,
      3,
      0.75,
      new THREE.SphereGeometry(0.6, 8, 6),
    );

    /* ── 4. Gear ───────────────────────────────────────────────────── */
    loadGLTF(
      "/site-models/gear0.glb",
      2,
      2.0,
      2,
      0.7,
      new THREE.TorusGeometry(0.1, 0.14, 6, 4, 5),
    );

    /* ── 5. Toupie ─────────────────────────────────────────────────── */
    loadGLTF(
      "/site-models/toopie.glb",
      1.5,
      1.8,
      1.0,
      0.65,
      new THREE.ConeGeometry(0.4, 0.9, 8),
    );
    /* ── 5. Koons ─────────────────────────────────────────────────── */
    loadGLTF(
      "/site-models/koons.glb",
      3,
      1.8,
      1.0,
      0.65,
      new THREE.ConeGeometry(0.4, 0.9, 8),
    );

    /* ── Input ─────────────────────────────────────────────────────── */
    let mouseX = 0,
      mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", onMouse);

    let scrollY = 0,
      prevScroll = 0;
    const onLenisScroll = (lenis: { scroll: number }) => {
      scrollY = lenis.scroll;
    };
    lenisRef.value?.on("scroll", onLenisScroll);

    /* ── World bounds — cached ─────────────────────────────────────── */
    const halfFovRad = (camera.fov / 2) * (Math.PI / 180);
    const bounds = {
      x: Math.tan(halfFovRad) * camera.position.z * camera.aspect,
      y: Math.tan(halfFovRad) * camera.position.z,
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer!.setSize(window.innerWidth, window.innerHeight);
      bounds.x = Math.tan(halfFovRad) * camera.position.z * camera.aspect;
      bounds.y = Math.tan(halfFovRad) * camera.position.z;
    };
    window.addEventListener("resize", onResize);

    /* ── Scratch vectors — zero GC in hot path ─────────────────────── */
    const _diff = new THREE.Vector3();
    const _normal = new THREE.Vector3();
    const _relVel = new THREE.Vector3();

    /* ── Collision ─────────────────────────────────────────────────── */
    function resolveCollisions() {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i],
            b = bodies[j];
          _diff.subVectors(b.mesh.position, a.mesh.position);
          _diff.z = 0;
          const dist = _diff.length();
          const minD = a.radius + b.radius;
          if (dist < minD && dist > 0.001) {
            _normal.copy(_diff).divideScalar(dist);
            const over = (minD - dist) * 0.52;
            a.mesh.position.addScaledVector(_normal, -over);
            b.mesh.position.addScaledVector(_normal, over);
            _relVel.copy(a.vel).sub(b.vel);
            const imp = _relVel.dot(_normal) * 0.55;
            if (imp > 0) {
              a.vel.addScaledVector(_normal, -imp * 0.5);
              b.vel.addScaledVector(_normal, imp * 0.5);
            }
          }
        }
      }
    }

    /* ── Animation loop ────────────────────────────────────────────── */
    let t = 0;
    renderer.setAnimationLoop(() => {
      stats.begin();
      t += 0.01;

      const delta = scrollY - prevScroll;
      prevScroll = scrollY;
      const { x: bx, y: by } = bounds;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        // Constant upward lift — makes objects float like balloons
        b.vel.y += BUOYANCY;

        // Spring pull toward screen centre — stops objects drifting to edges
        b.vel.x -= b.mesh.position.x * ATTRACT_K;
        b.vel.y -= b.mesh.position.y * ATTRACT_K;

        // Scroll tug — flip sign (+/-) to reverse direction on scroll
        b.vel.y -= delta * SCROLL_K;

        // Slow organic drift — unique per object via phase & index offset
        b.vel.x += Math.sin(t * 0.28 + b.phase + i * 1.6) * DRIFT_AMP;
        b.vel.y += Math.cos(t * 0.19 + b.phase + i * 2.3) * DRIFT_AMP * 0.4;

        // Mouse repulsion — objects nudge away from the cursor position
        b.vel.x += mouseX * MOUSE_PUSH;
        b.vel.y -= mouseY * MOUSE_PUSH;

        // Damping — bleeds off velocity each frame, prevents infinite acceleration
        b.vel.multiplyScalar(DAMPING);
        b.mesh.position.add(b.vel);
        b.mesh.rotation.x += b.rotVel.x;
        b.mesh.rotation.y += b.rotVel.y;
        b.mesh.rotation.z += b.rotVel.z;

        const pad = b.radius;
        if (b.mesh.position.x > bx - pad) {
          b.mesh.position.x = bx - pad;
          b.vel.x *= -BOUNCE;
        }
        if (b.mesh.position.x < -bx + pad) {
          b.mesh.position.x = -bx + pad;
          b.vel.x *= -BOUNCE;
        }
        if (b.mesh.position.y > by - pad) {
          b.mesh.position.y = by - pad;
          b.vel.y *= -BOUNCE;
        }
        if (b.mesh.position.y < -by + pad) {
          b.mesh.position.y = -by + pad;
          b.vel.y *= -BOUNCE;
        }
      }

      resolveCollisions();
      keyLight.position.x = Math.sin(t * 0.35) * 5;
      keyLight.position.z = Math.cos(t * 0.35) * 4;

      renderer!.render(scene, camera);
      stats.end();
    });

    /* ── Cleanup ── */
    return () => {
      renderer!.setAnimationLoop(null);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousemove", onMouse);
      lenisRef.value?.off("scroll", onLenisScroll);
      window.removeEventListener("resize", onResize);
      stats.dom.remove();
      renderer?.dispose();
    };
  }

  let cleanup: (() => void) | undefined;

  onMounted(async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cleanup = (await setup()) ?? undefined;
  });

  onUnmounted(() => cleanup?.());
}
