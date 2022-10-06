import React from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import Svg, {Defs, Mask, Path} from 'react-native-svg';

import {SIZE, R, CENTER, absoluteDuration} from './Constants';
import EndPoint from './EndPoint';
import Gesture from './Gesture';
import CircularContainer from './CircularContainer';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Slider = ({start, end}) => {
  const startPos = useDerivedValue(() =>
    polar2Canvas({theta: start.value, radius: R}, CENTER),
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({theta: end.value, radius: R}, CENTER),
  );
  const partialCircle = (x, y, bigger = false, areaCover = false) => {
    'worklet';
    return `A ${R} ${R} 0 ${bigger ? '1' : '0'} ${
      areaCover ? '1' : '0'
    } ${x} ${y}`;
  };
  const animatedProps = useAnimatedProps(() => {
    const startPoint = startPos.value;
    const endPoint = endPos.value;
    const duration = absoluteDuration(start.value, end.value);
    return {
      d: `M ${startPoint.x} ${startPoint.y} ${partialCircle(
        endPoint.x,
        endPoint.y,
        duration > Math.PI,
      )}`,
    };
  });
  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              stroke="orange"
              strokeWidth={40}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <CircularContainer />
        <EndPoint pos={startPos} />
        <EndPoint pos={endPos} />
      </Svg>
      <Gesture start={start} end={end} startPos={startPos} endPos={endPos} />
    </View>
  );
};

export default Slider;
