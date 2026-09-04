import * as THREE from 'three';

const container = document.querySelector('#scene');
const toggleButton = document.querySelector('#toggle-rotation');
const resetButton = document.querySelector('#reset-camera');
const pointerOutput = document.querySelector('#pointer-position');
const pointerDecimalOutput = document.querySelector(
  '#pointer-position-decimal'
);
const layerOptions = document.querySelector('#layer-options');
const terrainStatus = document.querySelector('#terrain-status');
const labelsContainer = document.querySelector('#continent-labels');
const fishLabelsContainer = document.querySelector('#fish-labels');
const continentPanel = document.querySelector('#continent-panel');
const closePanelButton = document.querySelector('#close-continent-panel');
const continentName = document.querySelector('#continent-name');
const continentSummary = document.querySelector('#continent-summary');
const continentArea = document.querySelector('#continent-area');
const continentPopulation = document.querySelector('#continent-population');
const continentFeature = document.querySelector('#continent-feature');
const continentTerrainStatus = document.querySelector(
  '#continent-terrain-status'
);
const fishSpeciesSelect = document.querySelector('#fish-species-select');
const fishControls = document.querySelector('.fish-controls');
const fishYearSlider = document.querySelector('#fish-year-slider');
const fishYearOutput = document.querySelector('#fish-year-output');
const fishTrackStartSlider = document.querySelector(
  '#fish-track-start-slider'
);
const fishTrackStartOutput = document.querySelector(
  '#fish-track-start-output'
);
const fishTrackEndSlider = document.querySelector('#fish-track-end-slider');
const fishTrackEndOutput = document.querySelector('#fish-track-end-output');
const fishTrackControls = document.querySelectorAll('.fish-track-control');
const fishStatus = document.querySelector('#fish-status');
const fishPanel = document.querySelector('#fish-panel');
const closeFishPanelButton = document.querySelector('#close-fish-panel');
const fishIllustration = document.querySelector('#fish-illustration');
const fishName = document.querySelector('#fish-name');
const fishScientificName = document.querySelector('#fish-scientific-name');
const fishSummary = document.querySelector('#fish-summary');
const fishTaxonomy = document.querySelector('#fish-taxonomy');
const fishHabitat = document.querySelector('#fish-habitat');
const fishRecordDetail = document.querySelector('#fish-record-detail');
const fishTrackDetail = document.querySelector('#fish-track-detail');

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

const fishSpecies = [
  {
    id: 'yellowfin-tuna',
    name: '黄鳍金枪鱼',
    scientificName: 'Thunnus albacares',
    color: 0xffc857,
    taxonomy: '硬骨鱼纲 / 鲭形目 / 鲭科',
    habitat:
      '主要活动于热带和亚热带外海上层水域，常与暖水锋面、上升流边缘和岛弧海域相关。',
    summary:
      '高速游泳的大洋性掠食鱼类，是全球金枪鱼渔业中的重要目标物种。其分布对海温、溶解氧和饵料鱼群变化敏感。',
    sourceNote:
      'v1.8 内置代表性年度栖息地节点；科研使用时应替换为 OBIS、GBIF、区域调查或标记放流数据。',
    records: [
      { year: 2000, latitude: -5, longitude: 150, region: '西太平洋暖池', evidence: '热带外海栖息节点' },
      { year: 2005, latitude: -2, longitude: 175, region: '赤道中太平洋', evidence: '暖水锋面节点' },
      { year: 2010, latitude: 6, longitude: -155, region: '中东太平洋', evidence: '岛弧外海节点' },
      { year: 2015, latitude: 9, longitude: -110, region: '东太平洋上升流边缘', evidence: '生产力边缘节点' },
      { year: 2020, latitude: 0, longitude: -35, region: '赤道大西洋', evidence: '跨洋分布节点' },
      { year: 2024, latitude: -10, longitude: 75, region: '印度洋中部', evidence: '热带印度洋节点' },
    ],
  },
  {
    id: 'atlantic-cod',
    name: '大西洋鳕',
    scientificName: 'Gadus morhua',
    color: 0x8edcff,
    taxonomy: '硬骨鱼纲 / 鳕形目 / 鳕科',
    habitat:
      '偏好北大西洋大陆架冷水环境，常见于近底层、浅海银行和峡湾系统。',
    summary:
      '典型冷水底栖-近底层鱼类，历史上支撑北大西洋重要渔业。其分布边界与海温、底质和渔业压力关系密切。',
    sourceNote:
      'v1.8 内置代表性年度栖息地节点；真实趋势需使用 NOAA、ICES、OBIS 或区域调查序列校验。',
    records: [
      { year: 2000, latitude: 47, longitude: -52, region: '纽芬兰大陆架', evidence: '冷水大陆架节点' },
      { year: 2005, latitude: 50, longitude: -45, region: '拉布拉多海边缘', evidence: '北移边缘节点' },
      { year: 2010, latitude: 57, longitude: -7, region: '苏格兰以西海域', evidence: '东北大西洋节点' },
      { year: 2015, latitude: 62, longitude: -4, region: '法罗-设得兰海槽', evidence: '高纬陆架节点' },
      { year: 2020, latitude: 67, longitude: 18, region: '巴伦支海西南部', evidence: '北极边缘节点' },
      { year: 2024, latitude: 70, longitude: 32, region: '巴伦支海东部', evidence: '高纬栖息节点' },
    ],
  },
  {
    id: 'blue-shark',
    name: '蓝鲨',
    scientificName: 'Prionace glauca',
    color: 0x65c7ff,
    taxonomy: '软骨鱼纲 / 真鲨目 / 真鲨科',
    habitat:
      '广布于温带和热带大洋表层至中层水域，常沿洋流边界、锋面和生产力带活动。',
    summary:
      '迁移能力强的大洋性鲨鱼，跨越洋盆尺度活动。其轨迹研究通常依赖卫星标记或声学遥测。',
    sourceNote:
      'v1.8 内置代表性年度节点；若接入遥测数据，可将当前轨迹线升级为真实个体迁徙路线。',
    records: [
      { year: 2000, latitude: 36, longitude: -45, region: '北大西洋中部', evidence: '大洋锋面节点' },
      { year: 2005, latitude: 31, longitude: -25, region: '亚速尔外海', evidence: '环流边缘节点' },
      { year: 2010, latitude: 24, longitude: -15, region: '加那利洋流区', evidence: '东边界流节点' },
      { year: 2015, latitude: 18, longitude: -35, region: '热带北大西洋', evidence: '热带外海节点' },
      { year: 2020, latitude: -22, longitude: -20, region: '南大西洋副热带环流', evidence: '跨赤道节点' },
      { year: 2024, latitude: -35, longitude: 18, region: '南非西岸外海', evidence: '本格拉边缘节点' },
    ],
  },
  {
    id: 'whale-shark',
    name: '鲸鲨',
    scientificName: 'Rhincodon typus',
    color: 0xb59cff,
    taxonomy: '软骨鱼纲 / 须鲨目 / 鲸鲨科',
    habitat:
      '热带和亚热带海域滤食性大型鲨鱼，常出现在浮游生物暴发、珊瑚礁外缘和岛屿近海。',
    summary:
      '现生最大鱼类，以滤食浮游生物和小型 nekton 为主。季节性聚集常与生产力脉冲和繁殖事件相关。',
    sourceNote:
      'v1.8 内置代表性年度节点；真实迁移需接入卫星标记、照片识别或区域保护区监测资料。',
    records: [
      { year: 2000, latitude: 20, longitude: -87, region: '尤卡坦半岛外海', evidence: '季节性聚集节点' },
      { year: 2005, latitude: 9, longitude: 120, region: '菲律宾群岛外海', evidence: '岛弧近海节点' },
      { year: 2010, latitude: -8, longitude: 115, region: '印尼巽他群岛', evidence: '热带岛链节点' },
      { year: 2015, latitude: -18, longitude: 118, region: '西澳宁格鲁海域', evidence: '珊瑚礁外缘节点' },
      { year: 2020, latitude: -4, longitude: 39, region: '东非近海', evidence: '西印度洋节点' },
      { year: 2024, latitude: 13, longitude: 51, region: '阿拉伯海', evidence: '高生产力节点' },
    ],
  },
  {
    id: 'pacific-sardine',
    name: '太平洋沙丁鱼',
    scientificName: 'Sardinops sagax',
    color: 0x5bd6a2,
    taxonomy: '硬骨鱼纲 / 鲱形目 / 鲱科',
    habitat:
      '常见于东太平洋沿岸上升流系统，受海温、浮游生物和年代际气候振荡影响明显。',
    summary:
      '小型群游性鱼类，是上升流生态系统中的关键饵料鱼。丰度和分布常呈现明显年代际波动。',
    sourceNote:
      'v1.8 内置代表性年度节点；真实分析应结合渔业调查、声学调查和海表环境数据。',
    records: [
      { year: 2000, latitude: 32, longitude: -118, region: '加利福尼亚湾口外海', evidence: '沿岸上升流节点' },
      { year: 2005, latitude: 38, longitude: -124, region: '北加州外海', evidence: '北移沿岸节点' },
      { year: 2010, latitude: 44, longitude: -125, region: '俄勒冈外海', evidence: '冷水边缘节点' },
      { year: 2015, latitude: 36, longitude: -122, region: '蒙特雷湾外海', evidence: '中加州节点' },
      { year: 2020, latitude: 29, longitude: -115, region: '下加利福尼亚外海', evidence: '南部沿岸节点' },
      { year: 2024, latitude: 34, longitude: -120, region: '南加州湾曲', evidence: '当前沿岸节点' },
    ],
  },
];

const terrainBounds = {
  asia: { west: 25, east: 180, south: -10, north: 82 },
  africa: { west: -20, east: 55, south: -36, north: 38 },
  europe: { west: -25, east: 45, south: 34, north: 72 },
  'north-america': { west: -170, east: -50, south: 5, north: 84 },
  'south-america': { west: -82, east: -34, south: -56, north: 14 },
  oceania: { west: 110, east: 180, south: -50, north: 10 },
  antarctica: { west: -180, east: 180, south: -86, north: -60 },
};

const TERRAIN_TILE_ZOOM = 5;
const TERRAIN_SEGMENTS_PER_TILE = 32;
const EARTH_RADIUS_METERS = 6371000;
const TERRAIN_BASE_RADIUS = 1.523;
const TERRAIN_EXAGGERATION = 35;
const CONTOUR_LEVELS = [200, 500, 1000, 2000, 3000, 5000];
const LAND_TEXTURE_WIDTH = 4096;
const LAND_TEXTURE_HEIGHT = 2048;
const FISH_MARKER_RADIUS = 1.565;
const FISH_TRACK_RADIUS = 1.555;

function createHighlightTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(48, 48, 4, 48, 48, 44);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.35, 'rgba(103, 232, 249, 0.55)');
  gradient.addColorStop(1, 'rgba(103, 232, 249, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const landHighlightMaterial = new THREE.SpriteMaterial({
  map: createHighlightTexture(),
  transparent: true,
  opacity: 0.78,
  depthWrite: false,
});

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
  new THREE.MeshBasicMaterial({
    color: 0x0d4f78,
  })
);
globeGroup.add(earth);

const oceanRim = new THREE.Mesh(
  new THREE.SphereGeometry(1.502, 96, 64),
  new THREE.MeshBasicMaterial({
    color: 0x1d9fd1,
    transparent: true,
    opacity: 0.18,
    wireframe: true,
    depthWrite: false,
  })
);
globeGroup.add(oceanRim);

const landOverlay = new THREE.Mesh(
  new THREE.SphereGeometry(1.508, 128, 64),
  new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  })
);
landOverlay.visible = false;
globeGroup.add(landOverlay);

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

function createGeographicLine(coordinates, material) {
  const points = coordinates.map(([latitude, longitude]) =>
    latLonToVector3(latitude, longitude, 1.527)
  );
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    material
  );
}

function createGraticule() {
  const group = new THREE.Group();
  const regularMaterial = new THREE.LineBasicMaterial({
    color: 0x65cfff,
    transparent: true,
    opacity: 0.22,
  });
  const majorMaterial = new THREE.LineBasicMaterial({
    color: 0x8de4ff,
    transparent: true,
    opacity: 0.4,
  });
  const referenceMaterial = new THREE.LineBasicMaterial({
    color: 0xd5f7ff,
    transparent: true,
    opacity: 0.68,
  });

  for (let latitude = -80; latitude <= 80; latitude += 10) {
    const coordinates = [];
    for (let longitude = -180; longitude <= 180; longitude += 2) {
      coordinates.push([latitude, longitude]);
    }

    const material =
      latitude === 0
        ? referenceMaterial
        : latitude % 30 === 0
          ? majorMaterial
          : regularMaterial;
    group.add(createGeographicLine(coordinates, material));
  }

  for (let longitude = -180; longitude < 180; longitude += 10) {
    const coordinates = [];
    for (let latitude = -90; latitude <= 90; latitude += 2) {
      coordinates.push([latitude, longitude]);
    }

    const material =
      longitude === 0
        ? referenceMaterial
        : longitude % 30 === 0
          ? majorMaterial
          : regularMaterial;
    group.add(createGeographicLine(coordinates, material));
  }

  return group;
}

const graticule = createGraticule();
globeGroup.add(graticule);

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

function longitudeToTextureX(longitude) {
  return ((longitude + 180) / 360) * LAND_TEXTURE_WIDTH;
}

function latitudeToTextureY(latitude) {
  return ((90 - latitude) / 180) * LAND_TEXTURE_HEIGHT;
}

function drawRingPath(context, ring, longitudeOffset = 0) {
  ring.forEach(([rawLongitude, latitude], index) => {
    const longitude = rawLongitude + longitudeOffset;
    const x = longitudeToTextureX(longitude);
    const y = latitudeToTextureY(latitude);

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.closePath();
}

function drawPolygonPath(context, polygon, longitudeOffset = 0) {
  for (const ring of polygon) {
    if (ring.length < 4) continue;
    drawRingPath(context, ring, longitudeOffset);
  }
}

function getFeaturePolygons(feature) {
  const geometry = feature.geometry;
  if (!geometry) return [];

  if (geometry.type === 'Polygon') return [geometry.coordinates];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates;
  return [];
}

function renderLandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = LAND_TEXTURE_WIDTH;
  canvas.height = LAND_TEXTURE_HEIGHT;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const continent of continents) {
    const features = continentFeaturesById.get(continent.id) ?? [];
    const baseColor = new THREE.Color(continent.color);
    const color = baseColor.clone().lerp(new THREE.Color(0xffffff), 0.2);
    context.fillStyle = `#${color.getHexString()}`;

    context.beginPath();
    for (const feature of features) {
      for (const polygon of getFeaturePolygons(feature)) {
        drawPolygonPath(context, polygon);
        drawPolygonPath(context, polygon, -360);
        drawPolygonPath(context, polygon, 360);
      }
    }
    context.fill('evenodd');
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texture.needsUpdate = true;
  return texture;
}

function updateLandTexture() {
  const previousTexture = landOverlay.material.map;
  landOverlay.material.map = renderLandTexture();
  landOverlay.material.needsUpdate = true;
  previousTexture?.dispose();
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
    const geometricNormal = b
      .clone()
      .sub(a)
      .cross(c.clone().sub(a));
    const triangleCenter = a.clone().add(b).add(c);

    if (geometricNormal.dot(triangleCenter) < 0) {
      [b, c] = [c, b];
    }

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

const continentAnchors = [];
const continentFeaturesById = new Map();
const continentLayer = new THREE.Group();
globeGroup.add(continentLayer);
const landHighlight = new THREE.Sprite(landHighlightMaterial);
landHighlight.visible = false;
landHighlight.scale.set(0.13, 0.13, 1);
continentLayer.add(landHighlight);
const fishLayer = new THREE.Group();
globeGroup.add(fishLayer);
fishLayer.visible = false;
const fishTrackLayer = new THREE.Group();
globeGroup.add(fishTrackLayer);
fishTrackLayer.visible = false;
const terrainLayer = new THREE.Group();
globeGroup.add(terrainLayer);
const contourLayer = new THREE.Group();
globeGroup.add(contourLayer);
let continentSurfacesReady = false;
let fishRecordsReady = false;
let selectedTerrainContinent = null;
let terrainLoadingContinentId = null;
let terrainRequestId = 0;
const layerState = {
  continents: true,
  continentLabels: true,
  graticule: true,
  fishAtlas: false,
  fishRecords: true,
  fishLabels: true,
  fishTrack: true,
  terrain: false,
  contours: false,
};

const layerDefinitions = [
  {
    id: 'continents',
    label: '大陆底图',
    target: landOverlay,
    onChange(visible) {
      if (!visible) closeContinentPanel();
      hoveredSurface = null;
      landHighlight.visible = false;
    },
  },
  {
    id: 'continentLabels',
    label: '大陆名称',
    onChange() {
      updateContinentLabels();
    },
  },
  {
    id: 'graticule',
    label: '经纬度网格',
    target: graticule,
  },
  {
    id: 'fishAtlas',
    label: '鱼类图鉴',
    onChange(visible) {
      applyFishAtlasVisibility(visible);
    },
  },
  {
    id: 'fishRecords',
    label: '鱼类节点',
    target: fishLayer,
    disabled: true,
    onChange() {
      closeFishPanel();
      applyFishAtlasVisibility(layerState.fishAtlas);
    },
  },
  {
    id: 'fishLabels',
    label: '鱼类名称',
    disabled: true,
    onChange() {
      updateFishLabels();
    },
  },
  {
    id: 'fishTrack',
    label: '分布轨迹',
    target: fishTrackLayer,
    disabled: true,
    onChange() {
      applyFishTrackControlVisibility();
      applyFishAtlasVisibility(layerState.fishAtlas);
    },
  },
  {
    id: 'terrain',
    label: 'DEM 地形',
    meta: '选择大陆',
    target: terrainLayer,
    disabled: true,
  },
  {
    id: 'contours',
    label: '等高线',
    meta: '等待地形',
    target: contourLayer,
    disabled: true,
  },
];

for (const layer of layerDefinitions) {
  const option = document.createElement('label');
  option.className = 'layer-option';

  const label = document.createElement('span');
  label.textContent = layer.label;

  if (layer.meta) {
    const meta = document.createElement('small');
    meta.className = 'layer-option__meta';
    meta.textContent = layer.meta;
    option.append(label, meta);
  } else {
    option.append(label);
  }

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = layerState[layer.id];
  input.disabled = Boolean(layer.disabled);
  input.setAttribute('aria-label', `显示${layer.label}`);
  input.addEventListener('change', () => {
    layerState[layer.id] = input.checked;
    if (layer.target) layer.target.visible = input.checked;
    layer.onChange?.(input.checked);
  });

  option.append(input);
  layerOptions.appendChild(option);
  layer.input = input;
  layer.metaElement = option.querySelector('.layer-option__meta');
}

for (const continent of continents) {
  const anchor = new THREE.Object3D();
  anchor.position.copy(
    latLonToVector3(continent.latitude, continent.longitude, 1.54)
  );
  continentLayer.add(anchor);
  continentAnchors.push(anchor);

  const label = document.createElement('span');
  label.className = 'continent-label';
  label.textContent = continent.name;
  labelsContainer.appendChild(label);
  continent.labelElement = label;
  continent.anchor = anchor;
}

const fishYears = [
  ...new Set(
    fishSpecies.flatMap((species) =>
      species.records.map((record) => record.year)
    )
  ),
].sort((a, b) => a - b);
const fishRecordMeshes = [];
const fishMarkerGeometry = new THREE.IcosahedronGeometry(0.026, 2);
let currentFishTrack = null;
let hoveredFishMarker = null;

for (const species of fishSpecies) {
  const option = document.createElement('option');
  option.value = species.id;
  option.textContent = `${species.name} / ${species.scientificName}`;
  fishSpeciesSelect.appendChild(option);
}

fishYearSlider.min = 0;
fishYearSlider.max = fishYears.length - 1;
fishYearSlider.step = 1;
fishYearSlider.value = fishYears.length - 1;
fishTrackStartSlider.min = 0;
fishTrackStartSlider.max = fishYears.length - 1;
fishTrackStartSlider.step = 1;
fishTrackStartSlider.value = 0;
fishTrackEndSlider.min = 0;
fishTrackEndSlider.max = fishYears.length - 1;
fishTrackEndSlider.step = 1;
fishTrackEndSlider.value = fishYears.length - 1;

function getSelectedFishSpecies() {
  return (
    fishSpecies.find((species) => species.id === fishSpeciesSelect.value) ??
    fishSpecies[0]
  );
}

function getSelectedFishYear() {
  return fishYears[Number(fishYearSlider.value)] ?? fishYears.at(-1);
}

function getSelectedTrackStartYear() {
  return fishYears[Number(fishTrackStartSlider.value)] ?? fishYears[0];
}

function getSelectedTrackEndYear() {
  return fishYears[Number(fishTrackEndSlider.value)] ?? fishYears.at(-1);
}

function clearFishRecords() {
  for (const mesh of fishRecordMeshes) {
    mesh.userData.labelElement?.remove();
    fishLayer.remove(mesh);
    mesh.material.dispose();
  }
  fishRecordMeshes.length = 0;
  hoveredFishMarker = null;
}

function clearFishTrack() {
  if (!currentFishTrack) return;
  fishTrackLayer.remove(currentFishTrack);
  disposeObject(currentFishTrack);
  currentFishTrack = null;
}

function createFishMarker(species, record) {
  const material = new THREE.MeshStandardMaterial({
    color: species.color,
    emissive: species.color,
    emissiveIntensity: 0.45,
    roughness: 0.42,
    metalness: 0.08,
  });
  const marker = new THREE.Mesh(fishMarkerGeometry, material);
  marker.position.copy(
    latLonToVector3(record.latitude, record.longitude, FISH_MARKER_RADIUS)
  );
  marker.userData.species = species;
  marker.userData.record = record;

  const label = document.createElement('span');
  label.className = 'fish-label';
  label.textContent = species.name;
  fishLabelsContainer.appendChild(label);
  marker.userData.labelElement = label;

  return marker;
}

function updateFishStatus() {
  if (!layerState.fishAtlas) {
    fishStatus.textContent = '鱼类图鉴已关闭；开启后显示年度节点与轨迹';
    return;
  }

  const selectedSpecies = getSelectedFishSpecies();
  const year = getSelectedFishYear();
  const visibleRecords = fishRecordMeshes.length;
  const trackStart = getSelectedTrackStartYear();
  const trackEnd = getSelectedTrackEndYear();
  const trackStatus = layerState.fishTrack
    ? `轨迹范围 ${trackStart}–${trackEnd}`
    : '轨迹显示已关闭';
  fishStatus.textContent =
    `${year} 年显示 ${visibleRecords} 个鱼类节点；` +
    `${selectedSpecies.name} ${trackStatus}`;
}

function updateFishRecords() {
  clearFishRecords();

  const year = getSelectedFishYear();
  fishYearOutput.textContent = String(year);
  fishRecordsReady = true;

  if (!layerState.fishAtlas || !layerState.fishRecords) {
    updateFishStatus();
    return;
  }

  for (const species of fishSpecies) {
    for (const record of species.records) {
      if (record.year !== year) continue;
      const marker = createFishMarker(species, record);
      fishLayer.add(marker);
      fishRecordMeshes.push(marker);
    }
  }

  updateFishLabels();
  updateFishStatus();
}

function createGreatCirclePoints(start, end, segments, radius) {
  const startNormal = start.clone().normalize();
  const endNormal = end.clone().normalize();
  const points = [];

  for (let index = 0; index <= segments; index += 1) {
    const mix = index / segments;
    points.push(
      startNormal.clone().slerp(endNormal, mix).multiplyScalar(radius)
    );
  }

  return points;
}

function vectorToGeoPosition(vector) {
  const point = vector.clone().normalize();
  return {
    latitude: THREE.MathUtils.radToDeg(Math.asin(point.y)),
    longitude: THREE.MathUtils.radToDeg(Math.atan2(-point.z, point.x)),
  };
}

function getRawContinentAtCoordinates(latitude, longitude) {
  if (!continentSurfacesReady) return null;

  return (
    continents.find((continent) =>
      pointInContinent(
        longitude,
        latitude,
        continentFeaturesById.get(continent.id) ?? []
      )
    ) ?? null
  );
}

function countLandIntersections(points) {
  if (!continentSurfacesReady) return 0;

  let landHits = 0;
  for (const point of points) {
    const { latitude, longitude } = vectorToGeoPosition(point);
    if (getRawContinentAtCoordinates(latitude, longitude)) landHits += 1;
  }

  return landHits;
}

function getTrackAngularLength(points) {
  let total = 0;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index].clone().normalize();
    const next = points[index + 1].clone().normalize();
    total += current.angleTo(next);
  }

  return total;
}

function createDetourWaypoint(start, end, direction) {
  const startNormal = start.clone().normalize();
  const endNormal = end.clone().normalize();
  const midpoint = startNormal.clone().slerp(endNormal, 0.5).normalize();
  const routeAxis = startNormal.clone().cross(endNormal);

  if (routeAxis.lengthSq() < 0.000001) {
    routeAxis.set(0, 1, 0);
  } else {
    routeAxis.normalize();
  }

  const sideAxis = routeAxis.clone().cross(midpoint).normalize();
  return midpoint
    .applyAxisAngle(sideAxis, THREE.MathUtils.degToRad(24 * direction))
    .normalize()
    .multiplyScalar(FISH_TRACK_RADIUS);
}

function createOceanAwareSegmentPoints(start, end) {
  const directPoints = createGreatCirclePoints(start, end, 32, FISH_TRACK_RADIUS);
  const directHits = countLandIntersections(directPoints);

  if (directHits === 0) {
    return {
      points: directPoints,
      usedDetour: false,
      landHits: 0,
    };
  }

  const candidates = [-1, 1].map((direction) => {
    const waypoint = createDetourWaypoint(start, end, direction);
    const firstLeg = createGreatCirclePoints(
      start,
      waypoint,
      20,
      FISH_TRACK_RADIUS
    );
    const secondLeg = createGreatCirclePoints(
      waypoint,
      end,
      20,
      FISH_TRACK_RADIUS
    );
    const points = [...firstLeg, ...secondLeg.slice(1)];
    return {
      points,
      usedDetour: true,
      landHits: countLandIntersections(points),
      angularLength: getTrackAngularLength(points),
    };
  });

  candidates.push({
    points: directPoints,
    usedDetour: false,
    landHits: directHits,
    angularLength: getTrackAngularLength(directPoints),
  });

  candidates.sort(
    (a, b) => a.landHits - b.landHits || a.angularLength - b.angularLength
  );

  return candidates[0];
}

function createTrackArrow(points, color) {
  if (points.length < 2) return null;

  const end = points.at(-1);
  const previous = points[Math.max(points.length - 7, 0)];
  const direction = end.clone().sub(previous).normalize();
  const origin = previous.clone();
  return new THREE.ArrowHelper(
    direction,
    origin,
    0.18,
    color,
    0.07,
    0.045
  );
}

function createTrackNode(record, color) {
  const geometry = new THREE.SphereGeometry(0.018, 12, 8);
  const material = new THREE.MeshBasicMaterial({ color });
  const node = new THREE.Mesh(geometry, material);
  node.position.copy(
    latLonToVector3(record.latitude, record.longitude, FISH_TRACK_RADIUS + 0.003)
  );
  return node;
}

function getSpeciesRecordsInRange(species, startYear, endYear) {
  return species.records
    .filter(
      (record) => record.year >= startYear && record.year <= endYear
    )
    .sort((a, b) => a.year - b.year);
}

function updateFishTrack() {
  clearFishTrack();

  const startYear = Math.min(
    getSelectedTrackStartYear(),
    getSelectedTrackEndYear()
  );
  const endYear = Math.max(
    getSelectedTrackStartYear(),
    getSelectedTrackEndYear()
  );
  fishTrackStartOutput.textContent = String(startYear);
  fishTrackEndOutput.textContent = String(endYear);

  if (!layerState.fishAtlas || !layerState.fishTrack) {
    fishTrackDetail.textContent = layerState.fishTrack
      ? '开启鱼类图鉴后可生成时间轨迹。'
      : '分布轨迹已关闭。';
    updateFishStatus();
    return;
  }

  const species = getSelectedFishSpecies();
  const records = getSpeciesRecordsInRange(species, startYear, endYear);

  if (records.length < 2) {
    fishTrackDetail.textContent = '当前时间段不足两个节点，无法生成轨迹。';
    updateFishStatus();
    return;
  }

  const trackGroup = new THREE.Group();
  const points = [];
  let detourCount = 0;

  for (let index = 0; index < records.length - 1; index += 1) {
    const current = records[index];
    const next = records[index + 1];
    const start = latLonToVector3(
      current.latitude,
      current.longitude,
      FISH_TRACK_RADIUS
    );
    const end = latLonToVector3(
      next.latitude,
      next.longitude,
      FISH_TRACK_RADIUS
    );
    const segmentResult = createOceanAwareSegmentPoints(start, end);
    const segmentPoints = segmentResult.points;
    if (segmentResult.usedDetour) detourCount += 1;
    points.push(...(index === 0 ? segmentPoints : segmentPoints.slice(1)));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: species.color,
    transparent: true,
    opacity: 0.9,
  });
  trackGroup.add(new THREE.Line(geometry, material));

  const arrow = createTrackArrow(points, species.color);
  if (arrow) trackGroup.add(arrow);

  for (const record of records) {
    trackGroup.add(createTrackNode(record, species.color));
  }

  currentFishTrack = trackGroup;
  fishTrackLayer.add(currentFishTrack);
  fishTrackLayer.visible = true;

  const routingText =
    detourCount > 0
      ? `其中 ${detourCount} 段触发避陆绕行候选。`
      : '所有区段使用大圆最短路径。';
  fishTrackDetail.textContent =
    `${species.name}：${startYear}–${endYear}，${records.length} 个年度栖息地节点；${routingText}`;
  updateFishStatus();
}

function getFishIntersection() {
  if (
    !fishRecordsReady ||
    !layerState.fishAtlas ||
    !layerState.fishRecords
  ) {
    return null;
  }
  return raycaster.intersectObjects(fishRecordMeshes, false)[0] ?? null;
}

function openFishPanel(species, record) {
  closeContinentPanel();
  fishSpeciesSelect.value = species.id;
  fishIllustration.style.setProperty(
    '--fish-color',
    `#${new THREE.Color(species.color).getHexString()}`
  );
  fishName.textContent = species.name;
  fishScientificName.textContent = species.scientificName;
  fishSummary.textContent = `${species.summary} ${species.sourceNote}`;
  fishTaxonomy.textContent = species.taxonomy;
  fishHabitat.textContent = species.habitat;
  fishRecordDetail.textContent =
    `${record.year} 年，${record.region}（${formatDms(record.latitude, '北纬', '南纬')}，${formatDms(record.longitude, '东经', '西经')}）：${record.evidence}`;
  updateFishTrack();
  fishPanel.classList.add('is-open');
  fishPanel.setAttribute('aria-hidden', 'false');
}

function closeFishPanel() {
  fishPanel.classList.remove('is-open');
  fishPanel.setAttribute('aria-hidden', 'true');
}

closeFishPanelButton.addEventListener('click', closeFishPanel);

fishSpeciesSelect.addEventListener('change', () => {
  updateFishTrack();
  updateFishStatus();
});

fishYearSlider.addEventListener('input', () => {
  updateFishRecords();
});

fishTrackStartSlider.addEventListener('input', () => {
  updateFishTrack();
});

fishTrackEndSlider.addEventListener('input', () => {
  updateFishTrack();
});

async function loadContinentSurfaces() {
  pointerOutput.textContent = '正在生成大陆底图...';

  let geojson = globalThis.__CONTINENT_GEOJSON__;

  if (!geojson) {
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

    geojson = await response.json();
  }

  for (const continent of continents) {
    const features = geojson.features.filter(
      (feature) =>
        feature.properties?.CONTINENT === continent.sourceName
    );
    continentFeaturesById.set(continent.id, features);
  }

  updateLandTexture();
  landOverlay.visible = layerState.continents;
  continentSurfacesReady = true;
  if (layerState.fishAtlas && layerState.fishTrack) updateFishTrack();
  pointerOutput.textContent = '尚未选中球面';
  pointerDecimalOutput.textContent = '';
}

loadContinentSurfaces().catch((error) => {
  console.error(error);
  pointerOutput.textContent = '大陆底图生成失败，请检查数据文件';
  pointerDecimalOutput.textContent = '';
});

function getLayerDefinition(id) {
  return layerDefinitions.find((layer) => layer.id === id);
}

function setLayerAvailability(id, enabled, meta) {
  const layer = getLayerDefinition(id);
  layer.input.disabled = !enabled;
  if (layer.metaElement && meta) layer.metaElement.textContent = meta;
}

function setTerrainStatus(message, state = '') {
  terrainStatus.textContent = message;
  terrainStatus.classList.toggle('is-loading', state === 'loading');
  terrainStatus.classList.toggle('is-error', state === 'error');
  continentTerrainStatus.textContent = message;
}

function applyFishTrackControlVisibility() {
  const showTrackControls = layerState.fishAtlas && layerState.fishTrack;
  fishControls.classList.toggle('has-track', showTrackControls);
  for (const control of fishTrackControls) {
    control.toggleAttribute('hidden', !showTrackControls);
  }
}

function applyFishAtlasVisibility(enabled) {
  const controlledLayerIds = ['fishRecords', 'fishLabels', 'fishTrack'];
  fishControls.classList.toggle('is-disabled', !enabled);
  applyFishTrackControlVisibility();

  for (const id of controlledLayerIds) {
    const layer = getLayerDefinition(id);
    layer.input.disabled = !enabled;
  }

  fishSpeciesSelect.disabled = !enabled;
  fishYearSlider.disabled = !enabled;
  fishTrackStartSlider.disabled = !enabled || !layerState.fishTrack;
  fishTrackEndSlider.disabled = !enabled || !layerState.fishTrack;
  fishLayer.visible = enabled && layerState.fishRecords;
  fishTrackLayer.visible = enabled && layerState.fishTrack;

  if (!enabled) {
    closeFishPanel();
    hoveredFishMarker?.scale.setScalar(1);
    hoveredFishMarker = null;
    fishStatus.textContent = '鱼类图鉴已关闭；开启后显示年度节点与轨迹';
    updateFishLabels();
    return;
  }

  updateFishRecords();
  updateFishTrack();
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose());
    } else {
      child.material?.dispose();
    }
  });
}

function clearGeneratedTerrain() {
  for (const layer of [terrainLayer, contourLayer]) {
    for (const child of [...layer.children]) {
      layer.remove(child);
      disposeObject(child);
    }
  }
}

function pointInRing(longitude, latitude, ring) {
  let inside = false;

  for (
    let current = 0, previous = ring.length - 1;
    current < ring.length;
    previous = current, current += 1
  ) {
    const [currentLongitude, currentLatitude] = ring[current];
    const [previousLongitude, previousLatitude] = ring[previous];
    const crossesLatitude =
      currentLatitude > latitude !== previousLatitude > latitude;
    const crossingLongitude =
      ((previousLongitude - currentLongitude) *
        (latitude - currentLatitude)) /
        (previousLatitude - currentLatitude) +
      currentLongitude;

    if (crossesLatitude && longitude < crossingLongitude) {
      inside = !inside;
    }
  }

  return inside;
}

function pointInPolygon(longitude, latitude, polygon) {
  if (!pointInRing(longitude, latitude, polygon[0])) return false;

  for (let index = 1; index < polygon.length; index += 1) {
    if (pointInRing(longitude, latitude, polygon[index])) return false;
  }

  return true;
}

function pointInContinent(longitude, latitude, features) {
  return features.some((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return false;

    const polygons =
      geometry.type === 'Polygon'
        ? [geometry.coordinates]
        : geometry.type === 'MultiPolygon'
          ? geometry.coordinates
          : [];

    return polygons.some((polygon) =>
      pointInPolygon(longitude, latitude, polygon)
    );
  });
}

function normalizeContinentHit(continent, latitude, longitude) {
  if (!continent) return null;

  if (latitude <= -60) {
    return continents.find((item) => item.id === 'antarctica') ?? continent;
  }

  if (continent.id === 'antarctica') return null;

  if (
    continent.id === 'europe' &&
    longitude >= 60 &&
    latitude >= 35
  ) {
    return continents.find((item) => item.id === 'asia') ?? continent;
  }

  return continent;
}

function getContinentAtCoordinates(latitude, longitude) {
  if (!continentSurfacesReady || !layerState.continents) return null;

  const rawHit =
    continents.find((continent) =>
      pointInContinent(
        longitude,
        latitude,
        continentFeaturesById.get(continent.id) ?? []
      )
    ) ?? null;

  return normalizeContinentHit(rawHit, latitude, longitude);
}

function getPointerGeoPosition() {
  const hit = raycaster.intersectObject(earth)[0];

  if (!hit) return null;

  const point = globeGroup.worldToLocal(hit.point.clone()).normalize();
  const latitude = THREE.MathUtils.radToDeg(Math.asin(point.y));
  const longitude = THREE.MathUtils.radToDeg(
    Math.atan2(-point.z, point.x)
  );
  return { latitude, longitude };
}

function longitudeToTileX(longitude, zoom) {
  const tileCount = 2 ** zoom;
  return THREE.MathUtils.clamp(
    Math.floor(((longitude + 180) / 360) * tileCount),
    0,
    tileCount - 1
  );
}

function latitudeToTileY(latitude, zoom) {
  const limitedLatitude = THREE.MathUtils.clamp(
    latitude,
    -85.05112878,
    85.05112878
  );
  const radians = THREE.MathUtils.degToRad(limitedLatitude);
  const tileCount = 2 ** zoom;
  return THREE.MathUtils.clamp(
    Math.floor(
      ((1 - Math.asinh(Math.tan(radians)) / Math.PI) / 2) * tileCount
    ),
    0,
    tileCount - 1
  );
}

function tilePixelToLonLat(tileX, tileY, pixelX, pixelY, zoom) {
  const tileCount = 2 ** zoom;
  const normalizedX = (tileX + pixelX / 256) / tileCount;
  const normalizedY = (tileY + pixelY / 256) / tileCount;
  const longitude = normalizedX * 360 - 180;
  const latitude = THREE.MathUtils.radToDeg(
    Math.atan(Math.sinh(Math.PI * (1 - 2 * normalizedY)))
  );
  return { latitude, longitude };
}

async function loadTerrariumTile(tileX, tileY, zoom) {
  const url =
    'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/' +
    `${zoom}/${tileX}/${tileY}.png`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`DEM 瓦片加载失败：${zoom}/${tileX}/${tileY}`);
  }

  const bitmap = await createImageBitmap(await response.blob());
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d', {
    alpha: false,
    willReadFrequently: true,
  });
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

function decodeTerrariumElevation(imageData, pixelX, pixelY) {
  const x = THREE.MathUtils.clamp(Math.round(pixelX), 0, 255);
  const y = THREE.MathUtils.clamp(Math.round(pixelY), 0, 255);
  const offset = (y * imageData.width + x) * 4;
  return (
    imageData.data[offset] * 256 +
    imageData.data[offset + 1] +
    imageData.data[offset + 2] / 256 -
    32768
  );
}

const elevationStops = [
  { elevation: 0, color: new THREE.Color(0x315f3b) },
  { elevation: 500, color: new THREE.Color(0x71934b) },
  { elevation: 1000, color: new THREE.Color(0xa9a45d) },
  { elevation: 2000, color: new THREE.Color(0x9b704d) },
  { elevation: 3500, color: new THREE.Color(0x765245) },
  { elevation: 5500, color: new THREE.Color(0xd4c9b5) },
  { elevation: 9000, color: new THREE.Color(0xf7fbff) },
];

function getElevationColor(elevation, target) {
  const limitedElevation = Math.max(0, elevation);

  for (let index = 1; index < elevationStops.length; index += 1) {
    const lower = elevationStops[index - 1];
    const upper = elevationStops[index];

    if (limitedElevation <= upper.elevation) {
      const mix =
        (limitedElevation - lower.elevation) /
        (upper.elevation - lower.elevation);
      return target.copy(lower.color).lerp(upper.color, mix);
    }
  }

  return target.copy(elevationStops.at(-1).color);
}

function terrainRadius(elevation, offset = 0) {
  return (
    TERRAIN_BASE_RADIUS +
    (Math.max(0, elevation) / EARTH_RADIUS_METERS) *
      TERRAIN_EXAGGERATION +
    offset
  );
}

function pushTerrainTriangle(vertices, positions, normals, colors) {
  const points = vertices.map((vertex) =>
    latLonToVector3(
      vertex.latitude,
      vertex.longitude,
      terrainRadius(vertex.elevation)
    )
  );
  const geometricNormal = points[1]
    .clone()
    .sub(points[0])
    .cross(points[2].clone().sub(points[0]));
  const center = points[0].clone().add(points[1]).add(points[2]);

  if (geometricNormal.dot(center) < 0) {
    [points[1], points[2]] = [points[2], points[1]];
    [vertices[1], vertices[2]] = [vertices[2], vertices[1]];
  }

  const color = new THREE.Color();
  for (let index = 0; index < 3; index += 1) {
    const point = points[index];
    const normal = point.clone().normalize();
    getElevationColor(vertices[index].elevation, color);
    positions.push(point.x, point.y, point.z);
    normals.push(normal.x, normal.y, normal.z);
    colors.push(color.r, color.g, color.b);
  }
}

function addContourSegments(
  corners,
  contourPositions,
  minimum,
  maximum
) {
  for (const level of CONTOUR_LEVELS) {
    if (level < minimum || level > maximum) continue;

    const intersections = [];
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ];

    for (const [startIndex, endIndex] of edges) {
      const start = corners[startIndex];
      const end = corners[endIndex];
      const crosses =
        (start.elevation < level && end.elevation >= level) ||
        (end.elevation < level && start.elevation >= level);
      if (!crosses) continue;

      const mix =
        (level - start.elevation) / (end.elevation - start.elevation);
      intersections.push({
        latitude: THREE.MathUtils.lerp(
          start.latitude,
          end.latitude,
          mix
        ),
        longitude: THREE.MathUtils.lerp(
          start.longitude,
          end.longitude,
          mix
        ),
      });
    }

    const pairs =
      intersections.length === 2
        ? [[0, 1]]
        : intersections.length === 4
          ? [
              [0, 1],
              [2, 3],
            ]
          : [];

    for (const [startIndex, endIndex] of pairs) {
      for (const intersectionIndex of [startIndex, endIndex]) {
        const intersection = intersections[intersectionIndex];
        const point = latLonToVector3(
          intersection.latitude,
          intersection.longitude,
          terrainRadius(level, 0.0008)
        );
        contourPositions.push(point.x, point.y, point.z);
      }
    }
  }
}

function createTerrainTileGeometry(
  imageData,
  tileX,
  tileY,
  continentFeatures
) {
  const positions = [];
  const normals = [];
  const colors = [];
  const contourPositions = [];
  const sampleSize = TERRAIN_SEGMENTS_PER_TILE + 1;
  const samples = new Array(sampleSize * sampleSize);

  for (let row = 0; row < sampleSize; row += 1) {
    for (let column = 0; column < sampleSize; column += 1) {
      const pixelX = (column / TERRAIN_SEGMENTS_PER_TILE) * 256;
      const pixelY = (row / TERRAIN_SEGMENTS_PER_TILE) * 256;
      const coordinates = tilePixelToLonLat(
        tileX,
        tileY,
        pixelX,
        pixelY,
        TERRAIN_TILE_ZOOM
      );
      samples[row * sampleSize + column] = {
        ...coordinates,
        elevation: decodeTerrariumElevation(
          imageData,
          pixelX,
          pixelY
        ),
      };
    }
  }

  for (let row = 0; row < TERRAIN_SEGMENTS_PER_TILE; row += 1) {
    for (
      let column = 0;
      column < TERRAIN_SEGMENTS_PER_TILE;
      column += 1
    ) {
      const northwest = samples[row * sampleSize + column];
      const northeast = samples[row * sampleSize + column + 1];
      const southwest = samples[(row + 1) * sampleSize + column];
      const southeast = samples[(row + 1) * sampleSize + column + 1];
      const centerLongitude =
        (northwest.longitude + southeast.longitude) / 2;
      const centerLatitude =
        (northwest.latitude + southeast.latitude) / 2;

      if (
        !pointInContinent(
          centerLongitude,
          centerLatitude,
          continentFeatures
        )
      ) {
        continue;
      }

      pushTerrainTriangle(
        [northwest, southwest, northeast],
        positions,
        normals,
        colors
      );
      pushTerrainTriangle(
        [northeast, southwest, southeast],
        positions,
        normals,
        colors
      );

      const corners = [northwest, northeast, southeast, southwest];
      const elevations = corners.map((corner) => corner.elevation);
      addContourSegments(
        corners,
        contourPositions,
        Math.min(...elevations),
        Math.max(...elevations)
      );
    }
  }

  return { positions, normals, colors, contourPositions };
}

function buildTerrainObjects(data) {
  const terrainGeometry = new THREE.BufferGeometry();
  terrainGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(data.positions, 3)
  );
  terrainGeometry.setAttribute(
    'normal',
    new THREE.Float32BufferAttribute(data.normals, 3)
  );
  terrainGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(data.colors, 3)
  );
  const terrainMesh = new THREE.Mesh(
    terrainGeometry,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.82,
      metalness: 0,
      side: THREE.FrontSide,
    })
  );

  const contourGeometry = new THREE.BufferGeometry();
  contourGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(data.contourPositions, 3)
  );
  const contourLines = new THREE.LineSegments(
    contourGeometry,
    new THREE.LineBasicMaterial({
      color: 0xe7f8ff,
      transparent: true,
      opacity: 0.72,
    })
  );
  return { terrainMesh, contourLines };
}

function getTerrainTiles(bounds) {
  const minimumX = longitudeToTileX(
    bounds.west,
    TERRAIN_TILE_ZOOM
  );
  const maximumX = longitudeToTileX(
    bounds.east - Number.EPSILON,
    TERRAIN_TILE_ZOOM
  );
  const minimumY = latitudeToTileY(
    bounds.north,
    TERRAIN_TILE_ZOOM
  );
  const maximumY = latitudeToTileY(
    bounds.south,
    TERRAIN_TILE_ZOOM
  );
  const tiles = [];

  for (let tileY = minimumY; tileY <= maximumY; tileY += 1) {
    for (let tileX = minimumX; tileX <= maximumX; tileX += 1) {
      tiles.push({ tileX, tileY });
    }
  }

  return tiles;
}

async function runWithConcurrency(items, concurrency, worker) {
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      await worker(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(concurrency, items.length) },
      runWorker
    )
  );
}

async function selectTerrainContinent(continent) {
  if (!continentSurfacesReady) return;
  if (terrainLoadingContinentId === continent.id) return;
  if (
    selectedTerrainContinent?.id === continent.id &&
    terrainLayer.children.length > 0
  ) {
    return;
  }

  const requestId = ++terrainRequestId;
  selectedTerrainContinent = continent;
  terrainLoadingContinentId = continent.id;
  clearGeneratedTerrain();
  layerState.terrain = false;
  layerState.contours = false;
  getLayerDefinition('terrain').input.checked = false;
  getLayerDefinition('contours').input.checked = false;
  setLayerAvailability('terrain', false, '加载中');
  setLayerAvailability('contours', false, '等待地形');
  setTerrainStatus(`正在加载${continent.name} DEM...`, 'loading');

  const features = continentFeaturesById.get(continent.id);
  const tiles = getTerrainTiles(terrainBounds[continent.id]);
  const terrainMeshes = [];
  const contourLines = [];
  let completedTiles = 0;

  try {
    await runWithConcurrency(tiles, 8, async ({ tileX, tileY }) => {
      if (requestId !== terrainRequestId) return;
      const imageData = await loadTerrariumTile(
        tileX,
        tileY,
        TERRAIN_TILE_ZOOM
      );
      if (requestId !== terrainRequestId) return;

      const data = createTerrainTileGeometry(
        imageData,
        tileX,
        tileY,
        features
      );
      if (data.positions.length > 0) {
        const objects = buildTerrainObjects(data);
        terrainMeshes.push(objects.terrainMesh);
        contourLines.push(objects.contourLines);
      }

      completedTiles += 1;
      if (
        completedTiles === tiles.length ||
        completedTiles % 8 === 0
      ) {
        setTerrainStatus(
          `正在加载${continent.name} DEM：${completedTiles}/${tiles.length}`,
          'loading'
        );
      }
    });

    if (requestId !== terrainRequestId) {
      terrainMeshes.forEach(disposeObject);
      contourLines.forEach(disposeObject);
      return;
    }

    terrainMeshes.forEach((mesh) => terrainLayer.add(mesh));
    contourLines.forEach((lines) => contourLayer.add(lines));
    layerState.terrain = true;
    layerState.contours = false;
    terrainLayer.visible = true;
    contourLayer.visible = false;
    getLayerDefinition('terrain').input.checked = true;
    getLayerDefinition('contours').input.checked = false;
    setLayerAvailability('terrain', true, continent.name);
    setLayerAvailability('contours', true, '200–5000 m');
    setTerrainStatus(
      `${continent.name}：z${TERRAIN_TILE_ZOOM} DEM，地形高度视觉放大 ${TERRAIN_EXAGGERATION}×`
    );
    terrainLoadingContinentId = null;
  } catch (error) {
    if (requestId !== terrainRequestId) return;
    console.error(error);
    clearGeneratedTerrain();
    setLayerAvailability('terrain', false, '加载失败');
    setLayerAvailability('contours', false, '等待地形');
    setTerrainStatus(
      `${continent.name} DEM 加载失败，请检查网络`,
      'error'
    );
    terrainLoadingContinentId = null;
  }
}

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
  selectTerrainContinent(continent);
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
  mode: null,
  pointerId: null,
  previousX: 0,
  previousY: 0,
  totalDistance: 0,
  pendingFishMarker: null,
};
let hoveredSurface = null;

function resetDragState() {
  dragState.active = false;
  dragState.mode = null;
  dragState.pointerId = null;
  dragState.pendingFishMarker = null;
}

function setPointerFromEvent(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
}

function formatDms(value, positiveDirection, negativeDirection) {
  const totalSeconds = Math.round(Math.abs(value) * 3600);
  const degrees = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const direction = value >= 0 ? positiveDirection : negativeDirection;
  return `${direction} ${degrees}°${minutes}′${seconds}″`;
}

function updateCoordinateOutput() {
  const geoPosition = getPointerGeoPosition();

  if (!geoPosition) {
    pointerOutput.textContent = '尚未选中球面';
    pointerDecimalOutput.textContent = '';
    return;
  }

  const { latitude, longitude } = geoPosition;
  pointerOutput.textContent = `${formatDms(latitude, '北纬', '南纬')}，${formatDms(longitude, '东经', '西经')}`;
  pointerDecimalOutput.textContent =
    `${Math.abs(latitude).toFixed(4)}° ${latitude >= 0 ? 'N' : 'S'}  /  ` +
    `${Math.abs(longitude).toFixed(4)}° ${longitude >= 0 ? 'E' : 'W'}`;
}

function updateSurfaceHover() {
  const fishHit = getFishIntersection();
  const nextFishMarker = fishHit?.object ?? null;

  if (hoveredFishMarker !== nextFishMarker) {
    hoveredFishMarker?.scale.setScalar(1);
    hoveredFishMarker = nextFishMarker;
    hoveredFishMarker?.scale.setScalar(1.45);
  }

  if (hoveredFishMarker) {
    hoveredSurface = null;
    landHighlight.visible = false;
    renderer.domElement.style.cursor = 'pointer';
    return;
  }

  const geoPosition = getPointerGeoPosition();
  const nextSurface = geoPosition
    ? getContinentAtCoordinates(
        geoPosition.latitude,
        geoPosition.longitude
      )
    : null;

  if (hoveredSurface === nextSurface) return;

  hoveredSurface = nextSurface;

  if (hoveredSurface) {
    landHighlight.position.copy(
      latLonToVector3(
        hoveredSurface.latitude,
        hoveredSurface.longitude,
        1.535
      )
    );
    landHighlight.visible = true;
    renderer.domElement.style.cursor = 'pointer';
  } else {
    landHighlight.visible = false;
    renderer.domElement.style.cursor = dragState.active ? 'grabbing' : 'grab';
  }
}

renderer.domElement.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;

  setPointerFromEvent(event);
  const fishHit = getFishIntersection();
  dragState.active = true;
  dragState.mode = fishHit ? 'fish' : 'globe';
  dragState.pointerId = event.pointerId;
  dragState.previousX = event.clientX;
  dragState.previousY = event.clientY;
  dragState.totalDistance = 0;
  dragState.pendingFishMarker = fishHit?.object ?? null;
  renderer.domElement.style.cursor = fishHit ? 'pointer' : 'grabbing';
  renderer.domElement.setPointerCapture(event.pointerId);
});

renderer.domElement.addEventListener('pointermove', (event) => {
  if (dragState.active && event.pointerId === dragState.pointerId) {
    const deltaX = event.clientX - dragState.previousX;
    const deltaY = event.clientY - dragState.previousY;
    dragState.totalDistance += Math.hypot(deltaX, deltaY);

    if (dragState.mode === 'globe') {
      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x = THREE.MathUtils.clamp(
        globeGroup.rotation.x + deltaY * 0.006,
        -Math.PI / 2,
        Math.PI / 2
      );
    }

    dragState.previousX = event.clientX;
    dragState.previousY = event.clientY;
  }

  setPointerFromEvent(event);
  updateCoordinateOutput();
  updateSurfaceHover();
});

renderer.domElement.addEventListener('pointerleave', () => {
  if (dragState.active) return;
  pointerOutput.textContent = '尚未选中球面';
  pointerDecimalOutput.textContent = '';
  hoveredFishMarker?.scale.setScalar(1);
  hoveredFishMarker = null;
  if (hoveredSurface) {
    hoveredSurface = null;
    landHighlight.visible = false;
  }
});

function stopDragging(event) {
  if (event.pointerId !== dragState.pointerId) return;

  if (renderer.domElement.hasPointerCapture(event.pointerId)) {
    renderer.domElement.releasePointerCapture(event.pointerId);
  }

  if (event.type === 'pointerup' && dragState.totalDistance < 5) {
    setPointerFromEvent(event);

    if (dragState.mode === 'fish') {
      const fishHit = getFishIntersection();
      const marker = fishHit?.object ?? dragState.pendingFishMarker;
      const { species, record } = marker?.userData ?? {};

      if (species && record) {
        openFishPanel(species, record);
        resetDragState();
        renderer.domElement.style.cursor = 'pointer';
        return;
      }
    }

    const fishHit = getFishIntersection();

    if (fishHit) {
      const { species, record } = fishHit.object.userData;
      openFishPanel(species, record);
      resetDragState();
      renderer.domElement.style.cursor = 'pointer';
      return;
    }

    const geoPosition = getPointerGeoPosition();
    const continentHit = geoPosition
      ? getContinentAtCoordinates(
          geoPosition.latitude,
          geoPosition.longitude
        )
      : null;

    if (continentHit) {
      openContinentPanel(continentHit);
    }
  }

  resetDragState();
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
  closeFishPanel();
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
      layerState.continents &&
        layerState.continentLabels &&
        continentSurfacesReady &&
        isFrontFacing &&
        isOnScreen
    );
    continent.labelElement.style.left =
      `${(projectedPosition.x * 0.5 + 0.5) * window.innerWidth}px`;
    continent.labelElement.style.top =
      `${(-projectedPosition.y * 0.5 + 0.5) * window.innerHeight}px`;
  }
}

function updateFishLabels() {
  camera.getWorldDirection(cameraDirection).negate();

  for (const marker of fishRecordMeshes) {
    marker.getWorldPosition(worldPosition);
    worldNormal.copy(worldPosition).normalize();

    const isFrontFacing = worldNormal.dot(cameraDirection) > 0.12;
    projectedPosition.copy(worldPosition).project(camera);
    const isOnScreen =
      Math.abs(projectedPosition.x) <= 1.05 &&
      Math.abs(projectedPosition.y) <= 1.05;
    const label = marker.userData.labelElement;

    label.classList.toggle(
      'is-visible',
      layerState.fishAtlas &&
        layerState.fishRecords &&
        layerState.fishLabels &&
        fishLayer.visible &&
        isFrontFacing &&
        isOnScreen
    );
    label.style.left =
      `${(projectedPosition.x * 0.5 + 0.5) * window.innerWidth}px`;
    label.style.top =
      `${(-projectedPosition.y * 0.5 + 0.5) * window.innerHeight}px`;
  }
}

applyFishAtlasVisibility(layerState.fishAtlas);

renderer.setAnimationLoop(() => {
  const deltaTime = Math.min(clock.getDelta(), 0.05);

  if (isAutoRotating) {
    globeGroup.rotation.y += deltaTime * 0.09;
  }

  stars.rotation.y += deltaTime * 0.003;
  updateContinentLabels();
  updateFishLabels();
  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
