import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";

const AccountInfo = ({item, eliminarCuenta}) => {
    const dialogoEliminar = id => {
        console.log('eliminado...', id);
        eliminarCuenta(id);
    }

    return (
        <View style={StyleSheet.cuenta}>
            <View>
                <Text style={styles.label}>Cantidad: </Text>
                <Text style={styles.texto}>${item.cantidad}</Text>
            </View>
            <View>
                <Text style={styles.label}>Numero: </Text>
                <Text style={styles.texto}>{item.numero}</Text>
            </View>
            <View>
                <Text style={styles.label}>Tipo: </Text>
                <Text style={styles.texto}>{item.tipo}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(item.id) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> Eliminar </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cuenta: {
        backgroundColor: '#FFF',
        borderBlockColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10,
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default AccountInfo;