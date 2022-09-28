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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
  return (
    <NavigationContainer>
      <View style={{height: 50, backgroundColor: 'gray'}} />

      <MyTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
