import React, { useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const LOST_FOCUS = 'LOST_FOCUS';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE: {
            const { value, isValid } = action;
            
            const updatedState = {
                ...state,
                value,
                isValid
            };

            return updatedState;
        }
        case LOST_FOCUS: {
            const updatedState = {
                ...state,
                toched: true
            };

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initalValidity ? props.initalValidity : false,
        toched: false
    });

    const { onInputChange } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;

        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid
        });
    };

    const lostFocusHandler = () => {
        dispatch({ type: LOST_FOCUS })
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={props.initialValue}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler} />
            <Text>{props.errorText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        paddingVertical: 10
    },
    input: {
        marginHorizontal: 5,
        marginVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    }
});

export default Input;
