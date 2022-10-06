import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

import {absoluteDuration} from './Constants';

import TimeTag from './TimeTag';

const radToMin = rad => {
  'worklet';
  return (24 * 60 * rad) / (2 * Math.PI);
};

const getHoursMins = raw => {
  'worklet';
  const duration = Math.round(raw);
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return {hours, minutes};
};

export const formatTime = duration => {
  'worklet';
  const {hours, minutes} = getHoursMins(duration);
  return `${hours} hr ${minutes} min`;
};

const Container = ({start, end, children}) => {
  const duration = useDerivedValue(() => {
    const timeDuration = absoluteDuration(start.value, end.value);
    return formatTime(radToMin(timeDuration));
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <TimeTag theta={start} label="BEDTIME" icon="bed" />
        <TimeTag theta={end} label="WAKE UP" icon="bell" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  duration: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
});

export default Container;
