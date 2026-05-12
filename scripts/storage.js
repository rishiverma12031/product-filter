
export const saveFilters = (filters) => localStorage.setItem('filters', JSON.stringify(filters));
export const loadFilters = () => {

    const filters = localStorage.getItem('filters');

    return filters ? 
            JSON.parse(filters) : 
            {
                searchInput: '',
                categories: [],
                brands: [],
                prices: [], 
                ratings: [],
                inStock: false
            };

}