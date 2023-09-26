import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import styleLogin from './Style'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'

const LoginForm = () => {
    const [displayPassword, setDisplayPassword] = useState(true);
    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView style={styleLogin.mainContainer} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styleLogin.container}>
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
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginForm

