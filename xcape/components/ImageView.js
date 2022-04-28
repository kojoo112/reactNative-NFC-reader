import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

import React, {useState, useEffect} from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const testImg = require('../assets/image/Page1.png');

const ImageView = url => {
  const [ratio, setRatio] = useState(0);
  const [imageUrl, setImageUrl] = useState(url.url);

  const imageSize = () => {
    Image.getSize(imageUrl, (width, height) => {
      return width / height;
      // setRatio(width / height);
    });
  };
  // useEffect(() => {
  //   setRatio(width / height);
  // }, [imageUrl]);

  return (
    <View>
      <Image
        style={[
          ratio > 0.3
            ? styles.hintImage
            : {
                width: '100%',
                height: undefined,
                aspectRatio: imageSize(),
              },
        ]}
        resizeMode={'stretch'}
        uri={imageUrl}></Image>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  hintImage: {
    width: windowWidth,
    height: windowHeight,
  },
});
