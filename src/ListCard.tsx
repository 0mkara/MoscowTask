import React, { FunctionComponent } from 'react';
import {
    View,
    Text,
    TextStyle,
    ViewStyle,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";

interface ListCardProps {
    title: string;
    id: string;
}
interface Style {
    item: ViewStyle;
    title: TextStyle;
}
const styles = StyleSheet.create<Style>({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "blue",
    },
    title: {
        fontSize: 32
    },
})

interface ListDetailsData {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const DATA: ListDetailsData[] = [
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    },
];

const ListDetails = ({ item }: { item: ListDetailsData }) => (
    <TouchableOpacity>
        <Text>{item.title}</Text>
        <Text>{item.userId}</Text>
        <Text>{item.id}</Text>
        <Text>{item.completed ? "True" : "False" }</Text>
    </TouchableOpacity>
)

export const ListCard: FunctionComponent<ListCardProps> = ({ title }) => {
    const renderDetails = ({ item }: { item: ListDetailsData }) => (
        <ListDetails item={item} />
    );
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <FlatList renderItem={renderDetails} keyExtractor={item => JSON.stringify(item.id)} data={DATA} />
        </View>
    )
}