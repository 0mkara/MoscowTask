import React, { useRef, useEffect, useState } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle,
    Dimensions
} from "react-native";
// import Animated, { Easing } from 'react-native-reanimated'
import { Button, Headline, Caption } from 'react-native-paper';

interface Style {
    listImage: ImageStyle;
    gestureView: ViewStyle;
    listTitle: TextStyle;
    caption: TextStyle;
    headline: TextStyle;
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create<Style>({
    listImage: {
        height: 0,
        resizeMode: 'stretch',
        margin: 5
    },
    gestureView: {
        width: width - 2,
        height: height - 50,
        borderWidth: 1,
        borderColor: "transparent",
        margin: 2,
        padding: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    listTitle: {
        fontWeight: "800",
        fontSize: 32,
        textAlign: "center"
    },
    headline: {
        fontSize: 22,
    },
    caption: {
        fontSize: 16,
    }
});

export const ZoomScreen = () => {
    const height = useRef(new Animated.Value(0)).current;
    const [zoom, setZoom] = useState(false);
    useEffect(() => {
        console.log(height);
    }, [height]);
    const handlePreview = () => {
        Animated.timing(height, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
        setZoom(true);
    }
    const handleZoomOut = () => {
        Animated.timing(height, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
        setZoom(false);
    }
    return (
        <Animated.View style={styles.gestureView}>
            <Animated.View
                style={{
                    top: 200,
                    transform: [
                        {
                            translateY: height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -200]
                            })
                        }
                    ]
                }}>
                <Headline>What do you like more ?</Headline>
            </Animated.View>
            <Animated.Image
                source={{ uri: 'https://picsum.photos/300/450' }}
                style={{
                    // borderColor: "red",
                    // borderWidth: 1,
                    width: 300,
                    height: 450,
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "cover",
                    transform: [
                        {
                            scaleX: height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1]
                            })
                        },
                        {
                            scaleY: height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1]
                            })
                        }
                    ]
                }}
            />
            <Animated.View
                style={{
                    bottom: 200,
                    transform: [
                        {
                            translateY: height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 200]
                            })
                        }
                    ]
                }}>
                <Caption style={styles.caption}>Answer the question by choosing an option.</Caption>
            </Animated.View>
            {
                !zoom &&
                <Button mode="contained" color="#252525" onPress={handlePreview}>
                    Preview
                </Button>
            }
            {
                zoom &&
                <Button mode="contained" color="#252525" onPress={handleZoomOut}>
                    Hide
                </Button>
            }
        </Animated.View>
    );
};