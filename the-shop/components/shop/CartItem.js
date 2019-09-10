import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import TitleText from './../common/TitleText';
import DefaultText from './../common/DefaultText';

import Colors from './../../constansts/Colors';

const CartItem = props => {
    const cartItemStyle = props.isDeletable
        ? styles.cartItem : { ...styles.cartItem, width: '100%' };

    return (
        <View style={styles.wrapper}>
            <View style={cartItemStyle}>
                <TitleText style={styles.title}>{props.title}</TitleText>
                <DefaultText>${props.price}</DefaultText>
                <DefaultText>{props.quantity} pcs.</DefaultText>
                <TitleText style={styles.sum}>${props.sum}</TitleText>
            </View>
            {props.isDeletable && (
                <View style={styles.actions}>
                    <TouchableOpacity>
                        <Ionicons
                            name="md-trash"
                            size={23}
                            color="red"
                            onPress={() => props.onDelete(props.id)} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    cartItem: {
        flexDirection: 'row',
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc'
    },
    title: {
        color: Colors.primary,
        fontSize: 14
    },
    sum: {
        color: Colors.accent,
        fontSize: 14
    },
    actions: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CartItem;
