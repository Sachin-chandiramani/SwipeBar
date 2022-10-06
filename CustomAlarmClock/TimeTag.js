import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDerivedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

const getHoursMins = raw => {
  'worklet';
  const duration = Math.round(raw);
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return {hours, minutes};
};

const formatTime = duration => {
  'worklet';
  const {hours, minutes} = getHoursMins(duration);
  return `${('' + hours).padStart(2, '0')}:${('' + minutes).padStart(2, '0')}`;
};

const TimeTag = ({theta, label, icon}) => {
  const time = useDerivedValue(() => {
    const minutes = (24 * 60 * theta.value) / (2 * Math.PI);
    return formatTime(minutes);
  });
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{color: '#fff'}}>
        <Icon name={icon} size={12} />
        <Text style={styles.label}>{' ' + label}</Text>
      </Text>
      <ReText style={styles.time} text={time} />
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TimeTag;
