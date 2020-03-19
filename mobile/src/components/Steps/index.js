import React from 'react';
import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';

// import { Container } from './styles';

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7D40E7',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7D40E7',
  stepStrokeUnFinishedColor: '#7D40E7',
  separatorFinishedColor: '#7D40E7',
  separatorUnFinishedColor: '#7D40E7',
  stepIndicatorFinishedColor: '#7D40E7',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#7D40E7',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: '#7D40E7',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#7D40E7',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#999999',
};

export default function Steps({ currentStep }) {
  return (
    <View style={{ flex: 1, marginVertical: 20 }}>
      <StepIndicator
        customStyles={customStyles}
        stepCount={3}
        labels={['Aguardando\nretirada', 'Retirada', 'Entregue']}
        currentPosition={currentStep}
      />
    </View>
  );
}

Steps.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
