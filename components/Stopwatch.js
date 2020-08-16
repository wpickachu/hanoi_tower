import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Stopwatch(props) {
    const [int, setInt] = useState(null)
    const [startTime, setStartTime] = useState(new Date())

    useEffect(() => {
        if (props.running) {
            start()
        } else {
            stop()
        }
    }, [props.running])

    function start() {
        setInt(setInterval(() => {
            let currTime = new Date()
            props.setTime(Math.floor((currTime - startTime) / 10))
        }, 10))
    }

    function stop() {
        clearInterval(int)
    }


    return (
        <View style={styles.container}>
            <Text style={{ color: "#3399FF", fontSize: 20 }}>Time: {Math.floor(props.time / 6000)}:{Math.floor((props.time % 6000) / 100).toString().padStart(2, "0")}.{(props.time % 100).toString().padStart(2, "0")}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    }, time: {
        fontSize: 20
    }
});
