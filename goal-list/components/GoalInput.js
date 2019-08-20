import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setGoal] = useState('');

    const enteredGoalHandler = goal => {
        setGoal(goal);
    };

    const onAddHandler = () => {
        props.addNewGoalHandler(enteredGoal);
        setGoal('');
        props.toggleAddMode(false);
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Course Goal"
                    style={styles.input}
                    value={enteredGoal}
                    onChangeText={enteredGoalHandler} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={onAddHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title="CANCEL" color="red" onPress={() => props.toggleAddMode(false)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      width: '80%',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      margin: 10
    },
    buttonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '40%'
    }
});

export default GoalInput;
