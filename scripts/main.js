
import { loadProducts } from "./data.js";
import { loadFilters, saveFilters } from "./storage.js";
import { filterProducts, updateFilters, clearAllFilters } from "./filters.js";
import { renderProducts } from "./render.js";

const productsContainer = document.querySelector(".products__container");
const filtersContainer = document.querySelector(".filters__groups");
const clearFiltersBtn = document.querySelector(".filters__button");

const products = await loadProducts();
let filters = loadFilters();

const filteredProducts = filterProducts(products, filters);
renderProducts(filteredProducts, productsContainer);

filtersContainer.addEventListener('change', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);

});

clearFiltersBtn.addEventListener('click', (event) => {

    filters = clearAllFilters();
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);

    //re render filters 

});
