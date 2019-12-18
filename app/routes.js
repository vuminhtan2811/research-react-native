import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from './components/auth';
import News from './components/news';
import Games from './components/games';

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
  },
  {headerMode: 'none'},
);

const AppStack = createBottomTabNavigator({
  News: News,
  Games: Games,
});

export const RootNavigation = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
      },
      {
        initialRouteName: 'Auth',
      },
    ),
  );
};
