document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-qty]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.qty);
      if (!target) return;
      const current = Number(target.textContent);
      const delta = button.classList.contains('minus') ? -1 : 1;
      target.textContent = Math.max(1, current + delta);
    });
  });

  const forms = document.querySelectorAll('form[data-feedback]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-feedback-message]');
      if (status) {
        status.textContent = 'Thanks! Your request was received.';
      }
    });
  });

  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('productSearch');
  const sortSelect = document.getElementById('sortSelect');
  const filterButtons = document.querySelectorAll('[data-category]');
  const emptyState = document.getElementById('emptyState');

  const products = [
    { id: 1, name: 'Snake Plant', category: 'Indoor', price: 1299, rating: 4.8, description: 'Low-maintenance elegance for living rooms and offices.', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Calathea', category: 'Indoor', price: 1699, rating: 4.7, description: 'Soft striped leaves with a premium sculptural finish.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Monstera', category: 'Indoor', price: 2199, rating: 4.9, description: 'Statement greenery for airy interiors and modern spaces.', image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'ZZ Plant', category: 'Indoor', price: 1499, rating: 4.6, description: 'Glossy upright leaves that thrive with minimal care.', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Lavender Pot', category: 'Outdoor', price: 899, rating: 4.5, description: 'Fragrant blooms that brighten terraces and garden edges.', image: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Fern Basket', category: 'Outdoor', price: 1199, rating: 4.8, description: 'Lush hanging greenery for balconies and patios.', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451afbe?auto=format&fit=crop&w=600&q=80' },
    { id: 7, name: 'Orchid Bloom', category: 'Flowering', price: 1899, rating: 4.9, description: 'Elegant flowering stems that add a luxury finish to rooms.', image: 'https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=600&q=80' },
    { id: 8, name: 'Rose Sapling', category: 'Flowering', price: 1599, rating: 4.7, description: 'A cheerful flowering pick for sunny balconies and courtyards.', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80' },
    { id: 9, name: 'Jade Plant', category: 'Succulents', price: 999, rating: 4.6, description: 'Sculptural succulent with a calm, contemporary look.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
    { id: 10, name: 'Aloe Vera', category: 'Succulents', price: 849, rating: 4.5, description: 'Easy-care succulent prized for wellness and charm.', image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80' },
    { id: 11, name: 'Ceramic Planter Set', category: 'Pots', price: 1299, rating: 4.8, description: 'Hand-finished pots designed to elevate your indoor display.', image: 'https://images.unsplash.com/photo-1487077705737-d5f1a4d0b2d7?auto=format&fit=crop&w=600&q=80' },
    { id: 12, name: 'Herb Seed Kit', category: 'Seeds', price: 699, rating: 4.4, description: 'Starter sachets for fresh basil, mint and coriander at home.', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80' }
  ];

  let currentCategory = 'all';
  let currentSearch = '';
  let currentSort = 'featured';

  const renderProducts = () => {
    const lowerSearch = currentSearch.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
      const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
      const searchText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      const matchesSearch = searchText.includes(lowerSearch);
      return matchesCategory && matchesSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (currentSort === 'price-asc') return a.price - b.price;
      if (currentSort === 'price-desc') return b.price - a.price;
      if (currentSort === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

    if (!sortedProducts.length) {
      emptyState.classList.remove('hidden');
      productGrid.innerHTML = '';
      return;
    }

    emptyState.classList.add('hidden');
    productGrid.innerHTML = sortedProducts.map((product) => `
      <article class="card product-card">
        <span class="badge">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <div class="product-rating" aria-label="Rated ${product.rating} out of 5">
          <span>★</span>
          <span>${product.rating.toFixed(1)}</span>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="price-row">
          <span class="price-tag">₹${product.price.toLocaleString('en-IN')}</span>
          <a class="btn btn-primary" href="product-details.html">View Details</a>
        </div>
      </article>
    `).join('');
  };

  if (productGrid) {
    searchInput?.addEventListener('input', (event) => {
      currentSearch = event.target.value;
      renderProducts();
    });

    sortSelect?.addEventListener('change', (event) => {
      currentSort = event.target.value;
      renderProducts();
    });

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        currentCategory = button.dataset.category || 'all';
        filterButtons.forEach((item) => item.classList.toggle('active', item === button));
        renderProducts();
      });
    });

    renderProducts();
  }
});
