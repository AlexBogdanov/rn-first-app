import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import ProductItem from './../../components/shop/ProductItem';
import CustomHeaderButton from './../../components/common/CustomHeaderButton';

import * as cartActions from './../../store/actions/cart';

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
                onViewDetails={() => redirectToProductDetails(item.id, item.title)}
                onAddToCart={() => addToCart(item)} />
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

    return {
        headerTitle: 'All products',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Cart" iconName="md-cart" onPress={redirectToCart} />
            </HeaderButtons>
        )
    };
};

export default ProductsOverviewScreen;
