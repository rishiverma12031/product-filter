
export const filterProducts = (products, event) => {

    if(event.target.name === "category") {

        return event.target.checked ? 
                products.filter(product => product.category === event.target.value) : 
                products;

    }

    if(event.target.name === "brand") {

        return event.target.checked ? 
                products.filter(product => product.brand === event.target.value) : 
                products;

    }
    
    if(event.target.name === "price") {

        if(event.target.checked) {

            const sepIndex = event.target.value.search(/[-]/);
        
            const minPrice = Number(event.target.value.slice(0, sepIndex));

            const maxPrice = Number(event.target.value.slice(sepIndex + 1));

            return products.filter(product => (product.price >= minPrice) && (product.price <= maxPrice));

        }

        return products;
        
    }
    
    if(event.target.name === "rating") {

        return event.target.checked ? 
            products.filter(product => product.rating >= event.target.value) : 
            products;

    }
    
    if(event.target.name === "availability") {

        switch(event.target.value) {

            case "true":
                
                return products.filter(product => product.inStock);
                
                break;

            case "false": 

                return products;
                
                break;

        }
    }
}