// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Contact Form Validation
const form = document.getElementById('estimateForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate required fields
    const fields = [
      { id: 'firstName', validate: v => v.trim().length > 0 },
      { id: 'lastName', validate: v => v.trim().length > 0 },
      { id: 'email', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'phone', validate: v => v.trim().length >= 7 }
    ];

    fields.forEach(({ id, validate }) => {
      const input = document.getElementById(id);
      const group = input.closest('.form-group');
      if (!validate(input.value)) {
        group.classList.add('error');
        isValid = false;
      } else {
        group.classList.remove('error');
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          form.style.display = 'none';
          formSuccess.classList.add('active');
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Request';
        alert('Something went wrong. Please call us at (480) 837-0736 or email shane@fhroof.com directly.');
      });
    }
  });

  // Clear error on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group').classList.remove('error');
    });
  });
}

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 10) {
      header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
