import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

class LogoComponent extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('../../assets/images/codersx.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 257,
    height: 154,
  },
});

export default LogoComponent;
