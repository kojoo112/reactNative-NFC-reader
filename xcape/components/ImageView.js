import {StyleSheet, Dimensions, Image, ScrollView} from 'react-native';

import React, {useState, useEffect} from 'react';

const images = {
  image001: require('../assets/image/Page1.png'),
  image002: require('../assets/image/Page2.png'),
  image003: require('../assets/image/Page3.png'),
  image004: require('../assets/image/Page4.png'),
  image005: require('../assets/image/Page5.png'),
  image006: require('../assets/image/Page6.png'),
  image007: require('../assets/image/Page7.png'),
  image008: require('../assets/image/Page8.png'),
  image009: require('../assets/image/Page9.png'),
  image010: require('../assets/image/Page10.png'),
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageView = ({image}) => {
  const [ratio, setRatio] = useState(0);
  const {width, height} = Image.resolveAssetSource(images[image]);

  useEffect(() => {
    setRatio(width / height);
  }, [image]);

  return (
    <ScrollView>
      <Image
        style={[
          ratio > 0.3
            ? styles.hintImage
            : {
                width: '100%',
                height: undefined,
                aspectRatio: ratio,
              },
        ]}
        resizeMode={'stretch'}
        source={images[image]}></Image>
    </ScrollView>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  hintImage: {
    width: windowWidth,
    height: windowHeight,
  },
});
