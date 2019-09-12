import { PRODUCTS } from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from './../actions/products';
import Product from './../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PRODUCTS: {
            const { products } = action;

            const updatedAvailableProducts = products;
            const updatedUserProducts = products.filter(prod => prod.ownerId === 'u1');

            const updatedState = {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
            return updatedState;
        }
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
        case CREATE_PRODUCT: {
            const { id, ownerId, title, imageUrl, price, description } = action.prodData;
            const product = new Product(id, ownerId, title, imageUrl, description, price);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts.push(product);
            const updatedUserProducts = [...state.userProducts];

            if (ownerId === 'u1') {
                updatedUserProducts.push(product);
            }

            const updatedState = {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };

            return updatedState;
        }
        case EDIT_PRODUCT: {
            const { id, title, imageUrl, description } = action.newProdData;
            const product = state.availableProducts.find(prod => prod.id === id);
            const editedProduct = new Product(id, product.ownerId, title, imageUrl, description, product.price);

            const updatedAvailableProducts = [...state.availableProducts];
            const index = updatedAvailableProducts.findIndex(prod => prod.id === id);
            updatedAvailableProducts[index] = editedProduct;
            const updatedUserProducts = [...state.userProducts];

            if (product.ownerId === 'u1') {
                const i = updatedUserProducts.findIndex(prod => prod.id === id);
                updatedUserProducts[i] = editedProduct;
            }

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
