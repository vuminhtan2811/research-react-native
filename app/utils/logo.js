import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>X</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: '#fff',
    height: 50,
    width: 50,
    fontSize: 25,
    fontWeight: '400',
    borderRadius: 50,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#d32f2f',
    lineHeight: 45,
  },
});
