import * as THREE from 'three';
import './style.css';

const container = document.querySelector('#scene');
const toggleButton = document.querySelector('#toggle-rotation');
const resetButton = document.querySelector('#reset-camera');
const pointerOutput = document.querySelector('#pointer-position');
const labelsContainer = document.querySelector('#continent-labels');
const continentPanel = document.querySelector('#continent-panel');
const closeContinentPanelButton = document.querySelector(
  '#close-continent-panel'
);
const continentName = document.querySelector('#continent-name');
const continentSummary = document.querySelector('#continent-summary');
const continentArea = document.querySelector('#continent-area');
const continentPopulation = document.querySelector(
  '#continent-population'
);
const continentFeature = document.querySelector('#continent-feature');

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

const continents = [
  {
    id: 'asia',
    name: '亚洲',
    latitude: 38,
    longitude: 90,
    area: '约 4,458 万平方千米',
    population: '约 48 亿',
    feature: '面积与人口均居世界第一，地形和气候类型极为多样。',
    summary:
      '亚洲横跨北半球和东半球的大部分地区，从北极沿岸延伸至赤道附近，是文明、生态与地貌多样性最丰富的大陆。',
  },
  {
    id: 'africa',
    name: '非洲',
    latitude: 4,
    longitude: 21,
    area: '约 3,037 万平方千米',
    population: '约 15 亿',
    feature: '赤道横贯中部，拥有撒哈拉沙漠、热带草原和雨林。',
    summary:
      '非洲以高原地形为主，生物多样性突出，也是现代人类演化研究中的关键区域。',
  },
  {
    id: 'europe',
    name: '欧洲',
    latitude: 52,
    longitude: 15,
    area: '约 1,018 万平方千米',
    population: '约 7.4 亿',
    feature: '海岸线曲折，温带气候广布，城市化程度较高。',
    summary:
      '欧洲位于欧亚大陆西部，由众多半岛、岛屿和平原构成，在世界近现代科学与工业发展中影响深远。',
  },
  {
    id: 'north-america',
    name: '北美洲',
    latitude: 46,
    longitude: -105,
    area: '约 2,471 万平方千米',
    population: '约 6.1 亿',
    feature: '西部高山、中央平原与东部高地南北纵列分布。',
    summary:
      '北美洲北接北冰洋，东西分别临大西洋和太平洋，覆盖寒带、温带与热带生态系统。',
  },
  {
    id: 'south-america',
    name: '南美洲',
    latitude: -16,
    longitude: -60,
    area: '约 1,784 万平方千米',
    population: '约 4.4 亿',
    feature: '拥有安第斯山脉和世界流域面积最大的亚马孙河。',
    summary:
      '南美洲大部分位于南半球，亚马孙雨林、安第斯高地和南部草原共同构成显著的生态梯度。',
  },
  {
    id: 'oceania',
    name: '大洋洲',
    latitude: -25,
    longitude: 135,
    area: '约 852 万平方千米',
    population: '约 4,600 万',
    feature: '由澳大利亚大陆、新西兰及太平洋众多岛屿组成。',
    summary:
      '大洋洲陆地分散、海洋面积广阔，拥有大量特有物种，并分布着重要的珊瑚礁生态系统。',
  },
  {
    id: 'antarctica',
    name: '南极洲',
    latitude: -78,
    longitude: 20,
    area: '约 1,420 万平方千米',
    population: '无常住人口',
    feature: '绝大部分被冰盖覆盖，是全球气候与冰芯研究重地。',
    summary:
      '南极洲环绕南极点，是平均海拔最高、最寒冷和最干燥的大陆，主要用于和平科学研究。',
  },
];

function latLonToVector3(latitude, longitude, radius) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const markerGeometry = new THREE.SphereGeometry(0.035, 18, 18);
const markerMaterial = new THREE.MeshStandardMaterial({
  color: 0x5ee8ff,
  emissive: 0x0c9ec4,
  emissiveIntensity: 1.2,
  roughness: 0.3,
});
const continentMarkers = [];

for (const continent of continents) {
  const marker = new THREE.Mesh(markerGeometry, markerMaterial.clone());
  marker.position.copy(
    latLonToVector3(continent.latitude, continent.longitude, 1.535)
  );
  marker.userData.continent = continent;
  globeGroup.add(marker);
  continentMarkers.push(marker);

  const label = document.createElement('span');
  label.className = 'continent-label';
  label.textContent = continent.name;
  label.dataset.continentId = continent.id;
  labelsContainer.appendChild(label);
  continent.labelElement = label;
}

function openContinentPanel(continent) {
  continentName.textContent = continent.name;
  continentSummary.textContent = continent.summary;
  continentArea.textContent = continent.area;
  continentPopulation.textContent = continent.population;
  continentFeature.textContent = continent.feature;
  continentPanel.classList.add('is-open');
  continentPanel.setAttribute('aria-hidden', 'false');
}

function closeContinentPanel() {
  continentPanel.classList.remove('is-open');
  continentPanel.setAttribute('aria-hidden', 'true');
}

closeContinentPanelButton.addEventListener('click', closeContinentPanel);

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
  totalDistance: 0,
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
  dragState.totalDistance = 0;
  renderer.domElement.setPointerCapture(event.pointerId);
});

renderer.domElement.addEventListener('pointermove', (event) => {
  if (dragState.active && event.pointerId === dragState.pointerId) {
    const deltaX = event.clientX - dragState.previousX;
    const deltaY = event.clientY - dragState.previousY;
    dragState.totalDistance += Math.hypot(deltaX, deltaY);

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

  if (dragState.totalDistance < 5) {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y =
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const markerHit = raycaster.intersectObjects(continentMarkers)[0];

    if (markerHit) {
      openContinentPanel(markerHit.object.userData.continent);
    }
  }

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
  closeContinentPanel();
});

const clock = new THREE.Clock();
const projectedPosition = new THREE.Vector3();
const worldPosition = new THREE.Vector3();
const worldNormal = new THREE.Vector3();
const cameraDirection = new THREE.Vector3();

function updateContinentLabels() {
  camera.getWorldDirection(cameraDirection);

  for (const continent of continents) {
    const marker = continentMarkers.find(
      (item) => item.userData.continent.id === continent.id
    );
    marker.getWorldPosition(worldPosition);
    worldNormal.copy(worldPosition).normalize();

    const isFrontFacing =
      worldNormal.dot(cameraDirection.clone().negate()) > 0.12;

    projectedPosition.copy(worldPosition).project(camera);
    const isOnScreen =
      Math.abs(projectedPosition.x) <= 1.05 &&
      Math.abs(projectedPosition.y) <= 1.05;

    continent.labelElement.classList.toggle(
      'is-visible',
      isFrontFacing && isOnScreen
    );
    continent.labelElement.style.left =
      `${(projectedPosition.x * 0.5 + 0.5) * window.innerWidth}px`;
    continent.labelElement.style.top =
      `${(-projectedPosition.y * 0.5 + 0.5) * window.innerHeight}px`;
  }
}

renderer.setAnimationLoop(() => {
  const deltaTime = Math.min(clock.getDelta(), 0.05);

  if (isAutoRotating) {
    globeGroup.rotation.y += deltaTime * 0.09;
  }

  stars.rotation.y += deltaTime * 0.003;
  updateContinentLabels();
  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
