import React from 'react';
import {StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler} from 'react-native-reanimated';
import {canvas2Polar} from 'react-native-redash';

import {CENTER, STROKE} from './Constants';
import EndPointDesign from './EndPointDesign';

const checkRegion = (value, center, side) => {
  'worklet';
  const topLeft = {x: center.x - side / 2, y: center.y - side / 2};
  return (
    value.x >= topLeft.x &&
    value.y >= topLeft.y &&
    value.x <= topLeft.x + side &&
    value.y <= topLeft.y + side
  );
};

const formating = value => {
  'worklet';
  const rest = value % (2 * Math.PI);
  return rest > 0 ? rest : 2 * Math.PI + rest;
};

const Region = {
  START: 'START',
  END: 'END',
  MAIN: 'MAIN',
};

const Gesture = ({start, end, startPos, endPos}) => {
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({x, y}, context) => {
      if (checkRegion({x, y}, startPos.value, STROKE)) {
        context.region = Region.START;
        context.offset = start.value;
      } else if (checkRegion({x, y}, endPos.value, STROKE)) {
        context.region = Region.END;
        context.offset = end.value;
      } else {
        context.region = Region.MAIN;
        const {theta} = canvas2Polar({x, y}, CENTER);
        context.offset = theta;
      }
    },
    onActive: ({x, y}, context) => {
      const {theta} = canvas2Polar({x, y}, CENTER);
      const delta = theta - context.offset;
      if (context.region === Region.START || context.region === Region.MAIN) {
        start.value = formating(start.value + delta);
      }
      if (context.region === Region.END || context.region === Region.MAIN) {
        end.value = formating(end.value + delta);
      }
      context.offset = theta;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <EndPointDesign position={startPos} icon="bed" />
        <EndPointDesign position={endPos} icon="bell" />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Gesture;
