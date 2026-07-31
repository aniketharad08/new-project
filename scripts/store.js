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
    { id: 1, name: 'Desert Rose', category: 'Indoor', price: 1299, rating: 4.8, description: 'Low-maintenance elegance for living rooms and offices.', image: "../Desert Rose.jpeg" },
    { id: 2, name: 'Dwarf Snake Plants', category: 'Indoor', price: 1699, rating: 4.7, description: 'Soft striped leaves with a premium sculptural finish.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Lucky bamboo', category: 'Indoor', price: 2199, rating: 4.9, description: 'Statement greenery for airy interiors and modern spaces.', image: "../Lucky bamboo.jpg" },
    { id: 4, name: 'Aglaonema Super White', category: 'Indoor', price: 1499, rating: 4.6, description: 'Glossy upright leaves that thrive with minimal care.', image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Aglaonema Lipstick', category: 'Outdoor', price: 899, rating: 4.5, description: 'Fragrant blooms that brighten terraces and garden edges.', image:"../Aglaonema Lipstick.jpg" },
    { id: 6, name: 'Spathiphyllum Wallisii', category: 'Outdoor', price: 1199, rating: 4.8, description: 'Lush hanging greenery for balconies and patios.', image:"../Spathiphyllum Wallisii.jpg" },
    { id: 7, name: 'Snake Plant', category: 'Flowering', price: 1899, rating: 4.9, description: 'Elegant flowering stems that add a luxury finish to rooms.', image:"../Snake plant.jpg" },
    { id: 8, name: 'Peacock Plant', category: 'Flowering', price: 1599, rating: 4.7, description: 'A cheerful flowering pick for sunny balconies and courtyards.', image:"../Peacock plant.jpg" },
    { id: 9, name: 'Aglaonema', category: 'Succulents', price: 999, rating: 4.6, description: 'Sculptural succulent with a calm, contemporary look.', image:"../Aglaonema.jpg" },
    { id: 10, name: 'Anthurium Laceleaf', category: 'Succulents', price: 849, rating: 4.5, description: 'Easy-care succulent prized for wellness and charm.', image: "../Anthurium Laceleaf.jpg" },
    { id: 11, name: 'Chinese Evergreen', category: 'Pots', price: 1299, rating: 4.8, description: 'Hand-finished pots designed to elevate your indoor display.', image: 'https://images.unsplash.com/photo-1487077705737-d5f1a4d0b2d7?auto=format&fit=crop&w=600&q=80' },
    { id: 12, name: 'Red Aglaonema', category: 'Seeds', price: 699, rating: 4.4, description: 'Starter sachets for fresh basil, mint and coriander at home.', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80' }
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
                                                                                                                                                                                                                          
// Paste Add to cart code here
const addToCartBtn = document.getElementById("addToCartBtn");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    let cartCount = Number(localStorage.getItem("cartCount")) || 0;

    cartCount++;

    localStorage.setItem("cartCount", cartCount);

    const cartIcon = document.querySelector(".icon-pill");
    if (cartIcon) {
      cartIcon.innerHTML = "🛒 " + cartCount;
    }

    alert("Plant added to cart!");
  });
}


