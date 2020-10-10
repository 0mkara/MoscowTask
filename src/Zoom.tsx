import React, { useRef, useEffect, useState } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle
} from "react-native";
import { Button, Headline } from 'react-native-paper';

interface Style {
    listImage: ImageStyle;
    gestureView: ViewStyle;
    listTitle: TextStyle;
}

const styles = StyleSheet.create<Style>({
    listImage: {
        height: 0,
        resizeMode: 'stretch',
        margin: 5
    },
    gestureView: {
        // borderWidth: 1,
        // borderColor: "green",
        margin: 2,
        padding: 10,
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
});

export const ZoomScreen = () => {
    const height = useRef(new Animated.Value(0)).current;
    const [zoom, setZoom] = useState(false);
    useEffect(() => {
        console.log(height);
    }, [height]);
    const handleView = () => {
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
        <Animated.View style={[styles.gestureView]}>
            <Headline>What do you like more ?</Headline>
            <Animated.Image
                source={{ uri: 'https://via.placeholder.com/100x150.png' }}
                style={{
                    height: 350,
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "cover",
                    transform: [
                        {
                            scaleX: height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 15]
                            })
                        },
                        {
                            scaleY: height.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 100]
                            })
                        }
                    ]
                }}
            />
            {
                !zoom &&
                <Button mode="contained" color="#252525" onPress={handleView}>
                    Zoom In
                    </Button>
            }
            {
                zoom &&
                <Button mode="contained" color="#252525" onPress={handleZoomOut}>
                    Zoom Out
                    </Button>
            }
        </Animated.View>
    );
};