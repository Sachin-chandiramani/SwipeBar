import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

var grid = [
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
];

const TicTacToe = () => {
  const [winBy, setWinBy] = useState('');
  const [crossTurn, setCrossTurn] = useState(true);
  const winGameLogic = () => {
    if (grid[0] != 'gray' && grid[0] == grid[1] && grid[1] == grid[2]) {
      return grid[0];
    } else if (grid[3] != 'gray' && grid[3] == grid[4] && grid[4] == grid[5]) {
      return grid[3];
    } else if (grid[6] != 'gray' && grid[6] == grid[7] && grid[7] == grid[8]) {
      return grid[6];
    } else if (grid[0] != 'gray' && grid[0] == grid[3] && grid[3] == grid[6]) {
      return grid[0];
    } else if (grid[1] != 'gray' && grid[1] == grid[4] && grid[4] == grid[7]) {
      return grid[1];
    } else if (grid[2] != 'gray' && grid[2] == grid[5] && grid[5] == grid[8]) {
      return grid[2];
    } else if (grid[0] != 'gray' && grid[0] == grid[4] && grid[4] == grid[8]) {
      return grid[0];
    } else if (grid[2] != 'gray' && grid[2] == grid[4] && grid[4] == grid[6]) {
      return grid[2];
    } else {
      return ' ';
    }
  };

  const selectColor = itemNum => {
    if (grid[itemNum] == 'circle') {
      return 'red';
    } else if (grid[itemNum] == 'cross') {
      return 'blue';
    }
  };

  const markItem = num => {
    if (grid[num] == 'gray' && winGameLogic() == ' ') {
      if (crossTurn) {
        grid[num] = 'cross';
      } else grid[num] = 'circle';

      setCrossTurn(!crossTurn);
      if (winGameLogic() != ' ') alert(winGameLogic() + 'wins');
    }
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', height: 700}}>
      <Text>TicTacToe</Text>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(0)}>
          <Text style={{color: selectColor(0)}}>{grid[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(1)}>
          <Text style={{color: selectColor(1)}}>{grid[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(2)}>
          <Text style={{color: selectColor(2)}}>{grid[2]}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(3)}>
          <Text style={{color: selectColor(3)}}>{grid[3]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(4)}>
          <Text style={{color: selectColor(4)}}>{grid[4]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(5)}>
          <Text style={{color: selectColor(5)}}>{grid[5]}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(6)}>
          <Text style={{color: selectColor(6)}}>{grid[6]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(7)}>
          <Text style={{color: selectColor(7)}}>{grid[7]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: 70, width: 70, borderWidth: 1}}
          onPress={() => markItem(8)}>
          <Text style={{color: selectColor(8)}}>{grid[8]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TicTacToe;
