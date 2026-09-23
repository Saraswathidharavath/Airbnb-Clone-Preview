// ===================== PHOTO DATA =====================
// Swap these gradient placeholders for real listing photo URLs.
const PHOTOS = [
  { grad: 'linear-gradient(135deg,#e8c39e,#c17a4f)', alt: 'Living room with exposed brick' },
  { grad: 'linear-gradient(135deg,#cfd9df,#8fa3ad)', alt: 'Kitchen with oak counters' },
  { grad: 'linear-gradient(135deg,#f6d365,#c98a3f)', alt: 'Primary bedroom' },
  { grad: 'linear-gradient(135deg,#a1c4fd,#5b7fc7)', alt: 'Bathroom' },
  { grad: 'linear-gradient(135deg,#d4a5a5,#8a5a5a)', alt: 'City view from window' },
  { grad: 'linear-gradient(135deg,#89f7fe,#66a6ff)', alt: 'Second bedroom' },
  { grad: 'linear-gradient(135deg,#fccb90,#d57eeb)', alt: 'Dining nook' },
  { grad: 'linear-gradient(135deg,#f6d5f7,#fbe9d7)', alt: 'Workspace' },
  { grad: 'linear-gradient(135deg,#96fbc4,#f9f586)', alt: 'Balcony' },
  { grad: 'linear-gradient(135deg,#ff9a9e,#fecfef)', alt: 'Entryway' },
  { grad: 'linear-gradient(135deg,#a18cd1,#fbc2eb)', alt: 'Hallway' },
  { grad: 'linear-gradient(135deg,#ffecd2,#fcb69f)', alt: 'Building exterior' },
];

const galleryGrid   = document.getElementById('galleryGrid');
const showAllBtn    = document.getElementById('showAllBtn');
const photoTour     = document.getElementById('photoTour');
const ptourBody     = document.getElementById('ptourBody');
const ptourClose    = document.getElementById('ptourClose');
const lightbox      = document.getElementById('lightbox');
const lbImage       = document.getElementById('lbImage');
const lbCounter     = document.getElementById('lbCounter');
const lbClose       = document.getElementById('lbClose');
const lbPrev        = document.getElementById('lbPrev');
const lbNext        = document.getElementById('lbNext');

let currentIndex = 0;
let lastFocusedEl = null;

// ===================== BUILD PHOTO TOUR GRID =====================
function buildPhotoTour() {
  ptourBody.innerHTML = '';
  let i = 0;
  while (i < PHOTOS.length) {
    const row = document.createElement('div');
    // alternate single full-width photo, then a pair — mimics Airbnb's tour layout
    const isSingle = (i / 1) % 3 === 0;
    row.className = 'ptour-row ' + (isSingle ? 'single' : 'pair');
    const count = isSingle ? 1 : 2;
    for (let j = 0; j < count && i < PHOTOS.length; j++, i++) {
      const btn = document.createElement('button');
      btn.className = 'ptour-photo';
      btn.style.backgroundImage = PHOTOS[i].grad;
      btn.setAttribute('aria-label', 'Open photo: ' + PHOTOS[i].alt);
      btn.dataset.index = i;
      btn.addEventListener('click', () => openLightbox(i));
      row.appendChild(btn);
    }
    ptourBody.appendChild(row);
  }
}
buildPhotoTour();

// ===================== OPEN / CLOSE PHOTO TOUR =====================
function openPhotoTour(focusIndex) {
  lastFocusedEl = document.activeElement;
  photoTour.hidden = false;
  document.body.style.overflow = 'hidden';
  ptourClose.focus();
  if (typeof focusIndex === 'number') {
    const target = ptourBody.querySelector(`[data-index="${focusIndex}"]`);
    if (target) target.scrollIntoView({ block: 'start' });
  }
}
function closePhotoTour() {
  photoTour.hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}
galleryGrid.addEventListener('click', (e) => {
  const tile = e.target.closest('.gallery-tile');
  if (!tile) return;
  openPhotoTour(Number(tile.dataset.index));
});
showAllBtn.addEventListener('click', () => openPhotoTour(0));
ptourClose.addEventListener('click', closePhotoTour);

// ===================== OPEN / CLOSE LIGHTBOX =====================
function renderLightbox() {
  const photo = PHOTOS[currentIndex];
  lbImage.style.backgroundImage = photo.grad;
  lbImage.setAttribute('role', 'img');
  lbImage.setAttribute('aria-label', photo.alt);
  lbCounter.textContent = `${currentIndex + 1} / ${PHOTOS.length}`;
  lbPrev.disabled = currentIndex === 0;
  lbNext.disabled = currentIndex === PHOTOS.length - 1;
  lbPrev.style.opacity = lbPrev.disabled ? '0.4' : '1';
  lbNext.style.opacity = lbNext.disabled ? '0.4' : '1';
  // restart the zoom-in animation
  lbImage.style.animation = 'none';
  void lbImage.offsetWidth;
  lbImage.style.animation = '';
}
function openLightbox(index) {
  currentIndex = index;
  lastFocusedEl = document.activeElement;
  lightbox.hidden = false;
  renderLightbox();
  lbClose.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  if (lastFocusedEl) lastFocusedEl.focus();
}
function showPrev() { if (currentIndex > 0) { currentIndex--; renderLightbox(); } }
function showNext() { if (currentIndex < PHOTOS.length - 1) { currentIndex++; renderLightbox(); } }

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

// ===================== KEYBOARD NAVIGATION =====================
document.addEventListener('keydown', (e) => {
  if (!lightbox.hidden) {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'ArrowRight') showNext();
    return;
  }
  if (!photoTour.hidden) {
    if (e.key === 'Escape') closePhotoTour();
  }
});

// ===================== SAVE / SHARE (stub interactions) =====================
document.getElementById('saveBtn').addEventListener('click', function () {
  this.classList.toggle('saved');
  const icon = this.querySelector('.icon');
  icon.textContent = this.classList.contains('saved') ? '♥' : '♡';
});
