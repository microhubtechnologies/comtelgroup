// Initialize EmailJS with your Public Key (User ID)
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('d0Ljm6Dr4Y2SBnsSS'); // <-- Yahan apna Public Key daal diya
    }
})();

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-primary-600');
                link.classList.add('text-gray-700');
            });
            
            // Add active class to current nav link
            document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
                link.classList.remove('text-gray-700');
                link.classList.add('text-primary-600');
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white');
        navbar.classList.remove('bg-white/95');
    } else {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white');
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .about-content, .about-image, .value-card, .mission-card, .vision-card, .service-card, .strength-card, .client-card, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fadeInUp');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Send email using EmailJS
    emailjs.send(
        'service_7kpvbnq',           // <-- Yahan apna Service ID daal diya
        'template_frdykqd',          // <-- Yahan apna Template ID daal diya
        templateParams
    )
    .then(function(response) {
        // Success
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
        // Error
        showNotification('Failed to send message. Please try again or contact us directly.', 'error');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial animation check
    animateOnScroll();
    
    // Add intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });
    
    // Observe all animatable elements
    document.querySelectorAll('.hero-content, .about-content, .about-image, .value-card, .mission-card, .vision-card, .service-card, .strength-card, .client-card, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });
});

// Floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const amplitude = 10 + (index * 5);
        const time = Date.now() * 0.001;
        
        const y = Math.sin(time * speed) * amplitude;
        const x = Math.cos(time * speed * 0.5) * (amplitude * 0.5);
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateFloatingElements);
}

// Start floating animation
animateFloatingElements();

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform += ` translateY(${yPos}px)`;
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 50);
        } else {
            counter.innerText = target;
        }
    });
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});
