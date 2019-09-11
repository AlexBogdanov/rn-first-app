import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, heigh: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default Card;
