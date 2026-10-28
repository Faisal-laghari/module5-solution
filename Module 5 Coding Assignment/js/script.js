const categories = [
  { shortName: "LU", name: "Lunch", description: "Fresh midday favorites", items: [
    { name: "Garden Harvest Bowl", description: "Seasonal greens, roasted vegetables, lemon-herb dressing", price: "$12.50" },
    { name: "Grilled Chicken Sandwich", description: "Grilled chicken, crisp lettuce, tomato, house sauce", price: "$11.00" },
    { name: "Roasted Tomato Soup", description: "Slow-roasted tomatoes, basil, toasted sourdough", price: "$8.50" }
  ]},
  { shortName: "DI", name: "Dinner", description: "Comforting evening plates", items: [
    { name: "Herb-Roasted Chicken", description: "Herbs, seasonal vegetables, pan jus", price: "$18.00" },
    { name: "Creamy Mushroom Pasta", description: "Mushrooms, parmesan, parsley, silky cream sauce", price: "$16.50" },
    { name: "Grilled Vegetable Plate", description: "Charred seasonal vegetables, grains, green dressing", price: "$15.00" }
  ]},
  { shortName: "SU", name: "Sushi", description: "Light, bright, and freshly rolled", items: [
    { name: "California Roll", description: "Avocado, cucumber, and a classic house filling", price: "$10.00" },
    { name: "Crispy Vegetable Roll", description: "Crisp vegetables, sesame, ginger soy", price: "$9.50" },
    { name: "Salmon Avocado Roll", description: "Salmon, avocado, rice, toasted sesame", price: "$13.50" }
  ]},
  { shortName: "VE", name: "Vegetarian", description: "Plant-forward favorites", items: [
    { name: "Chickpea Power Bowl", description: "Chickpeas, grains, cucumber, tahini dressing", price: "$13.00" },
    { name: "Stuffed Bell Pepper", description: "Rice, herbs, tomatoes, and slow-roasted pepper", price: "$12.00" },
    { name: "Crispy Cauliflower Tacos", description: "Roasted cauliflower, slaw, lime crema", price: "$11.50" }
  ]},
  { shortName: "DE", name: "Desserts", description: "A sweet finish", items: [
    { name: "Warm Apple Crumble", description: "Baked apples, oat crumble, vanilla cream", price: "$7.00" },
    { name: "Dark Chocolate Tart", description: "Rich chocolate filling with a crisp pastry shell", price: "$7.50" },
    { name: "Seasonal Fruit Cup", description: "Fresh fruit, mint, light citrus syrup", price: "$6.00" }
  ]},
  { shortName: "DR", name: "Drinks", description: "Refreshing sips", items: [
    { name: "House Lemonade", description: "Fresh lemon, a touch of sweetness, mint", price: "$4.00" },
    { name: "Iced Green Tea", description: "Brewed green tea served over ice", price: "$3.50" },
    { name: "Berry Sparkler", description: "Mixed berries, citrus, sparkling water", price: "$4.50" }
  ]}
];

let lastSpecialCategory = null;
const homeView = document.querySelector("#home-view");
const tiles = document.querySelector("#tiles");
const contentView = document.querySelector("#content-view");

function chooseRandomCategory() {
  const options = categories.filter(category => category.shortName !== lastSpecialCategory);
  const pool = options.length ? options : categories;
  const category = pool[Math.floor(Math.random() * pool.length)];
  lastSpecialCategory = category.shortName;
  return category;
}

function showHome() {
  homeView.hidden = false;
  tiles.hidden = false;
  contentView.hidden = true;
  contentView.innerHTML = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showCategories() {
  homeView.hidden = true;
  tiles.hidden = true;
  contentView.hidden = false;
  contentView.innerHTML = `
    <button class="back-button" type="button" data-action="home">← Back to home</button>
    <div class="section-heading"><div><h2>Explore the menu</h2><p>Choose a category to see what's fresh in our kitchen.</p></div></div>
    <div class="category-grid">
      ${categories.map(category => `
        <button class="category-card" type="button" data-category="${category.shortName}">
          <span class="category-code">CATEGORY / ${category.shortName}</span>
          <strong>${category.name}</strong><span>${category.description}</span>
        </button>`).join("")}
    </div>`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadMenuItems(shortName, isSpecial = false) {
  const category = categories.find(item => item.shortName === shortName);
  if (!category) return showCategories();

  homeView.hidden = true;
  tiles.hidden = true;
  contentView.hidden = false;
  contentView.innerHTML = `
    <button class="back-button" type="button" data-action="home">← Back to home</button>
    <div class="section-heading"><div><h2>${category.name}</h2><p>${category.description}</p></div>
      ${isSpecial ? '<span class="tag">✦ Today\'s surprise</span>' : ''}
    </div>
    <div class="menu-list">
      ${category.items.map(item => `
        <article class="menu-item"><div><h3>${item.name}</h3><p>${item.description}</p></div><span class="price">${item.price}</span></article>`).join("")}
    </div>`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openRandomSpecial() {
  const randomCategory = chooseRandomCategory();
  const randomCategoryShortName = randomCategory.shortName;
  loadMenuItems(randomCategoryShortName, true);
}

document.addEventListener("click", event => {
  if (event.target.closest('[data-view="specials"], #hero-specials')) {
    openRandomSpecial();
    return;
  }
  if (event.target.closest('[data-view="menu"]')) {
    showCategories();
    return;
  }
  if (event.target.closest('[data-view="about"]')) {
    homeView.hidden = true;
    tiles.hidden = true;
    contentView.hidden = false;
    contentView.innerHTML = `
      <button class="back-button" type="button" data-action="home">← Back to home</button>
      <div class="section-heading"><div><h2>A little about our kitchen</h2><p>Simple ingredients, thoughtful cooking.</p></div></div>
      <div class="text-panel"><p>At <strong>David Chu's Bistro</strong>, we believe good food should feel welcoming. Our sample menu celebrates fresh produce, balanced flavors, and dishes made with care.</p><p>Browse the menu to find your favorite, or select <strong>Specials</strong> for a randomly chosen category. Every visit can bring a different discovery.</p></div>`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    loadMenuItems(categoryButton.dataset.category);
    return;
  }
  if (event.target.closest('[data-action="home"]') || event.target.closest("#brand-home")) {
    event.preventDefault();
    showHome();
  }
});

showHome();
