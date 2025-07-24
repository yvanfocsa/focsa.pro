// --- FONCTIONNALITÉS INITIALISÉES DIRECTEMENT ---

// Animation de la pluie binaire
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

// Menu mobile
document.getElementById('mobileMenuButton').addEventListener('click', function() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
});

// Année dans le footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Observeur pour les animations au défilement
const observerOptions = {
    threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // La fonction animateSkillBars() n'existe pas dans le code source,
            // cette ligne est donc commentée pour éviter une erreur.
            // if (entry.target.id === 'skills') {
            //     animateSkillBars();
            // }
            entry.target.classList.add('animate-fadeIn'); // Classe d'animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Suivi du lien de navigation actif (logique originale)
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

// Animation de la machine à écrire
function typeWriter() {
    const text = "whoami";
    const element = document.getElementById("typingText");
    const cursor = document.querySelector(".blinking-cursor");
    if (!element || !cursor) return;
    let i = 0;
    const typingSpeed = 80;
    
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
                
                setTimeout(() => { responseLine.style.opacity = '1'; }, 100);
                
                newPrompt.innerHTML = '<span class="text-neon-red">root@yvanfocsa:~$</span> <span class="blinking-cursor">_</span>';
            }, 500);
        }
    }
    type();
}

// Autre animation de machine à écrire
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
    setTimeout(type, 1000);
}

// --- FONCTIONNALITÉS QUI ATTENDENT LE CHARGEMENT COMPLET ---

document.addEventListener('DOMContentLoaded', function() {
    createBinaryRain();
    animateTitle();
    
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
