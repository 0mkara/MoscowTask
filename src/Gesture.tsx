import React, { useRef, useEffect, useState } from 'react';
import { Text, Animated, Easing } from "react-native";
import { gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const GestureHoc = gestureHandlerRootHOC(() => {
    const moveUp = useRef(new Animated.Value(0)).current;
    const handleGesture = (e: PanGestureHandlerGestureEvent) => {
        console.log(e);
        Animated.timing(moveUp, {
            toValue: 1,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture} failOffsetY={[-10, 10]}>
            <Text>Gesture Screen</Text>
        </PanGestureHandler>
    )
})

export const GestureScreen = () => (
    <GestureHoc />
);