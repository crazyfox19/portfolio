// ========================================
// Modern Portfolio - JavaScript
// ========================================

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');

    if (isOpen) {
      // Close menu
      mobileMenu.classList.add('hidden');
      hamburger.querySelectorAll('.hamburger-line').forEach((line, index) => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    } else {
      // Open menu
      mobileMenu.classList.remove('hidden');
      const lines = hamburger.querySelectorAll('.hamburger-line');
      lines[0].style.transform = 'translateY(6px) rotate(45deg)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    }
  });

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      hamburger.querySelectorAll('.hamburger-line').forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    });
  });
}

// Navbar style change on scroll
const navbar = document.getElementById('navbar');
const navLogo = document.querySelector('.nav-logo');
const navLinksDesktop = document.querySelectorAll('.nav-link');
const hamburgerLines = document.querySelectorAll('.hamburger-line');

// Navbar hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbarVisibility() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    // Scrolling down - hide navbar
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up - show navbar
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

function handleNavbarScroll() {
  // Magazine Editorial - Navbar stays consistent cream/brown
  // Just handle visibility on scroll
  if (!ticking) {
    window.requestAnimationFrame(updateNavbarVisibility);
    ticking = true;
  }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  // This function is simplified since navbar colors are now handled by handleNavbarScroll
  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}` && !link.classList.contains('rounded-full')) {
          link.style.fontWeight = '600';
        } else if (!link.classList.contains('rounded-full')) {
          link.style.fontWeight = '500';
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);
window.addEventListener('load', highlightNavLink);

// Scroll-triggered animations
const animatedElements = document.querySelectorAll('.animate-on-scroll');

function checkScroll() {
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-bar');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const width = bar.getAttribute('data-width');

    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      bar.style.width = width + '%';
      bar.style.transition = 'width 1.5s ease-out';
    }
  });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-8 py-4 rounded-xl shadow-2xl z-50 animate-fade-in-up';
    successMessage.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Thank you, ${name}! Your message has been sent.</span>
      </div>
    `;

    document.body.appendChild(successMessage);

    // Remove message after 4 seconds
    setTimeout(() => {
      successMessage.style.opacity = '0';
      successMessage.style.transform = 'translate(-50%, -20px)';
      successMessage.style.transition = 'all 0.3s ease-out';
      setTimeout(() => successMessage.remove(), 300);
    }, 4000);

    // Reset form
    contactForm.reset();
  });
}

// Intersection Observer for lazy loading and animations
if ('IntersectionObserver' in window) {
  // Lazy load images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
        imageObserver.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  // Animate elements on scroll
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(element => {
    elementObserver.observe(element);
  });
}

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Typing effect for hero (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Trigger initial animations
  setTimeout(() => {
    checkScroll();
    animateSkillBars();
  }, 100);

  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && mobileMenu) {
      mobileMenu.classList.add('hidden');
      hamburger.querySelectorAll('.hamburger-line').forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  }, 250);
});

// Console welcome message
console.log('%c Welcome to Asonye Mmaokike\'s Portfolio ',
  'background: #2B2722; color: #E8E4DD; padding: 10px 20px; font-size: 14px; font-family: Georgia, serif;');
