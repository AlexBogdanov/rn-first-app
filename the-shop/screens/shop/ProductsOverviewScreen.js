import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Platform, Button, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from './../../components/shop/ProductItem';
import CustomHeaderButton from './../../components/common/CustomHeaderButton';

// Actions
import * as cartActions from './../../store/actions/cart';
import * as productsActions from './../../store/actions/products';

import Colors from './../../constansts/Colors';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const fetchedProducts = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts =  useCallback(() => {
        setError(false);
        setIsLoading(true);
        dispatch(productsActions.fetchProducts())
            .then(() => { setIsLoading(false); })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const loadProductsSub = props.navigation.addListener('willFocus', () => {
            loadProducts();
        });

        return () => { loadProductsSub.remove(); };
    }, [loadProducts]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    const redirectToProductDetails = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            id,
            title
        });
    };

    const addToCart = (item) => {
        dispatch(cartActions.addToCart(item));
    }

    const renderItem = (item) => {
        return (
            <ProductItem
                img={item.imageUrl}
                title={item.title}
                price={item.price}
                onSelect={() => redirectToProductDetails(item.id, item.title)} >
                    <Button color={Colors.primary} title="View Details" onPress={() => redirectToProductDetails(item.id, item.title)} />
                    <Button color={Colors.primary} title="To Cart" onPress={() => addToCart(item)} />
                </ProductItem>
        );
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured!</Text>
                <Button
                    title="Try again!"
                    color={Colors.primary}
                    style={styles.btn}
                    onPress={loadProducts} />
            </View>
        );
    } else if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    } else if (!isLoading && fetchedProducts.length <= 0) {
        return (
            <View style={styles.centered}>
                <Text>There are no available products.</Text>
            </View>
        );
    } else {
        return (
            <FlatList
                keyExtractor={item => item.id}
                data={fetchedProducts}
                renderItem={itemData => renderItem(itemData.item)} />
        );
    }
};

ProductsOverviewScreen.navigationOptions = navData => {
    const redirectToCart = () => {
        navData.navigation.navigate('Cart');
    }

    const toggleDrawer = () => {
        navData.navigation.toggleDrawer();
    };

    return {
        headerTitle: 'All products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? "md-menu" : "ios-menu"}
                    onPress={toggleDrawer} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? "md-cart" : "ios-cart"}
                    onPress={redirectToCart} />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    } ,
    btn: {
        marginVertical: 1000
    }
});

export default ProductsOverviewScreen;
