import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const MealDetailsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Meal Details Screen!</Text>
            <Button title="Go to categories" onPress={() => props.navigation.popToTop()} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealDetailsScreen;
