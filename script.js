const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const menuToggle = $('.menu-toggle');
const nav = $('.primary-nav');
menuToggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
$$('.primary-nav a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); }));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
$$('.reveal').forEach((el) => observer.observe(el));

$$('.menu-tabs button').forEach((button) => button.addEventListener('click', () => {
  $$('.menu-tabs button').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-selected', 'true');
  $$('.dish-card').forEach((card) => { card.hidden = button.dataset.category !== 'all' && card.dataset.category !== button.dataset.category; });
}));

const cart = new Map();
const drawer = $('.cart-drawer'); const backdrop = $('.drawer-backdrop'); const cartItems = $('.cart-items'); const emptyCart = $('.empty-cart');
const money = (amount) => `₹${amount.toLocaleString('en-IN')}`;
const counts = $$('.cart-count');
const openCart = () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); $('.cart-button')?.setAttribute('aria-expanded', 'true'); backdrop.classList.add('visible'); $('.close-cart').focus(); };
const closeCart = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); $('.cart-button')?.setAttribute('aria-expanded', 'false'); backdrop.classList.remove('visible'); };
const renderCart = () => {
  const items = [...cart.values()]; const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0); const packaging = subtotal ? 35 : 0; const delivery = subtotal && $('input[name="fulfilment"]:checked')?.value !== 'pickup' ? 49 : 0; const total = subtotal + packaging + delivery; const count = items.reduce((sum, item) => sum + item.quantity, 0);
  counts.forEach((el) => { el.textContent = count; el.classList.toggle('has-items', count > 0); });
  emptyCart.hidden = Boolean(items.length); cartItems.innerHTML = items.map((item) => `<div class="cart-item"><img src="${item.image}" alt=""><div><h3>${item.name}</h3><span>${money(item.price)}</span><div class="quantity"><button type="button" data-action="minus" data-id="${item.id}" aria-label="Decrease ${item.name} quantity">−</button><strong>${item.quantity}</strong><button type="button" data-action="plus" data-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button></div></div><button class="remove-item" type="button" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">×</button></div>`).join('');
  $('.subtotal').textContent = money(subtotal); $('.packaging').textContent = money(packaging); $('.delivery-fee').textContent = delivery ? money(delivery) : 'Free'; $('.total').textContent = money(total); $('.checkout-button').disabled = !items.length;
};
$$('.add-button').forEach((button) => button.addEventListener('click', () => { const item = { id: button.dataset.id, name: button.dataset.name, price: Number(button.dataset.price), image: button.dataset.image, quantity: 1 }; const existing = cart.get(item.id); cart.set(item.id, existing ? { ...existing, quantity: existing.quantity + 1 } : item); renderCart(); openCart(); }));
$('.cart-button')?.addEventListener('click', openCart); $('.mobile-cart')?.addEventListener('click', openCart); $('.close-cart').addEventListener('click', closeCart); backdrop.addEventListener('click', closeCart);
cartItems.addEventListener('click', (event) => { const button = event.target.closest('[data-action]'); if (!button) return; const item = cart.get(button.dataset.id); if (button.dataset.action === 'remove') cart.delete(button.dataset.id); else if (button.dataset.action === 'plus') cart.set(item.id, { ...item, quantity: item.quantity + 1 }); else if (item.quantity > 1) cart.set(item.id, { ...item, quantity: item.quantity - 1 }); else cart.delete(item.id); renderCart(); });
$$('input[name="fulfilment"]').forEach((input) => input.addEventListener('change', () => { $('.delivery-address').hidden = input.value === 'pickup' && input.checked; $('#address').required = input.value !== 'pickup' && input.checked; renderCart(); }));

const checkout = $('.checkout-modal'); const openCheckout = () => { checkout.classList.add('open'); checkout.setAttribute('aria-hidden', 'false'); $('.customer-name')?.focus(); }; const closeCheckout = () => { checkout.classList.remove('open'); checkout.setAttribute('aria-hidden', 'true'); };
$('.checkout-button').addEventListener('click', openCheckout); $('.close-checkout').addEventListener('click', closeCheckout); $('.close-confirmation').addEventListener('click', () => { closeCheckout(); closeCart(); });
$('#checkout-form').addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; if (!form.checkValidity()) { $('.checkout-error').hidden = false; form.querySelector(':invalid')?.focus(); return; } $('.checkout-error').hidden = true; $('.confirmed-name').textContent = $('#customer-name').value.split(' ')[0]; $('.order-number').textContent = `SS-${Date.now().toString().slice(-6)}`; form.hidden = true; $('.order-confirmation').hidden = false; cart.clear(); renderCart(); });
$('#reservation-form').addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; const error = $('.form-error', form); if (!form.checkValidity()) { error.hidden = false; form.querySelector(':invalid')?.focus(); return; } error.hidden = true; $('.form-success', form).hidden = false; form.querySelector('button').textContent = 'Request received ✓'; });
renderCart();
