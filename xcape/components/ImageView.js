import {StyleSheet, Dimensions, Image, View} from 'react-native';
import React, {useState, useEffect} from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageView = props => {
  const [ratio, setRatio] = useState(0);
  const [imageUrl, setImageUrl] = useState(props.url);

  const getImageSize = () => {
    Image.getSize(imageUrl, (width, height) => {
      setRatio(width / height);
    });
  };

  useEffect(() => {
    getImageSize();
  }, [imageUrl]);

  return (
    <View>
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
        source={{uri: imageUrl}}></Image>
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
