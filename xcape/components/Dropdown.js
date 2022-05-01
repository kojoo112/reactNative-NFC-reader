import React from 'react';
import {Picker} from '@react-native-picker/picker';

const Dropdown = props => {
  const state = props.state;
  const action = props.action;
  const objectList = props.objectList;
  // console.log(action);
  return (
    <Picker
      style={{flex: 1}}
      // selectedValue={state}
      onValueChange={(value, index) => action(value)}>
      {Array.isArray(objectList)
        ? objectList.map((value, idx) => {
            return <Picker.Item label={value} value={value} key={idx} />;
          })
        : Object.entries(objectList)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((entrie, idx) => {
              return (
                <Picker.Item label={entrie[1]} value={entrie[0]} key={idx} />
              );
            })}
    </Picker>
  );
};

export default Dropdown;
