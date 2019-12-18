import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class NewsComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> News Component </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NewsComponent;
