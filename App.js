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
import { getUser, saveUser } from './app/service/AuthService';
import AddGoals from './app/screens/addgoals/AddGoals';
import AddTransactions from './app/screens/addtransactions/AddTransactions';

export default function App() {
  const RootStack = createNativeStackNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  function onAuthStateChanged(user) {
    setUser(user);
    saveUserInfo(user);
    if (initializing) {
      setInitializing(false);
    }
    //console.log('user ', user);
  }

  const saveUserInfo = async (user) => {
    try {
      const userExists = await getUser();
      if (!userExists) {
        await saveUser(user);
      }
    } catch (error) {
      console.log(error)
    }
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
                <RootStack.Screen name={Screens.ADDGOALS} options={{
                  headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center',
                  headerTitle: 'Agregar metas'
                }} component={AddGoals} />
                  <RootStack.Screen name={Screens.ADDTRANSACTIONS} options={{
                  headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center',
                  headerTitle: 'Agregar transacciones'
                }} component={AddTransactions} />
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
