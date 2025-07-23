// Configuration de Tailwind pour étendre le thème par défaut
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'blood-red': '#8B0000',
                'dark-red': '#5C0000',
                'neon-red': '#FF3131',
                'cyber-red': '#FF073A',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'hacker-text': 'hackerText 1s steps(10) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                hackerText: {
                    '0%': { opacity: '0.1', textShadow: '0 0 8px #FF073A' },
                    '2%': { opacity: '1' },
                    '8%': { opacity: '0.1' },
                    '9%': { opacity: '1' },
                    '12%': { opacity: '0.1' },
                    '20%': { opacity: '1' },
                    '25%': { opacity: '0.3' },
                    '30%': { opacity: '1' },
                    '70%': { opacity: '0.7' },
                    '72%': { opacity: '0.2' },
                    '77%': { opacity: '0.9' },
                    '100%': { opacity: '0.9' },
                },
                glow: {
                    'from': { 'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FF073A, 0 0 20px #FF073A' },
                    'to': { 'text-shadow': '0 0 10px #fff, 0 0 15px #FF3131, 0 0 20px #FF3131, 0 0 25px #FF3131' },
                }
            }
        }
    }
};

// Exécute le script une fois que le contenu de la page est entièrement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Binary rain animation
    function createBinaryRain() {
        const container = document.getElementById('binaryRain');
        if (!container) return; // Évite les erreurs si l'élément n'existe pas
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
            
            // Create falling animation
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
                    // La fonction animateSkillBars() n'était pas définie, donc elle est commentée.
                    // animateSkillBars(); 
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
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
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
    
    // CLI Typing Animation (La fonction originale a été laissée commentée car elle ne semblait pas utilisée)
    /*
    function typeWriter() {
        const text = "whoami";
        const element = document.getElementById("typingText");
        const cursor = document.querySelector(".blinking-cursor");
        let i = 0;
        const typingSpeed = 80;
        
        if (!element || !cursor) return;
        
        cursor.style.visibility = 'hidden';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(() => {
                    const responseLine = document.createElement("div");
                    responseLine.className = "terminal-line mb-4 ml-8 text-gray-300";
                    responseLine.style.opacity = '0';
                    responseLine.style.transition = 'opacity 1s ease-in-out';
                    responseLine.textContent = "Cybersecurity Engineer | Network Security Specialist | Pentester";
                    
                    const newPrompt = document.createElement("div");
                    newPrompt.className = "terminal-line";
                    newPrompt.innerHTML = '<span class="text-neon-red">root@yvanfocsa:~$</span>';
                    
                    const terminal = document.getElementById("terminalPrompt");
                    terminal.parentNode.insertBefore(responseLine, terminal.nextSibling);
                    terminal.parentNode.insertBefore(newPrompt, responseLine.nextSibling);
                    
                    setTimeout(() => {
                        responseLine.style.opacity = '1';
                    }, 100);
                    
                    newPrompt.innerHTML = '<span class="text-neon-red">root@yvanfocsa:~$</span> <span class="blinking-cursor">_</span>';
                }, 500);
            }
        }
        type();
    }
    */
    
    // Smooth text animation for hero title
    function animateTitle() {
        const text = "Cybersecurity Engineer | Network Specialist | Ethical Hacker";
        const element = document.getElementById("animatedTitle");
        if (!element) return;
        
        let i = 0;
        const typingSpeed = 50; // milliseconds per character
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            }
        }
        
        setTimeout(type, 1000); // Start after 1 second
    }

    // Initialize functions
    createBinaryRain();
    animateTitle();
    
    // Add hover effect to project cards (this can also be done with CSS :hover pseudo-class as already implemented)
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
