import React from 'react';
import {Picker} from '@react-native-picker/picker';

const Dropdown = ({selectValue, objectList, action}) => {
  if (!objectList) {
    return <Picker style={{flex: 1}}></Picker>;
  } else {
    return (
      <Picker
        style={{flex: 1}}
        selectedValue={selectValue}
        onValueChange={value => {
          action(value);
        }}>
        {Array.isArray(objectList)
          ? objectList.map((value, idx) => {
              return <Picker.Item label={value} value={value} key={idx} />;
            })
          : Object.entries(objectList)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map((entry, idx) => {
                return (
                  <Picker.Item label={entry[1]} value={entry[0]} key={idx} />
                );
              })}
      </Picker>
    );
  }
};

export default React.memo(Dropdown);
