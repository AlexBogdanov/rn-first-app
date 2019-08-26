import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import DefaultText from './DefaultText';

const ListItem = props => {
    return (
        <View style={{ ...styles.item, ...props.style }}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 10
    }
});

export default ListItem;
