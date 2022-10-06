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
    onStart: ({x, y}, ctx) => {
      if (checkRegion({x, y}, startPos.value, STROKE)) {
        ctx.region = Region.START;
        ctx.offset = start.value;
      } else if (checkRegion({x, y}, endPos.value, STROKE)) {
        ctx.region = Region.END;
        ctx.offset = end.value;
      } else {
        ctx.region = Region.MAIN;
        const {theta} = canvas2Polar({x, y}, CENTER);
        ctx.offset = theta;
      }
    },
    onActive: ({x, y}, ctx) => {
      const {theta} = canvas2Polar({x, y}, CENTER);
      const delta = theta - ctx.offset;
      if (ctx.region === Region.START || ctx.region === Region.MAIN) {
        start.value = formating(start.value + delta);
      }
      if (ctx.region === Region.END || ctx.region === Region.MAIN) {
        end.value = formating(end.value + delta);
      }
      ctx.offset = theta;
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
