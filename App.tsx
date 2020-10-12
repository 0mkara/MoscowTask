/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from "./src/Home";
import { ZoomScreen } from "./src/Zoom";
import { GestureScreen } from "./src/Gesture";

declare const global: { HermesInternal: null | {} };

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Animation Task">
          <Drawer.Screen name="List Task" component={HomeScreen} />
          <Drawer.Screen name="Animation Task" component={ZoomScreen} />
          <Drawer.Screen name="Gesture Task" component={GestureScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
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
