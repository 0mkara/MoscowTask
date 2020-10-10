/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useLocalObservable, Observer } from 'mobx-react-lite';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import ListCard from "./src/ListCard";
import { CardData, ICardData, IListDetails } from './src/types';

declare const global: { HermesInternal: null | {} };

interface IListItem {
  cardInfo: ICardData;
  tasks: IListDetails[];
}

const App = () => {
  const [data, setData] = useState<IListItem[]>([]);
  const [cardData] = useState(() => new CardData());
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
            <StatusBar barStyle="dark-content" />
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
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default App;
