import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle, ImageStyle, Dimensions } from "react-native";
import { gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Surface, Card, Divider } from 'react-native-paper';

interface Style {
    actionContainer: ViewStyle;
    gestureView: ViewStyle;
    coverStyle: ImageStyle;
    dividerStyle: ViewStyle;
}

const { height, width } = Dimensions.get("window");

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
        height: 30,
        width: 250,
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
    const [zIndex, setzIndex] = useState(0);
    const mindist: number = 20;
    const handleGesture = (e: PanGestureHandlerGestureEvent) => {
        const { translationY, velocityY } = e.nativeEvent;
        Animated.timing(modeDown, {
            toValue: translationY,
            duration: velocityY/100,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }
    const handleStateChange = (e: PanGestureHandlerGestureEvent) => {
        const { translationY, absoluteY, velocityY } = e.nativeEvent;
        Animated.timing(modeDown, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(() => {
            if (absoluteY > 550) {
                setzIndex(zIndex > 0 ? 0 : 10);
            }
        });
    }
    return (
        <View>
            <View>
                <Card>
                    <Card.Title title="Card Title" subtitle="Card Subtitle" />
                    <Card.Cover style={styles.coverStyle} source={{ uri: 'https://via.placeholder.com/200x300' }} />
                </Card>
            </View>
            <Animated.View style={[styles.gestureView, { transform: [{ translateY: modeDown.interpolate({ inputRange: [0, 200], outputRange: [-375, 0], extrapolate: "clamp" }) }], elevation: zIndex }]}>
                <Card>
                    <Card.Title title="Card Title" subtitle="Card Subtitle" />
                    <Card.Cover style={styles.coverStyle} source={{ uri: 'https://picsum.photos/200/300' }} />
                    <PanGestureHandler minDist={mindist} onGestureEvent={handleGesture} onHandlerStateChange={handleStateChange}>
                        <View>
                            <Card.Actions style={styles.actionContainer}>
                                <GesturedDivider />
                            </Card.Actions>
                        </View>
                    </PanGestureHandler>
                </Card>
            </Animated.View>
        </View>
    )
})

export const GestureScreen = () => (
    <GestureHoc />
);