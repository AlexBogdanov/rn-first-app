import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CategoryItem from '../components/CategoryItem';
import CustomHeaderButton from './../components/CustomHeaderButton';

// Data
import { CATEGORIES } from './../data/dummy-data';

const CategoriesScreen = props => {
    const redirectToCategory = (categoryId) => {
        props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
                categoryId
            }
        });
    };

    const renderGridItem = itemData => {
        return <CategoryItem id={itemData.item.id} title={itemData.item.title} color={itemData.item.color} onClick={redirectToCategory} />;
    }

    return (
        <FlatList keyExtractor={item => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    );
};

CategoriesScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={navigationData.navigation.toggleDrawer} />
            </HeaderButtons>
        )
    };
};

export default CategoriesScreen;
