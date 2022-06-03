import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Dimensions} from 'react-native';
import LoadingView from './LoadingView';

const CameraView = () => {
  const [hasPermission, setHasPermission] = useState();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const getPermission = async () => {
      const status = await Camera.requestCameraPermission();

      setHasPermission(status === 'authorized');
    };

    getPermission();

    return () => {
      setIsActive(!isActive);
    };
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;

  const windowWidth = Dimensions.get('window').width;

  if (device == null) return <LoadingView />;
  return hasPermission ? (
    <View style={{width: windowWidth, height: 200}}>
      <Camera style={{flex: 1}} device={device} isActive={isActive} />
    </View>
  ) : (
    <></>
  );
};

export default CameraView;
