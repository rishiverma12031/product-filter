
export const filterProducts = (products, {searchInput, categories, brands, prices, ratings, inStock} ) => {
    
    const bySearch = filterBySearch(products, searchInput);
    
    const byCategory = filterByCategory(bySearch, categories);

    const byBrand = filterByBrand(byCategory, brands);

    const byPrice = filterByPrice(byBrand, prices);

    const byRating = filterByRating(byPrice, ratings);

    const byAvailability = filterByAvailability(byRating, inStock);

    return byAvailability;

}

const filterBySearch = (products, searchInput) => {

    const formattedInput = toTitleCase(searchInput);
    
    return products.filter(product => product.name.includes(formattedInput));

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
 
        return [...new Set ([...filteredProducts, ...products.filter(product => product.rating >= rating)])];

    }, []);

}

const filterByAvailability = (products, inStock) => !inStock ? products : products.filter(product => product.inStock);

const toTitleCase = (input) => {

    return input.trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

}

export const updateFilters = (filters, event) => {

    switch(event.target.name) {

        case "searchbar":
            return updateSearchInput(filters, event);

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

const updateSearchInput = (filters, event) => {

    const newInput = event.target.value;

    return {...filters, searchInput: newInput};

}

const updateCategory = (filters, event) => {

    const updatedCategories = updateCheckboxFilterGroup(filters.categories, event);

    return {...filters, categories: updatedCategories};

} 

const updateBrand = (filters, event) => {

    const updatedBrands = updateCheckboxFilterGroup(filters.brands, event);

    return {...filters, brands: updatedBrands};

}

const updatePrice = (filters, event) => {

    const updatedPrices = updateCheckboxFilterGroup(filters.prices, event);

    return {...filters, prices: updatedPrices};

}

const updateRating = (filters, event) => {

    const updatedRatings = updateCheckboxFilterGroup(filters.ratings, event);

    return {...filters, ratings: updatedRatings};

}

const updateAvailability = (filters, event) => {

    const availability = event.target.value === "true" ? true : false;

    return {...filters, inStock: availability};

}

const updateCheckboxFilterGroup = (group, event) => {

    const value = event.target.value;

    return group.includes(value) ? 
                group.filter(element => element !== value) : 
                [...group, value];

}

export const clearSearch = (filters) => {

    return {...filters, searchInput: ''};
}

export const clearAllFilters = (filters) => {

    return {...filters,
                categories: [],
                brands: [],
                prices: [], 
                ratings: [],
                inStock: false
            };

}
