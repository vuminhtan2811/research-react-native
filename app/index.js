import React, {Component} from 'react';
import {RootNavigation} from './routes';
class App extends Component {
  render() {
    const Nav = RootNavigation();
    console.disableYellowBox = true;
    return <Nav />;
  }
}

export default App;
