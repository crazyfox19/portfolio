// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach((n) =>
    n.addEventListener('click', () => {
      hamburger.classList.remove('active')
      navMenu.classList.remove('active')
    })
  )
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-link')

function highlightNavLink() {
  let current = ''
  const pageName = window.location.pathname.split('/').pop() || 'index.html'

  // If we're on a single page (index.html), use section-based highlighting
  if (pageName === 'index.html' || pageName === '' || pageName === '/') {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove('active')
      const href = link.getAttribute('href')
      if (href === `#${current}`) {
        link.classList.add('active')
      }
    })
  } else {
    // For multi-page navigation, highlight the current page
    const currentPage = pageName.replace('.html', '')
    navLinks.forEach((link) => {
      link.classList.remove('active')
      const href = link.getAttribute('href')
      if (href.includes(currentPage)) {
        link.classList.add('active')
      }
    })
  }
}

window.addEventListener('scroll', highlightNavLink)
window.addEventListener('load', highlightNavLink)

// Animate skill bars when scrolled into view
const skillBars = document.querySelectorAll('.skill-progress')

function animateSkillBars() {
  skillBars.forEach((skillBar) => {
    const level = skillBar.getAttribute('data-level')
    const rect = skillBar.getBoundingClientRect()

    // Check if element is in viewport
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      skillBar.style.width = level + '%'
    }
  })
}

// Initial check and on scroll
window.addEventListener('scroll', animateSkillBars)
window.addEventListener('load', animateSkillBars)

// Form submission handling
const contactForm = document.querySelector('.contact-form')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value

    // In a real application, you would send this data to a server
    // For this demo, we'll just show an alert
    alert(
      `Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`
    )

    // Reset form
    contactForm.reset()
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href')
    if (targetId === '#') return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      })
    }
  })
})

// Schedule Meeting functionality
const scheduleMeeting = document.getElementById('scheduleMeeting')
if (scheduleMeeting) {
  scheduleMeeting.addEventListener('click', (e) => {
    e.preventDefault()
    alert(
      'Meeting scheduling feature would be integrated here. For now, please email me to schedule a meeting.'
    )
  })
}

// Page load animations
document.addEventListener('DOMContentLoaded', function () {
  // Add fade-in animation to elements
  const animatedElements = document.querySelectorAll(
    '.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .project-card, .story-card, .tool-item'
  )

  animatedElements.forEach((element, index) => {
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'

    setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, index * 100)
  })
})

// Image lazy loading
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove('lazy')
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img)
  })
}
