
export const filterProducts = (products, {categories, brands, price, rating, inStock} ) => {
    
    const byCategory = filterByCategory(products, categories);

    const byBrand = filterByBrand(byCategory, brands);

    const byPrice = filterByPrice(byBrand, price);

    const byRating = filterByRating(byPrice, rating);

    const byAvailability = filterByAvailability(byRating, inStock);

    return byAvailability;

}

const filterByCategory = (products, categories) => {


    if(categories.length === 0 || categories === undefined) return products;
    
    return categories.reduce((filteredProducts, category) => {

        return [...filteredProducts, ...products.filter(product => product.category === category)]; 

    }, []);

}

const filterByBrand = (products, brands) => {

    if(brands.length === 0 || brands === undefined) return products;

    return brands.reduce((filteredProducts, brand) => {
 
        return [...filteredProducts, ...products.filter(product => product.brand === brand)]; 

    }, []);

}

const filterByPrice = (products, price) => products.filter(product => (product.price >= price.min) && (product.price <= price.max));

const filterByRating = (products, rating) => products.filter(product => product.rating >= rating);

const filterByAvailability = (products, inStock) => !inStock ? products : products.filter(product => product.inStock);

export const updateFilters = (filters, event) => {

    switch(event.target.name) {

        case "category":
            return updateCategory(filters, event);

        case "brand":
            return updateBrand();

        case "price":
            return updatePrice();

        case "rating":
            return updateRating();

        case "availability":
            return updateAvailability();

    } 
}

const updateCategory = (filters, event) => {

    const value = event.target.value;

    const updatedCategories = filters.categories.includes(value) ? [...filters.categories] : [...filters.categories, value] ;

    return {...filters, categories: updatedCategories};

} 



// export const filterProducts = (products, event) => {

//     if(event.target.name === "category") {

//         return event.target.checked ? 
//                 products.filter(product => product.category === event.target.value) : 
//                 products;

//     }

//     if(event.target.name === "brand") {

//         return event.target.checked ? 
//                 products.filter(product => product.brand === event.target.value) : 
//                 products;

//     }
    
//     if(event.target.name === "price") {

//         if(event.target.checked) {

//             const sepIndex = event.target.value.search(/[-]/);
        
//             const minPrice = Number(event.target.value.slice(0, sepIndex));

//             const maxPrice = Number(event.target.value.slice(sepIndex + 1));

//             return products.filter(product => (product.price >= minPrice) && (product.price <= maxPrice));

//         }

//         return products;
        
//     }
    
//     if(event.target.name === "rating") {

//         return event.target.checked ? 
//             products.filter(product => product.rating >= event.target.value) : 
//             products;

//     }
    
//     if(event.target.name === "availability") {

//         switch(event.target.value) {

//             case "true":
                
//                 return products.filter(product => product.inStock);

//             case "false": 

//                 return products;

//         }
//     }
// }