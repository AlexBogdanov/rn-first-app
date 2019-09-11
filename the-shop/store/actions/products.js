export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, productId }
};

export const createProduct = (ownerId, title, imgUrl, price, description) => {
    const prodData = {
        ownerId,
        title,
        imgUrl,
        price,
        description
    };

    return { type: CREATE_PRODUCT, prodData };
};

export const editProduct = (id, ownerId, title, imgUrl, description) => {
    const newProdData = {
        id,
        ownerId,
        title,
        imgUrl,
        description
    };

    return { type: EDIT_PRODUCT, newProdData };
};
