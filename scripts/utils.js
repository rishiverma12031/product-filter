
export const formatPrice = (price) => {

    const thousandPlaceValue = Math.floor(price / 1000);

    return (thousandPlaceValue ? `₹${thousandPlaceValue},${price % 1000}` : `₹${price}`); 

}