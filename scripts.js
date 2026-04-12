// scripts.js

// Lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        lightbox.classList.add('open');
        lightboxImage.src = image.src;
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
});

// Filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        galleryItems.forEach(item => {
            if(filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lazy loading functionality
const lazyImages = document.querySelectorAll('.lazy');
const config = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, config);

lazyImages.forEach(image => {
    imgObserver.observe(image);
});

// Keyboard navigation functionality
window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('open');
        }
    }
});