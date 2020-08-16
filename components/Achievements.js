import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import BackButton from './BackButton';
import GLOBALS from '../Globals'


const dim = Dimensions.get('window')
const screenWidth = Math.round(Math.max(dim.width, dim.height));
const screenHeight = Math.round(Math.min(dim.width, dim.height));

export default function Achievements({ navigation }) {
    const [bests, setBests] = useState([])

    useEffect(() => {
        getBests()
    }, [])

    function alertClear() {
        Alert.alert(
            "Are you sure you want to clear your achievements?",
            "This cannot be undone.",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Yes",
                    onPress: () => clearAchievements()
                }
            ],
            { cancelable: false }
        )
    }

    async function clearAchievements() {
        for (let i = 3; i < GLOBALS.MAX_DISCS; i++) {
            await AsyncStorage.removeItem('best' + i)
        }
        getBests()
    }

    async function getBests() {
        let bestList = []
        for (let i = 3; i <= GLOBALS.MAX_DISCS; i++) {
            const value = await AsyncStorage.getItem('best' + i)
            let asJSON = JSON.parse(value)
            bestList.push({ id: i, data: asJSON })
        }
        setBests(bestList)
    }

    function renderRow({ item }) {
        let time = item.data === null ? null : item.data[1]
        if (time !== null) {
            time = parseFloat(time)
        }
        return (
            <View style={styles.rowContainer}>
                <View style={styles.numberCell}>
                    <Text style={styles.numberText}>{item.id}</Text>
                </View>
                <View style={styles.scoresContainer}>
                    <View style={styles.scoreContainer}>
                        <Text style={{ ...styles.scoreText, color: item.data !== null && item.data[0] === Math.pow(2, item.id) - 1 ? "#0F0" : "white" }}>{item.data === null ? "" : item.data[0]}</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        {time === null ?
                            <Text style={styles.scoreText} /> :
                            <Text style={styles.scoreText}>{Math.floor(time / 6000)}:{Math.floor((time % 6000) / 100).toString().padStart(2, "0")}.{(time % 100).toString().padStart(2, "0")}</Text>}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => alertClear()} style={styles.clearButton}>
                    <Text style={{ color: "white", padding: 5 }}>Clear</Text>
                </TouchableOpacity>
                <BackButton navigation={navigation} />
            </View>
            <View style={styles.flatListContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.numberCell}>
                        <Text style={styles.numberText}># of Discs</Text>
                    </View>
                    <View style={styles.scoresContainer}>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.scoreText}>Fewest Moves</Text>
                        </View>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.scoreText}>Best Time</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={bests}
                    renderItem={renderRow}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        position: "absolute",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 2,
        top: Constants.statusBarHeight,
        left: 0,
        width: "100%",
        backgroundColor: "transparent"
    },
    flatListContainer: {
        top: Constants.statusBarHeight,
        height: screenHeight - 2 * Constants.statusBarHeight,
        backgroundColor: "#3399FF",
        borderRadius: 20
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 50,
        width: "100%"
    },
    numberCell: {
        flexDirection: "row",
        justifyContent: "flex-end",
        borderWidth: 2,
        borderColor: "#FFF",
        width: 150
    },
    numberText: {
        padding: 10,
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold"
    },
    scoresContainer: {
        borderWidth: 2,
        borderColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        width: screenWidth * 0.5
    },
    scoreContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        borderColor: "#FFF",
        borderLeftWidth: 4
    },
    scoreText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF"
    },
    clearButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3399FF",
        width: 80,
        marginHorizontal: 10,
        borderRadius: 20
    }
});
