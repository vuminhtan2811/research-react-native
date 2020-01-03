import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

import {autoSignIn} from '../../store/actions/user_action';
import {getTokens, setTokens} from '../../utils/storage';

class GameArticleComponent extends Component {
  state = {
    loading: true,
    isAuthenticated: false,
  };

  componentDidMount() {
    getTokens(value => {
      if (value[0][1] === null) {
        this.manageState(false, false);
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.manageState(false, false);
          } else {
            setTokens(this.props.User.auth, () =>
              this.manageState(false, true),
            );
          }
        });
      }
    });
  }

  manageState(loading, isAuthenticated) {
    this.setState({
      loading,
      isAuthenticated,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      if (this.state.isAuthenticated) {
        return (
          <Video
            source={{uri: `https://www.w3schools.com/html/mov_bbb.mp4`}}
            style={styles.video}
          />
        );
      } else {
        return (
          <View style={styles.notAuth}>
            <Icon name="md-sad" style={styles.notAuthIcon} size={80} />
            <View style={styles.notAuthText}>
              <Text>Sorry, you are not logged in, please </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Auth')}>
                <Text style={styles.button}>login / register</Text>
              </TouchableOpacity>
              <Text> to view this video</Text>
            </View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAuthText: {
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  button: {
    color: 'blue',
  },
  video: {
    height: 300,
    width: '100%',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameArticleComponent);
