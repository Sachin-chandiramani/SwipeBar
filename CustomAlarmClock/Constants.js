import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
export const PADDING = 34;
export const SIZE = width - 68;
export const STROKE = 50;
export const R = (SIZE - STROKE) / 2;
export const CENTER = {x: SIZE / 2, y: SIZE / 2};

export const absoluteDuration = (start, end) => {
  'worklet';
  return start > end ? end + (2 * Math.PI - start) : end - start;
};
