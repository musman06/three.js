import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
gui.add(ambientLight, "intensity", 0.1, 3, 0.1);

// directional light
const directionalLight = new THREE.DirectionalLight("blue", 1.5);
directionalLight.position.set(2, 0.1, 0);
scene.add(directionalLight);

// hemisphere light
const hemisphereLight = new THREE.HemisphereLight("red", "purple", 1.5);
scene.add(hemisphereLight);

// point light
const pointLight = new THREE.PointLight("yellow", 1, 2, 0.001); // color/intensity/distance/decay
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// rectArea light
const rectAreaLight = new THREE.RectAreaLight("violet", 4, 2, 2); // color/intensity/distance/decay
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(rectAreaLight);

// spot light
const spotLight = new THREE.SpotLight( // color/intensity/distance/light circle angle/sharpness of edges of light/decay
  "orange",
  10,
  10,
  Math.PI * 0.2,
  0.1,
  1.5
);
spotLight.position.set(0, 3, 3);
scene.add(spotLight);
spotLight.target.position.x = -1; // target is where our spotlight orients itself
scene.add(spotLight.target); // target is not in the scene by default so we have to add it

/**
 * Lights Helpers
 */

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.5
);
scene.add(directionalLightHelper);

// Hemisphere Light Helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.3
);
scene.add(hemisphereLightHelper);

// Point Light Helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

// RectAreaLight Helper
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight); // does not take size parameter since it is euqal to light's width & height
scene.add(rectAreaLightHelper);

// Spot Light Helper
const spotLightHelper = new THREE.SpotLightHelper(spotLight); // does not take size parameter since it is euqal to light's parameters
scene.add(spotLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
