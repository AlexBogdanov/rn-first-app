export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (orderedItems, orderAmount) => {
    return {
        type: ADD_ORDER,
        orderData: {
            items: orderedItems,
            amount: orderAmount
        }
    };
};