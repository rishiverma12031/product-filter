import { getMaxPrice } from "./utils.js";

export const saveFilters = (filters) => localStorage.setItem('filters', JSON.stringify(filters));
export const loadFilters = (products) => {

    const filters = localStorage.getItem('filters');

    return filters ? 
            JSON.parse(filters) : 
            {
                searchInput: '',
                categories: [],
                brands: [],
                slider: getMaxPrice(products),
                prices: [], 
                ratings: [],
                inStock: false
            };

}