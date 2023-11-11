import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './app/screens/home/Home';
import Login from './app/screens/login/Login';
import Screens from './app/helpers/Screens';
import BootSplash from "react-native-bootsplash";
import auth from '@react-native-firebase/auth';
import SignIn from './app/screens/signin/SignIn';
import AddAccount from './app/screens/addaccount/AddAccount';
import AddCategories from './app/screens/addcategories/AddCategories';

export default function App() {
  const RootStack = createNativeStackNavigator();


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    console.log('user ', user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer onReady={() => {
        BootSplash.hide()
      }}>
        <RootStack.Navigator initialRouteName={user ? Screens.HOME : Screens.LOGIN}>
          {
            (user) ?
              <>
                <RootStack.Screen name={Screens.HOME} options={{ headerShown: false, gestureEnabled: false }} component={Home} />
                <RootStack.Screen name={Screens.ADDACCOUNT} options={{
                  headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center',
                  headerTitle: 'Agregar Cuenta'
                }} component={AddAccount} />
                <RootStack.Screen name={Screens.ADDCATEGORIES} options={{
                  headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center',
                  headerTitle: 'Agregar Categorias'
                }} component={AddCategories} />
              </>
              :
              <>
                <RootStack.Screen name={Screens.LOGIN} options={{ headerShown: false }} component={Login}></RootStack.Screen>
                <RootStack.Screen name={Screens.SIGNIN} options={{ headerShown: false }} component={SignIn}></RootStack.Screen>
              </>
          }
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
