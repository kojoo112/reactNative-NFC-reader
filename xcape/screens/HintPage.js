import React from 'react';
import {Text, View} from 'react-native';
import ImageView from '../components/ImageView';

const HintPage = props => {
  const hint = props.route.params.hint;

  return (
    <View>
      {hint.component == 'ImageView' ? (
        <ImageView image={hint.image} />
      ) : (
        <Text>힌트가없습니다.</Text>
      )}
    </View>
  );
};

export default HintPage;
