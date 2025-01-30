import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

// GUI
const gui = new GUI({
  width: 340,
  title: "Basic Tweaks",
  closeFolders: true,
});
gui.close();
// gui.hide();

window.addEventListener("keydown", (e) => {
  if (e.key === "h") gui.show(gui._hidden);
});

const debugUIObject = {
  color: "#147b61",
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
  },
  subdivisions: 2,
};
const cubeTweaks = gui.addFolder("Awesome Tweaks");
cubeTweaks.close();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: debugUIObject.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// TODO
// Range
cubeTweaks.add(mesh.position, "y", -3, 3, 0.01).name("elevation"); // will add drag handler or checbox automatically depending upon the property

//Check box
cubeTweaks.add(mesh, "visible");
cubeTweaks.add(mesh.material, "wireframe");

// Color
// Solution 1: Retrieving the modified color
// gui.addColor(material, "color").onChange((value) => {
//   //   console.log(material.color);
//   //   console.log(value); // both methods are correct

//   console.log(value.getHexString());
// });

// Solution 2: Only dealing with non-modified color
cubeTweaks.addColor(debugUIObject, "color").onChange(() => {
  material.color.set(debugUIObject.color);
});

// Button/function
cubeTweaks.add(debugUIObject, "spin");

// Geometry tweaks
cubeTweaks.add(debugUIObject, "subdivisions", 1, 20, 1).onFinishChange(() => {
  mesh.geometry.dispose();
  mesh.geometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    debugUIObject.subdivisions,
    debugUIObject.subdivisions,
    debugUIObject.subdivisions
  );
});

// Changing simple object value
// let myVariable = 100;
// gui.add(myVariable, ???);    ❌

// let myVariable = {
//   value: 100,
// };
// gui.add(myVariable, "value"); // ✔️

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update(); // Required for damping to work!

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
