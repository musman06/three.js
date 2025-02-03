import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import GUI from "lil-gui";
// import typeFaceFont from "three/examples/fonts/helvetiker_regular.typeface.json"; // to import directly from three.js folder in node modules
// import typeFaceFont from "/fonts/helvetiker_regular.typeface.json"; // to import it from our static folder

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper(); // added it to center the text
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/8.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Font
const fontLoader = new FontLoader(); // import the FontLoader and do not use THREE at start
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello three.js", {
    // import the TextGeometry and do not use THREE at start
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.02,
    bevelThickness: 0.03,
    bevelOffset: 0,
  });
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);
  textGeometry.computeBoundingBox(); // by default sphere bounding is used on geometry. first call computeBoundingBox to use it

  // Method # 1 to center the text
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //   );
  //   console.log(textGeometry.boundingBox);

  // Method # 2 to center the text
  textGeometry.center();
});

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

for (let i = 0; i < 100; i++) {
  const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial);

  donutMesh.position.x = (Math.random() - 0.5) * 20;
  donutMesh.position.y = (Math.random() - 0.5) * 20;
  donutMesh.position.z = (Math.random() - 0.5) * 20;

  donutMesh.rotateX(Math.random() * Math.PI);
  donutMesh.rotateY(Math.random() * Math.PI);

  const donutMeshScale = Math.random() * 3;
  donutMesh.scale.set(donutMeshScale, donutMeshScale, donutMeshScale);
  scene.add(donutMesh);
}

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
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
