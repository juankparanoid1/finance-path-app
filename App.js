import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './app/screens/home/Home';
import Login from './app/screens/login/Login';
import Screens from './app/helpers/Screens';
import BootSplash from "react-native-bootsplash";
import TransactionsForm from './app/components/transactionsForm/TransactionsForm';

export default function App() {
  const RootStack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer onReady={() => {
        BootSplash.hide()
      }}>
        <RootStack.Navigator>
          <RootStack.Screen name={Screens.LOGIN} options={{ headerShown: false }} component={Login}></RootStack.Screen>
          <RootStack.Screen name={Screens.HOME} options={{ headerShown: false, gestureEnabled: false }} component={Home} />
          <RootStack.Screen name={Screens.ADDTRANSACTION} options={{ headerShown: false, gestureEnabled: false }} component={TransactionsForm} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
