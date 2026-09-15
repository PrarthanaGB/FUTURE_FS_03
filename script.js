const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuToggle = $('.menu-toggle');
const nav = $('.primary-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
$$('.primary-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => revealObserver.observe(element));

const form = $('#contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const error = $('.form-error', form);
  const success = $('.form-success', form);
  if (!form.checkValidity()) {
    error.hidden = false;
    success.hidden = true;
    form.querySelector(':invalid')?.focus();
    return;
  }
  error.hidden = true;
  success.hidden = false;
  form.reset();
});
