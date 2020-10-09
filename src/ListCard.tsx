import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextStyle,
    ViewStyle,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ImageStyle,
    Animated,
    Easing,
    Button
} from "react-native";

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
    }
})

const ListDetails = ({ item }: { item: IListDetails }) => {
    const height = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        console.log(height);
    }, [height]);
    const handleView = () => {
        console.log("Should zoom")
        Animated.timing(height, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }
    return (
        <TouchableOpacity style={[styles.listDetails]}>
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
            <Button onPress={handleView} title="Zoom In" />
            <Text style={styles.subtitle}>{item.title}</Text>
            <Text>{item.userId}</Text>
            <Text>{item.id}</Text>
            <Text>{item.completed ? "True" : "False"}</Text>
        </TouchableOpacity>
    )
};

const renderDetails = ({ item }: { item: IListDetails }) => (
    <ListDetails item={item} />
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