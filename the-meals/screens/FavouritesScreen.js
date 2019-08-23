import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const FavouritesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Favourites Screen!</Text>
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

export default FavouritesScreen;
