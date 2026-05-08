
export const renderProducts = (products, productsContainer) => {

    products.forEach(product => {
        
        const  productCard = document.createElement('article');

        const productName = document.createElement('p');
        productName.textContent = product.name;

        const productBrand = document.createElement('p');
        productBrand.textContent = product.brand;

        const productCategory = document.createElement('p');
        productCategory.textContent = product.category;

        const productPrice = document.createElement('p');
        productPrice.textContent = product.price;

        const productRating = document.createElement('p');
        productRating.textContent = product.rating;

        const productInStock = document.createElement('p');
        productInStock.textContent = product.inStock ? 'In Stock' : 'Out of Stock';

        productCard.append(productName, productBrand, productCategory, productPrice, productRating, productInStock);

        productsContainer.append(productCard);

    });

}