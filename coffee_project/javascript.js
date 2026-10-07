 const products = [
      { id: 1, name: "Espresso", price: 2.50, image: "https://images.unsplash.com/photo-1510591509090-e57c84b0e92e?w=500&auto=format&fit=crop", desc: "Rich and bold single shot of pure espresso. Perfect crema, intense flavor." },
      { id: 2, name: "Cappuccino", price: 3.50, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop", desc: "Espresso with steamed milk and a thick layer of silky foam. Classic Italian style." },
      { id: 3, name: "Caffè Latte", price: 3.75, image: "https://images.unsplash.com/photo-1561882463-4823f7c6e8e8?w=500&auto=format&fit=crop", desc: "Smooth espresso with plenty of steamed milk. Mild and creamy." },
      { id: 4, name: "Cold Brew", price: 4.00, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop", desc: "Slow-steeped for 16 hours. Smooth, low-acid, naturally sweet." },
      { id: 5, name: "Mocha", price: 4.25, image: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d2b?w=500&auto=format&fit=crop", desc: "Espresso, steamed milk, and rich Belgian chocolate. Topped with whipped cream." },
      { id: 6, name: "Ethiopian Yirgacheffe", price: 12.00, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop", desc: "250g bag. Floral aroma, bright citrus notes. Light roast, single origin." },
      { id: 7, name: "Caramel Macchiato", price: 4.50, image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&auto=format&fit=crop", desc: "Vanilla syrup, steamed milk, espresso, and caramel drizzle." },
      { id: 8, name: "Americano", price: 2.75, image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&auto=format&fit=crop", desc: "Espresso diluted with hot water. Clean, bold, no milk." },
      { id: 9, name: "Matcha Latte", price: 4.00, image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop", desc: "Ceremonial-grade matcha whisked with steamed milk. Earthy and smooth." },
    ];

    let cart = [];
    let currentModalProduct = null;

    function renderProducts() {
      document.getElementById('product-grid').innerHTML = products.map(p => `
        <div class="product-card bg-white rounded-2xl overflow-hidden border border-coffee-100/80 shadow-card transition-all duration-300">
          <div class="relative overflow-hidden h-52 bg-coffee-100">
            <img src="${p.image}" alt="${p.name}" class="product-img w-full h-full object-cover transition-transform duration-500">
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-3 mb-4">
              <h3 class="font-semibold text-coffee-800 leading-snug">${p.name}</h3>
              <span class="text-coffee-500 font-semibold whitespace-nowrap">$${p.price.toFixed(2)}</span>
            </div>
            <div class="flex gap-2.5">
              <button onclick="openModal(${p.id})" class="flex-1 border border-coffee-200 text-coffee-700 hover:border-coffee-400 hover:bg-coffee-50 py-2.5 rounded-xl text-[13px] font-medium transition">
                View Detail
              </button>
              <button onclick="addToCart(${p.id})" class="flex-1 bg-coffee-800 hover:bg-coffee-700 text-white py-2.5 rounded-xl text-[13px] font-medium transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function openModal(id) {
      const p = products.find(x => x.id === id);
      currentModalProduct = p;
      document.getElementById('modal-image').src = p.image;
      document.getElementById('modal-name').textContent = p.name;
      document.getElementById('modal-price').textContent = `$${p.price.toFixed(2)}`;
      document.getElementById('modal-desc').textContent = p.desc;
      const modal = document.getElementById('detail-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      const modal = document.getElementById('detail-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function addFromModal() {
      if (currentModalProduct) { addToCart(currentModalProduct.id); closeModal(); }
    }

    function addToCart(id) {
      const p = products.find(x => x.id === id);
      const existing = cart.find(c => c.id === id);
      if (existing) existing.qty += 1;
      else cart.push({ ...p, qty: 1 });
      updateCartUI();
    }

    function changeQty(index, delta) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) cart.splice(index, 1);
      updateCartUI();
    }

    function removeItem(index) {
      cart.splice(index, 1);
      updateCartUI();
    }

    function updateCartUI() {
      const badge = document.getElementById('cart-badge');
      const totalQty = cart.reduce((s, i) => s + i.qty, 0);
      if (totalQty > 0) { badge.textContent = totalQty; badge.classList.remove('hidden'); }
      else badge.classList.add('hidden');

      const itemsEl = document.getElementById('cart-items');
      const formEl = document.getElementById('order-form');

      if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="text-coffee-300 text-center py-16 text-sm">Your cart is empty</p>';
        formEl.classList.add('hidden');
        return;
      }

      formEl.classList.remove('hidden');
      itemsEl.innerHTML = cart.map((item, i) => `
        <div class="flex gap-3.5 items-center">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded-xl bg-coffee-100">
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm text-coffee-800 truncate">${item.name}</p>
            <p class="text-coffee-500 text-sm">$${item.price.toFixed(2)}</p>
            <div class="flex items-center gap-2 mt-1.5">
              <button onclick="changeQty(${i}, -1)" class="w-7 h-7 border border-coffee-200 rounded-lg text-sm hover:bg-coffee-50 transition">−</button>
              <span class="text-sm font-medium w-5 text-center">${item.qty}</span>
              <button onclick="changeQty(${i}, 1)" class="w-7 h-7 border border-coffee-200 rounded-lg text-sm hover:bg-coffee-50 transition">+</button>
            </div>
          </div>
          <button onclick="removeItem(${i})" class="text-coffee-300 hover:text-red-500 text-lg transition w-8 h-8 flex items-center justify-center">&times;</button>
        </div>
      `).join('');

      document.getElementById('cart-total').textContent = `$${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}`;
    }

    function toggleCart() {
      const sidebar = document.getElementById('cart-sidebar');
      const overlay = document.getElementById('cart-overlay');
      const isOpen = !sidebar.classList.contains('translate-x-full');
      if (isOpen) {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
      } else {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        updateCartUI();
      }
    }

    async function submitOrder() {
      const name = document.getElementById('order-name').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      const address = document.getElementById('order-address').value.trim();
      const statusEl = document.getElementById('order-status');
      const btn = document.getElementById('order-btn');

      if (!name || !phone || !address) {
        statusEl.textContent = 'Please fill in all fields';
        statusEl.className = 'text-sm text-center text-red-500';
        statusEl.classList.remove('hidden');
        return;
      }
      if (cart.length === 0) return;

      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const itemsText = cart.map(i => `• ${i.name} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join('\n');
      const message = `☕ *NEW COFFEE ORDER*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📍 *Address:* ${address}\n\n🛒 *Items:*\n${itemsText}\n\n💰 *Total:* $${total.toFixed(2)}\n🕐 ${new Date().toLocaleString()}`;

      btn.disabled = true;
      btn.textContent = 'Sending...';
      statusEl.classList.add('hidden');

      const BOT_TOKEN = '8549843780:AAF_yJZ7yVnLp9ShLgnqO8vR542Szf12SoA';
      const CHAT_ID = '6134851242';

      try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
        });
        const data = await res.json();
        if (data.ok) {
          statusEl.textContent = '✅ Order sent! We will contact you soon.';
          statusEl.className = 'text-sm text-center text-green-600';
          statusEl.classList.remove('hidden');
          cart = [];
          updateCartUI();
          document.getElementById('order-name').value = '';
          document.getElementById('order-phone').value = '';
          document.getElementById('order-address').value = '';
          setTimeout(() => { toggleCart(); statusEl.classList.add('hidden'); }, 2500);
        } else throw new Error(data.description || 'Failed');
      } catch (err) {
        statusEl.textContent = '❌ Failed to send. Please try again.';
        statusEl.className = 'text-sm text-center text-red-500';
        statusEl.classList.remove('hidden');
      }
      btn.disabled = false;
      btn.textContent = 'Order Now';
    }

    // Slideshow
    let current = 0;
    const totalSlides = 3;
    const dotsEl = document.getElementById('dots');
    for (let i = 0; i < totalSlides; i++) {
      const d = document.createElement('button');
      d.className = 'w-2 h-2 rounded-full bg-white/35 transition-all duration-300' + (i === 0 ? ' !bg-white w-6' : '');
      d.onclick = () => goTo(i);
      dotsEl.appendChild(d);
    }
    function updateSlide() {
      document.getElementById('slides').style.transform = `translateX(-${current * 100}%)`;
      document.querySelectorAll('#dots button').forEach((d, i) => {
        d.classList.toggle('!bg-white', i === current);
        d.classList.toggle('w-6', i === current);
        d.classList.toggle('bg-white/35', i !== current);
        d.classList.toggle('w-2', i !== current);
      });
    }
    function nextSlide() { current = (current + 1) % totalSlides; updateSlide(); }
    function prevSlide() { current = (current - 1 + totalSlides) % totalSlides; updateSlide(); }
    function goTo(i) { current = i; updateSlide(); }
    setInterval(nextSlide, 5500);

    renderProducts();