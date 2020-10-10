import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { FunctionComponent, useRef, useEffect, useState } from 'react';
import {
    Text,
    TextStyle,
    ViewStyle,
    StyleSheet,
    FlatList,
    ImageStyle,
} from "react-native";
import { gestureHandlerRootHOC, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';


import { IListDetails } from "./types";

interface ListCardProps {
    title: string;
    id: string;
    tasks: IListDetails[];
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
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 32
    },
    listDetails: {
        // borderColor: "red",
        // borderWidth: 1,
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
        margin: 10,
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
        marginLeft: 5,
        marginRight: 5,
        maxWidth: 320
    }
})

const ListItem = ({ item }: { item: IListDetails }) => (
    <Card style={styles.listDetails}>
        <Card.Title title={`Card # ${item.id}`} />
        <Card.Content>
            <Paragraph>
                <Text>{item.title}</Text>
            </Paragraph>
        </Card.Content>
    </Card>
)

const renderDetails = ({ item }: { item: IListDetails }) => (
    <ListItem item={item} />
);
const ListCard: FunctionComponent<ListCardProps> = observer(({ title, tasks }) => {
    return (
        <Card>
            <Card.Title title={title} />
            <Card.Content style={{padding: 10}}>
                {
                    tasks &&
                    <FlatList horizontal={true} renderItem={renderDetails} keyExtractor={item => JSON.stringify(item.id)} data={tasks} />
                }
            </Card.Content>
        </Card>
    )
});

export default ListCard;