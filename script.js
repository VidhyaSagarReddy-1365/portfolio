/**
 * 🛠️ Portfolio Interactivity & Logic script
 * G. Vidya Sagar Reddy
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 🌓 Dark / Light Theme Toggle
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }

  // ==========================================
  // 📱 Mobile Navigation Menu
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links-list');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    const isOpen = navLinksList.classList.contains('active');
    mobileMenuBtn.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    });
  });

  // ==========================================
  // 🧭 Sticky Navbar & Scroll Styling
  // ==========================================
  const headerNav = document.getElementById('header-nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 🔤 Typing Animation (Hero Section)
  // ==========================================
  const typingTextElement = document.getElementById('typing-text');
  const roles = [
    'Software Engineer',
    'Java Developer',
    'AI & Machine Learning Enthusiast',
    'Automated Agent Builder'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting characters
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // speed up deleting
    } else {
      // Typing characters
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // normal speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 1800; // wait 1.8s
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 300; // wait 300ms before typing next
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing animation
  if (typingTextElement) {
    type();
  }

  // ==========================================
  // 🎯 Active Section Scroll Highlighting
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-link');
          } else {
            link.classList.remove('active-link');
          }
        });
      }
    });
  }, {
    threshold: 0.25, // trigger when 25% of section is visible
    rootMargin: '-50px 0px -25% 0px' // adjust focus area
  });

  sections.forEach(section => {
    activeSectionObserver.observe(section);
  });

  // ==========================================
  // ✨ Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 📅 Dynamic Footer Year
  // ==========================================
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
