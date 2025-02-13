import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Textures

// Method 1 of loading textures
// const image = new Image();
// const texture = new THREE.Texture(image); // even though image is not loaded yet but JS is ok with it
// texture.colorSpace = THREE.SRGBColorSpace;

// image.addEventListener("load", () => {
//   texture.needsUpdate = true; // to update texture when image is loaded
// });
// image.src = "/textures/door/color.jpg";

// Loading manager
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {  // event listeners of loading manager
//   console.log("loadingManager: loading started");
// };
// loadingManager.onLoad = () => {
//   console.log("loadingManager: loading finished");
// };
// loadingManager.onProgress = () => {
//   console.log("loadingManager: loading progressing");
// };
// loadingManager.onError = () => {
//   console.log("loadingManager: loading error");
// };

// Method 2 of loading textures
const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load( // event listener of texture loader
//   "/textures/door/color.jpg",
//   () => {
//     console.log("loading finished");
//   },
//   () => {
//     console.log("loading progressing");
//   },
//   () => {
//     console.log("loading error");
//   }
// );
const colorTexture = textureLoader.load("/textures/door/color.jpg");
// const colorTexture = textureLoader.load("/textures/checkerboard-1024x1024.png"); // to see the artifacts for minification filter
// const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png"); // to see the magnification filter
// const colorTexture = textureLoader.load("/textures/minecraft.png"); // to see the magnification filter's nearestFilter effect
colorTexture.colorSpace = THREE.SRGBColorSpace;

// Different types of textures
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// To check UV unwrapping
console.log(geometry.attributes.uv);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new THREE.ConeGeometry(1, 1, 32);
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100);
const material = new THREE.MeshBasicMaterial({ map: colorTexture }); // replace colorTexture with other types of textures to see their effects
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Texture transformation properties
// colorTexture.wrapS = THREE.RepeatWrapping;  // to enable repeat property
// colorTexture.wrapT = THREE.RepeatWrapping;  // to enable repeat property
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;  // for mirrored repeating effect
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;  // for mirrored repeating effect
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
colorTexture.rotation = Math.PI * 0.25;
colorTexture.center.x = 0.5; // to change pivot point of rotation
colorTexture.center.y = 0.5; // to change pivot point of rotation

// Filters and mapping
// colorTexture.generateMipmaps = false; // only use minmaps for minFilter otherwise disable it
// colorTexture.minFilter = THREE.NearestFilter;
// colorTexture.magFilter = THREE.NearestFilter;

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
camera.position.z = 1;
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
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
