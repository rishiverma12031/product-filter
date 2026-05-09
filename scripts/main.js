
import { loadProducts } from "./data.js";
import { loadFilters, saveFilters } from "./storage.js";
import { filterProducts } from "./filters.js";
import { renderProducts } from "./render.js";

const productsContainer = document.querySelector(".products__container");
const filtersContainer = document.querySelector(".filters");

const products = await loadProducts();

const filters = loadFilters();

// console.log(filters.categories);

const filteredProducts = filterProducts(products, filters);

renderProducts(filteredProducts, productsContainer);

// filtersContainer.addEventListener('click', (event) => {

//     const filteredProducts = filterProducts(products, event);

//     renderProducts(filteredProducts, productsContainer);

// });
