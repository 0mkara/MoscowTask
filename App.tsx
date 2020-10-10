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
import { ICardData, IListDetails } from './src/types';

declare const global: { HermesInternal: null | {} };

interface IListItem {
  cardInfo: ICardData;
  tasks: IListDetails[];
}

const App = () => {
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
