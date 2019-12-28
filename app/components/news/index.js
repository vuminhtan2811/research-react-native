import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';

import {getNews} from '../../store/actions/news_action';

class NewsComponent extends Component {
  componentDidMount() {
    this.props.dispatch(getNews());
  }

  gotoDetail(item){
    this.props.navigation.navigate("Article",{...item})
  }

  renderArticles(news) {
    return news.articles
      ? news.articles.map((item, i) => {
          return (
            <TouchableOpacity key={i} style={styles.cardContainer} onPress={() => this.gotoDetail(item)}>
              <Image
                source={{uri: `${item.image}`}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardBottom}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardDesc}>
                  <Text style={styles.cardText}>{item.team} - </Text>
                  <Text style={styles.cardText}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      : null;
  }

  render() {
    return <ScrollView>{this.renderArticles(this.props.News)}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 4,
    shadowColor: '#dddddd',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.8,
    elevation: 2,
  },
  cardImage: {
    height: 200,
    width: null,
  },
  cardBottom: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
  },
  cardDesc: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
});

function mapStateToProps(state) {
  return {
    News: state.News,
  };
}

export default connect(mapStateToProps)(NewsComponent);
