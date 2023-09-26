import { StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";
import Spacing from "../../helpers/Spacing";

const styleLogin = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: Spacing.containerPadding,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'column',
        paddingBottom: 12,
    },
    input: {
        padding: 12,
        height: 48,
        borderRadius: 6,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.primary,
    },
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 132,
        height: 48,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        borderRadius: 6,
    },
    passwordContainer: {
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: 8,
    }
});

export default styleLogin;