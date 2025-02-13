import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: 1024,
  height: 960,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
cube1.position.x = -2;
cube3.position.x = 2;

group.add(cube1, cube2, cube3);
cube1.position.x = -2;

group.scale.y = 1;
// group.rotation.x = Math.PI / 2;
// group.rotation.y = Math.PI / 2;

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
mesh.position.normalize(); // to normalize the vector, reduce the length of the vector to 1 unit
console.log("Distance To: ", mesh.position.distanceTo(camera.position)); // to get the distance from another Vector3 object
console.log("Position: ", mesh.position.set(0.7, -0.6, 1)); // to change the position of our 3D object in one go
console.log("Length: ", mesh.position.length()); // to get the length of position from origion (0,0,0)

// AxesHelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Scale
// mesh.scale.set(0.5, 0.5, 0.5);
// mesh.scale.set(2, 2, 2);

// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;

// Rotation
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// lookAt() method
// camera.lookAt(new THREE.Vector3(0, -1, 0));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
