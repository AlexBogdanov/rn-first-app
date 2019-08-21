import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import NumberContainer from './../components/NumberContainer';
import Card from './../components/Card';
import BodyText from './../components/BodyText';
import MainButton from './../components/MainButton';

const generateRandomNum = (min, max, exclude) => {
    if (isNaN(min)) {
        min = parseInt(min);
    }

    if (isNaN(max)) {
        max = parseInt(min);
    }

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomNum === exclude) {
        return generateRandomNum(min, max, exclude);
    } else {
        return randomNum;
    }
}

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomNum(1, 99, props.selectedNum));
    const [pastGuesses, setPastGuesses] = useState([]);
    const minNum = useRef(1);
    const maxNum = useRef(99);

    useEffect(() => {
        if (currentGuess === props.selectedNum) {
            props.onGameOver(pastGuesses.length + 1);
        }
    });

    const nextGuessHandler = (direction) => {
        if (direction === 'lower' && currentGuess <= props.selectedNum) {
            Alert.alert('Wrong!', 'The selected number is greater than current number.', [{ text: 'Close!', style: 'cancel' }]);
        } else if (direction === 'greater' && currentGuess >= props.selectedNum) {
            Alert.alert('Wrong!', 'The selected number is lower than current number.', [{ text: 'Close!', style: 'cancel' }]);
        } else {
            if (direction === 'lower') {
                maxNum.current = currentGuess;
            } else if (direction === 'greater') {
                minNum.current = currentGuess;
            }
            
            const nextNum = generateRandomNum(minNum.current, maxNum.current, currentGuess);
            setPastGuesses((oldPastGuesses) => [currentGuess, ...oldPastGuesses]);
            setCurrentGuess(nextNum);
        }
    };

    return (
        <View style={styles.screen}>
            <BodyText>Opponent`s Guess</BodyText>
            <NumberContainer style={styles.numberContainer}>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}><Ionicons name="md-arrow-down" size={24} color='white' /></MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}><Ionicons name="md-arrow-up" size={24} color='white' /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={() => Math.random().toString()}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    numberContainer: {
        width: 75,
        maxWidth: '20%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 400,
        maxWidth: '64%'
    },
    listContainer: {
        width: '80%',
        flex: 1,
        alignItems: 'center',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center'
    }
});

export default GameScreen;
