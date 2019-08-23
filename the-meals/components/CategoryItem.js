import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Platform, TouchableNativeFeedback } from 'react-native';

const GridItem = props => {
    let TouchWrapper = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchWrapper = TouchableNativeFeedback;
    }

    return (
        <View style={{ ...styles.categoryItem, ...props.style }}>
            <TouchWrapper style={{ flex: 1 }} onPress={() => props.onClick(props.id)}>
                <View style={{ ...styles.container, backgroundColor: props.color }}>
                    <Text style={styles.text} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        flex: 1,
        padding: 15,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        elevation: 3
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'black',
        textAlign: 'right'
    }
});

export default GridItem;
