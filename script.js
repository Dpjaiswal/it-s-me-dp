// Simple intersection observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Unobserve if you only want it to animate once
            }
        });
    }, observerOptions);

    // Let's add simple fade-in classes via JS to keep HTML clean initially
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // We can handle the 'visible' class here since we injected styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        section.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Dynamic text effect in hero
    const highlightText = document.querySelector('.highlight');
    const roles = ['GenAI', 'AI/ML', 'BACKEND'];
    let roleIndex = 0;

    setInterval(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        highlightText.style.opacity = '0';
        
        setTimeout(() => {
            highlightText.textContent = roles[roleIndex];
            highlightText.style.opacity = '1';
        }, 300);
        
    }, 3000);

    // Initial transition setup for highlight
    highlightText.style.transition = 'opacity 0.3s ease';

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Contact Form Logic (Direct Mailto)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = document.getElementById('sender-name').value;
            const email = document.getElementById('sender-email').value;
            const message = document.getElementById('sender-message').value;
            
            const subject = encodeURIComponent(`New Portfolio Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            contactForm.action = `mailto:dpjaiswal.lkouniv@gmail.com?subject=${subject}&body=${body}`;
            contactForm.method = 'POST';
            contactForm.enctype = 'text/plain';
        });
    }

});
