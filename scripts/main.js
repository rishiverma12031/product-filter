
import { loadProducts } from "./data.js";
import { renderProducts } from "./render.js";
import { filterProducts } from "./filters.js";

const productsContainer = document.querySelector(".products__container");
const filters = document.querySelector(".filters");

const products = await loadProducts();

renderProducts(products, productsContainer);

filters.addEventListener('click', (event) => {

    const filteredProducts = filterProducts(products, event);

    renderProducts(filteredProducts, productsContainer);

});
