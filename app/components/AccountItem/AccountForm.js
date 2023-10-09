import React, {useState} from "react";
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from "react-native";
import shortid from "react-id-generator";

const AccountForm = ({cuentas, setCuentas, guardarMostrarForm, guardarCuentasStorage}) => {
    const [cantidad, guardarCantidad] = useState('');
    const [numero, guardarNumero] = useState('');
    const [tipo, guardarTipo] = useState('');

    const crearNuevaCuenta = () => {
        if(cantidad.trim() === '' || numero.trim() === '' || tipo.trim() === '') {
                mostrarAlerta();
                return;
            }
        const cuenta = { cantidad, numero, tipo};
        cuenta.id = shortid();

        const cuentasNuevo = [...cuentas, cuenta];
        setCuentas(cuentasNuevo);

        guardarCuentasStorage(JSON.stringify(cuentasNuevo));

        guardarMostrarForm(false);

        guardarCantidad('');
        guardarNumero('');
        guardarTipo('');
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Cantidad:</Text>
                    <TextInput style={styles.input} onChangeText={ texto => guardarCantidad(texto) } 
                        keyboardType="numeric" />
                </View>
                <View>
                    <Text style={styles.label}>Numero:</Text>
                    <TextInput style={styles.input} onChangeText={ texto => guardarNumero(texto) } 
                        keyboardType="numeric" />
                </View>
                <View>
                    <Text style={styles.label}>Tipo:</Text>
                    <TextInput style={styles.input} onChangeText={ texto => guardarTipo(texto) }/>
                </View>
                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCuenta() } style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva Cuenta</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#b0e0e6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        color: '#778899',
    },
    input: {
        marginTop: 10,
        height: 50,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        fontSize: 25,
        textAlign: 'center',
    },
    btnSubmit: {
        padding: 20,
        backgroundColor: '#6495ed',
        marginVertical: 30,
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    }
})

export default AccountForm;