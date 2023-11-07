import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacing from '../../helpers/Spacing';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens';

const Settings = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    signOut = async () => {
        try {
            //verify if the user signin with google
            const signIn = await GoogleSignin.isSignedIn();
            console.log(signIn)
            if (signIn) {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                // setloggedIn(false);
                // setuserInfo([]);
                //navigation.navigate(Screens.LOGIN)
            } else {
                auth().signOut();
                //navigation.navigate(Screens.LOGIN)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={{ paddingHorizontal: Spacing.containerPadding }}>
                <TouchableOpacity onPress={() => signOut()}>
                    <View style={{ borderWidth: 1, borderColor: '#100D40', backgroundColor: 'white', borderRadius: 7, height: 54, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, lineHeight: 22, fontWeight: '600', color: '#545F71' }}>Cerrar Sesión</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})