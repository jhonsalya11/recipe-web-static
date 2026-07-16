let allRecipes = [];
let activeFilter = 'all';
let searchTerm = '';

const grid = document.getElementById('recipeGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.getElementById('filterTabs');
const modal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

const categoryIcon = {
  kopi: '☕',
  makanan: '🍽️'
};

async function loadRecipes() {
  try {
    const res = await fetch('data/recipes.json');
    allRecipes = await res.json();
    render();
  } catch (err) {
    grid.innerHTML = '<p>Gagal memuat data resep.</p>';
    console.error(err);
  }
}

function getFilteredRecipes() {
  return allRecipes.filter(r => {
    const matchesCategory = activeFilter === 'all' || r.category === activeFilter;
    const haystack = (r.title + ' ' + r.tags.join(' ')).toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function render() {
  const recipes = getFilteredRecipes();
  grid.innerHTML = '';

  if (recipes.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.innerHTML = `
      <div class="card-image">${categoryIcon[recipe.category] || '🍴'}</div>
      <div class="card-body">
        <span class="card-category">${recipe.category}</span>
        <h3 class="card-title">${escapeHtml(recipe.title)}</h3>
        <div class="card-meta">
          <span>⏱ ${escapeHtml(recipe.time)}</span>
          <span>🍽 ${escapeHtml(recipe.servings)}</span>
          <span class="cal-badge">🔥 ${recipe.nutrition.calories} kal</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(recipe));
    grid.appendChild(card);
  });
}

function openModal(recipe) {
  modalBody.innerHTML = `
    <h2>${escapeHtml(recipe.title)}</h2>
    <div class="modal-meta">
      <span>⏱ ${escapeHtml(recipe.time)}</span>
      <span>🍽 ${escapeHtml(recipe.servings)}</span>
      <span>📊 ${escapeHtml(recipe.difficulty)}</span>
    </div>
    <div class="modal-nutrition">
      <h3>📊 Informasi Gizi <span class="nutrition-note">(per porsi, estimasi)</span></h3>
      <div class="macro-grid">
        <div class="macro-item"><span class="macro-value">${recipe.nutrition.calories}</span><span class="macro-label">Kalori</span></div>
        <div class="macro-item"><span class="macro-value">${recipe.nutrition.protein}g</span><span class="macro-label">Protein</span></div>
        <div class="macro-item"><span class="macro-value">${recipe.nutrition.carbs}g</span><span class="macro-label">Karbo</span></div>
        <div class="macro-item"><span class="macro-value">${recipe.nutrition.fat}g</span><span class="macro-label">Lemak</span></div>
      </div>
    </div>
    <h3>Bahan</h3>
    <ul>${recipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
    <h3>Langkah</h3>
    <ol>${recipe.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    ${recipe.notes ? `<div class="modal-notes">💡 ${escapeHtml(recipe.notes)}</div>` : ''}
  `;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Event listeners
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  render();
});

filterTabs.addEventListener('click', (e) => {
  if (!e.target.classList.contains('tab')) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  activeFilter = e.target.dataset.filter;
  render();
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

loadRecipes();
