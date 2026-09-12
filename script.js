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
const selectionList = document.querySelector('.selection-list');
const selectionCount = document.querySelector('.selection-count');
const menuChoices = document.querySelectorAll('.menu-choice');

const getSelectedItems = () => [...menuChoices]
  .filter((choice) => choice.checked)
  .map((choice) => ({ name: choice.dataset.item, price: choice.dataset.price }));

const updateSelectionSummary = () => {
  const selectedItems = getSelectedItems();
  selectionCount.textContent = selectedItems.length
    ? `${selectedItems.length} dish${selectedItems.length === 1 ? '' : 'es'} selected`
    : 'No dishes selected';
  selectionList.innerHTML = selectedItems.length
    ? selectedItems.map((item) => `<li><span>${item.name}</span><span>$${item.price}</span></li>`).join('')
    : '<li>Choose dishes from the menu above and they will appear here.</li>';
};

menuChoices.forEach((choice) => choice.addEventListener('change', updateSelectionSummary));
updateSelectionSummary();

reservationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!reservationForm.checkValidity()) {
    errorMessage.hidden = false;
    reservationForm.querySelector(':invalid')?.focus();
    return;
  }
  errorMessage.hidden = true;
  const selectedItems = getSelectedItems();
  const selectedText = selectedItems.length
    ? ` Your selected dishes: ${selectedItems.map((item) => `${item.name} ($${item.price})`).join(', ')}.`
    : ' No dishes selected yet — we can help you choose when you arrive.';
  reservationForm.querySelector('button').textContent = 'Request received ✓';
  successMessage.textContent = `Your reservation request is in.${selectedText} We’ll be in touch soon with a confirmation.`;
  successMessage.hidden = false;
  reservationForm.reset();
});
