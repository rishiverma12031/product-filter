
export const renderProducts = (products, productsContainer) => {

    productsContainer.textContent = "";

    products.forEach(product => {
        
        const  productCard = document.createElement('article');
        productCard.classList.add('product');

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
        productPrice.textContent = product.price;
        productPrice.classList.add('product__price');

        const productRating = document.createElement('p');
        productRating.textContent = product.rating;
        productRating.classList.add('product__rating');

        const productInStock = document.createElement('p');
        productInStock.textContent = product.inStock ? 'In Stock' : 'Out of Stock';
        productInStock.classList.add('product__in-stock');

        productCard.append(productName, productBrand, productCategory, productPrice, productRating, productInStock);

        productsContainer.append(productCard);

    });

}

export const renderFilters = (products, filtersContainer) => {

    filtersContainer.textContent = "";

    const categories = getCategories(products);
    const brands = getBrands(products);
    const prices = getPrices();
    const ratings = getRatings();
    const availability = getAvailability();

    const categoryGroup = renderCategoryGroup(categories);
    const brandGroup = renderBrandGroup(brands);
    const priceGroup = renderPriceGroup(prices);
    const ratingGroup = renderRatingGroup(ratings);
    const availabilityGroup = renderAvailabilityGroup(availability);

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

const renderCategoryGroup = (categories) => {

    const categoryGroup = document.createElement('fieldset');
    
    const categoryLegend = document.createElement('legend');
    categoryLegend.classList.add('filters__subheading');
    categoryLegend.textContent = "Category";

    categoryGroup.append(categoryLegend);

    categories.forEach((category, index) => {

        const categoryDiv = document.createElement('div');

        const categoryCheckbox = document.createElement('input');
        categoryCheckbox.type = "checkbox";
        categoryCheckbox.name = "category";
        categoryCheckbox.id = `category${index + 1}`;
        categoryCheckbox.value = category;

        const categoryLabel = document.createElement('label');
        categoryLabel.htmlFor = `category${index + 1}`;
        categoryLabel.textContent = category;
        
        categoryDiv.append(categoryCheckbox, categoryLabel);
        categoryGroup.append(categoryDiv);

    });

    return categoryGroup;

}

const renderBrandGroup = (brands) => {

    const brandGroup = document.createElement('fieldset');
    
    const brandLegend = document.createElement('legend');
    brandLegend.classList.add('filters__subheading');
    brandLegend.textContent = "Brand";

    brandGroup.append(brandLegend);

    brands.forEach((brand, index) => {

        const brandDiv = document.createElement('div');

        const brandCheckbox = document.createElement('input');
        brandCheckbox.type = "checkbox";
        brandCheckbox.name = "brand";
        brandCheckbox.id = `brand${index + 1}`;
        brandCheckbox.value = brand;

        const brandLabel = document.createElement('label');
        brandLabel.htmlFor = `brand${index + 1}`;
        brandLabel.textContent = brand;
        
        brandDiv.append(brandCheckbox, brandLabel);
        brandGroup.append(brandDiv);

    });

    return brandGroup;

}

const renderPriceGroup = (prices) => {

    const priceGroup = document.createElement('fieldset');
    
    const priceLegend = document.createElement('legend');
    priceLegend.classList.add('filters__subheading');
    priceLegend.textContent = "Price Range";

    priceGroup.append(priceLegend);

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

    prices.forEach((price, index) => {

        const priceDiv = document.createElement('div');

        const priceCheckbox = document.createElement('input');
        priceCheckbox.type = "checkbox";
        priceCheckbox.name = "price";
        priceCheckbox.id = `price${index + 1}`;
        priceCheckbox.value = price;

        const priceLabel = document.createElement('label');
        priceLabel.htmlFor = `price${index + 1}`;
        priceLabel.textContent = price === "0-500" ? "Under 500" : price === "5000-Infinity" ? "Above 5000" : price;
        
        priceDiv.append(priceCheckbox, priceLabel);
        priceGroup.append(priceDiv);

    });

    return priceGroup;

}

const renderRatingGroup = (ratings) => {

    const ratingGroup = document.createElement('fieldset');
    
    const ratingLegend = document.createElement('legend');
    ratingLegend.classList.add('filters__subheading');
    ratingLegend.textContent = "Rating";

    ratingGroup.append(ratingLegend);

    ratings.forEach((rating, index) => {

        const ratingDiv = document.createElement('div');

        const ratingCheckbox = document.createElement('input');
        ratingCheckbox.type = "checkbox";
        ratingCheckbox.name = "rating";
        ratingCheckbox.id = `rating${index + 1}`;
        ratingCheckbox.value = rating;

        const ratingLabel = document.createElement('label');
        ratingLabel.htmlFor = `rating${index + 1}`;
        ratingLabel.textContent = `${rating}+ stars`;
        
        ratingDiv.append(ratingCheckbox, ratingLabel);
        ratingGroup.append(ratingDiv);

    });

    return ratingGroup;

}

const renderAvailabilityGroup = (availability) => {

    const availabilityGroup = document.createElement('fieldset');
    
    const availabilityLegend = document.createElement('legend');
    availabilityLegend.classList.add('filters__subheading');
    availabilityLegend.textContent = "Availability";

    availabilityGroup.append(availabilityLegend);

    availability.forEach((availability, index) => {

        const availabilityDiv = document.createElement('div');

        const availabilityRadio = document.createElement('input');
        availabilityRadio.type = "radio";
        availabilityRadio.name = "availability";
        availabilityRadio.id = `availability${index + 1}`;
        availabilityRadio.value = availability;
        availabilityRadio.checked = availability === "false" ? true : false;

        const availabilityLabel = document.createElement('label');
        availabilityLabel.htmlFor = `availability${index + 1}`;
        availabilityLabel.textContent = availability === "true" ? "In stock only" : "Include out of stock";
        
        availabilityDiv.append(availabilityRadio, availabilityLabel);
        availabilityGroup.append(availabilityDiv);

    });

    return availabilityGroup;

}
