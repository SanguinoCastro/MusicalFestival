document.addEventListener('DOMContentLoaded', function () {
  fixedToUp();
  createGallery();
  highlightLinks();
  scrollNav();
  scrollToUP();
});

function fixedToUp() {
  const toUp = document.querySelector('.toUp');
  const aboutFestival = document.querySelector('.about-festival');
  window.addEventListener('scroll', function () {
    if (aboutFestival.getBoundingClientRect().top < 1) {
      toUp.classList.add('fixed-toUp');
    } else {
      toUp.classList.remove('fixed-toUp');
    }
  });
}

function createGallery() {
  const CANTIDAD_IMAGENES = 16;
  const gallery = document.querySelector('.gallery-images');

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const image = document.createElement('PICTURE');
    image.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galería">
`;

    //   Event Handler
    image.onclick = function () {
      showImage(i);
    };

    gallery.appendChild(image);
  }
}

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
    const toUpHref = document.querySelector('#video');
    toUpHref.scrollIntoView({ behavior: 'smooth' });
  });
}
