import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowToRight, faInfo, faNewspaper, faVials } from '@fortawesome/free-solid-svg-icons';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const hideHeader = { headerShown: false };

function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
    </View>
  );
}

function Dashboard() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
    </View>
  );
}

function AboutUs() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>About Us</Text>
    </View>
  );
}

function ListNews() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>List News</Text>
    </View>
  );
}

function CreateSimulation() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create Simulation</Text>
    </View>
  );
}

const DashboardStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen name="Dashboard" component={Dashboard} options={hideHeader} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={hideHeader} />
  </Stack.Navigator>
);

const GuestTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Auth"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Auth') {
          iconName = faArrowToRight;
        } else if (route.name === 'Simulation') {
          iconName = faVials;
        } else if (route.name === 'AboutUs') {
          iconName = faInfo;
        } else if (route.name === 'News') {
          iconName = faNewspaper;
        }
        return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Auth" component={AuthStack} />
    <Tab.Screen name="Simulation" component={CreateSimulation} />
    <Tab.Screen name="AboutUs" component={AboutUs} />
    <Tab.Screen name="News" component={ListNews} />
  </Tab.Navigator>
);

export { DashboardStack, AuthStack, GuestTabNavigator as GuestTab };