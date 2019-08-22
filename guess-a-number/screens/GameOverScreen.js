import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, ScrollView } from 'react-native';

// Components
import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import MainButton from './../components/MainButton';

import Colors from './../constants/colors';

const GameOverScreen = props => {
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    let highlight = {};

    if (availableDeviceHeight > 600) {
        highlight = {
            fontSize: 24,
            color: Colors.primary,
            fontFamily: 'open-sans-bold'
        }
    } else {
        highlight = {
            fontSize: 14,
            color: Colors.primary,
            fontFamily: 'open-sans-bold'
        }
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText
                    style={{ fontSize: availableDeviceHeight > 600 ? 22 : 12 }}
                    >The game is over!</TitleText>
                <View style={{
                    ...styles.imgContainer,
                    width: availableDeviceWidth / 2,
                    height: availableDeviceWidth / 2,
                    borderRadius: availableDeviceWidth / 4 }}>
                    <Image style={styles.img} source={require('./../assets/success.png')} />
                </View>
                <BodyText style={{
                    ...styles.textContainer,
                    marginVertical: availableDeviceHeight > 600 ? 15 : 8,
                    fontSize: availableDeviceHeight > 600 ? 22 : 12
                    }}>Your phone needed <Text style={highlight}>{props.rounds}</Text> rounds to guess the number <Text style={highlight}>{props.number}</Text>.</BodyText>
                <MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    imgContainer: {
        overflow: 'hidden',
        marginTop: 15,
        borderWidth: 3,
        borderColor: Colors.primary
    },
    img: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        textAlign: 'center',
    }
});

export default GameOverScreen;
