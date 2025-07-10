document.addEventListener('DOMContentLoaded',  function() {
  const introScreen = document.getElementById('intro-screen');
  const mainSite = document.getElementById('main-site');
  const portfolioBtn = document.getElementById('portfolio-btn');
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  // Canvas setup
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix rain effect
  // const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrix = "UDAYMAHESHWARIMARKETINGSTRATEGISTDIGITALGROWTHEXPERT123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrixArray = matrix.split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for(let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(15, 15, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ffff';
    ctx.font = fontSize + 'px monospace';
    
    for(let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 35);

  // Portfolio button click
  portfolioBtn.addEventListener('click', function() {
    clearInterval(matrixInterval);
    introScreen.classList.add('hidden');
    
    setTimeout(() => {
      mainSite.classList.add('visible');
      animateSkills();
    }, 500);
  });

  // Navigation
  const navLinks = document.querySelectorAll('[data-section]');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      document.getElementById(targetSection).classList.add('active');
      
      if(targetSection === 'skills') {
        setTimeout(animateSkills, 100);
      }
    });
  });

  // Skills animation
  function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      setTimeout(() => {
        bar.style.width = progress + '%';
      }, 200);
    });
  }

  // Scroll animations
  function animateOnScroll() {
    const cards = document.querySelectorAll('.achievement-card, .contact-item');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0) {
        card.style.animation = 'fadeIn 0.8s ease forwards';
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);

  // Resume download
  const resumeBtn = document.querySelector('.resume-btn');

  resumeBtn.addEventListener('click', () => {
    const pdfUrl = 'Assets/Uday Resume.pdf'; // Replace with your actual file path
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'Uday_Resume.pdf'; // File name shown on download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  // Particle effect on hover
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #00ffff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
      box-shadow: 0 0 10px #00ffff;
      animation: particleFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  // Add particle animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Hamburger menu logic for mobile
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  hamburgerBtn.addEventListener('click', function() {
    navMenu.classList.toggle('open');
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !expanded);
  });

  // Close nav menu on link click (mobile)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Add particle effects to buttons (mouse and touch)
  function addParticleListeners(element) {
    element.addEventListener('mouseenter', function(e) {
      const rect = e.target.getBoundingClientRect();
      for(let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 100);
      }
    });
    // Touch support
    element.addEventListener('touchstart', function(e) {
      const rect = e.target.getBoundingClientRect();
      for(let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 100);
      }
    }, {passive: true});
  }
  document.querySelectorAll('button, .social-link').forEach(addParticleListeners);
});
 