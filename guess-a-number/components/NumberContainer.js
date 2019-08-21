import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from './../constants/colors';
import BodyText from './BodyText';

const NumberContainer = props => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <BodyText style={styles.number}>{props.children}</BodyText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        margin: 10,
        padding: 20,
        borderWidth: 2,
        borderColor: Colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 22,
        color: Colors.secondary
    }
});

export default NumberContainer;
