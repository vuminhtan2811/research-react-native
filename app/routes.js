import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from './components/auth';
import News from './components/news';
import Games from './components/games';
import NewArticle from './components/news/article';
import GameArticle from './components/games/article';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import LogoComponent from './utils/logo';

const headerConfig = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerTitle: <LogoComponent />,
    headerTintColor: '#d32f2f',
  },
};
const NewsStack = createStackNavigator(
  {
    News: News,
    Article: NewArticle,
  },
  headerConfig,
);

const GameStack = createStackNavigator(
  {
    Games: Games,
    Article: GameArticle,
  },
  headerConfig,
);

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn,
  },
  {headerMode: 'none'},
);

const AppStack = createBottomTabNavigator(
  {
    News: NewsStack,
    Games: GameStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'News':
            iconName = 'ios-basketball';
            break;
          case 'Games':
            iconName = 'md-tv';
            break;

          default:
            iconName = 'fill';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#d32f2f',
      inactiveTintColor: 'gray',
    },
  },
);

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
