//header sticky
window.onscroll = function () { headerStick() };
var header = document.querySelector(".main-header");
var sticky = header.offsetTop;
function headerStick() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
//nav toggle mobile
var toggle = document.querySelector('.nav-toggle')
toggle.addEventListener('click', navToggle)
function navToggle() {
    var navMenu = document.querySelector('nav > ul')
    navMenu.classList.toggle('hide-mobile')
    if (toggle.classList.contains('bi-list')) {
        toggle.classList.replace('bi-list', 'bi-x-lg')
    } else {
        toggle.classList.replace('bi-x-lg', 'bi-list')
    }
}
//menu filter
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.menu-filters li');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => {
                btn.classList.remove('filter-active');
            });
            this.classList.add('filter-active');
            const filterValue = this.getAttribute('data-filter');
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                if (filterValue === '*') {
                    item.style.display = 'flex';
                } else if (item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    // Specials tabs 
    const specialsTabs = document.querySelectorAll('.specials-tabs li');
    specialsTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            specialsTabs.forEach(t => {
                t.classList.remove('active-tab');
            });
            this.classList.add('active-tab');
            const tabContents = document.querySelectorAll('.specials-tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Events carousel
    const slides = document.querySelectorAll('.carousel__slide');
    const dots = document.querySelectorAll('.carousel__dots .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 5000); 
    }
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            startSlideshow();
        });
    });
    startSlideshow();
});

// Floating caption
const imgContent = document.querySelectorAll('.gallery__image__caption');
var x, y;

function showImgContent(e) {
    for(var i = 0; i < imgContent.length; i++) {
        x = e.pageX;
        y = e.pageY;
        imgContent[i].style.transform = `translate(${x}px, ${y}px)`;
    }
}

document.addEventListener('mousemove', showImgContent);


// Lightbox modal
const body = document.body;
const items = document.querySelectorAll(".gallery_item");
const modal = document.createElement("section");
const modalImg = document.createElement("img");
const modalPrev = createButton("prev");
const modalNext = createButton("next");
const modalClose = createButton("close");
let currentItem = 0;
let modalInstance;

modal.classList.add("gallery__modal");
modalPrev.classList.add("gallery__navigation--prev");
modalNext.classList.add("gallery__navigation--next");
modalClose.classList.add("gallery__navigation--close");

function createButton(type) {
    const button = document.createElement("button");
    
    if(type === "prev") {
        button.addEventListener("click", prevItem);
    } else if(type === "next") {
        button.addEventListener("click", nextItem);
    } else if(type === "close") {
        button.addEventListener("click", closeModal);
    }
    
    return button;
}

function prevItem() {
    currentItem = (currentItem - 1 + items.length) % items.length;
    updateModalImage();
}

function nextItem() {
    currentItem = (currentItem + 1) % items.length;
    updateModalImage();
} 

function closeModal() {
    modal.remove();
    body.classList.remove('noscroll');
}

function updateModalImage() {
    const img = items[currentItem].querySelector("img");
    modalImg.src = img.src;
    modalImg.alt = img.alt;
}

function showModal(index) {
    currentItem = index;
    updateModalImage();
    modal.innerHTML = '';
    modal.append(modalImg, modalPrev, modalNext, modalClose);
    document.body.appendChild(modal);
    body.classList.add('noscroll');
    modal.setAttribute('aria-hidden', 'false');
}

items.forEach(function(item, index) {
    item.addEventListener('click', function() {
        showModal(index);
    });
});

document.body.addEventListener('keyup', (ev) => {
    if (ev.key === "Escape" && modal.parentElement) {
        closeModal();
    }
});
