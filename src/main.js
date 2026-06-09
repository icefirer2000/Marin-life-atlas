import * as THREE from 'three';
import './style.css';

const container = document.querySelector('#scene');
const toggleButton = document.querySelector('#toggle-rotation');
const resetButton = document.querySelector('#reset-camera');
const pointerOutput = document.querySelector('#pointer-position');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020815);
scene.fog = new THREE.FogExp2(0x020815, 0.035);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

// Soft fill light prevents the night side from becoming completely black.
scene.add(new THREE.AmbientLight(0x243b55, 0.5));

// The sun stays in world space and does not rotate with the globe.
const sunLight = new THREE.DirectionalLight(0xfff4dc, 3.8);
sunLight.position.set(5, 2.5, 4);
sunLight.target.position.set(0, 0, 0);
scene.add(sunLight, sunLight.target);

const rimLight = new THREE.DirectionalLight(0x2f9dff, 0.75);
rimLight.position.set(-4, 1, -3);
scene.add(rimLight);

const globeGroup = new THREE.Group();
scene.add(globeGroup);

const earthTexture = new THREE.TextureLoader().load('/earth-map.jpg');
earthTexture.colorSpace = THREE.SRGBColorSpace;
earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 96, 64),
  new THREE.MeshPhysicalMaterial({
    map: earthTexture,
    color: 0xffffff,
    roughness: 0.68,
    metalness: 0,
    clearcoat: 0.18,
    clearcoatRoughness: 0.45,
  })
);
globeGroup.add(earth);

const grid = new THREE.LineSegments(
  new THREE.WireframeGeometry(new THREE.SphereGeometry(1.505, 32, 20)),
  new THREE.LineBasicMaterial({
    color: 0x61dafb,
    transparent: true,
    opacity: 0.06,
  })
);
globeGroup.add(grid);

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.57, 64, 32),
  new THREE.MeshBasicMaterial({
    color: 0x2bbcff,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.09,
    blending: THREE.AdditiveBlending,
  })
);
globeGroup.add(atmosphere);

const starCount = 1600;
const starPositions = new Float32Array(starCount * 3);

for (let index = 0; index < starCount; index += 1) {
  const radius = 12 + Math.random() * 28;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  starPositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
  starPositions[index * 3 + 1] = radius * Math.cos(phi);
  starPositions[index * 3 + 2] =
    radius * Math.sin(phi) * Math.sin(theta);
}

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(starPositions, 3)
);

const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({
    color: 0x9ad9ff,
    size: 0.035,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  })
);
scene.add(stars);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const dragState = {
  active: false,
  pointerId: null,
  previousX: 0,
  previousY: 0,
};

function updatePointerCoordinates(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObject(earth)[0];

  if (!hit) {
    pointerOutput.textContent = '尚未选中球面';
    return;
  }

  const point = globeGroup.worldToLocal(hit.point.clone()).normalize();
  const latitude = THREE.MathUtils.radToDeg(Math.asin(point.y));
  const longitude = THREE.MathUtils.radToDeg(
    Math.atan2(point.z, -point.x)
  );

  pointerOutput.textContent =
    `${latitude.toFixed(2)} deg, ${longitude.toFixed(2)} deg`;
}

renderer.domElement.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;

  dragState.active = true;
  dragState.pointerId = event.pointerId;
  dragState.previousX = event.clientX;
  dragState.previousY = event.clientY;
  renderer.domElement.setPointerCapture(event.pointerId);
});

renderer.domElement.addEventListener('pointermove', (event) => {
  if (dragState.active && event.pointerId === dragState.pointerId) {
    const deltaX = event.clientX - dragState.previousX;
    const deltaY = event.clientY - dragState.previousY;

    globeGroup.rotation.y += deltaX * 0.006;
    globeGroup.rotation.x = THREE.MathUtils.clamp(
      globeGroup.rotation.x + deltaY * 0.006,
      -Math.PI / 2,
      Math.PI / 2
    );

    dragState.previousX = event.clientX;
    dragState.previousY = event.clientY;
  }

  updatePointerCoordinates(event);
});

function stopDragging(event) {
  if (event.pointerId !== dragState.pointerId) return;
  dragState.active = false;
  dragState.pointerId = null;
}

renderer.domElement.addEventListener('pointerup', stopDragging);
renderer.domElement.addEventListener('pointercancel', stopDragging);

renderer.domElement.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();
    const nextDistance = THREE.MathUtils.clamp(
      camera.position.length() * Math.exp(event.deltaY * 0.001),
      2.3,
      11
    );
    camera.position.setLength(nextDistance);
    camera.lookAt(0, 0, 0);
  },
  { passive: false }
);

let isAutoRotating = true;

toggleButton.addEventListener('click', () => {
  isAutoRotating = !isAutoRotating;
  toggleButton.textContent = isAutoRotating ? '暂停自转' : '继续自转';
});

resetButton.addEventListener('click', () => {
  camera.position.set(0, 1.2, 5);
  camera.lookAt(0, 0, 0);
  globeGroup.rotation.set(0, 0, 0);
});

const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  const deltaTime = Math.min(clock.getDelta(), 0.05);

  if (isAutoRotating) {
    globeGroup.rotation.y += deltaTime * 0.09;
  }

  stars.rotation.y += deltaTime * 0.003;
  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
