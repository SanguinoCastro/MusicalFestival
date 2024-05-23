document.addEventListener('DOMContentLoaded', function () {
  fixedToUp();
  createGallery();
  highlightLinks();
  scrollNav();
  scrollToUP();
  setupMenuToggle();
  setupHomeIconHover();
});
const toUp = document.querySelector('.toUp');

function fixedToUp() {
  const aboutFestival = document.querySelector('.about-festival');
  window.addEventListener('scroll', function () {
    if (aboutFestival.getBoundingClientRect().top < 1) {
      toUp.classList.add('fixed-toUp');
    } else {
      toUp.classList.remove('fixed-toUp');
    }
  });
}

function setupMenuToggle() {
  const menuButton = document.querySelector('.navegacion-mobile button');
  const navMobile = document.querySelector('.navegacion-mobile');
  const navAside = document.querySelector('.nav-aside');

  menuButton.addEventListener('click', function () {
    if (menuButton.classList.contains('active')) {
      menuButton.classList.remove('active');
      navAside.classList.remove('visible');
      navMobile.classList.remove('visible');
    } else {
      menuButton.classList.add('active');
      navAside.classList.add('visible');
      navMobile.classList.add('visible');
    }
  });
}

function setupHomeIconHover() {
  const homeIcon = document.querySelector('.home');
  const originalSrc = 'build/img/gallery/icon/home.svg';
  const hoverSrc = 'build/img/gallery/icon/home-hover.svg';

  homeIcon.addEventListener('mouseenter', function () {
    homeIcon.style.transition = 'opacity 0.3s ease';
    homeIcon.style.opacity = '0';
    setTimeout(() => {
      homeIcon.src = hoverSrc;
      homeIcon.style.opacity = '1';
    }, 100);
  });

  homeIcon.addEventListener('mouseleave', function () {
    homeIcon.style.transition = 'opacity 0.3s ease';
    homeIcon.style.opacity = '0';
    setTimeout(() => {
      homeIcon.src = originalSrc;
      homeIcon.style.opacity = '1';
    }, 100);
  });
}

const CANTIDAD_IMAGENES = 16;
const IMAGENES_POR_PAGINA = 4;
let paginaActual = 1;
let isDesktopView = window.matchMedia('(min-width: 767px)').matches;

function createGallery() {
  const paginationControls = document.querySelector('.pagination-controls');

  if (isDesktopView) {
    mostrarTodasLasImagenes();
    paginationControls.style.display = 'none';
  } else {
    mostrarPagina(paginaActual);
    actualizarControles();
    paginationControls.style.display = 'flex';
  }
}

function mostrarPagina(pagina) {
  const gallery = document.querySelector('.gallery-images');
  gallery.innerHTML = '';
  const inicio = (pagina - 1) * IMAGENES_POR_PAGINA + 1;
  const fin = Math.min(inicio + IMAGENES_POR_PAGINA - 1, CANTIDAD_IMAGENES);

  for (let i = inicio; i <= fin; i++) {
    const image = document.createElement('PICTURE');
    image.innerHTML = `
      <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galería">
    `;

    image.onclick = function () {
      showImage(i);
    };

    gallery.appendChild(image);
  }
}

function mostrarTodasLasImagenes() {
  const gallery = document.querySelector('.gallery-images');
  gallery.innerHTML = '';

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const image = document.createElement('PICTURE');
    image.innerHTML = `
      <source srcset="build/img/gallery/thumb/${i}-mini.avif" type="image/avif">
      <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galería">
    `;

    image.onclick = function () {
      showImage(i);
    };

    gallery.appendChild(image);
  }
}

function actualizarControles() {
  const prevButton = document.querySelector('.prev-page');
  const nextButton = document.querySelector('.next-page');
  const pageInfo = document.querySelector('.page-info');

  prevButton.disabled = paginaActual === 1;
  nextButton.disabled =
    paginaActual === Math.ceil(CANTIDAD_IMAGENES / IMAGENES_POR_PAGINA);
  pageInfo.textContent = `${paginaActual} de ${Math.ceil(
    CANTIDAD_IMAGENES / IMAGENES_POR_PAGINA
  )}`;
}

document.querySelector('.prev-page').onclick = function () {
  if (paginaActual > 1) {
    paginaActual--;
    createGallery();
  }
};

document.querySelector('.next-page').onclick = function () {
  if (paginaActual < Math.ceil(CANTIDAD_IMAGENES / IMAGENES_POR_PAGINA)) {
    paginaActual++;
    createGallery();
  }
};

// Escuchar cambios en el tamaño de la ventana para ajustar la galería
const mediaQuery = window.matchMedia('(min-width: 767px)');
mediaQuery.addEventListener('change', handleTabletChange);

function handleTabletChange(e) {
  isDesktopView = e.matches;
  createGallery();
}

createGallery();

function showImage(i) {
  const image = document.createElement('PICTURE');
  image.innerHTML = `
    <source srcset="build/img/gallery/HR/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/HR/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/HR/${i}.jpg" alt="imagen galería">
`;

  // Generar Modal
  const modal = document.createElement('DIV');
  modal.classList.add('modal');
  modal.onclick = closeModal;

  //   Botón cerrar modal
  const closeModalBtn = document.createElement('BUTTON');
  closeModalBtn.textContent = 'X';
  closeModalBtn.classList.add('btn-close');
  closeModalBtn.onclick = closeModal;

  modal.appendChild(image);
  modal.appendChild(closeModalBtn);

  //   Agregar al HTML
  const body = document.querySelector('body');
  toUp.classList.remove('fixed-toUp');
  body.classList.add('overflow-hidden');
  body.appendChild(modal);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.classList.add('fade-out');

  setTimeout(() => {
    modal?.remove();
    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden');
    toUp.classList.add('fixed-toUp');
    body.style.paddingRight = '';
  }, 400);
}

function highlightLinks() {
  document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    let actual = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === '#' + actual) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}

function scrollNav() {
  const navLinks = document.querySelectorAll('.navegacion-principal a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute('href');
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function scrollToUP() {
  const toUp = document.querySelector('.toUp');

  toUp.addEventListener('click', (e) => {
    e.preventDefault();
    const toUpHref = document.querySelector('#toUp');
    toUpHref.scrollIntoView({ behavior: 'smooth' });
  });
}
