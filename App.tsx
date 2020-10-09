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
import ListCard from "./src/ListCard";
import { CardData, ICardData } from './src/types';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const [cardData] = useState(() => new CardData());

  useEffect(() => {
    cardData.loadTasks()
  }, [cardData]);

  const renderItem = ({ item }: { item: ICardData }) => {
    return (
      <ListCard title={item.title} id={item.id} cardData={cardData} />
    )
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {
          cardData.data &&
          <FlatList
            horizontal={true}
            data={cardData.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        }
      </SafeAreaView>
    </>
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
