import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import styleLogin from './Style'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginForm = () => {
    const [displayPassword, setDisplayPassword] = useState(true);

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '1061120463287-uegci7t513fv8p5f7as1p4mmco6gebci.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { accessToken, idToken } = await GoogleSignin.signIn();
            setloggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
            navigation.navigate(Screens.HOME)
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(error);
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView style={styleLogin.mainContainer} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styleLogin.container}>
                <View style={styleLogin.imageContainer}>
                    <Image style={styleLogin.img} source={require('../../src/images/logo_transparent.png')}></Image>
                </View>
                <View style={styleLogin.formContainer}>
                    <View style={styleLogin.inputContainer}>
                        <Text>Usuario</Text>
                        <TextInput style={styleLogin.input}></TextInput>
                    </View>
                    <View style={styleLogin.inputContainer}>
                        <Text>Contraseña</Text>
                        <View style={styleLogin.passwordContainer}>
                            <TextInput style={styleLogin.input} secureTextEntry={displayPassword}></TextInput>
                            <TouchableOpacity style={styleLogin.icon} onPress={() => setDisplayPassword(!displayPassword)}>
                                <Icon name={displayPassword ? 'eye' : 'eye-off'} size={30} color="#000" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styleLogin.btnContainer}>
                        <TouchableOpacity style={styleLogin.btn} onPress={() => navigation.navigate(Screens.HOME)}>
                            <Text style={styleLogin.btnLabel}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <GoogleSigninButton
                            style={{ width: 210, height: 60, marginTop: 5, }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginForm

