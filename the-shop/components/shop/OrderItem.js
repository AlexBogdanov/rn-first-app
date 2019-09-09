import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import CartItem from './CartItem';
import Colors from './../../constansts/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleShowDetails = () => {
        setShowDetails(prevState => !prevState);
    };

    return (
        <View style={styles.orderItem}>
            <View style={styles.info}>
                <Text style={styles.totalAmount}>${props.price.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View>
                <Button title="Show Details" color={Colors.primary} onPress={toggleShowDetails} />
            </View>

            {showDetails && (
                <View>
                    {props.items.map((item, index) => {
                        return (
                            <CartItem
                                key={index}
                                title={item.title}
                                price={item.price}
                                quantity={item.quantity}
                                sum={item.sum}
                                style={styles.cartItem} />
                        );
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flex: 1,
        width: '90%',
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    cartItem: {
        height: 12
    }
});

export default OrderItem;
