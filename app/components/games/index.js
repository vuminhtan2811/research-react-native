import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {getGames} from '../../store/actions/games_action';
import {Dimensions} from 'react-native';

class GameComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getGames());
  }

  rennderGameArticles(list) {
    return list.games
      ? list.games.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.gameContainer}
              onPress={() =>
                this.props.navigation.navigate('Article', {...item})
              }>
              <View style={styles.boxText}>
                <Image
                  source={{uri: `${item.awayData.logo}`}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.count}>
                  {item.awayData.loss} - {item.awayData.wins}
                </Text>
              </View>
              <View style={styles.boxText}>
                <Text style={styles.teamName}>
                  {item.awayData.name} - {item.localData.name}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.boxText}>
                <Image
                  source={{uri: `${item.localData.logo}`}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.count}>
                  {item.localData.loss} - {item.localData.wins}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      : null;
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, flexWrap: 'nowrap', flexDirection: 'column'}}>
          {this.rennderGameArticles(this.props.Games)}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 4,
    backgroundColor: '#FFF',
    shadowColor: '#dddddd',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.8,
    elevation: 2,
  },
  boxText: {
    width: '33.3%',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: 80,
  },
  count: {
    fontSize: 11,
    color: '#000',
    opacity: 0.5,
    textAlign: 'center',
  },
  teamName: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  time: {
    fontSize: 13,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    Games: state.Games,
  };
}
export default connect(mapStateToProps)(GameComponent);
