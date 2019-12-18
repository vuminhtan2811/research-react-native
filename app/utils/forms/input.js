import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Picker} from 'react-native';

const Input = props => {
  let template = null;
  switch (props.type) {
    case 'textInput':
      template = (
        <TextInput {...props} style={[styles.input, props.overrideStyle]} />
      );
      break;
    default:
      return template;
  }

  return template;
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#787878',
    color: '#7ABB9C',
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
});
export default Input;
