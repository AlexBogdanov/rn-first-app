import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const UserProductsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>UserProductsScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserProductsScreen;
