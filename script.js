const div = document.createElement('div');
div.classList.add('apresentation');
document.body.appendChild(div);

const fullScreen = document.querySelector('.tela-cheia');
const corposCelestesElement = document.querySelector('.corpos-celestes');

function loadProject() {
  div.innerHTML = `
  <l-jelly-triangle
    size="30"
    speed="1.75"
    color="white"
  ></l-jelly-triangle>
  <p>Carregando o Sistema Solar</p>
  `;
};

loadProject();

const time = Math.random() * 8;
setTimeout(() => {
  div.innerHTML = '';
  createWindow();
}, time * 1000);

function createWindow() {
  div.innerHTML = `
    <h2>Explore nosso Sistema Solar numa imersão 3D</h2>
    <button id="start">Começar</button>
  `;
  div.style.background = 'rgba(0, 0, 0, 0.8)';

  const buttonStart = document.querySelector('#start');

  buttonStart.addEventListener('click', () => {
    div.style.display = 'none';
  });
};

// Clicar fullScreen
fullScreen.addEventListener('click', () => {
  const span = document.querySelector('.tela-cheia span');
  const p = document.querySelector('.tela-cheia p');
  const camera = document.querySelector('.camera');

  console.log(span.textContent)

  if (span.textContent.trim() === 'fullscreen') {
    span.innerText = 'close_fullscreen';
    p.innerText = 'Tela normal';
    corposCelestesElement.style.bottom = '-50px';
    camera.style.left = '-150px';
  } else if (span.textContent.trim() === 'close_fullscreen') {
    span.innerText = 'fullscreen';
    p.innerText = 'Tela cheia';
    corposCelestesElement.style.bottom = '0';
    camera.style.left = '0';
  }
});