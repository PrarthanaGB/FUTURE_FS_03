const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.menu-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.menu-tabs button').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.menu-panel').forEach((panel) => panel.classList.remove('active'));
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    document.querySelector(`[data-panel="${button.dataset.category}"]`).classList.add('active');
  });
});

const reservationForm = document.querySelector('#reservation-form');
const errorMessage = document.querySelector('.form-error');
const successMessage = document.querySelector('.form-success');
reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!reservationForm.checkValidity()) {
    errorMessage.hidden = false;
    reservationForm.querySelector(':invalid')?.focus();
    return;
  }
  errorMessage.hidden = true;
  reservationForm.querySelector('button').textContent = 'Request received ✓';
  successMessage.hidden = false;
  reservationForm.reset();
});
