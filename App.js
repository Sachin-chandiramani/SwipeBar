/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabBar from './CustomTopTabBar';
import TicTacToe from './TicTacToe';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DragDrop from './DragDrop';
import DonutChart from './DonutChart';
import ClockAnim from './ClockAnim';
import CustomAlarmClock from './CustomAlarmClock';
const Tab = createMaterialTopTabNavigator();

const dogImagesContainer = dogImages => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'gray',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
    {dogImages.map(item => (
      <Image
        source={{uri: item}}
        style={{height: 300, width: '43%', borderRadius: 15, margin: 10}}
      />
    ))}
  </View>
);

const LabradorScreen = () => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breed/labrador/images')
      .then(response => response.json())
      .then(data => setDogImages(data.message));
  }, []);

  return dogImages.length > 0 ? dogImagesContainer(dogImages) : <View />;
};
const PugScreen = () => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breed/pug/images')
      .then(response => response.json())
      .then(data => setDogImages(data.message));
  }, []);

  return dogImages.length > 0 ? dogImagesContainer(dogImages) : <View />;
};
const ProfileScreen = () => <View style={{flex: 1, backgroundColor: 'gray'}} />;
const ChatScreen = () => <View style={{flex: 1, backgroundColor: 'gray'}} />;

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Labrador" component={LabradorScreen} />
      <Tab.Screen name="Pug" component={PugScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  const drag = (x, y) => {
    console.log('Draging', x, y);
  };
  const drop = (x, y) => {
    console.log('Sropping', x, y);
  };
  const renderDragDrop = () => (
    <SafeAreaView style={styles.screen}>
      <DragDrop>
        <View style={styles.ball} />
      </DragDrop>

      <View style={styles.pit}>
        <Text style={styles.text}>PIT</Text>
      </View>
    </SafeAreaView>
  );
  return (
    // <NavigationContainer>
    //   <View style={{height: 50, backgroundColor: 'gray'}} />

    //   <MyTabs />
    // </NavigationContainer>
    // <SafeAreaView style={{flex: 1}}>
    //   <DonutChart />
    // </SafeAreaView>
    // <ClockAnim />
    <CustomAlarmClock />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  pit: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default App;
