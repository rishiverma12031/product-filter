import { formatPrice, formatRating } from "./utils.js";

export const renderProducts = (products, productsContainer) => {

    productsContainer.textContent = "";

    products.forEach(product => {
        
        const  productCard = document.createElement('article');
        productCard.classList.add('product');

        const productInStock = document.createElement('p');
        productInStock.textContent = product.inStock ? '• In Stock' : '✕ Out of Stock';
        
        if(!product.inStock) {

            productCard.classList.add('product--sold-out');
            productInStock.classList.add('product__out-stock');
        
        }

        else {
            productInStock.classList.add('product__in-stock');
        }

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
        productPrice.textContent = formatPrice(product.price);
        productPrice.classList.add('product__price');

        const productRating = document.createElement('p');
        productRating.textContent = formatRating(product.rating);
        productRating.classList.add('product__rating');

        productCard.append(productInStock, productName, productBrand, productCategory, productPrice, productRating);
        productsContainer.append(productCard);

    });

}

export const renderResultsCount = (totalProducts, displayedProducts, resultsCount) => {

    if(displayedProducts === 0 ) return resultsCount.innerHTML = 'No products match your filters.<br /> Try removing some filters';

    resultsCount.textContent = `Showing ${displayedProducts} of ${totalProducts} products`;

}

export const renderFilters = (products, filtersContainer) => {

    filtersContainer.textContent = "";

    const categories = getCategories(products);
    const categoryGroup = renderGroup(categories, 'Category', 'checkbox');
    
    const brands = getBrands(products);
    const brandGroup = renderGroup(brands, 'Brand', 'checkbox');
    
    const prices = getPrices();
    const priceGroup = renderGroup(prices, 'Price', 'checkbox');
    
    const ratings = getRatings();
    const ratingGroup = renderGroup(ratings, 'Rating', 'checkbox');
    
    const availability = getAvailability();
    const availabilityGroup = renderGroup(availability, 'Availability', 'radio');
    
    filtersContainer.append(categoryGroup, brandGroup, priceGroup, ratingGroup, availabilityGroup);

}

const getCategories = (products) => {

    return products.reduce((categories, product) => {

        return [...new Set([...categories, product.category])];

    }, []);

}

const getBrands = (products) => {

    return products.reduce((brands, product) => {

        return [...new Set([...brands, product.brand])];

    }, []);

}

const getPrices = () => ["0-500", "500-2000", "2000-5000", "5000-Infinity"];

const getRatings = () => ["4.5", "4"];

const getAvailability = () => ["true", "false"];

const renderGroup = (groupList, groupName, type) => {

    const group = document.createElement('div');
    group.classList.add('filters__dropdown');

    const groupTitleDiv = document.createElement('div');
    groupTitleDiv.classList.add('filters__subheading-container');

    const dropdownBtn = document.createElement('button');
    dropdownBtn.classList.add('filters__button--dropdown');
    dropdownBtn.textContent = '▶';

    const groupTitle = document.createElement('p');
    groupTitle.classList.add('filters__subheading');
    groupTitle.textContent = groupName;

    groupTitleDiv.append(dropdownBtn, groupTitle);
    group.append(groupTitleDiv);

    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('filters__dropdown-menu', 'hidden');
    
    dropdownBtn.addEventListener('click', () => {
        
        dropdownMenu.classList.toggle('hidden');
        dropdownBtn.textContent === '▶' ? dropdownBtn.textContent = '▼' : dropdownBtn.textContent = '▶';

    });

    const elementName = groupName.toLowerCase();

    groupList.forEach((element, index) => {

        const elementDiv = document.createElement('div');

        const elementInput = document.createElement('input');
        elementInput.type = type;
        elementInput.name = elementName;
        elementInput.id = `${elementName}${index + 1}`;
        elementInput.value = element;

        if(elementName === "availability") elementInput.checked = element === "false" ? true : false;

        const elementLabel = document.createElement('label');
        elementLabel.htmlFor = `${elementName}${index + 1}`;
        elementLabel.textContent = getText(elementName, element);
        
        elementDiv.append(elementInput, elementLabel);
        dropdownMenu.append(elementDiv);

    });

    group.append(dropdownMenu);

    return group;

}

const getText = (elementName, element) => {

    switch (elementName) {

        case 'category':
            return element;

        case 'brand':
            return element;

        case 'price':
            return element === "0-500" ? "Under 500" : element === "5000-Infinity" ? "Above 5000" : element;
        
        case 'rating':
            return `${element}+ stars`;;
        
        case 'availability':
            return element === "true" ? "In stock only" : "Include out of stock";

    }

}

// Price Slider

    // const priceDiv = document.createElement('div');

    // const priceRange = document.createElement('input');
    // priceRange.type = "range";
    // priceRange.name = "price-range";
    // priceRange.id = "price-range";
    // priceRange.min = "0";
    // priceRange.max = "50000";
    // priceRange.value = "50000";
    // priceRange.list = "values";

    // const priceList = document.createElement('datalist');
    // priceList.classList.add('filters__price-list');
    // priceList.id = "values";

    // const priceListStart = document.createElement('option');
    // priceListStart.value = "0";
    // priceListStart.label = "0";

    // const priceListEnd = document.createElement('option');
    // priceListEnd.value = "50000";
    // priceListEnd.label = "50000";

    // priceList.append(priceListStart, priceListEnd);
    // priceDiv.append(priceRange, priceList);
    // priceGroup.append(priceDiv);
