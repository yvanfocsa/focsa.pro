document.addEventListener('DOMContentLoaded', function() {
    // Binary rain animation
    function createBinaryRain() {
        const container = document.getElementById('binaryRain');
        if (!container) return;
        const digits = '01';
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = digits[Math.floor(Math.random() * digits.length)];
            digit.style.left = `${i * 20}px`;
            digit.style.animationDuration = `${5 + Math.random() * 10}s`;
            digit.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(digit);
            
            setInterval(() => {
                digit.textContent = digits[Math.floor(Math.random() * digits.length)];
            }, 100);
        }
    }
    
    // Mobile menu toggle
    document.getElementById('mobileMenuButton').addEventListener('click', function() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('hidden');
    });
    
    // Update year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    // animateSkillBars(); // Fonction non définie dans le code original
                }
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80px offset for fixed nav
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Highlight active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    });
    
    // CLI Typing Animation
    // La fonction typeWriter() n'était pas appelée dans le code original
    
    // Smooth text animation
    function animateTitle() {
        const text = "Cybersecurity Engineer | Network Specialist | Ethical Hacker";
        const element = document.getElementById("animatedTitle");
        if (!element) return;
        
        let i = 0;
        const typingSpeed = 50;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            }
        }
        
        setTimeout(type, 1000); // Start after 1 second
    }

    // Initialize
    createBinaryRain();
    animateTitle();
    
    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(255, 7, 58, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
