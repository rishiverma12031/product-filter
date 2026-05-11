
export const saveFilters = (filters) => localStorage.setItem('filters', JSON.stringify(filters));
export const loadFilters = () => {

    const filters = localStorage.getItem('filters');

    return filters ? 
            JSON.parse(filters) : 
            {
                categories: [],
                brands: [],
                price: {min: 0, max: Infinity}, 
                rating: 1,
                inStock: false
            };

}