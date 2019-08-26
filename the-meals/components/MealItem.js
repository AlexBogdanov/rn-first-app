import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, ImageBackground } from 'react-native';

// Components
import DefaultText from './DefaultText';

const MealItem = props => {
    let TouchWrapper = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchWrapper = TouchableNativeFeedback;
    }

    return (
        <View style={styles.mealItem}>
            <TouchWrapper style={{ flex: 1 }} onPress={props.onClick}>
                <View style={{ flex: 1 }}>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground style={styles.img} source={{ uri: props.imgUrl }}>
                            <View style={styles.titleContainer}>
                                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetails: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: '15%',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 12,
        paddingVertical: 5  
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white'
    }
});

export default MealItem;
