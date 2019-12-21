import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LogoComponent from './authLogo';
import AuthForm from './authForm';

import {autoSignIn} from '../../store/actions/user_action';

import {setTokens, getTokens} from '../../utils/storage';

class AuthComponent extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    getTokens(value => {
      if (value[0][1] === null) {
        this.setState({
          loading: false,
        });
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({
              loading: false,
            });
          } else {
            setTokens(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }
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

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({autoSignIn}, dispatch);
}
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
