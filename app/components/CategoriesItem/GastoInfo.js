import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";

const GastoInfo = ({item, eliminarGasto}) => {
    const dialogoEliminar = id => {
        console.log('eliminado...', id);
        eliminarGasto(id);
    }

    return (
        <View style={styles.cuenta}>
            <View>
                <Text style={styles.label}>Descripcion: </Text>
                <Text style={styles.texto}>{item.descripcion}</Text>
            </View>
            <View>
                <Text style={styles.label}>Monto: </Text>
                <Text style={styles.texto}>${item.monto}</Text>
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
        backgroundColor: 'lightblue',
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

export default GastoInfo;