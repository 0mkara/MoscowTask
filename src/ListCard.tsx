import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TextStyle,
    ViewStyle,
    StyleSheet,
    FlatList,
    ImageStyle,
    Animated,
    Easing,
    Button
} from "react-native";
import { gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';


import { CardData, IListDetails } from "./types";

interface ListCardProps {
    title: string;
    id: string;
    cardData: CardData;
}
interface Style {
    item: ViewStyle;
    title: TextStyle;
    listDetails: ViewStyle;
    listTitle: TextStyle;
    listImage: ImageStyle;
    subtitle: TextStyle;
    gestureView: ViewStyle;
}
const styles = StyleSheet.create<Style>({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "blue",
        maxWidth: 350,
    },
    title: {
        fontSize: 32
    },
    listDetails: {
        borderColor: "red",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listTitle: {
        fontWeight: "800",
        fontSize: 32,
        textAlign: "center"
    },
    listImage: {
        height: 0,
        resizeMode: 'stretch',
        margin: 5
    },
    subtitle: {
        fontSize: 24,
        textAlign: "center"
    },
    gestureView: {
        borderWidth: 1,
        borderColor: "green",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    }
})
const ListDetailsHoc = gestureHandlerRootHOC(({ item }: { item: IListDetails }) => {
    const height = useRef(new Animated.Value(0)).current;
    const moveUp = useRef(new Animated.Value(0)).current;
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
            <Animated.View style={[styles.gestureView, { transform: [{ translateY: moveUp.interpolate({ inputRange: [0, 1], outputRange: [0, 100] }) }] }]}>
                <Text style={styles.listTitle}>What do you like more ?</Text>
                <Animated.Image
                    source={{ uri: 'https://via.placeholder.com/100x150.png' }}
                    style={{
                        height: 20,
                        width: 20,
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
                    <Button onPress={handleView} title="Zoom In" />
                }
                {
                    zoom &&
                    <Button onPress={handleZoomOut} title="Zoom Out" />
                }
                <Text style={styles.subtitle}>{item.title}</Text>
                <Text>{item.userId}</Text>
                <Text>{item.id}</Text>
                <Text>{item.completed ? "True" : "False"}</Text>
            </Animated.View>
        </PanGestureHandler>
    );
});

const renderDetails = ({ item }: { item: IListDetails }) => (
    <ListDetailsHoc item={item} />
);
const ListCard: FunctionComponent<ListCardProps> = observer(({ title, cardData }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            {
                cardData.tasks &&
                <FlatList renderItem={renderDetails} keyExtractor={item => JSON.stringify(item.id)} data={cardData.tasks} />
            }
        </View>
    )
});

export default ListCard;