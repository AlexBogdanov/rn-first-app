import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productsActions from './../../store/actions/products';

// Components
import CustomHeaderButton from './../../components/common/CustomHeaderButton';
import Input from './../../components/common/Input';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_UPDATE: {
            const { input, value, isValid } = action;

            const updatedValues = {
                ...state.inputValues,
                [input]: value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [input]: isValid
            };

            let updatedFormIsValid = true;
            Object.keys(updatedValidities).forEach(key => {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            });

            const updatedState = {
                ...state,
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                formIsValid: updatedFormIsValid
            };

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

const inputTypes = {
    title: 'title',
    imgUrl: 'imgUrl',
    price: 'price',
    description: 'description'
};

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('prodId');

    const product = useSelector(state => (
        state.products.userProducts.find(prod => prod.id === prodId)
    ));

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: product ? product.title : '',
            imgUrl: product ? product.imageUrl : '',
            price: product ? product.price.toString() : '',
            description: product ? product.description : ''
        },
        inputValidities: {
            title: product ? true : false,
            imgUrl: product ? true : false,
            price: product ? true : false,
            description: product ? true : false
        },
        formIsValid: product ? true : false
    });

    const inputChangeHandler = useCallback((inputType, value, isValid) => {
        formDispatch({
            type: FORM_UPDATE,
            value,
            isValid,
            input: inputType
        });
    }, [formDispatch]);

    const onSave = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert(
                'Invalid fields!',
                'Check all the fields for any errors.',
                [{ text: 'Okay!', style: 'default' }]
            );
            return;
        }

        if (product) {
            dispatch(productsActions.editProduct(
                prodId,
                product.ownerId,
                formState.inputValues.title,
                formState.inputValues.imgUrl,
                formState.inputValues.description
            ));
            props.navigation.goBack();
        } else {
            dispatch(productsActions.createProduct(
                'u1',
                formState.inputValues.title,
                formState.inputValues.imgUrl,
                Number(formState.inputValues.price),
                formState.inputValues.description
            ));
            props.navigation.goBack();
        }
    }, [dispatch, prodId, product, formState]);

    useEffect(() => {
        props.navigation.setParams({ 'onSave': onSave });
    }, [onSave]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    initialValue={formState.inputValues.title}
                    initalValidity={formState.inputValidities.title}
                    label="Title"
                    errorText="Title is a required field"
                    keyboardType='default'
                    autoCorrect
                    autoCapitalize='sentences'
                    returnKeyType="next"
                    onInputChange={inputChangeHandler.bind(this, inputTypes.title)} />
                <Input
                    initialValue={formState.inputValues.imgUrl}
                    initalValidity={formState.inputValidities.imgUrl}
                    label="Image URL"
                    errorText="Image URL is a required field"
                    keyboardType='default'
                    returnKeyType="next" />
                {product ? null : (
                    <Input
                        initialValue={formState.inputValues.price}
                        initalValidity={formState.inputValidities.price}
                        label="Price"
                        errorText="Price is a required field"
                        keyboardType='decimal-pad'
                        returnKeyType="next" />
                )}
                <Input
                    initialValue={formState.inputValues.description}
                    initalValidity={formState.inputValidities.description}
                    label="Description"
                    errorText="Description is a required field"
                    keyboardType='default'
                    autoCorrect
                    autoCapitalize='sentences'
                    multiline
                    numberOfLiners={5} />
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const prodId = navData.navigation.getParam('prodId');
    const onSave = navData.navigation.getParam('onSave');

    return {
        headerTitle: prodId ? "Edit Product" : "Add Product",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === 'android'
                        ? (prodId ? "md-save" : "md-checkmark")
                        : (prodId ? "ios-save" : "ios-checkmark")}
                    onPress={onSave} />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 20
    }
});

export default EditProductScreen;
