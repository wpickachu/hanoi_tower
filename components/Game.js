import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableOpacity, Easing, Image, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Feather';
import { AdMobBanner } from 'expo-ads-admob';
import Pegs from './Pegs'
import Stopwatch from './Stopwatch';
import BackButton from './BackButton';

const dim = Dimensions.get('window')
const screenWidth = Math.round(Math.max(dim.width, dim.height));
const screenHeight = Math.round(Math.min(dim.width, dim.height));

const baseWidth = screenWidth / 4
const baseHeight = screenHeight / 8
const pegHeight = screenHeight * 0.6
const pegTop = screenHeight * 0.3
const pegXVals = [0.2 * screenWidth, 0.5 * screenWidth, 0.8 * screenWidth]
const baseYVal = pegTop + pegHeight - baseHeight
const colors = ["#FF0000", "#FF6500", "#FFA500", "#FFFF00", "#ADFF2F", "#32CD32", "#008000", "#0000FF", "#4B0082", "#EE82EE"]

export default function Game({ route, navigation }) {
    const [numDiscs, setNumDiscs] = useState(2)
    const [discs, setDiscs] = useState([[], [], []])
    const [lifted, setLifted] = useState(null)
    const [blocked, setBlocked] = useState(false)
    const [redFlash, setRedFlash] = useState(-1)
    const [won, setWon] = useState(false)

    const [useTimer, setUseTimer] = useState(false)
    const [stopwatchRunning, setStopwatchRunning] = useState(false)
    const [time, setTime] = useState(0)

    const [countMoves, setCountMoves] = useState(false)
    const [numMoves, setNumMoves] = useState(0)

    const [best, setBest] = useState([null, null])

    const [boxTop, setBoxTop] = useState(new Animated.Value(0))
    const [boxLeft, setBoxLeft] = useState(new Animated.Value(0))
    const [boxWidth, setBoxWidth] = useState(new Animated.Value(0))
    const [boxHeight, setBoxHeight] = useState(new Animated.Value(0))

    const [tutorialIndex, setTutorialIndex] = useState(-1)

    const { tutorial } = route.params

    useEffect(() => {
        if (tutorial) {
            setTutorialIndex(0)
        } else {
            setTutorialIndex(-1)
        }
    }, [tutorial])

    const hideTutorialButtonsIndices = [6, 7, 8, 9, 11, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

    const tutorialText = [
        "Welcome to the tutorial!",
        "This is a puzzle game where you have to move a tower of discs.",
        "The tower starts on the left peg.",
        "Solve the puzzle by moving the entire tower to one of the other pegs.",
        "You will move one disc at a time, from one peg to another.",
        "But, you can't place a disc on top of a disc that is smaller than it.",
        "Lift a disc by tapping the stack.",
        "Then drop the disc by tapping on another peg.",
        "Lift another disc from the stack.",
        "If you try to place the disc on the middle peg, it will flash red.",
        "This is because the disc is bigger than the disc you are trying to place it on.",
        "Place the disc on the rightmost peg.",
        "The tutorial will now guide you through the solution to 3 discs.",
        "Tap on the peg that is highlighted until confetti covers the screen.",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Congratulations!",
        "When you get comfortable with the game, try out the different game modes.",
        "There is 'Count Moves' where you can try to solve it in the fewest number of moves.",
        "And 'Timed' where you can try to solve it as fast as possible.",
        "View your best scores on the 'Achievements' tab in the homescreen.",
        "You can change your game mode and number of discs in the settings. Good luck!",
        "",
    ]

    // Takes the form [top, left, height, width]
    const boxes = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [pegTop + (pegHeight / 2), pegXVals[0], 0, 0],
        [pegTop, pegXVals[0] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[1] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[0] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[1] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop + (pegHeight / 2), pegXVals[1], 0, 0],
        [pegTop, pegXVals[2] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop + (pegHeight / 2), pegXVals[2], 0, 0],
        [pegTop + (pegHeight / 2), pegXVals[1], 0, 0],
        [pegTop, pegXVals[1] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[2] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[0] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[1] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[2] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[0] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[2] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[1] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[0] - baseWidth / 2, pegHeight, baseWidth],
        [pegTop, pegXVals[1] - baseWidth / 2, pegHeight, baseWidth],
        [0, 0, screenHeight, screenWidth],
        [0, 0, screenHeight, screenWidth],
        [0, 0, screenHeight, screenWidth],
        [0, 0, screenHeight, screenWidth],
        [0, 0, screenHeight, screenWidth],
        [Constants.statusBarHeight, screenWidth - 50, 40, 40],
        [0, 0, screenHeight, screenWidth],
    ]

    useEffect(() => {
        if (tutorialIndex >= 0) {
            Animated.timing(
                boxTop, {
                toValue: boxes[tutorialIndex][0],
                duration: 500,
                easing: Easing.ease
            }
            ).start()
            Animated.timing(
                boxLeft, {
                toValue: boxes[tutorialIndex][1],
                duration: 500,
                easing: Easing.ease
            }
            ).start()
            Animated.timing(
                boxHeight, {
                toValue: boxes[tutorialIndex][2],
                duration: 500,
                easing: Easing.ease
            }
            ).start()
            Animated.timing(
                boxWidth, {
                toValue: boxes[tutorialIndex][3],
                duration: 500,
                easing: Easing.ease
            }
            ).start()
        }
    }, [tutorialIndex])

    const { selected } = route.params

    useEffect(() => {
        if (selected === 1) {
            setCountMoves(true)
        } else if (selected == 2) {
            setUseTimer(true)
        }
    }, [selected])

    useEffect(() => {
        createDiscs()
        if (countMoves || useTimer) {
            getBestFromStorage()
        }
    }, [numDiscs])

    const { number } = route.params
    useEffect(() => setNumDiscs(number), [number])

    useEffect(() => {
        setBestInStorage()
    }, [best])

    useEffect(() => {
        if (won && tutorialIndex < 0) {
            alertSolved()
        }
    }, [won])

    function createDiscs() {
        /*
        createDiscs() creates the objects to represent the discs and sets the discs state to have all of these objects
        in the first position (on the first peg). A disc object has a width (number), height (number), color (hex), and 
        position (Animated.ValueXY).
        */
        let stack = []
        for (let i = 0; i < numDiscs; i++) {
            let discWidth = baseWidth * ((numDiscs - (3 * i / 4)) / (numDiscs + 1))
            let discHeight = (pegHeight - baseHeight) / (numDiscs + 1)
            stack.push({ width: discWidth, height: discHeight, color: colors[i % colors.length], position: new Animated.ValueXY({ x: pegXVals[0] - (discWidth / 2), y: baseYVal - discHeight * (i + 1) }) })
        }
        setDiscs([stack, [], []])
    }

    function renderDiscs() {
        /*
        renderDiscs() returns Animated.Views to represent the discs. It maps the objects in the discs state to Animated.Views
        with the height, width, color, and position contained in the object.
        */
        return discs.map((stack) => {
            return stack.map((disc) => {
                return (
                    <Animated.View style={{ position: "absolute", width: disc.width, height: disc.height, backgroundColor: disc.color, ...disc.position.getLayout(), borderRadius: disc.height / 2 }} />
                )
            })
        })
    }

    function lift(stackIndex) {
        /*
        lift(stackIndex) animates the lifting of the disc on top of the chosen stack and sets the 
        lifted state to stackIndex, if there is a disc on top of the chosen stack.
        */
        if (discs[stackIndex].length === 0) {
            flash(stackIndex)
            setBlocked(false)
        } else {
            setNumMoves(numMoves => numMoves + 1)
            if (!stopwatchRunning) {
                setStopwatchRunning(true)
            }
            disc = discs[stackIndex][discs[stackIndex].length - 1]
            setLifted(stackIndex)
            Animated.timing(
                disc.position, {
                toValue: { x: pegXVals[stackIndex] - (disc.width / 2), y: screenHeight * 0.1 },
                easing: Easing.ease,
                duration: tutorialIndex >= 0 ? 500 : 100
            }
            ).start(() => {
                setBlocked(false)
            })
        }
    }

    function drop(stackIndex) {
        /*
        drop(stackIndex) animates the moving and dropping of the lifted disc to the chosen stack (stackIndex) and 
        sets the lifted state to null, if the disc on top of the chosen peg is larger than the lifted disc.
        */
        let liftedDisc = discs[lifted][discs[lifted].length - 1]
        let topDisc = discs[stackIndex][discs[stackIndex].length - (1 + (lifted === stackIndex))]
        if (discs[stackIndex].length > 0 && topDisc && topDisc.width < liftedDisc.width) {
            flash(stackIndex)
            setBlocked(false)
        } else {
            discs[stackIndex].push(liftedDisc)
            discs[lifted].pop()
            Animated.timing(
                liftedDisc.position, {
                toValue: { x: pegXVals[stackIndex] - (liftedDisc.width / 2), y: screenHeight * 0.1 },
                easing: Easing.ease,
                duration: tutorialIndex >= 0 ? 500 : 100
            }
            ).start(() => {
                let targetY = (topDisc ? parseFloat(JSON.stringify(topDisc.position.getLayout().top)) : baseYVal) - liftedDisc.height
                Animated.timing(
                    liftedDisc.position, {
                    toValue: { x: pegXVals[stackIndex] - (liftedDisc.width / 2), y: targetY },
                    easing: Easing.ease,
                    duration: tutorialIndex >= 0 ? 500 : 100
                }
                ).start(() => {
                    setLifted(null)
                    if (discs[1].length === numDiscs || discs[2].length === numDiscs) {
                        setWon(true)
                        setBlocked(true)
                        setStopwatchRunning(false)
                        updateBest()
                    } else {
                        setBlocked(false)
                    }
                })
            })
        }
    }

    function flash(index) {
        /*
        flash(index) will make the Touchable Opacity of the provided index flash red for a short period of time
        to indicate that an illegal move has been attempted.
        */
        setRedFlash(index)
        setTimeout(() => setRedFlash(-1), 200)
    }

    async function getBestFromStorage() {
        /*
        getBestFromStorage() will use AsyncStorage to fetch the player's best score for the current number of 
        discs, and update the "best" state. The best score is a list with two elements: the first is the lowest 
        number of moves that the player has solved the puzzle in, and the second is the best time (in hundredths) 
        that the player has solved the puzzle in. 
        */
        let val = await AsyncStorage.getItem('best' + numDiscs)
        let asJSON = JSON.parse(val)
        if (val !== null) {
            setBest(asJSON)
        }
    }

    async function setBestInStorage() {
        /*
        setBestInStorage() will update the storage with the new best score for the player.
        */
        if (best[0] !== null || best[1] !== null) {
            await AsyncStorage.setItem('best' + numDiscs, JSON.stringify(best))
        }
    }

    function updateBest() {
        /*
        updateBest() will update the "best" state if the user beat their best time or lowest number of moves
        */
        if (countMoves && (best[0] === null || numMoves < parseFloat(best[0]))) {
            setBest([numMoves, parseFloat(best[1])])
        } else if (useTimer && (best[1] === null || time < parseFloat(best[1]))) {
            setBest([parseFloat(best[0]), time])
        }
    }

    function alertSolved() {
        /*
        alertSolved() will alert the winner that they have solved the puzzle.
        */
        Alert.alert(
            "Congratulations!",
            "Go to the settings to start a new game.",
            [
                {
                    text: "Okay"
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BackButton navigation={navigation} />
                    <View style={{ marginHorizontal: 10 }}>
                        {useTimer ? stopwatchRunning || time > 0 ? <Stopwatch running={stopwatchRunning} setTime={setTime} time={time} /> : <Text style={{ color: "#3399FF", fontSize: 20 }}>Time: 0:00.00</Text> : null}
                        {countMoves ? <Text style={{ color: "#3399FF", fontSize: 20 }}>Moves: {numMoves}</Text> : null}
                    </View>
                </View>
                {tutorialIndex < 0 || tutorialIndex > 28 ? <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ backgroundColor: "#3399FF", borderRadius: 20, padding: 10, marginHorizontal: 10 }}>
                    <Icon
                        name="settings"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity> : null}
            </View>

            {tutorialIndex >= 0 && tutorialIndex < boxes.length - 1 ? <View style={{ position: "absolute", top: 0, left: 0 }}>
                <Animated.View style={{ ...styles.windowView, top: 0, left: 0, width: Animated.add(boxLeft, boxWidth), height: boxTop }} />
                <Animated.View style={{ ...styles.windowView, top: boxTop, left: 0, width: boxLeft, height: screenHeight }} />
                <Animated.View style={{ ...styles.windowView, top: 0, left: Animated.add(boxLeft, boxWidth), width: screenWidth, height: Animated.add(boxHeight, boxTop) }} />
                <Animated.View style={{ ...styles.windowView, top: Animated.add(boxTop, boxHeight), left: boxLeft, width: screenWidth, height: screenHeight }} />
            </View> : null}
            {tutorialIndex >= 0 && tutorialIndex < boxes.length - 1 ?
                <View style={{ position: "absolute", left: "5%", top: Constants.statusBarHeight, width: "90%", zIndex: 2, flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", width: "70%" }}>
                        <Text style={{ color: tutorialIndex < 24 || tutorialIndex == 29 ? "#FFF" : "#3399FF", fontSize: 25 }}>{tutorialText[tutorialIndex]}</Text>
                    </View>
                    {!hideTutorialButtonsIndices.includes(tutorialIndex) ?
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            {tutorialIndex > 0 && tutorialIndex < hideTutorialButtonsIndices[0] ?
                                <TouchableOpacity onPress={() => setTutorialIndex(index => index - 1)} style={styles.tutorialButton}>
                                    <Text style={styles.tutorialButtonText}>Back</Text>
                                </TouchableOpacity> : null}
                            <TouchableOpacity onPress={() => setTutorialIndex(index => index + 1)} style={styles.tutorialButton}>
                                <Text style={styles.tutorialButtonText}>Okay</Text>
                            </TouchableOpacity>
                        </View> : null}
                </View> : null}

            <View style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}>
                <Pegs positions={pegXVals} baseWidth={baseWidth} baseHeight={baseHeight} pegHeight={pegHeight} pegTop={pegTop} />
            </View>
            {won ? <Image source={require('../assets/confetti.gif')} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} /> : null}
            {renderDiscs()}
            {pegXVals.map((pegX, index) => {
                return <TouchableOpacity
                    style={{ position: "absolute", width: baseWidth, height: pegHeight, top: pegTop, left: pegX - (baseWidth / 2), backgroundColor: redFlash === index ? "red" : "transparent", opacity: 0.4, borderRadius: baseHeight / 4 }}
                    onPress={() => {
                        if (!blocked) {
                            if (tutorialIndex >= 0) {
                                setTutorialIndex(index => index + 1)
                            }
                            if (lifted === null) {
                                setBlocked(true)
                                lift(index)
                            } else {
                                setBlocked(true)
                                drop(index)
                            }
                        }
                    }} />
            })}
            {tutorialIndex < 0 ? <AdMobBanner
                bannerSize="smartBanner"
                adUnitID={Constants.manifest.extra.googleMobileAdsUnitId}
                servePersonalizedAds
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    header: {
        width: "100%",
        zIndex: 2,
        position: "absolute",
        top: Constants.statusBarHeight,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    windowView: {
        zIndex: 1,
        position: "absolute",
        backgroundColor: "#222",
        opacity: 0.6
    },
    tutorialButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3399FF",
        width: 100,
        height: 60,
        borderRadius: 50,
        marginHorizontal: 10
    },
    tutorialButtonText: {
        color: "#FFF",
        fontSize: 25
    },
    congatsText: {
        zIndex: 2,
        fontSize: 40,
        color: "#3399FF",
        padding: 100
    }
});
