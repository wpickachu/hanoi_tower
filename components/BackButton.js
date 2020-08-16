import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function BackButton(props) {
    if (Platform.OS === "ios") {
        return (
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.container}>
                <Icon
                    name="arrow-left"
                    size={20}
                    color="#fff"
                />
            </TouchableOpacity>
        );
    }
    return null
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3399FF",
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10
    },
});
