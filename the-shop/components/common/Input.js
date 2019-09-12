import React, { useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const INPUT_UPDATE = 'INPUT_UPDATE';
const INPUT_TOCHED = 'INPUT_TOCHED';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_UPDATE: {
            const { value, isValid } = action.data;

            const updatedState = {
                ...state,
                value,
                isValid
            };
            return updatedState;
        }
        case INPUT_TOCHED: {
            const updatedState = {
                ...state,
                touched: true
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
        value: props.initValue ? props.initValue : '',
        isValid: props.initIsValid ? props.initIsValid : '',
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
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
            type: INPUT_UPDATE,
            data: {
                value: text,
                isValid
            }
        });
    };

    const touchHandler = () => {
        dispatch({ type: INPUT_TOCHED });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={{ ...styles.input, ...props.style }}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={touchHandler} />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
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
    },
    errorContainer: {
        marginVertical: 8
    },
    errorText: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: 'red'
    }
});

export default Input;
