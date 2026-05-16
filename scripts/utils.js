
export const formatPrice = (price) => {

    const thousandPlaceValue = Math.floor(price / 1000);
    const uptoHunderedPlaceValue = price % 1000 === 0 ? "000" : price % 1000;

    return (thousandPlaceValue ? `₹${thousandPlaceValue},${uptoHunderedPlaceValue}` : `₹${price}`); 

}

export const formatRating = (rating) => {

    let stars = '';

    const fullStars = Math.floor(rating);
    const halfStars = ((rating - fullStars) >= 0.5) ? 1 : 0 ;
    const emptyStars = 5 - fullStars - halfStars;

    stars += "★".repeat(fullStars);
    stars += "⯪".repeat(halfStars);
    stars += "☆".repeat(emptyStars);

    return `${rating} ${stars}`;

}

export const getMaxPrice = (products) => Math.max(...products.map(product => product.price));

export const toTitleCase = (input) => {

    return input.trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

}
