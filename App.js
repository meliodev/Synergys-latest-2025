import { Component } from 'react';
import * as React from 'react';

import {
  Alert,
  LogBox,
  Platform,
  StyleSheet,
  Text
} from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// import codePush from 'react-native-code-push';

import AppToast from './src/components/global/AppToast';
import NetworkStatus from './src/NetworkStatus';
import RootController from './src/Navigation/DrawerNavigator';

//import firebase from './firebase';
import Store from './src/Store/configureStore';
import { fontsConfig } from './fontConfig';
import * as theme from './src/core/theme';
import MyStatusBar from './src/components/MyStatusBar';
import { LoadDialog } from './src/components';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

const DetailsScreen = () => (
  <View style={styles.container}>
    <Text>Details Screen</Text>
  </View>
);

const AppDrawer = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Details" component={DetailsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen name="Drawer" component={AppDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;