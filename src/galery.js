import images from './gallery-items.js';

const galleryListRef = document.querySelector('.gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const galleryImg = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('.lightbox__button');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

const createGalleryPhoto = ({ original, preview, description }) => {
  return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
    </li>`;
};

const createGalleryMarkUp = images.map(createGalleryPhoto).join('');

galleryListRef.insertAdjacentHTML('beforeend', createGalleryMarkUp);

galleryListRef.addEventListener('click', onGalleryListCkick);

function onGalleryListCkick(evt) {
  evt.preventDefault();
  const imgUrl = evt.target.getAttribute('data-source');
  const isSwatchImageEl = evt.target.classList.contains('gallery__image');

  if (!isSwatchImageEl) {
    return;
  }
  openModal();
  galleryImg.src = imgUrl;
}

function openModal() {
  window.addEventListener('keydown', onEscKeyPress);
  lightboxRef.classList.add('is-open');
}

btnClose.addEventListener('click', closeModal);

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  lightboxRef.classList.remove('is-open');
}

lightboxOverlay.addEventListener('click', closeModal);

function onEscKeyPress({ code }) {
  if (code === 'Escape') {
    closeModal();
  }
}
