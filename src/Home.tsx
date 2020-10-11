import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
} from 'react-native';
import { useLocalObservable, Observer } from 'mobx-react-lite';
import { Provider as PaperProvider } from 'react-native-paper';

import { ListCard } from "./ListCard";
import { ICardData, IListDetails } from './types';

interface IListItem {
    cardInfo: ICardData;
    tasks: IListDetails[];
}

export const HomeScreen = () => {
    const [data, setData] = useState<IListItem[]>([]);
    const cardData = useLocalObservable(() => ({
        data: [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'First List',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Second List',
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Third List',
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d73',
                title: 'Fourth List',
            }
        ]
    }))
    const tasks = useLocalObservable((): { data: IListDetails[], setData: (data: IListDetails[]) => void, getData: () => IListDetails[] } => ({
        data: [],
        setData(data: IListDetails[]) {
            this.data = [...data];
        },
        getData(): IListDetails[] {
            return this.data.splice(0, 25);
        }
    }));
    const loadTasks = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks.setData(data);
    }

    useEffect(() => {
        loadTasks()
            .then(() => {
                const d = cardData.data.map((i): IListItem => ({
                    cardInfo: i,
                    tasks: tasks.getData()
                }));
                setData(d);
            })
    }, []);

    const renderItem = ({ item: { cardInfo, tasks } }: { item: IListItem }) => (
        <ListCard title={cardInfo.title} id={cardInfo.id} tasks={tasks} />
    );
    return (
        <Observer>
            {
                () => (
                    <>
                        <PaperProvider>
                            <SafeAreaView>
                                {
                                    data.length > 0 &&
                                    <FlatList
                                        horizontal={false}
                                        data={data}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.cardInfo.id}
                                    />
                                }
                            </SafeAreaView>
                        </PaperProvider>
                    </>
                )
            }
        </Observer>
    )
}