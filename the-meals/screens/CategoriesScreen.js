import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

// Components
import CategoryItem from '../components/CategoryItem';

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

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;
