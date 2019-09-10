import { PRODUCTS } from '../../data/dummy-data';
import { DELETE_PRODUCT } from './../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_PRODUCT: {
            const { productId } = action;
            const updatedAvailableProducts = state.availableProducts.filter(prod => prod.id !== productId);
            const updatedUserProducts = state.userProducts.filter(prod => prod.id !== productId);
            const updatedState = {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
            
            return updatedState;
        }
        default: {
            return state;
        }
    };
};

export default productsReducer;
