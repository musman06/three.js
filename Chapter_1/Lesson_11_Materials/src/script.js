import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// GUI
const gui = new GUI();

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Objects & Material properties
// meshBasicMaterial
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// Another way of initializing the material
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture; // to apply texture on a material

// different formats of applying colors
// material.color = new THREE.Color("#f00"); // applying color and texture together tints the color on the texture
// material.color = new THREE.Color("red");
// material.color = new THREE.Color("rgb(255, 0, 0)");
// material.color = new THREE.Color(0xff0000);

// material.wireframe = true; // to see the structure of our geometry

// opacity
// material.transparent = true;
// material.opacity = 0.4;
// material.alphaMap = doorAlphaTexture; // to control transparency using texture
// material.side = THREE.DoubleSide; // to see the backside of geometry

// meshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true; // to disbale normals interpolation between vertices

// meshMatcapMaterial
// const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");
// const matcapTexture3 = textureLoader.load("/textures/matcaps/3.png");
// const matcapTexture4 = textureLoader.load("/textures/matcaps/4.png");
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// meshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// meshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// Lights to see meshLambertMaterial
// Ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// // // Point light
// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// meshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// meshToonMaterial
// const gradientTexture1 = textureLoader.load("/textures/gradients/5.jpg");
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter; // to get back the cartoonish effect after applying gradient
// gradientTexture.magFilter = THREE.NearestFilter; // to get back the cartoonish effect after applying gradient
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// // meshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1; // set to 1 so that metalnessMap can work properly
// material.roughness = 1; // set to 1 so that roughnessMap can work properly

// // Environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
  //   console.log(environmentMap);
});

// gui.add(material, "metalness", 0, 1, 0.0001);
// gui.add(material, "roughness", 0, 1, 0.0001);

// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// meshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0.15;

gui.add(material, "metalness", 0, 1, 0.0001);
gui.add(material, "roughness", 0, 1, 0.0001);

// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, "clearcoat", 0, 1, 0.0001);
// gui.add(material, "clearcoatRoughness", 0, 1, 0.0001);

// sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, "sheen", 0, 1, 0.0001);
// gui.add(material, "sheenRoughness", 0, 1, 0.0001);
// gui.addColor(material, "sheenColor");

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence", 0, 1, 0.0001);
// gui.add(material, "iridescenceIOR", 1, 2.333, 0.0001);
// gui.add(material.iridescenceThicknessRange, "0", 1, 1000, 1);
// gui.add(material.iridescenceThicknessRange, "1", 1, 1000, 1);

//Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission", 0, 1, 0.0001);
gui.add(material, "ior", 0, 1, 0.0001);
gui.add(material, "thickness", 0, 1, 0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material); // increase segments so that displacementMap can work properly
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material); // increase segments so that displacementMap can work properly

const torus = new THREE.Mesh( /// increase segments so that displacementMap can work properly
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

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
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
