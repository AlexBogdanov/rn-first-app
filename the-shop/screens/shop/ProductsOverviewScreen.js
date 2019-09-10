import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from './../../components/shop/ProductItem';
import CustomHeaderButton from './../../components/common/CustomHeaderButton';

import * as cartActions from './../../store/actions/cart';
import Colors from './../../constansts/Colors';

const ProductsOverviewScreen = props => {
    const fetchedProducts = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

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

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={fetchedProducts}
            renderItem={itemData => renderItem(itemData.item)} />
    );
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

export default ProductsOverviewScreen;
