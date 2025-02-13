import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Simple  non-uniformed animation
// const tick = () => {
//   // Update objects
//   mesh.rotation.y += 0.01;

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();

// Using Time
// let time = Date.now();

// const tick = () => {
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;
//   mesh.rotation.x += 0.0001 * deltaTime;

//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// tick();

// Using Three.js built-in clock
// const clock = new THREE.Clock();

// const tick = () => {
//   const time = clock.getElapsedTime();
//   console.log(time);

//   mesh.rotation.y = time * 0.9;

//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// Using GSAP Library
// gsap.to(mesh.position, { delay: 3, duration: 3, x: 4, y: 2, z: -8 });
gsap.to(mesh.rotation, { y: "+=3.14", duration: 9, repeat: -1, ease: "none" });

const tick = () => {
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
