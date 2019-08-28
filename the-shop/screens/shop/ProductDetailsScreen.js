import React from 'react';
import { StyleSheet, View, ScrollView, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components
import TitleText from './../../components/common/TitleText';
import DefaultText from './../../components/common/DefaultText';

import * as cartActions from './../../store/actions/cart';
import Colors from './../../constansts/Colors';


const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('id');
    const fetchedProduct = useSelector(state => {
        const result = state.products.availableProducts.find(prod => prod.id === productId);
        return result;
    });
    const dispatch = useDispatch();

    const addToCart = item => {
        dispatch(cartActions.addToCart(item));
    };

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Image style={styles.img} source={{ uri: fetchedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => addToCart(fetchedProduct)} />
            </View>
            <TitleText style={styles.price}>${fetchedProduct.price}</TitleText>
            <DefaultText style={styles.description}>{fetchedProduct.description}</DefaultText>
        </ScrollView>
    );
};

ProductDetailsScreen.navigationOptions = (navigationData => {
    const headerTitle = navigationData.navigation.getParam('title');

    return {
        headerTitle
    };
});

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: 300
    },
    actions: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        color: '#888'
    },
    description: {
        marginHorizontal: 10,
        marginVertical: 6,
        textAlign: 'center'
    }
});

export default ProductDetailsScreen;
