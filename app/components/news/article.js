import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import moment from 'moment';
class NewArticleComponent extends Component {
  formatText(str) {
    let value = '';
    value = str.replace(/<p>/g, '').replace(/<\/p>/g, '');
    return value;
  }
  render() {
    const {params} = this.props.navigation.state;
    console.log(params);
    return (
      <ScrollView>
        <Image
          source={{uri: `${params.image}`}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.boxText}>
          <Text style={styles.title}>{params.title}</Text>
          <Text style={styles.time}>
            {params.team} - Posted at{' '}
            {moment(params.date).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
          <Text style={styles.desc}>{this.formatText(params.content)}</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  image: {
    height: 250,
    width: null,
  },
  boxText: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  title: {
    fontSize: 20,
  },
  time: {
    fontSize: 11,
    color: '#888',
  },
  desc: {
    paddingTop: 15,
  },
});
export default NewArticleComponent;
