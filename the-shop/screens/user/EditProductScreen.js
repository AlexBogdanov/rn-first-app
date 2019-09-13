import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// Components
import CustomHeaderButton from './../../components/common/CustomHeaderButton';
import Input from './../../components/common/Input';

import * as productsActions from './../../store/actions/products';
import Colors from './../../constansts/Colors';

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay!' }]);
        }
    }, [error]);

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

        setIsLoading(true);
        setError(null);

        if (product) {
            dispatch(productsActions.editProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.imgUrl,
                formState.inputValues.description
            )).then(() => {
                setIsLoading(false);
                props.navigation.goBack();
            }).catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
        } else {
            dispatch(productsActions.createProduct(
                'u1',
                formState.inputValues.title,
                formState.inputValues.imgUrl,
                Number(formState.inputValues.price),
                formState.inputValues.description
            )).then(() => {
                setIsLoading(false);
                props.navigation.goBack();
            }).catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
        }
    }, [dispatch, prodId, product, formState]);

    useEffect(() => {
        props.navigation.setParams({ 'onSave': onSave });
    }, [onSave]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    } else {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={100}  >
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                            id={inputTypes.title}
                            initValue={product ? product.title : ''}
                            initIsValid={!!product}
                            label="Title"
                            errorText="Title is a required field"
                            keyboardType='default'
                            autoCorrect
                            autoCapitalize='sentences'
                            returnKeyType="next"
                            required
                            onInputChange={inputChangeHandler} />
                        <Input
                            id={inputTypes.imgUrl}
                            initValue={product ? product.imageUrl : ''}
                            initalValidity={!!product}
                            label="Image URL"
                            errorText="Image URL is a required field"
                            keyboardType='default'
                            returnKeyType="next"
                            required
                            onInputChange={inputChangeHandler} />
                        {product ? null : (
                            <Input
                                id={inputTypes.price}
                                initValue={product ? formState.inputValues.price : ''}
                                initIsValid={!!product}
                                label="Price"
                                errorText="Price is a required field"
                                keyboardType='decimal-pad'
                                returnKeyType="next"
                                required
                                min={0}
                                onInputChange={inputChangeHandler} />
                        )}
                        <Input
                            id={inputTypes.description}
                            initValue={product ? product.description : ''}
                            initIsValid={!!product}
                            label="Description"
                            errorText="Description is a required field"
                            keyboardType='default'
                            autoCorrect
                            autoCapitalize='sentences'
                            multiline
                            numberOfLiners={5}
                            required
                            minLength={10}
                            onInputChange={inputChangeHandler} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
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
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default EditProductScreen;
