import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Dimensions} from 'react-native';

const images = {
  Page1: require('../assets/image/Page1.png'),
  Page2: require('../assets/image/Page2.png'),
  Page3: require('../assets/image/Page3.png'),
  Page4: require('../assets/image/Page4.png'),
  Page5: require('../assets/image/Page5.png'),
  Page6: require('../assets/image/Page6.png'),
  Page7: require('../assets/image/Page7.png'),
  Page8: require('../assets/image/Page8.png'),
  Page9: require('../assets/image/Page9.png'),
  Page10: require('../assets/image/Page10.png'),
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HintPage = props => {
  const [scrollFlag, setScrollFlag] = useState(true);
  const [ratio, setRatio] = useState(0);

  const imgNum = props.route.params.pageNum;
  const {width, height} = Image.resolveAssetSource(images[imgNum]);

  useEffect(() => {
    if (images[imgNum] === 10) {
      setScrollFlag(false);
    } else {
      setScrollFlag(true);
    }
    setRatio(width / height);
  });

  return (
    <ScrollView contentContainerStyle={{}}>
      <Image
        style={[
          scrollFlag
            ? styles.hintImage
            : {
                width: '100%',
                height: undefined,
                aspectRatio: ratio,
              },
        ]}
        resizeMode={'stretch'}
        source={images[imgNum]}></Image>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hintImage: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default HintPage;
