import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../../components/loginform/LoginForm'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <LoginForm></LoginForm>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})