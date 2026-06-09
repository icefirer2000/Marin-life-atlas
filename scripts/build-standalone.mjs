import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, '..');

const [htmlSource, cssSource, mainSource] = await Promise.all([
  readFile(path.join(projectDirectory, 'index.html'), 'utf8'),
  readFile(path.join(projectDirectory, 'src', 'style.css'), 'utf8'),
  readFile(path.join(projectDirectory, 'src', 'main.js'), 'utf8'),
]);

const standaloneMain = mainSource
  .replace(
    "'/earth-map.jpg'",
    "'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'"
  )
  .replace(
    `const dataPaths = [
    '/data/ne_110m_admin_0_countries.geojson',
    '/public/data/ne_110m_admin_0_countries.geojson',
  ];`,
    `const dataPaths = [
    'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
  ];`
  );

const standaloneHtml = htmlSource
  .replace('    <link rel="stylesheet" href="/src/style.css" />\n', '')
  .replace(
    '  </head>',
    `    <style>\n${cssSource}\n    </style>\n  </head>`
  )
  .replace(
    '    <script type="module" src="/src/main.js"></script>',
    `    <script type="module">\n${standaloneMain}\n    </script>`
  );

await writeFile(
  path.join(projectDirectory, '直接运行.html'),
  standaloneHtml,
  'utf8'
);
