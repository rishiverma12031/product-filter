
import { loadProducts } from "./data.js";
import { loadFilters, saveFilters } from "./storage.js";
import { filterProducts, updateFilters, clearAllFilters } from "./filters.js";
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

    const input = toTitleCase(event.target.value);

    const filteredProducts = products.filter(product => product.name.includes(input));
    renderProducts(filteredProducts, productsContainer);

});

clearSearchBtn.addEventListener('click', (event) => {

    searchBar.value = "";
    renderProducts(products, productsContainer);

});

function toTitleCase(input) {

    return input.trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

}

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
    renderFilters(products, filtersContainer); 

});
