import React, { useState } from 'react';
import { StyleSheet, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

// Components
import Card from './../components/Card';
import Input from './../components/Input';
import NumberContainer from './../components/NumberContainer';
import TitleText from './../components/TitleText';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

import Colors from './../constants/colors';

const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState('');
    const [selectedNumber, setSelectedNumber] = useState();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const inputNumberHandler = (num) => {
        setEnteredNumber(num.replace(/[^0-9]/g, ''));
    };

    const resetBtnHandler = () => {
        setEnteredNumber('');
        setIsConfirmed(false);
    };

    const confirmBtnHandler = () => {
        const chosenNum = parseInt(enteredNumber);
    
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert('Invalid number!', 'Number should be between 1 and 99.', [{
                text: 'Close!',
                style: 'destructive',
                onPress: resetBtnHandler
            }]);
            return;
        }

        setIsConfirmed(true);
        setSelectedNumber(chosenNum);
        setEnteredNumber('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (isConfirmed) {
        confirmedOutput = (
            <Card style={styles.selectedNumber}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onGameStart(selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            onChangeText={inputNumberHandler}
                            value={enteredNumber}
                            blurOnSubmit autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2} />
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}><Button title="Reset" onPress={resetBtnHandler} color={Colors.secondary} /></View>
                            <View style={styles.button}><Button title="Confirm" onPress={confirmBtnHandler} color={Colors.primary} /></View>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    button: {
        width: 85,
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    selectedNumber: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
