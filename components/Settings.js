import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import NumberPicker from './NumberPicker';
import RadioButtons from './RadioButtons';
import BackButton from './BackButton';

const options = ['Zen Mode', 'Count Moves', 'Timed']

export default function Settings({ navigation }) {
    const [number, setNumber] = useState(3)
    const [selected, setSelected] = useState(0)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton navigation={navigation} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", margin: "5%" }}>
                <NumberPicker number={number} setNumber={setNumber} />
                <RadioButtons options={options} selected={selected} setSelected={setSelected} />
            </View>
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.push("Game", { number: number, selected: selected, tutorial: false })}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        zIndex: 2,
        position: "absolute",
        top: Constants.statusBarHeight,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    continueButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3399FF",
        width: 150,
        height: 60,
        margin: 20,
        borderRadius: 30
    },
    continueButtonText: {
        fontSize: 20,
        padding: 20,
        color: "#FFF"
    }
});
