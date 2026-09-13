const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const menuToggle = $('.menu-toggle');
const nav = $('.primary-nav');
menuToggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
$$('.primary-nav a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); }));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
$$('.reveal').forEach((el) => observer.observe(el));

const catalog = [
  ['margherita','Margherita','Pizza','₹499','Classic tomato, fior di latte, basil.','V','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85'],
  ['farmhouse','Farmhouse','Pizza','₹649','Roasted peppers, corn, onion, olives.','V','https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85'],
  ['paneer-tikka','Paneer Tikka','Pizza','₹699','Tandoori paneer, capsicum, red onion, mint.','V','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85'],
  ['bbq-chicken','BBQ Chicken','Pizza','₹749','Smoky chicken, mozzarella, pickled jalapeño.','Non-veg','https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85'],
  ['four-cheese','Four Cheese','Pizza','₹799','Mozzarella, cheddar, parmesan, blue cheese.','V','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85'],
  ['mexican','Mexican','Pizza','₹699','Salsa roja, beans, corn, jalapeño, avocado.','V','https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=700&q=85'],
  ['classic-burger','Classic S&S Burger','Burgers','₹549','House patty, cheddar, lettuce, secret sauce.','Non-veg','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85'],
  ['crispy-chicken','Crispy Chicken Burger','Burgers','₹579','Buttermilk chicken, slaw, hot honey.','Non-veg','https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=700&q=85'],
  ['paneer-burger','Smoky Paneer Burger','Burgers','₹499','Grilled paneer, chipotle mayo, greens.','V','https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=85'],
  ['mushroom-burger','Truffle Mushroom Burger','Burgers','₹529','Portobello, swiss cheese, truffle aioli.','V','https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=700&q=85'],
  ['mango-fizz','Mango Basil Fizz','Beverages','₹199','Fresh mango, basil, lime, sparkling water.','V','https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=85'],
  ['cold-coffee','S&S Cold Coffee','Beverages','₹229','Slow-brew coffee, vanilla, oat foam.','V','https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85'],
  ['berry-cooler','Berry Rose Cooler','Beverages','₹219','Mixed berries, rose, lemon, soda.','V','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=85'],
  ['iced-tea','Peach Iced Tea','Beverages','₹179','Black tea, peach, citrus, mint.','V','https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85'],
  ['tres-leches','Tres Leches Cake','Desserts','₹349','Soft vanilla sponge, three milks, berries.','V','https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85'],
  ['chocolate-cake','Dark Chocolate Cake','Desserts','₹379','Fudge cake, ganache, sea salt.','V','https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85'],
  ['cheesecake','Baked Cheesecake','Desserts','₹359','Cream cheese, biscuit base, berry compote.','V','https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85'],
  ['brownie','Warm Fudge Brownie','Desserts','₹299','Dark chocolate brownie, vanilla ice cream.','V','https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=700&q=85']
].map(([id,name,category,price,description,tag,image], index) => ({ id, name, category, price: Number(price.replace('₹','')), description, tag, image, index }));

const dishGrid = $('#menu');
const renderCatalog = () => {
  const active = $('.menu-tabs button.active')?.dataset.category || 'all';
  const search = $('#dish-search').value.trim().toLowerCase();
  const sort = $('#dish-sort').value;
  const visible = catalog.filter((item) => (active === 'all' || item.category.toLowerCase() === active) && `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search)).sort((a,b) => sort === 'low' ? a.price-b.price : sort === 'high' ? b.price-a.price : a.index-b.index);
  dishGrid.innerHTML = visible.map((item) => `<article class="dish-card reveal"><img src="${item.image}" alt="${item.name}"><div class="dish-body"><div class="dish-meta"><span>${item.category} · ${item.tag}</span><strong>${money(item.price)}</strong></div><h3>${item.name}</h3><p>${item.description}</p><button class="add-button" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">Add to cart <span>+</span></button></div></article>`).join('');
  $('.no-results').hidden = visible.length > 0;
  $$('.reveal', dishGrid).forEach((element) => observer.observe(element));
  $$('img', dishGrid).forEach((image) => image.addEventListener('error', () => { image.onerror = null; image.src = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85'; }));
  $$('.add-button', dishGrid).forEach((button) => button.addEventListener('click', addToCart));
};

$$('.menu-tabs button').forEach((button) => button.addEventListener('click', () => {
  $$('.menu-tabs button').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-selected', 'true'); renderCatalog();
}));
$('#dish-search').addEventListener('input', renderCatalog);
$('#dish-sort').addEventListener('change', renderCatalog);

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
function addToCart(event) { const button = event.currentTarget; const item = { id: button.dataset.id, name: button.dataset.name, price: Number(button.dataset.price), image: button.dataset.image, quantity: 1 }; const existing = cart.get(item.id); cart.set(item.id, existing ? { ...existing, quantity: existing.quantity + 1 } : item); renderCart(); openCart(); }
$('.cart-button')?.addEventListener('click', openCart); $('.mobile-cart')?.addEventListener('click', openCart); $('.close-cart').addEventListener('click', closeCart); backdrop.addEventListener('click', closeCart);
cartItems.addEventListener('click', (event) => { const button = event.target.closest('[data-action]'); if (!button) return; const item = cart.get(button.dataset.id); if (button.dataset.action === 'remove') cart.delete(button.dataset.id); else if (button.dataset.action === 'plus') cart.set(item.id, { ...item, quantity: item.quantity + 1 }); else if (item.quantity > 1) cart.set(item.id, { ...item, quantity: item.quantity - 1 }); else cart.delete(item.id); renderCart(); });
$$('input[name="fulfilment"]').forEach((input) => input.addEventListener('change', () => { $('.delivery-address').hidden = input.value === 'pickup' && input.checked; $('#address').required = input.value !== 'pickup' && input.checked; renderCart(); }));

const checkout = $('.checkout-modal'); const openCheckout = () => { checkout.classList.add('open'); checkout.setAttribute('aria-hidden', 'false'); $('#customer-name')?.focus(); }; const closeCheckout = () => { checkout.classList.remove('open'); checkout.setAttribute('aria-hidden', 'true'); };
$('.checkout-button').addEventListener('click', openCheckout); $('.close-checkout').addEventListener('click', closeCheckout); $('.close-confirmation').addEventListener('click', () => { closeCheckout(); closeCart(); });
$('#checkout-form').addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; if (!form.checkValidity()) { $('.checkout-error').hidden = false; form.querySelector(':invalid')?.focus(); return; } $('.checkout-error').hidden = true; $('.confirmed-name').textContent = $('#customer-name').value.split(' ')[0]; $('.order-number').textContent = `SS-${Date.now().toString().slice(-6)}`; form.hidden = true; $('.order-confirmation').hidden = false; cart.clear(); renderCart(); });
$('#reservation-form').addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; const error = $('.form-error', form); if (!form.checkValidity()) { error.hidden = false; form.querySelector(':invalid')?.focus(); return; } error.hidden = true; $('.form-success', form).hidden = false; form.querySelector('button').textContent = 'Request received ✓'; });
renderCatalog();
renderCart();
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (checkout.classList.contains('open')) closeCheckout();
  else if (drawer.classList.contains('open')) closeCart();
});
