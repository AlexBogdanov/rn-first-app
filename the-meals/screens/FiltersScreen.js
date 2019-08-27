import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

// Components
import CustomHeaderButton from './../components/CustomHeaderButton';
import SwitchItem from './../components/SwitchItem';

import { setFilters } from './../store/actions/meals';

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            isGlutenFree,
            isLactoseFree,
            isVegan,
            isVegetarian
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        props.navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available filters</Text>
            <SwitchItem
                label="Gluten-Free"
                value={isGlutenFree}
                setValue={setIsGlutenFree} />
            <SwitchItem
                label="Lactose-Free"
                value={isLactoseFree}
                setValue={setIsLactoseFree} />
            <SwitchItem
                label="Vegan"
                value={isVegan}
                setValue={setIsVegan} />
            <SwitchItem
                label="Vegetarian"
                value={isVegetarian}
                setValue={setIsVegetarian} />
        </View>
    );
};

FiltersScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={navigationData.navigation.toggleDrawer} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={navigationData.navigation.getParam('save')} />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22
    }
});

export default FiltersScreen;
