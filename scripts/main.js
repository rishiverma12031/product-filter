
import { loadProducts } from "./data.js";
import { renderProducts } from "./render.js";

const productsContainer = document.querySelector(".products__container");

const products = await loadProducts();

renderProducts(products, productsContainer);
