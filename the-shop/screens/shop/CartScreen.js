import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CartScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>CartScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CartScreen;
