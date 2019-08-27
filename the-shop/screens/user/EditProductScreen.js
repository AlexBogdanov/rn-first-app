import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const EditProductScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>EditProductScreen</Text>
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

export default EditProductScreen;
