// Agrega o edita proyectos aquí. Duplica un objeto para sumar otro nivel.
// filter puede ser: "unity", "unreal" o "jam". image es opcional (ruta relativa).
const PROJECTS = [
  { title: 'Crimson Moon', description: 'Eres un nefilim: un híbrido de humano y ángel creado para defender a la humanidad. Lucha a solas o acompañado para aniquilar demonios y enfréntate a jefes en combates cuerpo a cuerpo. Álzate, criatura violenta. La profecía recae sobre ti.', engine: 'Unreal Engine', category: 'SoulsLike, RogueLike, Multiplayer', filter: 'unreal', art: 'meadow', url: 'https://store.steampowered.com/app/4317690/Crimson_Moon/?l=spanish', image: 'assets/crimsonmoon.jpg' },
  { title: 'Astor Blade Of The Monolith', description: 'Ábrete paso con coraje por oleadas de enemigos en este RPG de acción rápida, en el que encarnas a un joven guerrero llamado Astor en busca de respuestas tras la desaparición de sus creadores. Ayúdate de armas rúnicas para derrotar al mal que lleva al planeta Gliese a su destrucción.', engine: 'Unreal Engine', category: 'Acción, Aventura', filter: 'unreal', art: 'mountain', url: 'https://store.steampowered.com/app/1989320/Astor_Blade_of_the_Monolith/', image: 'assets/astor.jpg' },
  { title: 'Pull Ups Pixel', description: 'Juego móvil de fútbol centrado en las dominadas: mantén el balón en el aire y supera tu propia marca.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'arcade', url: 'https://devcrxs.itch.io/pull-ups-pixel', image: 'assets/PullUps.jpg' },
  { title: 'Colorful Mountains', description: 'Un juego de plataformas para móviles inspirado en Celeste, donde cada salto exige precisión y control.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'cave', url: 'https://www.instagram.com/reel/C21WHimudyP/', image: 'assets/ColorFul.jpg' },
  { title: 'GolfHold', description: 'Juego casual de golf 2D para Android, con niveles desafiantes que ponen a prueba tu precisión en cada golpe.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'ocean', url: 'https://devcrxs.itch.io/golf-hold', image: 'assets/GolfHold.jpg' },
  { title: 'BitSpeed', description: 'Juego 2D de plataformas para Android con una misión particular: recoger tu contrato para cambiar de proveedor de internet. Creado para el Duelo de Creadores Claro.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'forest', url: 'https://devcrxs.itch.io/bitspeed', image: 'assets/BitSpeed.jpg' },
  { title: 'ColorDev', description: 'Juego casual de puzles para Android, inspirado en otros títulos del género y diseñado para partidas ligeras y directas.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'dungeon', url: 'https://devcrxs.itch.io/colordev', image: 'assets/ColorDev.jpg' },
  { title: 'JeyMovies', description: 'Aplicación móvil para explorar películas, series y anime a través de sus tráilers.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'sky', url: 'https://devcrxs.itch.io/jeymovies', image: 'assets/MoviesApp.jpg' },
  { title: 'BaldBoy', description: 'Aventura de plataformas para móviles, inspirada en los clásicos de Mario y protagonizada por BaldBoy.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'sunset', url: 'https://www.instagram.com/p/CPpDQFRHO02/', image: 'assets/BaldBoy.jpg' },
  { title: 'SelfExplosive', description: 'Juego casual 3D para Android: esquiva obstáculos y cuida tu nivel de gasolina para seguir avanzando.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'garden', url: 'https://devcrxs.itch.io/self-explosive', image: 'assets/SelfExplosive.jpg' },
  { title: 'SummonerGG', description: 'Consulta información básica de jugadores de League of Legends desde el móvil, con datos obtenidos mediante la API de Riot Games.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'garden', url: 'https://devcrxs.itch.io/summonergg', image: 'assets/SummonerGG.jpg' },
  { title: 'AR-Living', description: 'Aplicación de realidad aumentada para colocar y visualizar objetos virtuales dentro de tu entorno real.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'garden', url: 'https://devcrxs.itch.io/ar-living', image: 'assets/ARLiving.jpg' },
  { title: 'PixelShibuya', description: 'Aplicación móvil para crear ilustraciones pixel art y experimentar con composiciones de estética retro.', engine: 'Unity', category: 'Mobile', filter: 'unity', art: 'garden', url: 'https://devcrxs.itch.io/pixelshibuya', image: 'assets/PixelShibuya.png' },
];

const projectGrid = document.querySelector('#project-grid');
const projectStatus = document.querySelector('#project-status');
const searchInput = document.querySelector('#project-search');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const totalBadge = document.querySelector('#project-total-badge');
let selectedFilter = 'all';

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function makeProjectCard(project, index) {
  const title = escapeHTML(project.title);
  const description = escapeHTML(project.description);
  const engine = escapeHTML(project.engine);
  const category = escapeHTML(project.category);
  const image = project.image ? `<img class="cover-image" src="${escapeHTML(project.image)}" alt="Imagen de ${title}" loading="lazy" />` : '';
  const link = project.url
    ? `<a class="project-link" href="${escapeHTML(project.url)}" target="_blank" rel="noreferrer">Ver proyecto <span aria-hidden="true">↗</span></a>`
    : '<span class="project-link project-link-hint">Agrega el enlace de tu juego <span aria-hidden="true">↗</span></span>';

  return `
    <article class="project-card" style="--card-order:${index + 1}">
      <div class="game-cover">
        ${image}
      </div>
      <div class="project-info">
        <div class="project-meta"><span>${category}</span><span class="engine-tag">${engine}</span></div>
        <h3>${title}</h3>
        <p>${description}</p>
        ${link}
      </div>
    </article>`;
}

function updateFilterCounts() {
  const counts = {
    all: PROJECTS.length,
    unity: PROJECTS.filter((project) => project.filter === 'unity').length,
    unreal: PROJECTS.filter((project) => project.filter === 'unreal').length,
    jam: PROJECTS.filter((project) => project.filter === 'jam').length,
  };
  document.querySelectorAll('[data-count]').forEach((counter) => {
    counter.textContent = counts[counter.dataset.count] ?? 0;
  });
  if (totalBadge) totalBadge.textContent = `${String(PROJECTS.length).padStart(2, '0')} NIVELES`;
}

function renderProjects() {
  const query = searchInput?.value.trim().toLocaleLowerCase('es') ?? '';
  const visibleProjects = PROJECTS
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => selectedFilter === 'all' || project.filter === selectedFilter)
    .filter(({ project }) => !query || `${project.title} ${project.description} ${project.engine} ${project.category}`.toLocaleLowerCase('es').includes(query));

  projectGrid.innerHTML = visibleProjects.map(({ project, index }) => makeProjectCard(project, index)).join('');
  projectStatus.textContent = `Mostrando ${visibleProjects.length} de ${PROJECTS.length} proyectos`;

  if (visibleProjects.length === 0) {
    projectGrid.innerHTML = '<p class="empty-state">No encontré ese nivel. Prueba con otra búsqueda.</p>';
  }
}

updateFilterCounts();
renderProjects();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    renderProjects();
  });
});

searchInput?.addEventListener('input', renderProjects);

const typedText = document.querySelector('#typed-text');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedText && !prefersReducedMotion) {
  const phrases = ['Juegos 3D/2D.', 'Experiencias interactivas.', 'IA de enemigos.', 'Interfaces de usuario.', 'Apliaciones AR/VR', 'Simulaciones.'];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function animateTypewriter() {
    const phrase = phrases[phraseIndex];

    if (deleting) {
      characterIndex -= 1;
      typedText.textContent = phrase.slice(0, characterIndex);
      if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(animateTypewriter, 320);
        return;
      }
      window.setTimeout(animateTypewriter, 48);
      return;
    }

    characterIndex += 1;
    typedText.textContent = phrase.slice(0, characterIndex);
    if (characterIndex === phrase.length) {
      deleting = true;
      window.setTimeout(animateTypewriter, 1350);
      return;
    }
    window.setTimeout(animateTypewriter, 88);
  }

  typedText.textContent = '';
  window.setTimeout(animateTypewriter, 300);
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      navigation.classList.remove('is-open');
    });
  });
}
