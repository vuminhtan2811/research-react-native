import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {getGames} from '../../store/actions/games_action';
class GameComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getGames());
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Games Component </Text>
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

function mapStateToProps(state) {
  return {
    Games: state.Games,
  };
}
export default connect(mapStateToProps)(GameComponent);
