import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import LogoComponent from './authLogo';
import AuthForm from './authForm';
class AuthComponent extends Component {
  state = {
    loading: false,
  };

  goNext = () => {
    this.props.navigation.navigate('App');
  };

  render() {
    const {loading} = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.logo]}>
          <LogoComponent />
          <AuthForm goNext={this.goNext} />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
});
export default AuthComponent;
