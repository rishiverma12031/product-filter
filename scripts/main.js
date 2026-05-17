
import { loadProducts } from "./data.js";
import { loadFilters, saveFilters } from "./storage.js";
import { filterProducts, updateFilters, clearSearch, clearAllFilters } from "./filters.js";
import { renderProducts, renderResultsCount, renderFilters } from "./render.js";

const filtersToggleBtn = document.querySelector(".filters-toggle-button");
const backdrop = document.querySelector(".backdrop");
const filtersBar = document.querySelector(".filters");

const productsContainer = document.querySelector(".products__container");
const searchBar = document.querySelector(".products__searchbar");
const clearSearchBtn = document.querySelector(".products__button");

const filtersContainer = document.querySelector(".filters__groups");
const clearFiltersBtn = document.querySelector(".filters__button--clear");
const closeFiltersBtn = document.querySelector(".filters__button--close");

const resultsCount = document.querySelector(".products__count");

const products = await loadProducts();
let filters = loadFilters(products);

// Utility functions
const updateUI = () => {
    
    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);
    renderResultsCount(products.length, filteredProducts.length, resultsCount);

}

const closeFilters = ()=> {

    filtersBar.classList.remove('filters--open');
    backdrop.classList.add('hidden');
    document.body.style.overflow = "auto";

}

// Initital render
updateUI()
renderFilters(products, filtersContainer);

// Event listeners and Re-renders
searchBar.addEventListener('input', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);
    updateUI();

});

clearSearchBtn.addEventListener('click', () => {

    filters = clearSearch(filters);
    saveFilters(filters);
    updateUI();
    searchBar.value = "";

});

filtersToggleBtn.addEventListener('click', () => {

    filtersBar.classList.add('filters--open');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = "hidden";

});

closeFiltersBtn.addEventListener('click', () => closeFilters());

backdrop.addEventListener('click', () => closeFilters());

filtersContainer.addEventListener('change', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);
    updateUI();

});

clearFiltersBtn.addEventListener('click', () => {

    filters = clearAllFilters(filters, products);
    saveFilters(filters);
    updateUI();
    renderFilters(products, filtersContainer); 

});
