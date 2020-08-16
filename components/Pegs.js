import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Pegs(props) {
    return (
        <View style={styles.container}>
            <View style={{...styles.peg, width: props.baseWidth / 8, height: props.pegHeight, top: props.pegTop, left: props.positions[0] - props.baseWidth / 16, borderRadius: props.baseWidth / 16}}/>
            <View style={{...styles.peg, width: props.baseWidth / 8, height: props.pegHeight, top: props.pegTop, left: props.positions[1] - props.baseWidth / 16, borderRadius: props.baseWidth / 16}}/>
            <View style={{...styles.peg, width: props.baseWidth / 8, height: props.pegHeight, top: props.pegTop, left: props.positions[2] - props.baseWidth / 16, borderRadius: props.baseWidth / 16}}/>
            
            <View style={{...styles.peg, width: props.baseWidth, height: props.baseHeight, top: props.pegTop + props.pegHeight - props.baseHeight, left: props.positions[0] - props.baseWidth / 2, borderRadius: props.baseHeight / 4}}/>
            <View style={{...styles.peg, width: props.baseWidth, height: props.baseHeight, top: props.pegTop + props.pegHeight - props.baseHeight, left: props.positions[1] - props.baseWidth / 2, borderRadius: props.baseHeight / 4}}/>
            <View style={{...styles.peg, width: props.baseWidth, height: props.baseHeight, top: props.pegTop + props.pegHeight - props.baseHeight, left: props.positions[2] - props.baseWidth / 2, borderRadius: props.baseHeight / 4}}/>
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
    peg: {
        position: "absolute",
        backgroundColor: "brown",
    }
});
