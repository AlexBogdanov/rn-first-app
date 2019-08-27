import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from './../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
    const fetchedProducts = useSelector(state => state.products.availableProducts);

    const renderItem = (item) => {
        return (
            <ProductItem
                img={item.imageUrl}
                title={item.title}
                price={item.price}
                onViewDetails={() => {}}
                onAddToCart={() => {}} />
        );
    };

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={fetchedProducts}
            renderItem={itemData => renderItem(itemData.item)} />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All products'
};

export default ProductsOverviewScreen;
