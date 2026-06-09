import * as THREE from 'three';

const container = document.querySelector('#scene');
const toggleButton = document.querySelector('#toggle-rotation');
const resetButton = document.querySelector('#reset-camera');
const pointerOutput = document.querySelector('#pointer-position');
const labelsContainer = document.querySelector('#continent-labels');
const continentPanel = document.querySelector('#continent-panel');
const closePanelButton = document.querySelector('#close-continent-panel');
const continentName = document.querySelector('#continent-name');
const continentSummary = document.querySelector('#continent-summary');
const continentArea = document.querySelector('#continent-area');
const continentPopulation = document.querySelector('#continent-population');
const continentFeature = document.querySelector('#continent-feature');

const continents = [
  {
    id: 'asia',
    sourceName: 'Asia',
    name: '亚洲',
    color: 0xff8a5b,
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
    sourceName: 'Africa',
    name: '非洲',
    color: 0xffc857,
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
    sourceName: 'Europe',
    name: '欧洲',
    color: 0xb59cff,
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
    sourceName: 'North America',
    name: '北美洲',
    color: 0x5bd6a2,
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
    sourceName: 'South America',
    name: '南美洲',
    color: 0x65c7ff,
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
    sourceName: 'Oceania',
    name: '大洋洲',
    color: 0xff77a8,
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
    sourceName: 'Antarctica',
    name: '南极洲',
    color: 0x8edcff,
    latitude: -78,
    longitude: 20,
    area: '约 1,420 万平方千米',
    population: '无常住人口',
    feature: '绝大部分被冰盖覆盖，是全球气候与冰芯研究重地。',
    summary:
      '南极洲环绕南极点，是平均海拔最高、最寒冷和最干燥的大陆，主要用于和平科学研究。',
  },
];

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
camera.lookAt(0, 0, 0);

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

scene.add(new THREE.AmbientLight(0x243b55, 0.5));

const sunLight = new THREE.DirectionalLight(0xfff4dc, 3.8);
sunLight.position.set(5, 2.5, 4);
sunLight.target.position.set(0, 0, 0);
scene.add(sunLight, sunLight.target);

const rimLight = new THREE.DirectionalLight(0x2f9dff, 0.75);
rimLight.position.set(-4, 1, -3);
scene.add(rimLight);

const globeGroup = new THREE.Group();
scene.add(globeGroup);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 96, 64),
  new THREE.MeshPhysicalMaterial({
    color: 0x061c32,
    roughness: 0.58,
    metalness: 0,
    clearcoat: 0.42,
    clearcoatRoughness: 0.32,
    emissive: 0x020b14,
    emissiveIntensity: 0.35,
  })
);
globeGroup.add(earth);

const grid = new THREE.LineSegments(
  new THREE.WireframeGeometry(new THREE.SphereGeometry(1.505, 32, 20)),
  new THREE.LineBasicMaterial({
    color: 0x61dafb,
    transparent: true,
    opacity: 0.035,
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

function latLonToVector3(latitude, longitude, radius) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function cleanAndUnwrapRing(ring, referenceLongitude = ring[0][0]) {
  const cleaned = ring.slice(0, -1);
  let previousLongitude = referenceLongitude;

  return cleaned.map(([rawLongitude, latitude], index) => {
    let longitude = rawLongitude;

    if (index > 0) {
      while (longitude - previousLongitude > 180) longitude -= 360;
      while (longitude - previousLongitude < -180) longitude += 360;
    }

    previousLongitude = longitude;
    return new THREE.Vector2(longitude, latitude);
  });
}

const MAX_SURFACE_EDGE_ANGLE = THREE.MathUtils.degToRad(2);
const MAX_SUBDIVISION_DEPTH = 5;

function pushSphericalVertex(position, radius, positions, normals) {
  const normal = position.clone().normalize();
  const surfacePosition = normal.clone().multiplyScalar(radius);

  positions.push(surfacePosition.x, surfacePosition.y, surfacePosition.z);
  normals.push(normal.x, normal.y, normal.z);
}

function appendSphericalTriangle(
  a,
  b,
  c,
  radius,
  positions,
  normals,
  depth = 0
) {
  const maxEdgeAngle = Math.max(
    a.angleTo(b),
    b.angleTo(c),
    c.angleTo(a)
  );

  if (
    maxEdgeAngle <= MAX_SURFACE_EDGE_ANGLE ||
    depth >= MAX_SUBDIVISION_DEPTH
  ) {
    pushSphericalVertex(a, radius, positions, normals);
    pushSphericalVertex(b, radius, positions, normals);
    pushSphericalVertex(c, radius, positions, normals);
    return;
  }

  const ab = a.clone().add(b).normalize();
  const bc = b.clone().add(c).normalize();
  const ca = c.clone().add(a).normalize();

  appendSphericalTriangle(
    a,
    ab,
    ca,
    radius,
    positions,
    normals,
    depth + 1
  );
  appendSphericalTriangle(
    ab,
    b,
    bc,
    radius,
    positions,
    normals,
    depth + 1
  );
  appendSphericalTriangle(
    ca,
    bc,
    c,
    radius,
    positions,
    normals,
    depth + 1
  );
  appendSphericalTriangle(
    ab,
    bc,
    ca,
    radius,
    positions,
    normals,
    depth + 1
  );
}

function appendPolygon(polygon, positions, normals, radius) {
  if (!polygon[0] || polygon[0].length < 4) return;

  const contour = cleanAndUnwrapRing(polygon[0]);
  const referenceLongitude = contour[0].x;
  const holes = polygon
    .slice(1)
    .filter((ring) => ring.length >= 4)
    .map((ring) => cleanAndUnwrapRing(ring, referenceLongitude));
  const faces = THREE.ShapeUtils.triangulateShape(contour, holes);
  const vertices = contour.concat(...holes);
  const sphericalVertices = vertices.map((vertex) =>
    latLonToVector3(vertex.y, vertex.x, 1).normalize()
  );

  for (const face of faces) {
    appendSphericalTriangle(
      sphericalVertices[face[0]],
      sphericalVertices[face[1]],
      sphericalVertices[face[2]],
      radius,
      positions,
      normals
    );
  }
}

function createContinentSurface(continent, features) {
  const positions = [];
  const normals = [];

  for (const feature of features) {
    const { geometry } = feature;
    if (!geometry) continue;

    const polygons =
      geometry.type === 'Polygon'
        ? [geometry.coordinates]
        : geometry.type === 'MultiPolygon'
          ? geometry.coordinates
          : [];

    for (const polygon of polygons) {
      appendPolygon(polygon, positions, normals, 1.516);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute(
    'normal',
    new THREE.Float32BufferAttribute(normals, 3)
  );
  geometry.computeBoundingSphere();

  const material = new THREE.MeshStandardMaterial({
    color: continent.color,
    emissive: continent.color,
    emissiveIntensity: 0.12,
    transparent: false,
    opacity: 1,
    roughness: 0.66,
    metalness: 0,
    side: THREE.FrontSide,
    depthWrite: true,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.continent = continent;
  mesh.userData.baseEmissiveIntensity = material.emissiveIntensity;
  mesh.userData.baseColor = material.color.clone();
  return mesh;
}

const continentSurfaces = [];
const continentAnchors = [];

for (const continent of continents) {
  const anchor = new THREE.Object3D();
  anchor.position.copy(
    latLonToVector3(continent.latitude, continent.longitude, 1.54)
  );
  globeGroup.add(anchor);
  continentAnchors.push(anchor);

  const label = document.createElement('span');
  label.className = 'continent-label';
  label.textContent = continent.name;
  labelsContainer.appendChild(label);
  continent.labelElement = label;
  continent.anchor = anchor;
}

async function loadContinentSurfaces() {
  const dataPaths = [
    '/data/ne_110m_admin_0_countries.geojson',
    '/public/data/ne_110m_admin_0_countries.geojson',
  ];
  let response;

  for (const dataPath of dataPaths) {
    const candidate = await fetch(dataPath);
    if (candidate.ok) {
      response = candidate;
      break;
    }
  }

  if (!response) {
    throw new Error('Natural Earth 数据加载失败');
  }

  const geojson = await response.json();

  for (const continent of continents) {
    const features = geojson.features.filter(
      (feature) =>
        feature.properties?.CONTINENT === continent.sourceName
    );
    const surface = createContinentSurface(continent, features);
    continentSurfaces.push(surface);
    globeGroup.add(surface);
  }
}

loadContinentSurfaces().catch((error) => {
  console.error(error);
  pointerOutput.textContent = '大陆数据加载失败';
});

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

closePanelButton.addEventListener('click', closeContinentPanel);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const dragState = {
  active: false,
  pointerId: null,
  previousX: 0,
  previousY: 0,
  totalDistance: 0,
};
let hoveredSurface = null;

function setPointerFromEvent(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
}

function updateCoordinateOutput() {
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

function updateSurfaceHover() {
  const hit = raycaster.intersectObjects(continentSurfaces)[0];
  const nextSurface = hit?.object ?? null;

  if (hoveredSurface === nextSurface) return;

  if (hoveredSurface) {
    hoveredSurface.material.emissiveIntensity =
      hoveredSurface.userData.baseEmissiveIntensity;
    hoveredSurface.material.color.copy(hoveredSurface.userData.baseColor);
  }

  hoveredSurface = nextSurface;

  if (hoveredSurface) {
    hoveredSurface.material.emissiveIntensity = 0.48;
    hoveredSurface.material.color
      .copy(hoveredSurface.userData.baseColor)
      .lerp(new THREE.Color(0xffffff), 0.18);
    renderer.domElement.style.cursor = 'pointer';
  } else {
    renderer.domElement.style.cursor = dragState.active ? 'grabbing' : 'grab';
  }
}

renderer.domElement.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;

  dragState.active = true;
  dragState.pointerId = event.pointerId;
  dragState.previousX = event.clientX;
  dragState.previousY = event.clientY;
  dragState.totalDistance = 0;
  renderer.domElement.style.cursor = 'grabbing';
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

  setPointerFromEvent(event);
  updateCoordinateOutput();
  updateSurfaceHover();
});

function stopDragging(event) {
  if (event.pointerId !== dragState.pointerId) return;

  if (dragState.totalDistance < 5) {
    setPointerFromEvent(event);
    const surfaceHit = raycaster.intersectObjects(continentSurfaces)[0];

    if (surfaceHit) {
      openContinentPanel(surfaceHit.object.userData.continent);
    }
  }

  dragState.active = false;
  dragState.pointerId = null;
  renderer.domElement.style.cursor = hoveredSurface ? 'pointer' : 'grab';
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
  camera.getWorldDirection(cameraDirection).negate();

  for (let index = 0; index < continents.length; index += 1) {
    const continent = continents[index];
    continentAnchors[index].getWorldPosition(worldPosition);
    worldNormal.copy(worldPosition).normalize();

    const isFrontFacing = worldNormal.dot(cameraDirection) > 0.12;
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
