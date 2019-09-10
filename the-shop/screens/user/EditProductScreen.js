import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const EditProductScreen = props => {
    return (
        <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image URL</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formControl: {},
    label: {},
    input: {}
});

export default EditProductScreen;
