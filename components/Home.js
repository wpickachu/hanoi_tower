import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { Video } from 'expo-av';

const dim = Dimensions.get('window')
const screenWidth = Math.round(Math.max(dim.width, dim.height));
const screenHeight = Math.round(Math.min(dim.width, dim.height));

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Video
                source={require('../assets/home.mp4')}
                rate={1.0}
                isMuted={true}
                resizeMode="contain"
                shouldPlay
                isLooping
                style={{ position: "absolute", width: "80%", height: "80%" }}
            />
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.navText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate("Game", { tutorial: true, number: 3 })}>
                <Text style={styles.navText}>Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate("Achievements")}>
                <Text style={styles.navText}>Achievements</Text>
            </TouchableOpacity>
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
    navButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3399FF",
        width: screenWidth * 0.4,
        height: screenHeight / 6,
        margin: 10,
        borderRadius: screenHeight / 12,
        zIndex: 1
    },
    navText: {
        color: "white",
        fontSize: screenHeight / 15,
        fontFamily: 'sans-serif-light'
    }
});
