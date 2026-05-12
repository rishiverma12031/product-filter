
import { loadProducts } from "./data.js";
import { loadFilters, saveFilters } from "./storage.js";
import { filterProducts, updateFilters, clearSearch, clearAllFilters } from "./filters.js";
import { renderProducts, renderFilters } from "./render.js";

const productsContainer = document.querySelector(".products__container");
const searchBar = document.querySelector(".products__searchbar");
const clearSearchBtn = document.querySelector(".products__button");
const filtersContainer = document.querySelector(".filters__groups");
const clearFiltersBtn = document.querySelector(".filters__button");

const products = await loadProducts();
let filters = loadFilters();

const filteredProducts = filterProducts(products, filters);
renderProducts(filteredProducts, productsContainer);
renderFilters(products, filtersContainer);

searchBar.addEventListener('input', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);

});

clearSearchBtn.addEventListener('click', () => {

    filters = clearSearch(filters);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);

    searchBar.value = "";

});

filtersContainer.addEventListener('change', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);

});

clearFiltersBtn.addEventListener('click', () => {

    filters = clearAllFilters(filters);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);
    renderFilters(products, filtersContainer); 

});
