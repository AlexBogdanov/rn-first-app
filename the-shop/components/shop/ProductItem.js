import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

// Components
import TitleText from './../common/TitleText';
import DefaultText from './../common/DefaultText';
import Card from './../common/Card';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onSelect} useForeground>
            <Card style={{ ...styles.product, ...props.style }}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: props.img }} />
                </View>
                <View style={styles.detailsContainer}>
                    <TitleText>{props.title}</TitleText>
                    <DefaultText style={styles.price}>${props.price.toFixed(2)}</DefaultText>
                </View>
                <View style={styles.actions}>
                    {props.children}
                </View>
            </Card>
        </TouchableCmp>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    imgContainer: {
        width: '100%',
        height: '60%'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    }
});

export default ProductItem;
