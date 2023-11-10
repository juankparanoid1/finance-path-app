import React, {useState} from "react";
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from "react-native";
import shortid from "react-id-generator";

const GastoForm = ({gastos, setGastos, guardarGastoForm, guardarGastoStorage}) => {
    const [descripcion, guardarDescripcion] = useState('');
    const [monto, guardarMonto] = useState('');

    const crearNuevoGasto = () => {
        if(descripcion.trim() === '' || monto.trim() === '') {
                mostrarAlerta();
                return;
            }
        const gasto = { descripcion, monto};
        gasto.id = shortid();

        const gastosNuevo = [...gastos, gasto];
        setGastos(gastosNuevo);

        guardarGastoStorage(JSON.stringify(gastosNuevo));

        guardarGastoForm(false);

        guardarDescripcion('');
        guardarMonto('');
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
                    <Text style={styles.label}>Descripcion:</Text>
                    <TextInput style={styles.input} onChangeText={ texto => guardarDescripcion(texto) } 
                        keyboardType="numeric" />
                </View>
                <View>
                    <Text style={styles.label}>Monto:</Text>
                    <TextInput style={styles.input} onChangeText={ texto => guardarMonto(texto) } 
                        keyboardType="numeric" />
                </View>
                <View>
                    <TouchableHighlight onPress={ () => crearNuevoGasto() } style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nuevo Gasto</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: 'lightgreen',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        color: 'black',
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
        backgroundColor: 'purple',
        marginVertical: 30,
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    }
})

export default GastoForm;