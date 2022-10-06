import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import Slider from './Slider';
import Container from './Container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1B1D',
    // padding: PADDING,
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: 'white',
    top: 40,
    position: 'absolute',
  },
});

const AlarmTime = () => {
  const start = useSharedValue(1);
  const end = useSharedValue(1.2 * Math.PI);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Wake Up</Text>
      <Container start={start} end={end}>
        <Slider start={start} end={end} />
      </Container>
    </View>
  );
};

export default AlarmTime;
