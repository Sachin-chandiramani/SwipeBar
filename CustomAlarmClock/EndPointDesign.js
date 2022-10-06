import React, {ComponentProps} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

import {STROKE} from './Constants';

const EndPointDesign = ({position, icon}) => {
  const style = useAnimatedStyle(() => {
    const {x, y} = position.value;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: STROKE,
      height: STROKE,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{translateX: x - STROKE / 2}, {translateY: y - STROKE / 2}],
    };
  });
  return (
    <Animated.View style={style}>
      <Icon name={icon} color="#000" size={20} />
    </Animated.View>
  );
};

export default EndPointDesign;
