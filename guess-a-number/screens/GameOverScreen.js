import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

// Components
import BodyText from './../components/BodyText';
import TitleText from './../components/TitleText';
import MainButton from './../components/MainButton';

import Colors from './../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over!</TitleText>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={require('./../assets/success.png')} />
            </View>
            <BodyText style={styles.textContainer}>Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.number}</Text>.</BodyText>
            <MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
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
        marginVertical: 15,
        textAlign: 'center'
    },
    highlight: {
        fontSize: 18,
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
