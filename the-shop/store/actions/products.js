import Product from './../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-guide-16165.firebaseio.com/products.json');
            const resData = await response.json();
            const products = [];
    
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            Object.keys(resData).forEach(id => {
                const { title, imageUrl, description, price } = resData[id];
                const product = new Product(id, 'u1', title, imageUrl, description, price);
                products.push(product);
            });
    
            dispatch({ type: SET_PRODUCTS, products });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return async dispatch => {
        await fetch(
            `https://rn-guide-16165.firebaseio.com/products/${productId}.json`,
            { method: 'DELETE' }
        )

        dispatch({ type: DELETE_PRODUCT, productId });
    }
};

export const createProduct = (ownerId, title, imgUrl, price, description) => {
    return async dispatch => {
        const prodData = {
            title,
            imageUrl: imgUrl,
            price,
            description
        };

        const response = await fetch(
            'https://rn-guide-16165.firebaseio.com/products.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prodData)
            }
        );
        const resData = await response.json();

        prodData.id = resData.id;
        prodData.ownerId = ownerId;
    
        dispatch({
            type: CREATE_PRODUCT,
            prodData
        });
    };
};

export const editProduct = (id, title, imgUrl, description) => {
    return async dispatch => {
        const newProdData = {
            title,
            imageUrl: imgUrl,
            description
        };

        await fetch(
            `https://rn-guide-16165.firebaseio.com/products/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProdData)
            }
        );

        newProdData.id = id;
        dispatch({ type: EDIT_PRODUCT, newProdData });
    };
};
