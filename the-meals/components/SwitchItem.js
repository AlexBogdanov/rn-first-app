import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import Colors from './../constants/Colors';

const SwitchItem = props => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primary, false: Colors.secondary }}
                thumbColor="white"
                value={props.value}
                onValueChange={newValue => props.setValue(newValue)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    }
});

export default SwitchItem;
