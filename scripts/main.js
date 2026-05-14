
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
let filters = loadFilters();

const filteredProducts = filterProducts(products, filters);
renderProducts(filteredProducts, productsContainer);
renderResultsCount(products.length, filteredProducts.length, resultsCount);
renderFilters(products, filtersContainer);

filtersToggleBtn.addEventListener('click', () => {

    filtersBar.classList.add('filters--open');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = "hidden";

    closeFiltersBtn.addEventListener('click', () => {

        filtersBar.classList.remove('filters--open');
        backdrop.classList.add('hidden');
        document.body.style.overflow = "auto";

    });

    backdrop.addEventListener('click', () => {

        filtersBar.classList.remove('filters--open');
        backdrop.classList.add('hidden');
        document.body.style.overflow = "auto";

    });

});

searchBar.addEventListener('input', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);
    renderResultsCount(products.length, filteredProducts.length, resultsCount);

});

clearSearchBtn.addEventListener('click', () => {

    filters = clearSearch(filters);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);
    renderResultsCount(products.length, filteredProducts.length, resultsCount);

    searchBar.value = "";

});

filtersContainer.addEventListener('change', (event) => {

    filters = updateFilters(filters, event);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);
    renderResultsCount(products.length, filteredProducts.length, resultsCount);

});

clearFiltersBtn.addEventListener('click', () => {

    filters = clearAllFilters(filters);
    saveFilters(filters);

    const filteredProducts = filterProducts(products, filters);
    renderProducts(filteredProducts, productsContainer);
    renderResultsCount(products.length, filteredProducts.length, resultsCount);
    renderFilters(products, filtersContainer); 

});
