import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

// Components
import MealItem from './../components/MealItem';

// Data
import { CATEGORIES, MEALS } from './../data/dummy-data';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const fetchedMeals = MEALS.filter(meal => meal.categoryIds.includes(catId));
    
    const renderItem = itemData => {
        return <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        imgUrl={itemData.item.imageUrl}
        onClick={() => {}} />
    };

    return (
        <View style={styles.screen}>
            <FlatList keyExtractor={item => item.id} data={fetchedMeals} renderItem={renderItem} style={{ width: '100%' }} />
        </View>
    );
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const fetchedCategory = CATEGORIES.find(cat => cat.id === catId);
    
    return {
        headerTitle: fetchedCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});

export default CategoryMealsScreen;
