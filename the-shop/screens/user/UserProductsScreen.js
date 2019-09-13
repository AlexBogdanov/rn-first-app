import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    Platform,
    Button,
    Alert,
    ActivityIndicator,
    View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from './../../components/common/CustomHeaderButton';
import ProductItem from './../../components/shop/ProductItem';

import * as productsActions from './../../store/actions/products';
import Colors from './../../constansts/Colors';

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.userProducts);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay!' }]);
        }
    }, [error]);

    const deleteProductAction = prodId => {
        setError(null);
        setIsLoading(true);

        dispatch(productsActions.deleteProduct(prodId))
            .then(() => {
                setIsLoading(false);
            }).catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    };
        
    const deleteProduct = prodId => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No!', style: 'default' },
            { text: 'Yes!', style: 'destructive', onPress: deleteProductAction.bind(this, prodId) }
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
                    <Button color={Colors.primary} title="Edit" onPress={redirectToEditProduct.bind(this, id)} />
                    <Button color={Colors.primary} title="Delete" onPress={deleteProduct.bind(this, id)} />
                </ProductItem>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    } else {
        return (
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={renderProduct} />
        );
    }
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserProductsScreen;
