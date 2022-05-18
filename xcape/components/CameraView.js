import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Dimensions} from 'react-native';

const CameraView = () => {
  const [hasPermission, setHasPermission] = useState();

  useEffect(() => {
    const getPermission = async () => {
      const status = await Camera.requestCameraPermission();

      setHasPermission(status === 'authorized');
    };

    getPermission();
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;

  const windowWidth = Dimensions.get('window').width;

  return hasPermission ? (
    <View style={{width: 400, height: 200}}>
      <Camera style={{flex: 1}} device={device} isActive={true} />
    </View>
  ) : (
    <></>
  );
};

export default CameraView;
