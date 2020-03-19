import React, { useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { Image, Alert } from 'react-native';
import {
  NavigationRouteContext,
  NavigationContext,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { Background, Button, Label } from '~/components/Form';

import { Container, ButtonCamera, ImageContainer } from './styles';

export default function Confirm() {
  const cameraRef = useRef();
  const { user } = useSelector(state => state);
  const route = useContext(NavigationRouteContext);
  const navigation = useContext(NavigationContext);

  const [imageCaptured, setImageCaptured] = useState(null);
  const { delivery } = route.params;

  async function handleTakePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageCaptured(data);
    }
  }

  async function handleSend() {
    if (!imageCaptured) {
      Alert.alert('Foto', 'Registre a foto da assinatura.');
      return;
    }

    try {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('signature', {
        uri: imageCaptured.uri,
        name: 'signature-captured.jpg',
        type: 'image/jpg',
      });

      await api.put(
        `/deliverymans/${user.profile.id}/deliveries/${delivery.id}/end`,
        data
      );
      navigation.goBack();
      Alert.alert('Assinatura enviada com sucesso.');
    } catch (error) {
      Alert.alert('Erro ao enviar a assinatura');
    }
  }

  return (
    <Background>
      <Container>
        {imageCaptured ? (
          <ImageContainer>
            <Image
              style={{ width: '100%', height: '80%', marginBottom: 30 }}
              source={{ uri: `data:image/gif;base64,${imageCaptured.base64}` }}
            />
            <Button red onPress={() => setImageCaptured(null)}>
              <Label bold color="white">
                Capturar outra image
              </Label>
            </Button>
          </ImageContainer>
        ) : (
          <RNCamera
            ref={cameraRef}
            style={{ width: '100%', height: '80%', marginBottom: 30 }}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            <ButtonCamera onPress={handleTakePicture}>
              <Icon name="camera-alt" size={30} />
            </ButtonCamera>
          </RNCamera>
        )}
        <Button primary onPress={handleSend}>
          <Label bold color="white">
            Enviar
          </Label>
        </Button>
      </Container>
    </Background>
  );
}
