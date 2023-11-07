import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import styleSignIn from './Style';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

const SignInForm = () => {

    const [displayPassword, setDisplayPassword] = useState(true);
    const [loginForm, setLoginForm] = useState({
        user: '',
        password: '',
    });

    const opacityStyle = !(loginForm.user === '' || loginForm.password === '') ? 1 : 0.8;

    const navigation = useNavigation();

    const signInUser = async () => {
        try {
            const createUser = await auth().createUserWithEmailAndPassword(loginForm.user, loginForm.password);
            if (createUser) {
                navigation.navigate(Screens.HOME)
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Verificar', 'El correo ya esta siendo usado', [{
                    text: 'Ok',
                }]);
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('Verificar', 'El correo es incorrecto', [{
                    text: 'Ok',
                }]);
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styleSignIn.mainContainer} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styleSignIn.container}>
                <View style={styleSignIn.imageContainer}>
                    <Image style={styleSignIn.img} source={require('../../src/images/logo_transparent.png')}></Image>
                </View>
                <View style={styleSignIn.formContainer}>
                    <View style={styleSignIn.inputContainer}>
                        <Text>Usuario</Text>
                        <TextInput style={styleSignIn.input}
                            onChange={(e) => setLoginForm({ ...loginForm, user: e.nativeEvent.text })}></TextInput>
                    </View>
                    <View style={styleSignIn.inputContainer}>
                        <Text>Contraseña</Text>
                        <View style={styleSignIn.passwordContainer}>
                            <TextInput style={styleSignIn.input} secureTextEntry={displayPassword}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.nativeEvent.text })}></TextInput>
                            <TouchableOpacity style={styleSignIn.icon} onPress={() => setDisplayPassword(!displayPassword)}>
                                <Icon name={displayPassword ? 'eye' : 'eye-off'} size={30} color="#000" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styleSignIn.btnContainer}>
                        <TouchableOpacity
                            disabled={loginForm.user === '' || loginForm.password === ''}
                            style={[{ opacity: opacityStyle }, styleSignIn.btn]} onPress={() => signInUser()}>
                            <Text style={styleSignIn.btnLabel}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignInForm

const styles = StyleSheet.create({})