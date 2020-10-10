import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import {
    Text,
    TextStyle,
    ViewStyle,
    StyleSheet,
    FlatList,
    ImageStyle,
} from "react-native";
import { Card, Paragraph } from 'react-native-paper';
import { IListDetails } from "./types";

interface ListCardProps {
    title: string;
    id: string;
    tasks: IListDetails[];
}
interface Style {
    listCard: ViewStyle;
    title: TextStyle;
    listDetails: ViewStyle;
    listTitle: TextStyle;
    listImage: ImageStyle;
    subtitle: TextStyle;
    gestureView: ViewStyle;
}
const styles = StyleSheet.create<Style>({
    listCard: {
        padding: 5,
        margin: 1
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
});

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
export const ListCard: FunctionComponent<ListCardProps> = observer(({ title, tasks }) => {
    return (
        <Card style={styles.listCard}>
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