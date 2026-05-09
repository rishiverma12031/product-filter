
export const filterProducts = (products, filters) => {

    const byCategory = filterByCategory(products, filters.categories);

    const byBrand = filterByBrand(byCategory, filters.brands);

    const byPrice = filterByPrice(byBrand, filters.price);

    const byRating = filterByRating(byPrice, filters.rating);

    const byAvailability = filterByAvailability(byRating, filters.inStock);

    return byAvailability;

}

const filterByCategory = (products, categories) => {

    if(categories === undefined) return products;

    categories.reduce((filteredProducts, category) => {
 
        return [...filteredProducts, ...products.filter(product => product.category === category)]; 

    }, []);

}

const filterByBrand = (products, brands) => {

    if(brands === undefined) return products;

    brands.reduce((filteredProducts, brand) => {
 
        return [...filteredProducts, ...products.filter(product => product.brand === brand)]; 

    }, []);

}

const filterByPrice = (products, price) => products.filter(product => product.price >= price.min && product.price <= price.max);

const filterByRating = (products, rating) => {

    if(rating === undefined) return products;

    return products.filter(product => product.rating >= rating);

}

const filterByAvailability = (products, inStock) => {

    if(!inStock) return products;

    return products.filter(product => product.inStock);

}





// export const filterProducts = (products, event) => {

    // if(event.target.name === "category") {

    //     return event.target.checked ? 
    //             products.filter(product => product.category === event.target.value) : 
    //             products;

    // }

    // if(event.target.name === "brand") {

    //     return event.target.checked ? 
    //             products.filter(product => product.brand === event.target.value) : 
    //             products;

    // }
    
    // if(event.target.name === "price") {

    //     if(event.target.checked) {

    //         const sepIndex = event.target.value.search(/[-]/);
        
    //         const minPrice = Number(event.target.value.slice(0, sepIndex));

    //         const maxPrice = Number(event.target.value.slice(sepIndex + 1));

    //         return products.filter(product => (product.price >= minPrice) && (product.price <= maxPrice));

    //     }

    //     return products;
        
    // }
    
    // if(event.target.name === "rating") {

    //     return event.target.checked ? 
    //         products.filter(product => product.rating >= event.target.value) : 
    //         products;

    // }
    
    // if(event.target.name === "availability") {

    //     switch(event.target.value) {

    //         case "true":
                
    //             return products.filter(product => product.inStock);

    //         case "false": 

    //             return products;

    //     }
    // }
// }