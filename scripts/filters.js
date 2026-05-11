
export const filterProducts = (products, {categories, brands, prices, ratings, inStock} ) => {
    
    const byCategory = filterByCategory(products, categories);

    const byBrand = filterByBrand(byCategory, brands);

    const byPrice = filterByPrice(byBrand, prices);

    const byRating = filterByRating(byPrice, ratings);

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

const filterByPrice = (products, prices) => {

    if(prices.length === 0 || prices === undefined) return products;

    return prices.reduce((filteredProducts, price) => {

        const sepIndex = price.search(/[-]/);
        
        const min = Number(price.slice(0, sepIndex));

        const max = Number(price.slice(sepIndex + 1));

        return [...filteredProducts, ...products.filter(product => (product.price >= min) && (product.price <= max))];

    }, []);

}

const filterByRating = (products, ratings) => {

    if(ratings.length === 0 || ratings === undefined) return products;

    return ratings.reduce((filteredProducts, rating) => {
 
        return [...filteredProducts, ...products.filter(product => product.rating >= rating)]; 

    }, []);

}

const filterByAvailability = (products, inStock) => !inStock ? products : products.filter(product => product.inStock);

export const updateFilters = (filters, event) => {

    switch(event.target.name) {

        case "category":
            return updateCategory(filters, event);

        case "brand":
            return updateBrand(filters, event);

        case "price":
            return updatePrice(filters, event);

        case "rating":
            return updateRating(filters, event);

        case "availability":
            return updateAvailability(filters, event);

    } 
}

const updateCategory = (filters, event) => {

    const value = event.target.value;

    const updatedCategories = filters.categories.includes(value) ? 
                                filters.categories.filter(category => category !== value) : 
                                [...filters.categories, value] ;

    return {...filters, categories: updatedCategories};

} 

const updateBrand = (filters, event) => {

    const value = event.target.value;

    const updatedBrands = filters.brands.includes(value) ? 
                                filters.brands.filter(brand => brand !== value) : 
                                [...filters.brands, value] ;

    return {...filters, brands: updatedBrands};

}

const updatePrice = (filters, event) => {

    const value = event.target.value;

    const updatedPrices = filters.prices.includes(value) ? 
                                filters.prices.filter(price => price !== value) : 
                                [...filters.prices, value] ;

    return {...filters, prices: updatedPrices};

}

const updateRating = (filters, event) => {

    const value = event.target.value;

    const updatedRatings = filters.ratings.includes(value) ? 
                                filters.ratings.filter(rating => rating !== value) : 
                                [...filters.ratings, value] ;

    return {...filters, ratings: updatedRatings};

}

const updateAvailability = (filters, event) => {

    const availability = event.target.value === "true" ? true : false;

    return {...filters, inStock: availability};

}
