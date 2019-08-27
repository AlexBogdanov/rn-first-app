import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

import Colors from './../../constansts/Colors';

const ProductItem = props => {
    return (
        <View style={{ ...styles.product, ...props.style }}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{ uri: props.img }} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails} />
                <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    imgContainer: {
        width: '100%',
        height: '60%'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        flex: 1,
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    }
});

export default ProductItem;
