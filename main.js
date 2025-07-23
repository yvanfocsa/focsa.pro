// Tout le code est encapsulé dans cet événement pour s'assurer que le HTML est chargé avant de le manipuler.
document.addEventListener('DOMContentLoaded', function() {

    // --- DÉFINITIONS DES FONCTIONS ---

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

    // Animation de machine à écrire pour le titre
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
        setTimeout(type, 1000); // Démarre après 1 seconde
    }

    // NOTE: La fonction 'typeWriter' du code original n'était jamais appelée, je la laisse donc commentée
    // pour que le comportement soit identique. Si vous en avez besoin, décommentez-la.
    /*
    function typeWriter() {
        const text = "whoami";
        const element = document.getElementById("typingText");
        const cursor = document.querySelector(".blinking-cursor");
        if(!element || !cursor) return;
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
    */
   
    // NOTE: La fonction 'animateSkillBars' était appelée dans l'Observer mais n'a jamais été définie.
    // Pour éviter une erreur dans la console, elle reste non définie ici, comme dans l'original.
    // function animateSkillBars() { /* ... code manquant ... */ }


    // --- EXÉCUTION ET ÉCOUTEURS D'ÉVÉNEMENTS ---

    // Initialisation des animations
    createBinaryRain();
    animateTitle();
    // typeWriter(); // Décommentez si vous voulez utiliser cette fonction

    // Menu mobile
    document.getElementById('mobileMenuButton').addEventListener('click', function() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('hidden');
    });

    // Année en cours dans le footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Effet de survol sur les cartes projet (géré aussi en CSS)
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

    // Défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Décalage pour la nav fixe
                    behavior: 'smooth'
                });
            }
            
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Mise en évidence du lien de navigation actif au défilement
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${section.getAttribute('id')}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    });

    // Animation à l'apparition des sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // if (entry.target.id === 'skills') { animateSkillBars(); }
                entry.target.classList.add('animate-fadeIn'); // Vous devrez peut-être définir cette classe d'animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

});
