import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {interpolate} from 'react-native-reanimated';
const width = Dimensions.get('screen').width;
const SIZE = width * 0.9;
const TICK_INTERVAL = 1000;
const ClockAnim = () => {
  const [index, setIndex] = useState(new Animated.Value(0));
  const [tick, setTick] = useState(new Animated.Value(0));
  const [scales, setScales] = useState(
    [...Array(6).keys()].map(() => new Animated.Value(0)),
  );

  //   const [
  //     smallQuadranScale,
  //     mediumQuadranScale,
  //     bigQuadranScale,
  //     secondsScale,
  //     minutesScale,
  //     hoursScale,
  //   ] = scales;

  var _timer = 0;
  var _ticker = null;
  const _animate = () => {
    // const scaleTriggerAnimations = scales.map(animated => {
    //   return Animated.spring(animated, {
    //     toValue: 1,
    //     tension: 18,
    //     friction: 3,
    //     useNativeDriver: true,
    //   });
    // });

    // Animated.parallel([
    //   Animated.stagger(TICK_INTERVAL / scales.length, scaleTriggerAnimations),
    //   Animated.timing(index, {
    //     toValue: tick,
    //     duration: TICK_INTERVAL / 2,
    //     useNativeDriver: true,
    //   }),
    // ]).start();

    Animated.timing(index, {
      toValue: tick,
      duration: TICK_INTERVAL / 2,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const current = dayjs();
    const diff = current.endOf('day').diff(current, 'seconds');
    const oneDay = 24 * 60 * 60;
    _timer = oneDay - diff;
    setTick(_timer);
    // setIndex(_timer - 30);

    _animate();

    _ticker = setInterval(() => {
      _timer += 1;
      setTick(_timer);
    }, TICK_INTERVAL);

    return () => {
      clearInterval(_ticker);
      _ticker = null;
    };
  }, [tick]);

  const secondDegrees = Animated.multiply(index, 360 / 60);
  const interpolated = {
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  };
  const transformSeconds = {
    transform: [
      {rotate: secondDegrees.interpolate(interpolated)},
      //   {scale: secondsScale},
    ],
  };
  const rotateMinutes = Animated.divide(secondDegrees, new Animated.Value(60));
  const transformMinutes = {
    transform: [
      {rotate: rotateMinutes.interpolate(interpolated)},
      //   {scale: minutesScale},
    ],
  };
  const rotateHours = Animated.divide(rotateMinutes, new Animated.Value(12));
  const transformHours = {
    transform: [
      {rotate: rotateHours.interpolate(interpolated)},
      //   {scale: hoursScale},
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={[styles.bigQuadran]} />
      <View style={[styles.mediumQuadran]} />
      <View style={[styles.smallQuadran]} />
      <Animated.View style={[styles.mover, transformHours]}>
        <View style={[styles.hours]} />
      </Animated.View>
      <Animated.View style={[styles.mover, transformMinutes]}>
        <View style={[styles.minutes]} />
      </Animated.View>
      <Animated.View style={[styles.mover, transformSeconds]}>
        <View style={[styles.seconds]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mover: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '35%',
    marginTop: '15%',
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '45%',
    marginTop: '5%',
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: 'rgba(227,71,134,1)',
    height: '50%',
    width: 2,
    borderRadius: 2,
  },
  bigQuadran: {
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: 'rgba(200,200,200,0.2)',
    position: 'absolute',
  },
  mediumQuadran: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: 'rgba(200,200,200,0.4)',
    position: 'absolute',
  },
  smallQuadran: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(227,71,134,1)',
    position: 'absolute',
  },
});
export default ClockAnim;
