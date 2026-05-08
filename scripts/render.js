
export const renderProducts = (products, productsContainer) => {

    products.forEach(product => {
        
        const  productCard = document.createElement('article');
        productCard.classList.add('product');

        const productName = document.createElement('p');
        productName.textContent = product.name;
        productName.classList.add('product__name');

        const productBrand = document.createElement('p');
        productBrand.textContent = product.brand;
        productBrand.classList.add('product__brand');

        const productCategory = document.createElement('p');
        productCategory.textContent = product.category;
        productCategory.classList.add('product__category');

        const productPrice = document.createElement('p');
        productPrice.textContent = product.price;
        productPrice.classList.add('product__price');

        const productRating = document.createElement('p');
        productRating.textContent = product.rating;
        productRating.classList.add('product__rating');

        const productInStock = document.createElement('p');
        productInStock.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
        productInStock.classList.add('product__in-stock');

        productCard.append(productName, productBrand, productCategory, productPrice, productRating, productInStock);

        productsContainer.append(productCard);

    });

}