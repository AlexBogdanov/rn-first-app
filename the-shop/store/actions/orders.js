import Order from './../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = (userId) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://rn-guide-16165.firebaseio.com/orders/${userId}.json`);
            const resData = await response.json();
            const orders = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            if (!resData) {
                throw new Error('There are no orders, yet.');
            }

            Object.keys(resData).forEach(id => {
                const { items, totalAmount, timeOfCreation } = resData[id];
                const order = new Order(id, items, totalAmount, timeOfCreation);
                orders.push(order);
            });

            dispatch({ type: SET_ORDERS, orders });
        } catch (err) {
            throw err;
        }
    };
}

export const addOrder = (orderedItems, orderAmount, userId) => {
    return async dispatch => {
        const orderData = {
            items: orderedItems,
            amount: orderAmount,
            userId,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch(
                `https://rn-guide-16165.firebaseio.com/orders/${userId}.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                }
            );
    
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            orderData.id = resData.name;
    
            dispatch ({
                type: ADD_ORDER,
                orderData
            });
        } catch (err) {
            throw err;
        }
    };
};
