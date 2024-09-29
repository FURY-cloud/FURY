document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const filterButtons = document.querySelectorAll('.hero-buttons .btn');
    const collectionItems = document.querySelectorAll('.collection-item');
    const lookbookItems = document.querySelectorAll('.lookbook-item');
    const navbar = document.getElementById('mainNav');
    const lookbookSlider = document.querySelector('.lookbook-slider');
    const lookbookPrev = document.querySelector('.lookbook-prev');
    const lookbookNext = document.querySelector('.lookbook-next');

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            collectionItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            lookbookItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            showLookbookItem(0);
        });
    });

    let currentLookbookIndex = 0;

    function showLookbookItem(index) {
        const visibleItems = Array.from(lookbookItems).filter(item => !item.classList.contains('hidden'));
        currentLookbookIndex = index;

        visibleItems.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    lookbookPrev.addEventListener('click', () => {
        const visibleItems = Array.from(lookbookItems).filter(item => !item.classList.contains('hidden'));
        currentLookbookIndex = (currentLookbookIndex - 1 + visibleItems.length) % visibleItems.length;
        showLookbookItem(currentLookbookIndex);
    });

    lookbookNext.addEventListener('click', () => {
        const visibleItems = Array.from(lookbookItems).filter(item => !item.classList.contains('hidden'));
        currentLookbookIndex = (currentLookbookIndex + 1) % visibleItems.length;
        showLookbookItem(currentLookbookIndex);
    });

    showLookbookItem(currentLookbookIndex);

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        showImage(currentIndex);
    });

    function handleScroll() {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    lucide.createIcons();
});