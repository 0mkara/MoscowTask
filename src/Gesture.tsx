import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle, ImageStyle, Dimensions } from "react-native";
import { gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Surface, Card, Divider } from 'react-native-paper';

// const { height } = Dimensions.get("window");
interface Style {
    actionContainer: ViewStyle;
    gestureView: ViewStyle;
    coverStyle: ImageStyle;
    dividerStyle: ViewStyle;
}
const styles = StyleSheet.create<Style>({
    actionContainer: {
        // borderWidth: 1,
        // borderColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    gestureView: {
        // borderWidth: 5,
        // borderColor: "red"
    },
    coverStyle: {
        height: 300
    },
    dividerStyle: {
        backgroundColor: "gray",
        height: 20,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})
const GesturedDivider = () => (
    <Surface style={styles.dividerStyle}>
        <Divider />
    </Surface>
)
const GestureHoc = gestureHandlerRootHOC(() => {
    const modeDown = useRef(new Animated.Value(0)).current;
    const [y, setY] = useState(0);
    const handleGesture = (e: PanGestureHandlerGestureEvent) => {
        setY(e.nativeEvent.translationY);
        Animated.timing(modeDown, {
            toValue: y < 0 ? 0 : y > 10 ? 10 : y,
            duration: 50,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }

    return (
        <Animated.View style={[styles.gestureView,{ transform: [{ translateY: modeDown.interpolate({ inputRange: [0, 10], outputRange: [0, 200] }) }] }]}>
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                <Card.Cover style={styles.coverStyle} source={{ uri: 'https://picsum.photos/200/300' }} />
                <PanGestureHandler onGestureEvent={handleGesture}>
                    <View>
                        <Card.Actions style={styles.actionContainer}>
                            <GesturedDivider />
                        </Card.Actions>
                    </View>
                </PanGestureHandler>
            </Card>
        </Animated.View>
    )
})

export const GestureScreen = () => (
    <GestureHoc />
);