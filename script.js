// Mobile Navigation Toggle
document.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Search Functionality
const searchBar = document.querySelector('.search-bar');
const productCards = document.querySelectorAll('.product-card');
const scrollProducts = document.querySelectorAll('.scroll-product');

searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // Search in main products
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const desc = card.querySelector('.product-desc').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Search in most wanted products
    scrollProducts.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const desc = product.querySelector('.product-desc').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
});

// Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter category
        const filterValue = this.textContent.toLowerCase();
        
        // Filter products
        productCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Sort Products
const sortSelect = document.querySelector('.sort-select');

sortSelect.addEventListener('change', function() {
    const sortValue = this.value;
    const productsGrid = document.querySelector('.products-grid');
    const productCardsArray = Array.from(productCards);
    
    switch(sortValue) {
        case 'Price: Low to High':
            productCardsArray.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                return priceA - priceB;
            });
            break;
        case 'Price: High to Low':
            productCardsArray.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.current-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.current-price').textContent.replace('$', ''));
                return priceB - priceA;
            });
            break;
        case 'Most Popular':
            productCardsArray.sort((a, b) => {
                const ratingA = parseInt(a.querySelector('.product-rating span').textContent.replace('(', '').replace(')', ''));
                const ratingB = parseInt(b.querySelector('.product-rating span').textContent.replace('(', '').replace(')', ''));
                return ratingB - ratingA;
            });
            break;
        default: // New (default)
            productCardsArray.sort((a, b) => {
                const isNewA = a.querySelector('.product-badge.new') !== null;
                const isNewB = b.querySelector('.product-badge.new') !== null;
                return isNewB - isNewA;
            });
    }
    
    // Clear and re-append sorted products
    productsGrid.innerHTML = '';
    productCardsArray.forEach(card => {
        productsGrid.appendChild(card);
    });
});

// Product Hover Effects
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });
});

// Add to Cart Functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const product = this.closest('.product-card') || this.closest('.scroll-product');
        const title = product.querySelector('.product-title').textContent;
        const price = product.querySelector('.current-price').textContent;
        
        // Show added to cart message
        const cartNotification = document.createElement('div');
        cartNotification.textContent = `${title} (${price}) added to cart!`;
        cartNotification.style.position = 'fixed';
        cartNotification.style.bottom = '20px';
        cartNotification.style.right = '20px';
        cartNotification.style.backgroundColor = '#2a9d8f';
        cartNotification.style.color = 'white';
        cartNotification.style.padding = '10px 20px';
        cartNotification.style.borderRadius = '4px';
        cartNotification.style.zIndex = '1000';
        cartNotification.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        
        document.body.appendChild(cartNotification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            cartNotification.style.opacity = '0';
            cartNotification.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                document.body.removeChild(cartNotification);
            }, 500);
        }, 3000);
        
        // Animation for button
        this.textContent = 'Added!';
        this.style.backgroundColor = '#2a9d8f';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.backgroundColor = '#000';
        }, 2000);
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.footer-column form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            emailInput.value = '';
        }
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Initialize product categories
document.addEventListener('DOMContentLoaded', function() {
    // Add data-category attributes to products (for filtering)
    const categories = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes'];
    productCards.forEach((card, index) => {
        card.setAttribute('data-category', categories[index % categories.length]);
    });
});