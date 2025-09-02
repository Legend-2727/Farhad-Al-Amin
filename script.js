// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });
});

// Dark Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
        
        // Add a fun rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
});

// Enhanced Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu with enhanced animation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Enhanced navbar scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
});

// Smooth scrolling with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Quantum Animation
document.addEventListener('DOMContentLoaded', () => {
    const qubits = document.querySelectorAll('.qubit');
    
    qubits.forEach((qubit, index) => {
        // Enhanced glow effect with theme awareness
        setInterval(() => {
            const intensity = Math.random() * 0.5 + 0.5;
            const theme = document.documentElement.getAttribute('data-theme');
            const glowColor = theme === 'dark' ? '139, 92, 246' : '255, 255, 255';
            
            qubit.style.boxShadow = `
                0 0 ${20 + intensity * 30}px rgba(${glowColor}, ${intensity * 0.6}),
                inset 0 0 ${10 + intensity * 15}px rgba(${glowColor}, ${intensity * 0.3})
            `;
        }, 1000 + index * 500);
        
        // Add quantum entanglement effect
        qubit.addEventListener('mouseenter', () => {
            qubits.forEach((otherQubit, otherIndex) => {
                if (otherIndex !== index) {
                    otherQubit.style.animationDuration = '0.5s';
                    setTimeout(() => {
                        otherQubit.style.animationDuration = '3s';
                    }, 1000);
                }
            });
        });
    });
});

// Enhanced Intersection Observer for animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animations for child elements
            const children = entry.target.querySelectorAll('.skill-category, .achievement-card, .project-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.animation = `fadeInUp 0.6s ease forwards`;
                    child.style.animationDelay = `${index * 0.1}s`;
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections for enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        enhancedObserver.observe(section);
    });
});

// Typing animation for hero subtitle with cursor effect
function enhancedTypeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed + Math.random() * 20); // Add natural variation
        } else {
            // Blinking cursor effect
            setInterval(() => {
                element.style.borderRight = element.style.borderRight === 'none' ? 
                    '2px solid rgba(255, 255, 255, 0.7)' : 'none';
            }, 500);
        }
    }
    
    type();
}

// Initialize enhanced typing animation
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    enhancedTypeWriter(subtitle, originalText, 25);
});

// Parallax scrolling effect with performance optimization
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
    
    // Parallax for background elements
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.1}px`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add entrance animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Add glow effect
            const theme = document.documentElement.getAttribute('data-theme');
            const glowColor = theme === 'dark' ? '139, 92, 246' : '37, 99, 235';
            card.style.boxShadow += `, 0 0 30px rgba(${glowColor}, 0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            card.style.boxShadow = '';
        });
        
        // Add click effect
        card.addEventListener('mousedown', () => {
            card.style.transform = 'translateY(-8px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
        });
    });
});

// Skill tags animation
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach((skill, index) => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'scale(1.1) rotate(5deg)';
            skill.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'scale(1) rotate(0deg)';
            skill.style.boxShadow = '';
        });
    });
});

// Enhanced Easter egg - Konami code with quantum particles
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        createEnhancedQuantumParticles();
        konamiCode = [];
    }
});

function createEnhancedQuantumParticles() {
    const particleCount = 100;
    const body = document.body;
    
    // Create particle burst effect
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const hue = Math.random() * 360;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, hsl(${hue}, 100%, 60%), hsl(${hue + 60}, 100%, 70%));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${window.innerWidth / 2}px;
            top: ${window.innerHeight / 2}px;
            animation: quantumExplode ${2 + Math.random() * 3}s ease-out forwards;
            box-shadow: 0 0 ${size * 2}px hsl(${hue}, 100%, 60%);
        `;
        
        // Random direction
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 200 + Math.random() * 300;
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--deltaX', deltaX + 'px');
        particle.style.setProperty('--deltaY', deltaY + 'px');
        
        body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // Show congratulations message
    showQuantumMessage();
}

function showQuantumMessage() {
    const message = document.createElement('div');
    message.textContent = '🎉 Quantum State Activated! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: quantumMessage 3s ease-in-out forwards;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add dynamic keyframes for animations
const style = document.createElement('style');
style.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes quantumExplode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--deltaX), var(--deltaY)) scale(0);
        }
    }
    
    @keyframes quantumMessage {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-menu.active {
        transform: translateX(0);
    }
    
    body.menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);
