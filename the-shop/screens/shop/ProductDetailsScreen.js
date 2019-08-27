import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ProductDetailsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>ProductDetailsScreen</Text>
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

export default ProductDetailsScreen;
