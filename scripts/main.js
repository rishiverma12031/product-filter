
import { loadProducts } from "./data.js";
import { loadFilters, saveFilters } from "./storage.js";
import { filterProducts, updateFilters } from "./filters.js";
import { renderProducts } from "./render.js";

const productsContainer = document.querySelector(".products__container");
const filtersContainer = document.querySelector(".filters");

const products = await loadProducts();
let filters = loadFilters();
console.log(filters);

const filteredProducts = filterProducts(products, filters);
renderProducts(filteredProducts, productsContainer);

filtersContainer.addEventListener('click', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);
    console.log(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);

});
