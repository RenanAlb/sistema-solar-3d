import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true, // Ative o antialiasing
  alpha: true // Permite um fundo transparente
});

// Verifique se o contexto foi criado corretamente
if (!renderer) {
  console.error('WebGLRenderer could not be created.');
}

const cameraElement = document.querySelector('.camera');

// Renderizador
const threeJsContainerElement = document.querySelector('.three-js-container');
renderer.setSize(threeJsContainerElement.clientWidth, threeJsContainerElement.clientHeight);
threeJsContainerElement.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Sistema Solar
const planets = [];
const planetOrbit = new THREE.Object3D();
scene.add(planetOrbit);

// Texturas Corpos Celestes
const textureLoader = new THREE.TextureLoader();
const textureSol = textureLoader.load('textures/texture-sun.jpeg');

const texturesPlanets = [
  'textures/texture-mercurio.jpeg',
  'textures/texture-venus.jpeg',
  'textures/texture-terra2.jpeg',
  'textures/texture-marte.jpeg',
  'textures/texture-jupiter.jpg',
  'textures/texture-saturno.jpg',
  'textures/texture-urano.jpeg',
  'textures/texture-netuno.jpg'
];

const planetsDados = [
  {
    name: "Mercúrio",
    speed: 0.04167, // Velocidade de rotação em radianos por segundo (59 dias)
    axisTilt: 0.034, // Inclinação do eixo em graus
    distance: 9.5,
    angle: 0,
    position: new THREE.Vector3() // Usando Vector3 para a posição
  },
  {
    name: "Vênus",
    speed: -0.0027, // Rotação retrógrada (243 dias)
    axisTilt: 177.4,
    distance: 10.8,
    angle: 0,
    position: new THREE.Vector3()
  },
  {
    name: "Terra",
    speed: 0.0000727, // Rotação em radianos por segundo (24 horas)
    axisTilt: 23.5,
    distance: 11.9,
    angle: 0,
    position: new THREE.Vector3()
  },
  {
    name: "Marte",
    speed: 0.0000725,
    axisTilt: 25.2,
    distance: 13.3,
    angle: 0,
    position: new THREE.Vector3()
  },
  {
    name: "Júpiter",
    speed: 0.00141,
    axisTilt: 3.1,
    distance: 15.8,
    angle: 0,
    position: new THREE.Vector3()
  },
  {
    name: "Saturno",
    speed: 0.00146,
    axisTilt: 26.7,
    distance: 17.4,
    angle: 0,
    position: new THREE.Vector3()
  },
  {
    name: "Urano",
    speed: 0.000267,
    axisTilt: 97.8,
    distance: 19.6,
    angle: 0,
    position: new THREE.Vector3()
  },
  {
    name: "Netuno",
    speed: 0.000235,
    axisTilt: 28.6,
    distance: 22.4,
    angle: 0,
    position: new THREE.Vector3()
  },
];

// Sol
const solGeometry = new THREE.SphereGeometry(4.5, 64, 64);
const materialSol = new THREE.MeshStandardMaterial({ map: textureSol });
const sol = new THREE.Mesh(solGeometry, materialSol);
planetOrbit.add(sol);

function createSaturnRings(innerRadius, outerRadius, segments) {
  const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: '#8B886E',
    side: THREE.DoubleSide,
    transparent: true
  });

  const rings = new THREE.Mesh(ringGeometry, ringMaterial);

  rings.rotation.x = Math.PI / 2;
  return rings;
};

// Criar planetas

function createPlanets(size, distance, speed, index) {
  const texture = textureLoader.load(texturesPlanets[index]);

  const geometryPlanet = new THREE.SphereGeometry(size, 64, 64);
  const materialPlanet = new THREE.MeshStandardMaterial({ map: texture });
  const planet = new THREE.Mesh(geometryPlanet, materialPlanet);

  if (index == 5) {
    const aneisSaturno = createSaturnRings(0.7, 1.2, 64);
    planet.add(aneisSaturno);
  }
  planet.rotation.x = THREE.MathUtils.degToRad(planetsDados[index].axisTilt);
  planet.name = texturesPlanets[index];
  planet.distance = distance;
  planet.speed = speed;
  planet.angle = Math.random() * 2 * Math.PI;
  return planet;
};

planets.push(createPlanets(0.1, 6, 0.01, 0));
planets.push(createPlanets(0.21, 9.5, 0.005, 1));
planets.push(createPlanets(0.2, 12, 0.0025, 2));
planets.push(createPlanets(0.15, 15.5, 0.0009, 3));
planets.push(createPlanets(0.5, 19, 0.00001, 4));
planets.push(createPlanets(0.45, 27, 0.00001, 5));
planets.push(createPlanets(0.42, 35, 0.00001, 6));
planets.push(createPlanets(0.4, 39, 0.00001, 7));

for (const planet of planets) {
  scene.add(planet);
}

function createOrbit(radius) {
  const curve = new THREE.EllipseCurve(
    0, 0,           // Posição no centro da órbita (Sol)
    radius, radius,  // Raio da órbita
    0, 2 * Math.PI,  // Ângulos de início e fim (0 a 360 graus)
    false,           // Sentido anti-horário (false para horário)
    0                // Rotação inicial
  );

  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 'rgb(19, 19, 19)' });
  const orbit = new THREE.Line(geometry, material);

  orbit.rotation.x = Math.PI / 2;
  return orbit;
}

const orbits = [];
orbits.push(createOrbit(6));   // Órbita para o primeiro planeta (Mercúrio)
orbits.push(createOrbit(9.5)); // Órbita para o segundo planeta (Vênus)
orbits.push(createOrbit(12));   // Órbita para a Terra
orbits.push(createOrbit(15.5));// Órbita para Marte
orbits.push(createOrbit(19));  // Órbita para Júpiter
orbits.push(createOrbit(27));  // Órbita para Saturno
orbits.push(createOrbit(35));  // Órbita para Urano
orbits.push(createOrbit(39));  // Órbita para Netuno

// Adiciona as órbitas à cena
for (const orbit of orbits) {
  scene.add(orbit);
}

// Luzes
const ambientLight = new THREE.AmbientLight('white', 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight('yellow', 4, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Look at planet
let followingPlanet = null;
const spans = document.querySelectorAll('.corpos-celestes span');
spans.forEach((span, index) => {
  span.addEventListener('click', (e) => {
    const id = span.getAttribute('id');

    if (id == 'sol') {
      followingPlanet = null;
      camera.lookAt(sol.position);
      controls.update();
      controls.target.copy(sol.position);
      cameraElement.style.display = 'none';
    } else {
      followingPlanet = planets[index - 1];
      cameraElement.style.display = 'block';
    }
  });
});

// Mudar câmera
let enableCameraClick = false;
cameraElement.addEventListener('click', () => {
  if (enableCameraClick == false) {
    enableCameraClick = true;
    cameraElement.innerText = 'Mudar para a câmera fixa';
  } else {
    enableCameraClick = false;
    cameraElement.innerText = 'Mudar para a câmera livre';
  }
});

// Resposividade da tela
let spaceZ = 0;
function configScreen() {
  renderer.setSize(threeJsContainerElement.clientWidth, threeJsContainerElement.clientHeight);
  camera.aspect = threeJsContainerElement.clientWidth / threeJsContainerElement.clientHeight;
  console.log(window.innerWidth)

  if (window.innerWidth <= 550) {
    camera.position.z = 20;
    spaceZ = 5;
  } else {
    spaceZ = 2.5;
    camera.position.z = 10;
  }

  camera.updateProjectionMatrix();
};

window.addEventListener('resize', configScreen);
window.addEventListener('load', configScreen);

function createStars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 10000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starsMaterial = new THREE.PointsMaterial({
    color: 'gray',
    size: 0.5
  });

  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
}

createStars();

// Function animate
function animate() {
  requestAnimationFrame(animate);
  for (const planet of planets) {
    planet.angle += planet.speed;
    planet.position.x = planet.distance * Math.cos(planet.angle);
    planet.position.z = planet.distance * Math.sin(planet.angle);
    planet.rotation.y += 0.01;
    sol.rotation.y += 0.0001;
  }

  if (followingPlanet) {
    if (enableCameraClick) {
      controls.enabled = true;
      camera.lookAt(followingPlanet.position);
      controls.target.copy(followingPlanet.position);
    } else {
      camera.position.set(
        followingPlanet.position.x + 0.4,
        followingPlanet.position.y + 0.9,
        followingPlanet.position.z + spaceZ
      );
      camera.lookAt(followingPlanet.position);
      controls.target.copy(followingPlanet.position);
    }
  } else {
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
  }

  renderer.render(scene, camera);
  controls.update();
};

animate();