import React from 'react';
import {Picker} from '@react-native-picker/picker';

const Dropdown = props => {
  const state = props.state;
  const setState = props.setState;
  const objectList = props.objectList;

  return (
    <Picker
      style={{flex: 1}}
      selectedValue={state}
      onValueChange={(value, index) => setState(value)}>
      {Object.entries(objectList)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((entrie, idx) => {
          return <Picker.Item label={entrie[1]} value={entrie[0]} key={idx} />;
        })}
    </Picker>
  );
};

export default Dropdown;
