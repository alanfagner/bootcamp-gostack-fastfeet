import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Label } from '~/components/Form';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Delivery from '~/pages/Delivery';

import NewProblem from '~/pages/Problem/New';
import ListProblem from '~/pages/Problem/List';

import Confirm from '~/pages/Confirm';

import Profile from '~/pages/Profile';

const SignScreen = createStackNavigator();
const PrivateScreen = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function SignInNavigation() {
  return (
    <SignScreen.Navigator screenOptions={{ headerShown: false }}>
      <SignScreen.Screen name="SignIn" component={SignIn} />
    </SignScreen.Navigator>
  );
}

function PrivateNavigation() {
  const theme = useContext(ThemeContext);

  return (
    <PrivateScreen.Navigator>
      <PrivateScreen.Screen
        options={{ headerShown: false }}
        name="DashBoard"
        component={Dashboard}
      />
      <PrivateScreen.Screen
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0,
          },
          title: (
            <Label fontSize="big" color="white" bold>
              Detalhes da encomenda
            </Label>
          ),
        }}
        name="Delivery"
        component={Delivery}
      />

      <PrivateScreen.Screen
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0,
          },
          title: (
            <Label fontSize="big" color="white" bold>
              Informar problema
            </Label>
          ),
        }}
        name="Problem"
        component={NewProblem}
      />

      <PrivateScreen.Screen
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0,
          },
          title: (
            <Label fontSize="big" color="white" bold>
              Visuazliar problemas
            </Label>
          ),
        }}
        name="ListProblem"
        component={ListProblem}
      />

      <PrivateScreen.Screen
        options={{
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0,
          },
          title: (
            <Label fontSize="big" color="white" bold>
              Confirmar entrega
            </Label>
          ),
        }}
        name="CofirmDelivery"
        component={Confirm}
      />
    </PrivateScreen.Navigator>
  );
}

export default function Routes() {
  const { auth } = useSelector(state => state);

  if (auth.signed) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          activeColor="#7d40e7"
          barStyle={{ backgroundColor: '#fff' }}
        >
          <Tab.Screen
            name="DashBoard"
            component={PrivateNavigation}
            options={{
              title: 'Entregas',
              tabBarIcon: ({ color }) => (
                <Icon name="reorder" color={color} size={25} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'Meu Perfil',
              tabBarIcon: ({ color }) => (
                <Icon name="account-circle" color={color} size={25} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <SignInNavigation />
    </NavigationContainer>
  );
}
