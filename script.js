// --- Stable Lightbox Logic ---

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-grid img');
let currentIndex = 0;

// 1. Open Lightbox on Click
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        updateImage(); // Load the image
        lightbox.classList.add('active'); // Show the box
    });
});

// 2. Change Slide (Next/Prev)
function changeSlide(n, event) {
    if(event) event.stopPropagation(); // Don't close when clicking arrows
    
    currentIndex += n;

    // Loop logic (First to Last, Last to First)
    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }

    updateImage();
}

// 3. Update the Image Source
function updateImage() {
    lightboxImg.src = galleryImages[currentIndex].src;
}

// 4. Close Lightbox (X Button)
function closeLightboxBtn() {
    lightbox.classList.remove('active');
}

// 5. Close Lightbox (Background Click)
function closeLightbox(event) {
    if (event.target === lightbox) {
        lightbox.classList.remove('active');
    }
}

// 6. Keyboard Support
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'Escape') closeLightboxBtn();
});

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('menu-list');
    menu.classList.toggle('active');
}

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu-list').classList.remove('active');
    });
});