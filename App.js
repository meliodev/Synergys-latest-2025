import * as React from 'react';
import { Alert, LogBox, Platform, StyleSheet, Text, View } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
// import SplashScreen from 'react-native-splash-screen';
//import codePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { enableScreens } from 'react-native-screens';
enableScreens();


import AppToast from './src/components/global/AppToast';
import NetworkStatus from './src/NetworkStatus';
import RootController from './src/Navigation/DrawerNavigator';

// import firebase from './src/firebase';
import Store from './src/Store/configureStore';
import { fontsConfig } from './fontConfig';
import * as theme from './src/core/theme';
import MyStatusBar from './src/components/MyStatusBar';

const paperTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontsConfig),
  colors: {
    primary: theme.colors.primary,
    accent: theme.colors.secondary,
    background: theme.colors.background,
    surface: theme.colors.surface,
    text: theme.colors.secondary,
    disabled: theme.colors.gray_medium,
    placeholder: theme.colors.gray_dark,
    backdrop: theme.colors.white,
  },
};

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const TestComponent = () => (
  <View style={styles.container}>
    <Text>Test Component</Text>
  </View>
);


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


class App extends React.Component {
  async componentDidMount() {
    // SplashScreen.hide();

    // Notification channels
    await notifee.createChannel({
      id: 'projects',
      name: 'projects',
      lights: false,
      vibration: true,
      importance: AndroidImportance.HIGH,
    });

    this.foregroundMessages = firebase.messaging().onMessage(this.onForegroundMessageReceived);
  }

  async onForegroundMessageReceived(message) {
    console.log("notification received on foreground...");
    try {
      if (Platform.OS === 'ios') {
        delete message.data?.message;
      }
      await notifee.displayNotification(JSON.parse(message.data.notifee));
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    this.foregroundMessages && this.foregroundMessages();
  }

  render() {
  const persistor = persistStore(Store);

    return (
      <Provider store={Store}>
         <PersistGate persistor={persistor}>
          <PaperProvider theme={paperTheme}>
            <MenuProvider>
              <MyStatusBar>
                <NetworkStatus> 
                  <NavigationContainer>
                  <Drawer.Navigator initialRouteName="Home">
                      <Drawer.Screen name="Home" component={HomeScreen} />
                      <Drawer.Screen name="Details" component={DetailsScreen} />
                      <Drawer.Screen name="Test" component={TestComponent} />
                    </Drawer.Navigator>
                  </NavigationContainer>
                 <AppToast />
                </NetworkStatus>
               </MyStatusBar>
            </MenuProvider>
          </PaperProvider>
        </PersistGate>
      </Provider> 
    );
  }
}

LogBox.ignoreAllLogs(true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeviewArea: {
    flex: 1,
  },
});

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

//export default codePush(codePushOptions)(App);
export default App;