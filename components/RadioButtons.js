import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const dim = Dimensions.get('window')
const screenWidth = Math.round(Math.max(dim.width, dim.height));
const screenHeight = Math.round(Math.min(dim.width, dim.height));

export default function RadioButtons(props) {
    return (
        <View style={styles.container}>
            {props.options.map((option, index) => {
                return (
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => props.setSelected(index)}>
                        <Text style={styles.buttonText}>{option}</Text>
                        <View style={{ ...styles.circle, backgroundColor: index === props.selected ? "#20BF55" : "#FFF" }} />
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: screenHeight / 6,
        width: 3 * screenWidth / 7,
        margin: 5,
        backgroundColor: "#3399FF",
        borderRadius: screenHeight / 12
    },
    buttonText: {
        fontSize: 20,
        color: "#FFF",
        padding: 20
    },
    circle: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#fff",
        margin: 10
    },
    checkedCircle: {
        width: "100%",
        height: "100%",
        backgroundColor: "#3399FF",
        borderRadius: 20,
    }
});