import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import GLOBALS from '../Globals';

const dim = Dimensions.get('window')
const screenWidth = Math.round(Math.max(dim.width, dim.height));
const screenHeight = Math.round(Math.min(dim.width, dim.height));

const baseDiscWidth = screenWidth / 4
const stackHeight = screenHeight / 3
const colors = ["#FF0000", "#FF6500", "#FFA500", "#FFFF00", "#ADFF2F", "#32CD32", "#008000", "#0000FF", "#4B0082", "#EE82EE"]

export default function NumberPicker(props) {
    function createDiscs(numDiscs) {
        let nums = []
        for (let i = 0; i < numDiscs; i++) {
            nums.push(i)
        }
        return nums.map((num) => {
            return (
                <View style={{ height: stackHeight / numDiscs, width: baseDiscWidth * ((numDiscs - (3 * num / 4)) / (numDiscs + 1)), borderRadius: stackHeight / numDiscs, backgroundColor: colors[num % colors.length] }} />
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.discContainer}>
                {createDiscs(props.number)}
                <Text style={{ position: "absolute", zIndex: 1, fontSize: 40, color: "#FFF" }}>{props.number}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {props.number > GLOBALS.MIN_DISCS ? <TouchableOpacity onPress={() => props.setNumber(props.number - 1)} style={{ ...styles.button, backgroundColor: "#D72638" }}>
                    <Icon
                        name="minus"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity> : null}
                {props.number < GLOBALS.MAX_DISCS ? <TouchableOpacity onPress={() => props.setNumber(props.number + 1)} style={{ ...styles.button, backgroundColor: "#20BF55" }}>
                    <Icon
                        name="plus"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30
    },
    discContainer: {
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    }
});
