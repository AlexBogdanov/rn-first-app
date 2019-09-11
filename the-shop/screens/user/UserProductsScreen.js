import React from 'react';
import { FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from './../../components/common/CustomHeaderButton';
import ProductItem from './../../components/shop/ProductItem';

import * as productsActions from './../../store/actions/products';
import Colors from './../../constansts/Colors';

const UserProductsScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.userProducts);
        
    const deleteProduct = prodId => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No!', style: 'default' },
            { text: 'Yes!', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(prodId));
            } }
        ]);
    };

    const redirectToEditProduct = prodId => {
        props.navigation.navigate('EditProduct', { prodId });
    }

    const renderProduct = itemData => {
        const { imageUrl, title, price, id } = itemData.item;

        return (
            <ProductItem
                img={imageUrl}
                title={title}
                price={price}
                onSelect={() => {}} >
                    <Button color={Colors.primary} title="Edit" onPress={() => redirectToEditProduct(id)} />
                    <Button color={Colors.primary} title="Delete" onPress={() => deleteProduct(id)} />
                </ProductItem>
        );
    };

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderProduct} />
    );
};

UserProductsScreen.navigationOptions = navData => {
    const toggleDrawer = () => {
        navData.navigation.toggleDrawer();
    };

    const redirectToEditProduct = () => {
        navData.navigation.navigate('EditProduct');
    };

    return {
        headerTitle: 'Your Products',
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
                    title="Add"
                    iconName={Platform.OS === 'android' ? "md-add" : "ios-add"}
                    onPress={redirectToEditProduct} />
            </HeaderButtons>
        )
    };
};

export default UserProductsScreen;
