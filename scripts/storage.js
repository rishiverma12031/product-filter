
export const loadFilters = () => {

    const filters = localStorage.getItem('filters');

    return filters ? JSON.parse(filters) : {price: {min: 0, max: Infinity}, inStock: false};

}

export const saveFilters = (filters) => localStorage.setItem('filters', JSON.stringify(filters));