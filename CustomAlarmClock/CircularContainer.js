import React from 'react';
import {polar2Canvas} from 'react-native-redash';
import {Circle, Line, G} from 'react-native-svg';

import {CENTER, PADDING, R, SIZE, STROKE} from './Constants';

const LINES = 50;
const spacing = (2 * Math.PI) / LINES;

const CircularContainer = () => {
  return (
    <>
      <Circle
        strokeWidth={STROKE}
        stroke="black"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
      />
      <G mask="#mask">
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={R + PADDING} fill="orange" />
        {new Array(LINES).fill(0).map((_, i) => {
          const theta = spacing * i;
          const startPoint = polar2Canvas(
            {theta, radius: R - PADDING / 4},
            CENTER,
          );
          const endPoint = polar2Canvas(
            {theta, radius: R + PADDING / 4},
            CENTER,
          );
          return (
            <Line
              stroke="gray"
              strokeWidth={2}
              strokeLinecap="round"
              key={i}
              x1={startPoint.x}
              y1={startPoint.y}
              x2={endPoint.x}
              y2={endPoint.y}
            />
          );
        })}
      </G>
      {new Array(24).fill(0).map((_, i) => {
        const theta = (i * (2 * Math.PI)) / 24;
        const startPoint = polar2Canvas(
          {theta, radius: R - 2 * PADDING},
          CENTER,
        );
        const endPoint = polar2Canvas(
          {theta, radius: R - (3 * PADDING) / 2},
          CENTER,
        );
        return (
          <React.Fragment key={i}>
            <Line
              stroke="#646367"
              strokeWidth={2}
              strokeLinecap="round"
              x1={startPoint.x}
              y1={startPoint.y}
              x2={endPoint.x}
              y2={endPoint.y}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CircularContainer;
