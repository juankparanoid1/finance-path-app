import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'

const ModalAccount = ({ item, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styleModalBooking.centeredView}>
                <View style={styleModalBooking.modalContainer}>
                    <View style={{
                        flex: 1,
                    }}>
                        <View style={styleModalBooking.details}>
                            <Text style={styleModalBooking.info}>
                                <Text style={[styleModalBooking.label]}>{item.accountNumber}</Text>
                            </Text>
                            <Text style={styleModalBooking.info}>
                                <Text style={styleModalBooking.label}>Banco: </Text>
                                {item.bank}
                            </Text>
                            <Text style={styleModalBooking.info}>
                                <Text style={styleModalBooking.label}>Tipo: </Text>
                                {item.type}
                            </Text>
                        </View>
                    </View>
                    <View style={styleModalBooking.btnContainer}>
                        <Pressable
                            style={{
                                flex: 1,
                            }}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <View style={[styleModalBooking.btn, { backgroundColor: '#545F71' }]}>
                                <Text style={styleModalBooking.textStyle}>Cerrar</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAccount

const styleModalBooking = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        height: 300,
        width: 300,
        padding: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 18,
        paddingVertical: 10
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        color: '#000000'
    },
    details: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    btn: {
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

