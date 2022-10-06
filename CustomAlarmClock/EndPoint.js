import React from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {Circle} from 'react-native-svg';

const r = 20;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const EndPoint = ({pos}) => {
  const animatedProps = useAnimatedProps(() => {
    const {x, y} = pos.value;
    return {
      cx: x,
      cy: y,
      r,
    };
  });
  return <AnimatedCircle animatedProps={animatedProps} fill="orange" />;
};

export default EndPoint;
